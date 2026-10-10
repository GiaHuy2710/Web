# HƯỚNG DẪN BẢO TRÌ & NÂNG CẤP XÁC THỰC PHÍA BACKEND (SERVER API)

Tài liệu này dành riêng cho lập trình viên **Backend**. Hướng dẫn chi tiết kiến trúc tầng, logic xử lý bảo mật (Bcrypt, JWT, Zod Validation) và quy trình bảo trì, mở rộng cho hệ thống **Auth API** trong thư mục `apps/server`.

---

## 1. KIẾN TRÚC PHÂN TẦNG BACKEND (SERVER ARCHITECTURE)

Hệ thống Backend được xây dựng theo kiến trúc **Layered Architecture (Phân tầng độc lập)**:

```
apps/server/src/
├── middlewares/
│   ├── validate.middleware.ts   # 1. Tầng Kiểm tra Schema Request (Zod)
│   ├── auth.middleware.ts       # 2. Tầng Xác thực JWT Bearer Token
│   └── errorHandler.ts          # 3. Tầng Bắt và Chuẩn hóa Lỗi Tập trung
└── modules/
    └── auth/
        ├── auth.schema.ts       # 4. Data Validation Schemas & TypeScript Types
        ├── auth.routes.ts       # 5. Routing Definitions (Gắn kết URL & Middleware)
        ├── auth.controller.ts   # 6. HTTP Controller (Nhận Request, trả Response)
        └── auth.service.ts      # 7. Business Logic (Hash Bcrypt, Prisma Database, JWT)
```

### Luồng xử lý một Request đến API:
1. **Router (`auth.routes.ts`)**: Tiếp nhận URL và chuyển qua middleware kiểm tra dữ liệu đầu vào.
2. **Validator (`validate.middleware.ts`)**: Dùng Zod Schema parse `req.body`. Nếu sai định dạng $\rightarrow$ trả về lỗi `400 Bad Request` ngay lập tức kèm danh sách các trường bị lỗi.
3. **Controller (`auth.controller.ts`)**: Nhận dữ liệu sạch đã validate, gọi xuống Service và trả HTTP Response tiêu chuẩn `{ success: true, data: ... }`.
4. **Service (`auth.service.ts`)**: Truy vấn Prisma ORM, kiểm tra mật khẩu bằng `bcrypt.compare`, sinh JWT token bằng `jwt.sign`.
5. **Error Handler (`errorHandler.ts`)**: Nếu bất kỳ đâu ném ra lỗi (`throw new AppError(...)`), middleware này sẽ bắt lỗi và trả format JSON thống nhất, không làm sập server.

---

## 2. CHI TIẾT TỪNG THÀNH PHẦN MÃ NGUỒN

### 2.1. Zod Validation Schemas (`src/modules/auth/auth.schema.ts`)
Kiểm tra cấu trúc và kiểu dữ liệu trước khi đi vào controller:

```typescript
import { z } from "zod";

// Schema kiểm tra dữ liệu Đăng nhập
export const LoginSchema = z.object({
  email: z
    .string({ required_error: "Vui lòng nhập email" })
    .email("Định dạng email không hợp lệ (VD: user@domain.com)"),
  password: z
    .string({ required_error: "Vui lòng nhập mật khẩu" })
    .min(6, "Mật khẩu phải chứa ít nhất 6 ký tự"),
});

// Schema kiểm tra dữ liệu Đăng ký
export const RegisterSchema = z.object({
  email: z
    .string({ required_error: "Vui lòng nhập email" })
    .email("Định dạng email không hợp lệ"),
  password: z
    .string({ required_error: "Vui lòng nhập mật khẩu" })
    .min(6, "Mật khẩu cần tối thiểu 6 ký tự"),
  fullName: z
    .string({ required_error: "Vui lòng nhập họ tên" })
    .min(2, "Họ tên phải từ 2 ký tự trở lên"),
  role: z.enum(["USER", "ADMIN", "MANAGER"]).default("USER"),
});

export type LoginInput = z.infer<typeof LoginSchema>;
export type RegisterInput = z.infer<typeof RegisterSchema>;
```

---

### 2.2. Middleware Xác thực Dữ liệu (`src/middlewares/validate.middleware.ts`)
Tự động chuyển đổi lỗi của Zod thành định dạng JSON chuẩn:

```typescript
export const validateBody = <T>(schema: ZodSchema<T>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = await schema.parseAsync(req.body);
      return next();
    } catch (error: unknown) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          success: false,
          error: {
            code: ERROR_CODES.VALIDATION_ERROR || "VALIDATION_ERROR",
            message: "Dữ liệu gửi lên không đúng định dạng",
            details: error.errors.map((err) => ({
              field: err.path.join("."),
              message: err.message,
            })),
          },
        });
      }
      return next(error);
    }
  };
};
```

---

### 2.3. Middleware Xác thực JWT Token (`src/middlewares/auth.middleware.ts`)
Bảo vệ các route riêng tư (như `GET /api/auth/me`, cập nhật hồ sơ, tạo dự án):

```typescript
export const authenticateToken = (req: Request, _res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer <token>

  if (!token) {
    throw new AppError("Yêu cầu mã xác thực (Token)", 401, "UNAUTHORIZED");
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as UserPayload;
    req.user = decoded;
    return next();
  } catch {
    throw new AppError("Phiên đăng nhập không hợp lệ hoặc đã hết hạn", 403, "FORBIDDEN");
  }
};
```

