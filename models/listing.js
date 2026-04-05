const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");

const listingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },

  description: String,
  price: Number,

  image: {
    type: mongoose.Schema.Types.Mixed,
    default: {
      url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
      filename: "default"
    }
  },

  location: String,
  country: String,

  // ⭐ NEW FIELDS
  category: {
    type: String,
    default: "General"
  },

  isTrending: {
    type: Boolean,
    default: false
  },

  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review"
    }
  ],

  owner: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
});

listingSchema.post("findOneAndDelete", async function (listing) {
  if (listing) {
    await Review.deleteMany({
      _id: { $in: listing.reviews }
    });
  }
});

module.exports = mongoose.model("Listing", listingSchema);
