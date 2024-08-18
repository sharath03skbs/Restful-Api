import express from "express";
import helmet from "helmet";

import userRoutes from "./user.routes";
import mainRoutes from "./main.routes";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(helmet());
app.use("/v1", mainRoutes);
app.use("/v1/user", userRoutes); //If there are any changes in future , we can add that in different routes and simply import them , Eg: app.use('/v2', v2routes);

app.listen(PORT, () => {
  console.log(`Server running at port http://localhost:${PORT}`);
});
