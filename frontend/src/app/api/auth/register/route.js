import bcrypt from "bcryptjs";
import User from "@/models/User";

export async function POST(request) {
  try {
    const { name, email, password, confirmPassword } =
      await request.json();

    if (!name || !email || !password || !confirmPassword) {
      return Response.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    if (password !== confirmPassword) {
      return Response.json(
        { message: "Passwords do not match" },
        { status: 400 }
      );
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return Response.json(
        { message: "Email already registered" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return Response.json(
      { success: true, user },
      { status: 201 }
    );
  } catch (error) {
    return Response.json(
      { message: "Registration failed", error: error.message },
      { status: 500 }
    );
  }
}