---

### 2.4. Tầng Xử lý Nghiệp vụ (`src/modules/auth/auth.service.ts`)

#### Đăng nhập (`login`):
```typescript
async login(input: LoginInput) {
  const email = input.email.toLowerCase().trim();

  // 1. Tìm user trong Database Prisma
  const user = await db.user.findUnique({ where: { email } });
  if (!user) {
    throw new AppError("Email hoặc mật khẩu không chính xác", 401, "UNAUTHORIZED");
  }

  // 2. So sánh mật khẩu bằng Bcrypt
  const isPasswordValid = await bcrypt.compare(input.password, user.password);
  if (!isPasswordValid) {
    throw new AppError("Email hoặc mật khẩu không chính xác", 401, "UNAUTHORIZED");
  }

  // 3. Ký mã JWT Token
  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );

  return {
    token,
    user: {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      role: user.role,
      avatarUrl: user.avatarUrl,
    },
  };
}
```

#### Đăng ký (`register`):
```typescript
async register(input: RegisterInput) {
  const email = input.email.toLowerCase().trim();

  // Kiểm tra email đã đăng ký chưa
  const existingUser = await db.user.findUnique({ where: { email } });
  if (existingUser) {
    throw new AppError("Email này đã được sử dụng", 409, "CONFLICT");
  }

  // Băm mật khẩu 10 rounds
  const hashedPassword = await bcrypt.hash(input.password, 10);

  // Tạo User kèm Profile mặc định
  const newUser = await db.user.create({
    data: {
      email,
      password: hashedPassword,
      fullName: input.fullName.trim(),
      role: input.role as Role,
      profile: {
        create: {
          title: "Software Engineer",
          skills: ["TypeScript", "Node.js"],
        },
      },
    },
  });

  const token = jwt.sign(
    { id: newUser.id, email: newUser.email, role: newUser.role },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );

  return { token, user: newUser };
}
```

---

## 3. DANH SÁCH ENDPOINTS & HTTP STATUS CODES

| Method | Endpoint | Payload | Headers | Thành công | Thất bại |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/login` | `{ email, password }` | None | `200 OK` | `400` (Sai format), `401` (Sai pass) |
| `POST` | `/api/auth/register` | `{ fullName, email, password, role? }` | None | `201 Created` | `400` (Thiếu field), `409` (Email trùng) |
| `POST` | `/api/auth/forgot-password` | `{ email }` | None | `200 OK` | `400` (Email không hợp lệ) |
| `POST` | `/api/auth/reset-password` | `{ token, newPassword }` | None | `200 OK` | `400` (Token hết hạn / không hợp lệ) |
| `GET` | `/api/auth/me` | None | `Authorization: Bearer <token>` | `200 OK` | `401` (Chưa gửi token), `403` (Token sai) |

---

## 4. HƯỚNG DẪN BẢO TRÌ & NÂNG CẤP BACKEND THƯỜNG GẶP

### Tình huống 1: Thay đổi thời hạn JWT Token hoặc Khóa bí mật
- Khai báo trong file `.env` ở root dự án:
  ```env
  JWT_SECRET=your_new_super_secret_key_here
  JWT_EXPIRES_IN=30d
  ```

### Tình huống 2: Thêm trường mới khi Đăng ký (Ví dụ: `phoneNumber`)
1. Cập nhật Prisma Schema (`packages/database/prisma/schema.prisma`):
   ```prisma
   model User {
     // ...
     phone String?
   }
   ```
   Chạy lệnh: `npx prisma db push` hoặc `npx prisma migrate dev`.
2. Cập nhật `RegisterSchema` trong [`auth.schema.ts`](file:///d:/Project/Profile/apps/server/src/modules/auth/auth.schema.ts):
   ```typescript
   phone: z.string().optional(),
   ```
3. Cập nhật hàm `register` trong [`auth.service.ts`](file:///d:/Project/Profile/apps/server/src/modules/auth/auth.service.ts) để lưu trường `phone` vào database.

### Tình huống 3: Phân quyền theo Role (Authorization RBAC)
Để giới hạn một route chỉ dành cho `ADMIN`:
1. Tạo middleware `requireRole`:
   ```typescript
   export const requireRole = (role: string) => {
     return (req: Request, _res: Response, next: NextFunction) => {
       if (req.user?.role !== role) {
         throw new AppError("Bạn không có quyền thực hiện thao tác này", 403, "FORBIDDEN");
       }
       next();
     };
   };
   ```
2. Áp dụng vào route:
   ```typescript
   router.delete("/users/:id", authenticateToken, requireRole("ADMIN"), userController.deleteUser);
   ```

### Tình huống 4: Tích hợp Gửi Email thật cho Quên mật khẩu
- Trong [`auth.service.ts`](file:///d:/Project/Profile/apps/server/src/modules/auth/auth.service.ts), hàm `forgotPassword` hiện đang sinh `resetToken` và ghi log ra console.
- Khi triển khai sản phẩm thực tế, tích hợp thư viện **Resend** hoặc **Nodemailer** để gửi link:
  `https://yourdomain.com/reset-password?token=${resetToken}` tới email của người dùng.
