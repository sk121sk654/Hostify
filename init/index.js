

const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL =
  "mongodb+srv://saurabh:SaiBaba@cluster0.bq1mmil.mongodb.net/?appName=Cluster0";

async function main() {
  await mongoose.connect(MONGO_URL);
  console.log("Connected to DB");

  await Listing.deleteMany({});

  const data = initData.data.map((obj) => ({
    ...obj,
    owner: "69d250bf6237fa6607e10102",
  }));

  await Listing.insertMany(data);
  console.log("Data was initialized:", data.length, "listings inserted");

  await mongoose.connection.close();
}

main().catch((err) => console.log(err));