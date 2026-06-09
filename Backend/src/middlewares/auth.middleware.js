import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  try {
    // Read the token from the cookie
    const token = req.cookies.jwtToken;

    if (!token) {
      return res
        .status(401)
        .json({ error: "Access denied. No token provided." });
    }

    // Verify the token using the secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the decoded payload (e.g., userId) to the request object
    req.user = decoded;

    next();
  } catch (error) {
    return res.status(403).json({ error: "Invalid or expired token." });
  }
};

export const authorizeRole = (req, res, next) => {};
