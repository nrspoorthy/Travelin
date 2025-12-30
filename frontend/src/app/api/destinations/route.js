import Destination from "@/models/Destination";

// GET all destinations
export async function GET() {
  try {
    const destinations = await Destination.find();
    return Response.json(destinations, { status: 200 });
  } catch (error) {
    return Response.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

// POST create destination
export async function POST(request) {
  try {
    const body = await request.json();
    const destination = new Destination(body);
    await destination.save();

    return Response.json(destination, { status: 201 });
  } catch (error) {
    return Response.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
