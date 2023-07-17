const jwt = require("jsonwebtoken");

exports.protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split("Bearer ")[1];
  } else {
    console.log("UNAUTH");
    return res.status(403).json({ text: "Unauthorized", type: "error" });
  }

  if (!token) {
    console.log("UNAUTH");

    return res.status(403).json({
      text: "No token provided!",
      type: "error",
    });
  }

  try {
    //const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(JSON.stringify({ message: "startDecodeToken", token: token }))

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        console.log('UNAUTHORIZED!')
        return res.status(401).json({ m: "Unauthorized", d: "error" });
      }

      if (decoded.user_id !== process.env.USER_ID)
        return res.status(401).json({ m: "Unauthorized", d: "error" });
      console.log('AUTHORIZED!')
      next();
    });
  } catch (error) {
    console.log(
      JSON.stringify({
        message: "invalidToken",
        errorMessage: error.message,
        errorTitle: error.name,
      })
    );
    console.log('UNAUTHORIZED!')
    return res.status(401).json({ m: "Session expired please relogin", d: error });
  }
};

exports.generateToken = async (req, res) => {
  if (!req.params.id || req.params.id !== process.env.USER_ID)
    return res.status(401).json({ m: "Unauthorized", d: "error" });

  let token = jwt.sign(
    { user_id: process.env.USER_ID },
    process.env.JWT_SECRET,
    {
      expiresIn: "30d",
    }
  );

  return res.status(200).json({ token });
};
