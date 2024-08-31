import { Schema, model } from "mongoose";
import  Cart  from "../interfaces/cart";

const cartSchema: Schema = new Schema<Cart>({
        cartItems: [
            {
                product: { type: Schema.Types.ObjectId, ref: 'Product' },
                quantity: { type: Number, default: 1 }
            }
        ],
        totalPrice: Number,
        totalPriceAfterDiscount: Number,
        user: { type: Schema.Types.ObjectId, ref: 'users' }
    },
    { timestamps: true }

);

cartSchema.pre<Cart>(/^find/, function (next) {
    this.populate({ path: 'cartItems.product', select: 'name cover price' })
    next()
});

export default model<Cart>('Cart', cartSchema)