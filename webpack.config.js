// webpack.config.js
import Dotenv from "dotenv-webpack";

module.exports = {
  plugins: [
    new Dotenv({
      path: "./some.other.env", // default is .env
    }),
  ],
};
