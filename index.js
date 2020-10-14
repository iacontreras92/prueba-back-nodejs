const express = require("express");
const bodyParser = require("body-parser");
const swaggerUi = require("swagger-ui-express");

const app = express();
const PORT = process.env.PORT || 8082;

swaggerDocument = require("./swagger.json");

app.use(bodyParser.json());
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.listen(PORT, () => {
  console.log(`Escuchando en puerto ${PORT}`);
});

app.use("/v1", require("./v1/routes"));
