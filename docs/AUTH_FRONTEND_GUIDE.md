# HƯỚNG DẪN BẢO TRÌ & NÂNG CẤP XÁC THỰC PHÍA FRONTEND (CLIENT)

Tài liệu này dành riêng cho lập trình viên **Frontend**. Hướng dẫn chi tiết cấu trúc, cách thức hoạt động và quy trình bảo trì, sửa lỗi hoặc mở rộng tính năng cho phân hệ **Auth (Đăng nhập / Đăng ký / Phiên người dùng)**.

---

## 1. KIẾN TRÚC TÁCH BIỆT (FRONTEND ARCHITECTURE)

Hệ thống xác thực phía Client được thiết kế theo nguyên tắc **Phân tách trách nhiệm (Separation of Concerns)**:

```
apps/client/src/
├── types/
│   └── auth.ts                      # 1. Type Definitions (AuthUser, DTO)
├── shared/
│   └── api/
│       ├── index.ts                 # 2. Axios Instance & Interceptors (Gắn Bearer token)
│       └── auth.api.ts              # 3. Auth API Service Layer (Xử lý HTTP & Session)
└── components/
    ├── auth/
    │   ├── LoginForm.tsx            # 4. Giao diện & Validate Form Đăng nhập
    │   ├── RegisterForm.tsx         # 5. Giao diện & Validate Form Đăng ký
    │   ├── AuthModal.tsx            # 6. Modal Container điều khiển chuyển tab
    │   └── index.ts
    └── layout/
        └── Header.tsx               # 7. Hiển thị User Info / Dropdown / Nút Đăng xuất
```

### Ưu điểm của kiến trúc này:
- **Tầng Giao diện (UI)** không gọi trực tiếp Axios và không ghi cứng đường dẫn API. Khi đổi endpoint Backend, **chỉ cần sửa tại `auth.api.ts`**.
- **Tầng Quản lý Phiên (Session Management)**: Các thao tác lưu trữ `localStorage`, lấy token, xóa session được tập trung một nơi, tránh việc mỗi component tự thao tác `localStorage.setItem` gây phân mảnh và khó debug.

---

## 2. CHI TIẾT TỪNG THÀNH PHẦN MÃ NGUỒN

### 2.1. Định nghĩa Kiểu (`src/types/auth.ts`)
```typescript
export interface AuthUser {
  id?: string;
  email: string;
  fullName: string;
  role?: string;
  avatarUrl?: string | null;
}
```
> **Nguyên tắc bảo trì**: Luôn cập nhật interface này khi Backend bổ sung trường dữ liệu người dùng mới (ví dụ: `phoneNumber`, `bio`, `company`). Tuyệt đối không dùng kiểu `any` để tuân thủ ESLint.

---

### 2.2. Tầng Dịch vụ API & Quản lý Phiên (`src/shared/api/auth.api.ts`)
Đảm nhiệm toàn bộ việc gửi request HTTP và thao tác `localStorage`.

```typescript
import { apiClient } from './index';
import { AuthUser } from '../../types/auth';

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  fullName: string;
  email: string;
  password: string;
  role?: string;
}

export interface AuthResponse {
  token: string;
  user: AuthUser;
}

export const authApi = {
  // Gửi request Đăng nhập
  async login(payload: LoginPayload): Promise<AuthResponse> {
    const response = await apiClient.post('/auth/login', payload);
    return response.data?.data;
  },

  // Gửi request Đăng ký
  async register(payload: RegisterPayload): Promise<AuthResponse> {
    const response = await apiClient.post('/auth/register', payload);
    return response.data?.data;
  },

  // Lấy thông tin tài khoản hiện tại qua token
  async getMe(): Promise<AuthUser> {
    const response = await apiClient.get('/auth/me');
    return response.data?.data;
  },

  // Quản lý LocalStorage
  saveSession(token: string, user: AuthUser): void {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  },

  clearSession(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getCurrentUser(): AuthUser | null {
    try {
      const savedUser = localStorage.getItem('user');
      return savedUser ? (JSON.parse(savedUser) as AuthUser) : null;
    } catch {
      return null;
    }
  },

  getToken(): string | null {
    return localStorage.getItem('token');
  },
};
```

---

