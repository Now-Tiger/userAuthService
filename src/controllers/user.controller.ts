import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const userClient = new PrismaClient().user;

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users_ = await userClient.findMany({
      select: {
        username: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    res.status(200).json({ data: users_ });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Server Error" });
  }
};
