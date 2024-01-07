import { Router } from "express";
// import { createTask, getAllTasks } from "../controllers/task.controller"
// import { createTaskValidator } from "../validations/task.validator"
import { registerUser, loginUser, getAllUsers } from "../controllers/user.controller";
import { protect } from "../middlewares/auth"
export const userRouter: Router = Router();

userRouter.route('/').get(protect,getAllUsers)
userRouter.route("/register").post(registerUser);
userRouter.route("/login").post(loginUser);
