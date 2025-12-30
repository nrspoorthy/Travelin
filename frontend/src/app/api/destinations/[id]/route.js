import Destination from "@/models/Destination";

export async function GET(request, { params }) {
  try {
    const { id } = params;

    const destination = await Destination.findById(id);
    if (!destination) {
      return Response.json(
        { error: "Destination not found" },
        { status: 404 }
      );
    }

    return Response.json(destination, { status: 200 });
  } catch (error) {
    return Response.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
