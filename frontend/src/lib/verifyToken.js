import jwt from "jsonwebtoken";

export const verifyToken = (request) => {
  const token = request.cookies.get("token")?.value;

  if (!token) {
    throw new Error("Unauthorized");
  }

  return jwt.verify(token, process.env.JWT_SECRET);
};
