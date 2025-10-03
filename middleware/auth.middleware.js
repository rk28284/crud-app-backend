const jwt = require("jsonwebtoken");
require("dotenv").config();
const authmiddleware = (req, res, next) => {
  const Authorization = req.headers.authorization;
  const token = req.headers.authorization?.split(" ")[1];

  if (!Authorization)
    return res
      .status(400)
      .send({ msg: "Something went wrong,TRY AGAIN" });
  if (!token) return res.status(400).send({ msg: "Unauthorized User CHECK" });
  else
    try {
      const decoded = jwt.verify(token, process.env.key);
      req.jwtPayload = decoded;

      next();
    } catch (error) {
      console.log(error);
      res.status(400).send({ msg: "Something went wrong,TRY AGAIN" });
    }
};
module.exports = authmiddleware;
