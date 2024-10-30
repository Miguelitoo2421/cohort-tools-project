const router = require("express").Router();
const User = require("../models/User.model.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const verifyToken = require("../middlewares/auth.middlewares");

//Post "/api/auth/signup"
router.post("/signup", async (req, res, next) => {
  const { email, password, name } = req.body;

  if (!email || !password || !name) {
    res.status(400).json({ message: "Todos los campos son requeridos" });
    return;
  }
  const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,16}$/gm;
  if (regexPassword.test(password) === false) {
    res.status(400).json({
      message:
        "La contraseña debe tener al menos una minuscula, una mayuscula, un numero y entre 8 y 16 caracteres ",
    });
    return;
  }
  try {
    const foundUser = await User.findOne({ email: email });
    if (foundUser) {
      res.status(400).json({
        message: "Usuario ya registrado con ese email",
      });
      return;
    }
    const salt = await bcrypt.genSalt(12);
    const cypherPassword = await bcrypt.hash(password, salt);
    await User.create({
      email,
      password: cypherPassword,
      name,
    });
    res.sendStatus(201);
  } catch (error) {
    next(error);
  }

});
//POST "/api/auth/login"
router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ message: "Todos los campos son requeridos" });
    return;
  }
  try {
    const foundUser = await User.findOne({ email: email });

    if (!foundUser) {
      res.status(400).json({ message: "Usuario no encontrado" });
      return;
    }
    const isPasswordCorrect = await bcrypt.compare(
      password,
      foundUser.password
    );
    if (!isPasswordCorrect) {
      res.status(400).json({ message: "Contraseña incorrecta" });
      return;
    }
    const payload = {
      _id: foundUser._id,
      email: foundUser.email,
    };

    const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
      algorithm: "HS256",
      expiresIn: "7d",
    });
    res.status(200).json({ authToken: authToken });
  } catch (error) {
    next(error);
  }
});

router.get("/verify", verifyToken, (req, res) => {
  console.log(req.payload);

  res.status(200).json(req.payload);
});

module.exports = router;
