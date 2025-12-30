import { verifyToken } from "@/lib/verifyToken";



import User from "@/models/User";

export async function GET(request) {
  try {
    const decoded = verifyToken(request);

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return Response.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    return Response.json({
      success: true,
      user,
    });
  } catch (error) {
    return Response.json(
      { success: false },
      { status: 401 }
    );
  }
}
