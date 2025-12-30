import Tours from "@/models/Tours";

export async function GET() {
  try {
    const tours = await Tours.find();
    return Response.json(tours, { status: 200 });
  } catch (error) {
    return Response.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
export async function POST(request) {
  try {
    const body = await request.json();
    const tour = new Tours(body);
    await tour.save();

    return Response.json(tour, { status: 201 });
  } catch (error) {
    return Response.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
