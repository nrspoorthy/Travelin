import Destination from "@/models/Destination";

export async function POST(request, { params }) {
  try {
    const { id } = params;
    const { user, rating, comment } = await request.json();

    const destination = await Destination.findById(id);
    if (!destination) {
      return Response.json(
        { error: "Destination not found" },
        { status: 404 }
      );
    }

    const newReview = {
      user,
      rating,
      comment,
      date: new Date(),
    };

    // destination uses "experiences"
    destination.experiences.push(newReview);

    const total = destination.experiences.reduce(
      (sum, r) => sum + r.rating,
      0
    );

    destination.rating = (
      total / destination.experiences.length
    ).toFixed(1);

    destination.totalReviews = destination.experiences.length;

    await destination.save();

    return Response.json(
      {
        message: "Review added successfully",
        reviews: destination.experiences,
      },
      { status: 201 }
    );
  } catch (error) {
    return Response.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
