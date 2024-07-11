const express = require("express");
const tagRoutes = require("./router/tag.route");

const app = express();

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/tags", tagRoutes);

app.listen(3001, () => {
  console.log("Running on port 3001");
});
