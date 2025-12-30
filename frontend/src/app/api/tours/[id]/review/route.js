import Tours from "@/models/Tours";

export async function POST(request, { params }) {
  try {
    const { id } = params;
    const { user, rating, comment } = await request.json();

    const tour = await Tours.findById(id);
    if (!tour) {
      return Response.json(
        { error: "Tour not found" },
        { status: 404 }
      );
    }

    const newReview = {
      user,
      rating,
      comment,
      date: new Date(),
    };

    tour.reviews.push(newReview);

    const total = tour.reviews.reduce((sum, r) => sum + r.rating, 0);
    tour.rating = (total / tour.reviews.length).toFixed(1);
    tour.totalReviews = tour.reviews.length;

    await tour.save();

    return Response.json(
      {
        message: "Review added successfully",
        reviews: tour.reviews,
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
