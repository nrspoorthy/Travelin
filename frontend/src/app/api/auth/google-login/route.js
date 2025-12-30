import { OAuth2Client } from "google-auth-library";
import dbConnect from "@/lib/db";
import User from "@/models/User";
import { generateToken } from "@/lib/jwt";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export async function POST(request) {
  try {
    await dbConnect();

    const { token } = await request.json();

    if (!token) {
      return Response.json(
        { message: "Google token missing" },
        { status: 400 }
      );
    }

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { sub, email, name, picture } = payload;

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        googleId: sub,
        email,
        name,
        picture,
      });
    }

    const jwtToken = generateToken(user);

    return Response.json(
      { success: true, user },
      {
        status: 200,
        headers: {
          "Set-Cookie": `token=${jwtToken}; HttpOnly; Path=/; Max-Age=604800`,
        },
      }
    );
  } catch (error) {
    console.error("GOOGLE LOGIN ERROR ", error);

    return Response.json(
      {
        message: "Google Authentication Failed",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
