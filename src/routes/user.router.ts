import Router from "express";
import { getUsers } from "../controllers/user.controller";
import { login, userDetail, logout } from "../controllers/auth.controller";

const usersRouter = Router();

usersRouter.get("/users", getUsers);
usersRouter.post("/login", login);
usersRouter.post("/logout", logout);
usersRouter.get("/userdetails", userDetail);

export default usersRouter;
