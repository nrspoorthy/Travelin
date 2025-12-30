import TourBooking from "@/models/TourBooking";
import DestinationBooking from "@/models/DestinationBooking";
import { verifyToken } from "@/lib/verifyToken";


export async function GET() {
  try {
    const user = verifyToken(request);

    const tourBookings = await TourBooking.find().populate("tourId");
    const destinationBookings = await DestinationBooking.find().populate("destinationId");

    const bookings = [
      ...tourBookings.map(b => ({ ...b._doc, bookingType: "Tour" })),
      ...destinationBookings.map(b => ({ ...b._doc, bookingType: "Destination" })),
    ];

    return Response.json({ success: true, bookings });
  } catch (error) {
    return Response.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
