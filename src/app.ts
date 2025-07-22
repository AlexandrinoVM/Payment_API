import express  from "express";
import dotenv from "dotenv";
import { userRoute } from "./routes/userRoute";
import { authRoute } from "./routes/authRoute";

dotenv.config();

const app = express();
app.use(express.json());

app.use(userRoute);
app.use(authRoute);

export default app;