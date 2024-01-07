import { Request, Response } from "express";
import { Users } from "../models/user.model";
import { errorFunction } from "../utils/error";
import { generateToken } from "../utils/token";
import { AuthenticatedRequest } from "../middlewares/auth";

export const registerUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   return res
  //     .status(400)
  //     .json({ errors: errors.array() });
  // }
  try {
    const { firstname, lastname, email, username, password, role, mobile } =
      req.body;

    const userExists = await Users.findOne({ email: req.body.email });

    if (userExists) {
      return res.status(400).json(errorFunction(true, "User Already Exists"));
    }
    const createdUser = await Users.create({
      firstname,
      lastname,
      email,
      username,
      password,
      role,
      mobile,
    });
    if (!createdUser || Object.keys(createdUser).length === 0) {
      return res.status(400).json("Failed to register user");
    }
    const newUser = {
      _id: createdUser._id,
      firstname: createdUser.firstname,
      lastname: createdUser.lastname,
      mobile: createdUser.mobile,
      username: createdUser.username,
      role: createdUser.role,
      email: createdUser.email,
      token: generateToken(createdUser._id),
    };
    return res
      .status(201)
      .json(errorFunction(false, "User registration successful!", newUser));
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal server error");
  }
};

export const loginUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { email, password } = req.body;
    const user = await Users.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      const matchedUser = {
        _id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        mobile: user.mobile,
        username: user.username,
        role: user.role,
        email: user.email,
        token: generateToken(user._id),
      };
      return res
        .status(200)
        .json(errorFunction(false, "Login Successful !", matchedUser));
    } else {
      return res
        .status(401)
        .json(errorFunction(true, "Invalid email or password"));
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json(errorFunction(true, "Internal server error!"));
  }
};

export const getAllUsers = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<Response> => {
  return res.status(200).json(errorFunction(false, "Hi", req.user));
};
