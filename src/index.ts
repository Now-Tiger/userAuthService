import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import usersRouter from "./routes/user.router";

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "20kb" }));
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5273",
  }),
);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "success" });
});

app.use("/api/", usersRouter);

app.listen(port, () => {
  console.log(`Application started @ http://localhost:${port}/`);
});
