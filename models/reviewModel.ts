import { Schema, model } from "mongoose";
import Review from "../interfaces/review";
import productModels from "./productModels";

const reviewsSchema: Schema = new Schema<Review>({
  content: { type: String, required: true, trim: true},
  rating: { type: Number, required: true, min: 1, max: 5 },
  user: { type: Schema.Types.ObjectId, required: true, ref: 'users' },
  product: { type: Schema.Types.ObjectId, required: true, ref: 'Product' }
}, { timestamps: true });


reviewsSchema.statics.calcRatingAndQuantity = async function (productId) {
  const result = await this.aggregate([
    { $match: { product: productId } },
    { $group: { _id: 'product', avgRating: { $avg: '$rating' }, ratingQuantity: { $sum: 1 } } }
  ]);
  if (result.length > 0) {
    await productModels.findByIdAndUpdate(productId, {
      ratingAverage: result[0].avgRating,
      ratingCount: result[0].ratingQuantity
    })
  } else {
    await productModels.findByIdAndUpdate(productId, {
      ratingAverage: 0,
      ratingCount: 0
    })
  }
};

reviewsSchema.post<Review>('save', async function () { await (this.constructor as any).calcRatingAndQuantity(this.product) })


reviewsSchema.pre<Review>(/^find/, function (next) {
  this.populate({ path: 'user', select: 'name image' })
  next()
})
export default model<Review>('Review', reviewsSchema);