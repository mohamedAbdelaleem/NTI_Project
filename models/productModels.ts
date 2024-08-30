import { Schema, model } from "mongoose";
import { Products } from "../interfaces/product";

const productsSchema: Schema = new Schema<Products>({
  name: { type: String, required: true, trim: true},
  description: { type: String, required: true, trim: true, minlength: 10, maxlength: 500 },
  price: { type: Number, required: true, min: 1, max: 1000000 },
  priceAfterDiscount: { type: Number, min: 1, max: 1000000 },
  quantity: { type: Number, default: 0, min: 0 },
  sold: { type: Number, default: 0 },
  ratingAverage: { type: Number, min: 0, max: 5, default: 0 },
  ratingCount: { type: Number, default: 0 },
  cover: String,
  images: [String],
  category: { type: Schema.Types.ObjectId, required: true, ref: 'Category' },
  subcategory: { type: Schema.Types.ObjectId, required: true, ref: 'SubCategory' }
}, { timestamps: true });


productsSchema.virtual('reviews', { ref: 'Review', foreignField: 'product', localField: '_id' })


productsSchema.pre<Products>(/^find/, function (next) {
  this.populate({ path: 'category', select: 'name' })
  this.populate({ path: 'subcategory', select: 'name' })
  next()
});

productsSchema.virtual('cover_url').get(function() {
  return `uploads/products/${this.cover}`;
});

productsSchema.set('toJSON', { virtuals: true });
productsSchema.set('toObject', { virtuals: true });

export default model<Products>('Product', productsSchema)