import mongoose, { Schema, model, models } from "mongoose";
const QuoteSchema = new Schema({
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  quote: {
    type: String,
    required: [true, "Quote is required"],
  },
  author: {
    type: String,
    required: [true, "Author is required"],
  },
});

const Quote = models.Quote || model("Quote", QuoteSchema);

export default Quote;
