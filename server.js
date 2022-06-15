const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const middlewares = require("./middlewares");
const bcrypt = require("bcryptjs");


// const swaggerJsDoc = require("swagger-jsdoc");
// const swaggerUi = require("swagger-ui-express");

// const swaggerOptions = {
//   swaggerDefinition: {
//     openapi: "3.0.0",
//     info: {
//       title: "DEAL API",
//       description: "Deal API Information",
//       contact: {
//         name: "Nejla Zenuni :)",
//       },
//       servers: [
//         {
//           url: "http://localhost:3001",
//         },
//       ],
//     },
//   },
//   apis: ["./backend/routes/*.js"],
// };

// const swaggerDocs = swaggerJsDoc(swaggerOptions);

// const app = express();

// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use(cors());
app.use(express.json());
app.use(middlewares.allowCrossDomain);

//Connect to the MongoDB database; then start the server
mongoose
  .connect(
    "mongodb+srv://lorenzo-admin:1234@cluster0.kmbw2.mongodb.net/sebaDB",
    {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useFindAndModify: false,
    }
  )
  .catch((err) => {
    console.log("Error connecting to the database", err.message);
    process.exit(err.statusCode);
  });

app.use("/", require("./backend/routes/posts"));
app.use("/auth", require("./backend/routes/auth"));

//app.use("/users/", require("./backend/routes/users"));

app.listen(3001, function () {
  console.log("Express server is running on port 3001");
});
