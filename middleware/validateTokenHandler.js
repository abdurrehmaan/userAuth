const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async (req, res, next) => {
  let token;
  let authHeader = req.headers.Authorization || req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];

    if (token === null || token === "") {
      res.status(400);
      throw new Error("User is not authorized or token is missing");
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_KEY);
      req.user = decoded.user;
      next();
    } catch (err) {
      res.status(401);
      throw new Error(`User is not authorized: ${err.message}`);
    }

    if (!token) {
      res.status(400);
      throw new Error("User is not authorized or token is missing");
    }
  }
});

module.exports = validateToken;
