import { model, Schema, Document } from 'mongoose';
import { IUser } from '../../../entities/user.interface';

const userSchema: Schema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  rol: {
    type: String,
    required: true,
    default: 'user',
  },
  created_at: {
    type: Date,
    required: true,
    default: new Date(),
  },
});

const userModel = model<IUser & Document>('User', userSchema);

export default userModel;
