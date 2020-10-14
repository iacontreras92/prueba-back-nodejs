const router = require("express").Router();
const { body, validationResult, param } = require("express-validator");

let usuarios = [
  { id: 1, nombre: "Wako" },
  { id: 2, nombre: "Yako" },
  { id: 3, nombre: "Dot" },
];

router.get("/", (req, res) => {
  return res.send({
    usuarios: usuarios,
  });
});

router.get("/:id", [param("id").isInt()], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({ errors: errors.array() });
  }

  const id = parseInt(req.params.id);

  const user = usuarios.filter((user) => user.id === id);

  if (user.length === 0) {
    return res.status(404).send({
      msg: "User not found",
    });
  } else {
    return res.send({
      usuario: user,
    });
  }
});

router.post(
  "/",
  [body("nombre").isLength({ min: 1, max: 100 }), body("nombre").isAscii()],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }

    let nombre = req.body.nombre;
    let id = usuarios.length + 1;

    usuarios.push({
      id,
      nombre,
    });

    return res.status(201).send({
      id: id,
      msg: `Usuario '${nombre}' guardado con el id ${id}`,
    });
  }
);

module.exports = router;
