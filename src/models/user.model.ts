import { Schema, model } from "mongoose";

import { Roles } from "../enums/roles";
import bcrypt from "bcryptjs";

export interface IUsers {
  firstname: string;
  lastname: string;
  email: string;
  role: Roles;
  username: string;
  password: string;
  mobile: number;
  date: object;
  matchPassword: (data: string) => boolean;
}

const userSchema = new Schema<IUsers>({
  firstname: {
    type: String,
    required: true,
  },

  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  mobile: {
    type: Number,
    required: true,
  },
  role: {
    type: String,
    enum: Object.values(Roles),
    required: true,
    default: Roles.USER,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now(),
  },
});

userSchema.methods.matchPassword = async function (
  enteredPassword: string
): Promise<boolean> {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

export const Users = model<IUsers>("Users", userSchema);
