import DestinationBooking from "@/models/DestinationBooking";
import Destination from "@/models/Destination";
import sendEmail from "@/lib/sendEmail";
import { verifyToken } from "@/lib/verifyToken";


export async function POST(request) {
  try {
    const user = verifyToken(request);

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
      destinationId,
      tourId,
      amountINR,
      amountUSD,
    } = body;

    const destination = await Destination.findById(destinationId);
    if (!destination) {
      return Response.json(
        { success: false, message: "Invalid destination" },
        { status: 404 }
      );
    }

    const tour = destination.tours.find(
      (t) => String(t.id) === String(tourId)
    );

    if (!tour) {
      return Response.json(
        { success: false, message: "Invalid tour" },
        { status: 404 }
      );
    }

    const booking = await DestinationBooking.create({
      userName: `${firstName} ${lastName}`,
      email,
      phone,
      country,
      city,
      address1,
      address2,
      destinationId,
      destinationName: destination.name,
      tourId: tour.id,
      tourName: tour.name,
      amountUSD,
      amountINR,
      totalPrice: amountINR,
      bookingStatus: "Confirmed",
    });

    try {
      await sendEmail({
        to: email,
        subject: "Your Destination Booking is Confirmed",
        html: `<h2>Destination Booking Confirmed</h2>
               <p>${destination.name} - ${tour.name}</p>`,
      });
    } catch (e) {
      console.error("Destination email failed:", e.message);
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
