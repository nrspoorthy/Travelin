import TourBooking from "@/models/TourBooking";
import Tours from "@/models/Tours";
import sendEmail from "@/lib/sendEmail";
import { verifyToken } from "@/lib/verifyToken";



export async function POST(request) {
  const user = verifyToken(request);

  try {
    const body = await request.json();
    const {
      firstName,
      lastName,
      email,
      phone,
      country,
      city,
      address1,
      address2,
      tourId,
      persons,
      amountINR,
    } = body;

    if (!tourId || !persons || persons <= 0) {
      return Response.json(
        { success: false, message: "Invalid booking data" },
        { status: 400 }
      );
    }

    const tour = await Tours.findById(tourId);
    if (!tour) {
      return Response.json(
        { success: false, message: "Tour not found" },
        { status: 404 }
      );
    }

    const booking = await TourBooking.create({
      userName: `${firstName} ${lastName}`,
      email,
      phone,
      country,
      city,
      address1,
      address2,
      tourId: tour._id,
      persons,
      totalPrice: amountINR,
      bookingStatus: "Confirmed",
      paymentStatus: "Unpaid",
    });

    try {
      await sendEmail({
        to: email,
        subject: "Your Tour Booking is Confirmed",
        html: `<h2>Tour Booking Confirmed</h2>
               <p>Tour: ${tour.tourName}</p>
               <p>Persons: ${persons}</p>
               <p>Total: ₹${amountINR}</p>`,
      });
    } catch (e) {
      console.error("Tour email failed:", e.message);
    }

    return Response.json(
      { success: true, booking },
      { status: 201 }
    );
  } catch (error) {
    return Response.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
