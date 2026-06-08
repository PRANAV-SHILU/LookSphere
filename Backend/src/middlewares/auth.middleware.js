import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  next();
};

export default auth;
