import bcrypt from "bcryptjs";
import User from "@/models/User";
import { generateToken } from "@/lib/jwt";

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return Response.json(
        { message: "Email and password are required" },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email });
    if (!user) {
      return Response.json(
        { message: "User not found, please register" },
        { status: 400 }
      );
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return Response.json(
        { message: "Invalid password" },
        { status: 400 }
      );
    }

    const token = generateToken(user);

    return Response.json(
        { success: true, user },
        {
            status: 200,
            headers: {
            "Set-Cookie": `token=${token}; HttpOnly; Path=/; Max-Age=604800`,
            },
        }
        );

  } catch (error) {
    return Response.json(
      { message: "Login failed", error: error.message },
      { status: 500 }
    );
  }
}
