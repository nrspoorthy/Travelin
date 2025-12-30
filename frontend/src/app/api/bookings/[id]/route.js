import TourBooking from "@/models/TourBooking";
import DestinationBooking from "@/models/DestinationBooking";
import { verifyToken } from "@/lib/verifyToken";


export async function PATCH(request, { params }) {
  try {
    const user = verifyToken(request);

    const { status } = await request.json();
    const { id } = params;

    const booking =
      (await TourBooking.findByIdAndUpdate(id, { bookingStatus: status }, { new: true })) ||
      (await DestinationBooking.findByIdAndUpdate(id, { bookingStatus: status }, { new: true }));

    if (!booking) {
      return Response.json(
        { success: false, message: "Booking not found" },
        { status: 404 }
      );
    }

    return Response.json({
      success: true,
      message: "Booking status updated",
      booking,
    });
  } catch (error) {
    return Response.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
