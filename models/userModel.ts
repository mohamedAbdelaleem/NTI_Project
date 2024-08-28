import { Schema, model } from "mongoose";
import  User  from "../interfaces/user";
import bcrypt from 'bcrypt';

const usersSchema: Schema = new Schema<User>({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6, maxlength: 20 },
  image: String,
  role: { type: String, required: true, enum: ['manager', 'admin', 'user'], default: 'user' },
  active: { type: Boolean, default: true },
  passwordChangedAt: Date,
  resetCode: String,
  resetCodeExpireTime: Date,
  resetCodeVerify: Boolean
}, { timestamps: true });

// const imageUrl = (document: User) => {
//   if (document.image) {
//     const imageUrl: string = `${process.env.BASE_URL}/users/${document.image}`;
//     document.image = imageUrl;
//   }
// }

usersSchema.virtual('image_url').get(function() {
    return `${process.env.BASE_URL}/users/${this.image}`;
});
  
usersSchema.set('toJSON', { virtuals: true });
usersSchema.set('toObject', { virtuals: true });


usersSchema.pre<User>('save', async function (next) {
  if (!this.isModified('password')) return next;
  this.password = await bcrypt.hash(this.password, 13)
});

export default model<User>('users', usersSchema)