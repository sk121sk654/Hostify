const Listing = require("../models/listing.js");
const { uploadToCloudinary } = require("../cloudConfig");

// ⭐ Updated to support filters
module.exports.index = async (req, res) => {
  let filter = {};

  // ⭐ Category filter
  if (req.query.category) {
    filter.category = req.query.category;
  }

  // ⭐ Trending filter
  if (req.query.trending === "true") {
    filter.isTrending = true;
  }

  // ⭐ SEARCH FILTER (location + title + description)
  if (req.query.search) {
    filter.$or = [
      { location: { $regex: req.query.search, $options: "i" } },
      { country: { $regex: req.query.search, $options: "i" } },
      { title: { $regex: req.query.search, $options: "i" } }
    ];
  }

  const allListings = await Listing.find(filter);
  res.render("listings/index.ejs", { allListings });
};


module.exports.renderNewForm = (req, res) => {
  res.render("listings/new.ejs");
};

module.exports.showListing = async (req, res) => {
  const listing = await Listing.findById(req.params.id)
    .populate({
      path: "reviews",
      populate: { path: "author" }
    })
    .populate("owner");

  if (!listing) {
    req.flash("error", "Listing you requested for does not exist");
    return res.redirect("/listings");
  }
  return res.render("listings/show.ejs", { listing });
};

module.exports.createListing = async (req, res, next) => {
  const newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;

  // ⭐ NEW
  newListing.category = req.body.listing.category;
  newListing.isTrending = req.body.listing.isTrending === "on";

  if (req.file) {
    const result = await uploadToCloudinary(req.file.buffer, "Hostify_DEV");

    newListing.image = {
      url: result.secure_url,
      filename: result.public_id,
    };
  }

  await newListing.save();
  req.flash("success", "New Listing Created!");
  res.redirect("/listings");
};

module.exports.renderEditForm = async (req, res) => {
  const listing = await Listing.findById(req.params.id);

  if (!listing) {
    req.flash("error", "Listing you requested for does not exist");
    return res.redirect("/listings");
  }

  let originalImageUrl = listing.image.url;
  originalImageUrl = originalImageUrl.replace("/upload", "/upload/w_250");

  return res.render("listings/edit.ejs", { listing, originalImageUrl });
};

module.exports.updateListing = async (req, res) => {
  let listing = await Listing.findById(req.params.id);

  listing.set(req.body.listing);

  // ⭐ NEW
  listing.category = req.body.listing.category;
  listing.isTrending = req.body.listing.isTrending === "on";

  if (req.file) {
    const result = await uploadToCloudinary(req.file.buffer, "Hostify_DEV");

    listing.image = {
      url: result.secure_url,
      filename: result.public_id,
    };
  }

  await listing.save();
  req.flash("success", "Listing Updated!");
  res.redirect(`/listings/${listing._id}`);
};

module.exports.destroyListing = async (req, res) => {
  await Listing.findByIdAndDelete(req.params.id);
  req.flash("success", "Listing Deleted!");
  res.redirect("/listings");
};
