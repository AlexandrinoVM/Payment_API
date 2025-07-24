import express  from "express";
import dotenv from "dotenv";
import { userRoute } from "./routes/userRoute";
import { authRoute } from "./routes/authRoute";
import { paymentRoute } from "./routes/paymentRoute";

dotenv.config();

const app = express();
app.use(express.json());

app.use(userRoute);
app.use(authRoute);
app.use(paymentRoute);
export default app;