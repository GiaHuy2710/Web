import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import path from "path";
import dotenv from "dotenv";

// Nạp biến môi trường từ file .env ở thư mục gốc
dotenv.config({ path: path.resolve(__dirname, "../../../.env") });

const db = new PrismaClient();

async function main() {
  console.log("🌱 Đang tạo tài khoản Admin...\n");

  const adminEmail    = "admin@devfolio.io";
  const adminPassword = "Admin@123456";
  const adminName     = "Alex Nguyen";

  // Kiểm tra xem tài khoản admin đã tồn tại chưa
  const existing = await db.user.findUnique({
    where: { email: adminEmail },
  });

  if (existing) {
    console.log(`ℹ️  Tài khoản Admin đã tồn tại, bỏ qua bước tạo mới.`);
    console.log(`   Email: ${existing.email}`);
    console.log(`   Role : ${existing.role}\n`);
    return;
  }

  // Băm mật khẩu
  const hashedPassword = await bcrypt.hash(adminPassword, 10);

  // Tạo tài khoản Admin + Profile mặc định
  const admin = await db.user.create({
    data: {
      email:    adminEmail,
      password: hashedPassword,
      fullName: adminName,
      role:     "ADMIN",
      profile: {
        create: {
          title:      "Senior Full-Stack & AI Engineer",
          bio:        "Xây dựng sản phẩm kỹ thuật cao và cộng đồng DevFolio.",
          website:    "https://devfolio.io",
          githubUrl:  "https://github.com/alexdev",
          linkedinUrl:"https://linkedin.com/in/alexnguyen",
          skills: [
            "TypeScript",
            "React",
            "Node.js",
            "Go",
            "Prisma",
            "Docker",
          ],
        },
      },
    },
  });

  console.log("✅ Tài khoản Admin đã được tạo thành công!\n");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log(`   Email   : ${admin.email}`);
  console.log(`   Mật khẩu: ${adminPassword}`);
  console.log(`   Role    : ${admin.role}`);
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
  console.log("🔐 Hãy đổi mật khẩu ngay sau lần đăng nhập đầu tiên!");
}

main()
  .catch((err) => {
    console.error("❌ Lỗi khi chạy seed:", err);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
