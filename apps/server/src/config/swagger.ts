import swaggerJSDoc from "swagger-jsdoc";

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "DevFolio API Documentation",
      version: "1.0.0",
      description: "Tài liệu API chi tiết cho hệ thống DevFolio (Auth, Profile, Home, AI, Contact)",
    },
    servers: [
      {
        url: "http://localhost:5000",
        description: "Local Development Server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  // Quét các file routes để đọc comment JSDoc sinh ra API docs
  apis: ["./src/modules/**/*.routes.ts", "./src/server.ts"],
};

export const swaggerSpec = swaggerJSDoc(options);