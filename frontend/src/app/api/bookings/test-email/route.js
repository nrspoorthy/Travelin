import sendEmail from "@/lib/sendEmail";

export async function GET() {
  try {
    await sendEmail({
      to: "yourgmail@gmail.com",
      subject: "Test Email from Travelin",
      html: "<h1>Email is working</h1>",
    });

    return Response.json({
      success: true,
      message: "Email sent successfully",
    });
  } catch (error) {
    return Response.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
