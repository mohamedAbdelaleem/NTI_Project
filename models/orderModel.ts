import { Schema, model } from "mongoose";
import Order  from "../interfaces/order";

const orderSchema: Schema = new Schema<Order>({
  cartItems: [{
    product: { type: Schema.Types.ObjectId, ref: 'Product' },
    quantity: { type: Number, default: 1 },
  }],
  totalPrice: Number,
  paymentMethod: { type: String, enum: ['card', 'cash'], default: 'cash' },
  deliveredAt: Date,
  paidAt: Date,
  isDelivered: { type: Boolean, default: false },
  isPaid: { type: Boolean, default: false },
  taxPrice: { type: Number, default: 0 },
  address: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'users' }
}, { timestamps: true });

orderSchema.pre<Order>(/^find/, function (next) {
  this.populate({ path: 'cartItems.product', select: 'name cover price' })
  this.populate({ path: 'user', select: 'name image email' })
  next()
})

export default model<Order>('Order', orderSchema)