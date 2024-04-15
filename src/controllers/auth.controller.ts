import { Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import cookieParser from "cookie-parser";
import { PrismaClient } from "@prisma/client";
import { config } from "../config/config";

/**
 * ALL THE USE AUTHENTICATION SERVICES SHOULD BE HERE
 * 1. user loggin
 * 2. user registration
 * 3. logout / clear session
 * */

const prisma = new PrismaClient().user;
const secret = config.secret;

/** Add details about this function */
export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req?.body;
    const user_ = await prisma.findUnique({
      where: {
        username: username,
        password: password,
      },
    });
    if (!user_) {
      res.status(404).json({ success: false, error: "Not found!" });
    } else {
      const token = jwt.sign({ userId: user_.id }, secret, { expiresIn: "1h" });

      res.cookie("token", token);
      res.status(200).json({ success: true, message: "You are logged in!" });
    }
  } catch (e) {
    // implement logger system
    res.status(500).json({ error: "Server Error " });
  }
};

export const userDetail = async (req: Request, res: Response) => {
  /** WORKING PERFECTLY FINE
   *  When loggout out and tried to access this service returned with auth required msg
   * */
  try {
    const token = req.cookies.token;
    if (token) {
      const decoded = jwt.verify(token, secret) as JwtPayload;
      const user_ = await prisma.findUnique({
        where: {
          id: decoded.userId,
        },
      });
      res.json({ loggedinUser: user_?.username });
    } else {
      res
        .status(400)
        .json({ success: false, message: "Authentication required" });
    }
  } catch (e) {
    // logger system
    res.status(500).json({ error: "Server Error" });
  }
};

export const logout = async (req: Request, res: Response) => {
  res.clearCookie("token");
  res.status(200).json({ success: true, message: "logged out!" });
};
