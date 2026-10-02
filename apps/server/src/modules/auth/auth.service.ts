import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { db, Role } from "@repo/database";
import { AppError } from "../../middlewares/errorHandler";
import {
  LoginInput,
  RegisterInput,
  ForgotPasswordInput,
  ResetPasswordInput,
} from "./auth.schema";

interface ResetTokenPayload {
  id: string;
  purpose: string;
}

const JWT_SECRET = process.env.JWT_SECRET || "default_jwt_secret";
const JWT_EXPIRES_IN: jwt.SignOptions["expiresIn"] =
  (process.env.JWT_EXPIRES_IN as jwt.SignOptions["expiresIn"]) || "7d";

export class AuthService {
  /**
   * 1. Xử lý Đăng nhập
   */
  async login(input: LoginInput) {
    const email = input.email.toLowerCase().trim();

    // Tìm người dùng theo email trong Prisma Database
    const user = await db.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new AppError("Email hoặc mật khẩu không chính xác", 401, "UNAUTHORIZED");
    }

    // So sánh mật khẩu người dùng nhập với mật khẩu băm đã lưu
    const isPasswordValid = await bcrypt.compare(input.password, user.password);
    if (!isPasswordValid) {
      throw new AppError("Email hoặc mật khẩu không chính xác", 401, "UNAUTHORIZED");
    }

    // Ký tạo JWT Token
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

  /**
   * 2. Xử lý Đăng ký tài khoản mới
   */
  async register(input: RegisterInput) {
    const email = input.email.toLowerCase().trim();

    const existingUser = await db.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new AppError("Email này đã được sử dụng", 409, "CONFLICT");
    }

    // Băm mật khẩu bằng bcrypt
    const hashedPassword = await bcrypt.hash(input.password, 10);

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

    return {
      token,
      user: {
        id: newUser.id,
        email: newUser.email,
        fullName: newUser.fullName,
        role: newUser.role,
        avatarUrl: newUser.avatarUrl,
      },
    };
  }

  /**
   * 3. Xử lý Quên mật khẩu
   */
  async forgotPassword(input: ForgotPasswordInput) {
    const email = input.email.toLowerCase().trim();
    const user = await db.user.findUnique({
      where: { email },
    });

    // Để đảm bảo bảo mật, không tiết lộ email có tồn tại hay không
    if (!user) {
      return {
        message: "Nếu email tồn tại trên hệ thống, liên kết khôi phục đã được gửi đi.",
      };
    }

    // Tạo token khôi phục có hiệu lực trong 15 phút
    const resetToken = jwt.sign(
      { id: user.id, purpose: "reset_password" },
      JWT_SECRET,
      { expiresIn: "15m" }
    );

    console.log(`[DEBUG] Link đặt lại mật khẩu: /reset-password?token=${resetToken}`);

    return {
      message: "Liên kết khôi phục mật khẩu đã được gửi đến email của bạn.",
      resetToken, // Trả ra để bạn kiểm tra và test thử
    };
  }

  /**
   * 4. Xử lý Đặt lại mật khẩu mới
   */
  async resetPassword(input: ResetPasswordInput) {
    let payload: ResetTokenPayload;
    try {
      payload = jwt.verify(input.token, JWT_SECRET) as ResetTokenPayload;
    } catch {
      throw new AppError("Mã khôi phục không hợp lệ hoặc đã hết hạn", 400, "INVALID_RESET_TOKEN");
    }

    if (payload.purpose !== "reset_password") {
      throw new AppError("Mã token không đúng mục đích", 400, "INVALID_TOKEN");
    }

    const newHashedPassword = await bcrypt.hash(input.newPassword, 10);

    await db.user.update({
      where: { id: payload.id },
      data: { password: newHashedPassword },
    });

    return {
      message: "Đặt lại mật khẩu thành công! Bạn có thể dùng mật khẩu mới để đăng nhập.",
    };
  }

  /**
   * 5. Lấy hồ sơ tài khoản hiện tại (Me)
   */
  async getMe(userId: string) {
    const user = await db.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        fullName: true,
        role: true,
        avatarUrl: true,
        createdAt: true,
      },
    });

    if (!user) {
      throw new AppError("Người dùng không tồn tại", 404, "NOT_FOUND");
    }

    return user;
  }
}

export const authService = new AuthService();