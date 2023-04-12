const mongoose = require("mongoose");

const app = require("./app");

const { MONGO_CONNECTION_URL, PORT = 3000 } = process.env;
mongoose.set('strictQuery', false);
mongoose
  .connect(MONGO_CONNECTION_URL)
  .then(() => {
    app.listen(PORT);
    console.log(`Database connection successful, ${PORT}`);
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
