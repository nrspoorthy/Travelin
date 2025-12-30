import Tours from "@/models/Tours";

export async function GET(request, { params }) {
  try {
    const { id } = params;

    const tour = await Tours.findById(id);

    if (!tour) {
      return Response.json(
        { error: "Tour not found" },
        { status: 404 }
      );
    }

    return Response.json(tour, { status: 200 });
  } catch (error) {
    return Response.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
