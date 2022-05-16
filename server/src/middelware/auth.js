import jwt from "jsonwebtoken";

export const isAuthenticated = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  if (token) {
    try {
      const data = jwt.verify(token, process.env.SECRATEKEY);
      req.user = data;
      next();
    } catch (error) {
      return res.status(401).json({ error: "user not authenticated" });
    }
  } else {
    return res.status(401).json({ error: "user not authenticated" });
  }
};
