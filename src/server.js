import express from "express";
import helmet from "helmet";
import cors from "cors";

import userRoutes from "./user.routes";
import mainRoutes from "./main.routes";
import rateLimit from "express-rate-limit";
import compression from "compression";

const app = express();
const PORT = process.env.PORT || 4000;

const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
});

app.use(cors());
app.use(compression());
// Apply the rate limiting middleware to all requests.
app.use(limiter);
app.use(express.json());
app.use(helmet());
app.use("/v1", mainRoutes);
app.use("/v1/user", userRoutes); //If there are any changes in future , we can add that in different routes and simply import them , Eg: app.use('/v2', v2routes);

app.listen(PORT, () => {
  console.log(`Server running at port http://localhost:${PORT}`);
});