### 2.3. Form Đăng nhập (`src/components/auth/LoginForm.tsx`)

#### Cách thức hoạt động:
1. **Client-side Validation**:
   - Kiểm tra email trống, kiểm tra định dạng email bằng regex `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`.
   - Kiểm tra mật khẩu $\ge$ 6 ký tự.
2. **Gọi dịch vụ**:
   - Sử dụng `authApi.login(...)`.
   - Sau khi có kết quả, gọi `authApi.saveSession(data.token, data.user)`.
   - Kích hoạt callback `onSuccess(data.user)`.
3. **Quản lý lỗi & Loading**:
   - Biến `isLoading` điều khiển Spinner xoay tròn và vô hiệu hóa nút submit (`disabled={isLoading}`).
   - Biến `error` hiển thị hộp thông báo lỗi màu đỏ có icon `AlertCircle`. Tự động xóa thông báo khi người dùng gõ lại input.

---

### 2.4. Form Đăng ký (`src/components/auth/RegisterForm.tsx`)

#### Cách thức hoạt động:
- Kiểm tra hợp lệ: Họ tên $\ge$ 2 ký tự, Email chuẩn, Mật khẩu $\ge$ 6 ký tự, Mật khẩu xác nhận phải trùng khớp, Bắt buộc tích chọn Điều khoản dịch vụ.
- Gọi `authApi.register(...)`.
- Khi đăng ký thành công: Tự động lưu session và chuyển trạng thái đăng nhập cho người dùng ngay lập tức mà không cần bắt đăng nhập lại.

---

### 2.5. Modal Xác thực (`src/components/auth/AuthModal.tsx`)
- Điều khiển hiển thị giữa 2 tab: `"login"` và `"register"`.
- Nhận prop `onLoginSuccess?: (user?: AuthUser) => void`.
- Khi người dùng đăng nhập hoặc đăng ký thành công $\rightarrow$ gọi `onLoginSuccess(user)` và đóng modal (`onClose()`).
- Hỗ trợ phím tắt `Escape` để đóng form nhanh.

---

### 2.6. Khởi tạo & Điều hướng Toàn cục (`src/app/App.tsx`)
```typescript
// Khởi tạo trạng thái ban đầu từ authApi
const [currentUser, setCurrentUser] = useState<AuthUser | null>(() => authApi.getCurrentUser());
const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => !!authApi.getToken());

// Xử lý khi đăng nhập thành công
const handleLoginSuccess = (user?: AuthUser) => {
  if (user) setCurrentUser(user);
  setIsLoggedIn(true);
  setIsAuthOpen(false);
};

// Xử lý khi đăng xuất
const handleLogout = () => {
  authApi.clearSession();
  setCurrentUser(null);
  setIsLoggedIn(false);
};
```

---

## 3. HƯỚNG DẪN BẢO TRÌ & NÂNG CẤP THƯỜNG GẶP

### Tình huống 1: Đổi URL API Backend hoặc chuyển sang Domain khác
- **Nơi chỉnh sửa**: [`apps/client/src/shared/api/index.ts`](file:///d:/Project/Profile/apps/client/src/shared/api/index.ts).
- Cập nhật trường `baseURL` (mặc định đang là `/api`, được Vite proxy về `http://127.0.0.1:5000`).

### Tình huống 2: Tích hợp Đăng nhập bằng Google / GitHub (OAuth)
1. Mở file [`LoginForm.tsx`](file:///d:/Project/Profile/apps/client/src/components/auth/LoginForm.tsx).
2. Tại sự kiện `onClick` của nút GitHub / Google:
   ```typescript
   const handleGoogleLogin = () => {
     window.location.href = `${apiClient.defaults.baseURL}/auth/google`;
   };
   ```
3. Sau khi Google redirect về kèm token ở query param, đọc token và gọi `authApi.saveSession(token, user)`.

### Tình huống 3: Thêm tính năng "Quên mật khẩu"
1. Thêm hàm vào `authApi`:
   ```typescript
   async forgotPassword(email: string) {
     return apiClient.post('/auth/forgot-password', { email });
   }
   ```
2. Thêm tab `'forgot-password'` trong `AuthModal.tsx` và tạo component `ForgotPasswordForm.tsx`.
