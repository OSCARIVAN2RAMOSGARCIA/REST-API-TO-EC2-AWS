module.exports = app => {
    const tutorials = require("../controllers/tutorial.controller.js");
    const express = require("express");
    const router = express.Router();

    // Middleware para validar el formato del ID
    const validateId = (req, res, next) => {
        const id = req.params.id;
        if (isNaN(id)) {
            return res.status(400).send({
                message: "Formato de ID no válido. El ID debe ser un número."
            });
        }
        next(); // ID es válido, continúa al siguiente middleware/controlador
    };

    // Middleware para validar los campos requeridos en la creación o actualización
    const validateTutorialFields = (req, res, next) => {
        if (!req.body.title || typeof req.body.title !== 'string') {
            return res.status(400).send({
                message: "El título es obligatorio y debe ser un texto válido."
            });
        }
        if (req.body.description && typeof req.body.description !== 'string') {
            return res.status(400).send({
                message: "La descripción debe ser un texto válido, si se proporciona."
            });
        }
        next(); // Continúa si las validaciones pasan
    };

    // Crear un nuevo Tutorial
    router.post("/", validateTutorialFields, tutorials.create);

    // Recuperar todos los Tutoriales
    router.get("/", tutorials.findAll);

    // Recuperar todos los Tutoriales publicados
    router.get("/published", tutorials.findAllPublished);

    // Recuperar un único Tutorial por ID
    router.get("/:id", validateId, tutorials.findOne);

    // Actualizar un tutorial por ID
    router.put("/:id", validateId, validateTutorialFields, tutorials.update);

    // Eliminar un tutorial por ID
    router.delete("/:id", validateId, tutorials.delete);

    // Eliminar todos los tutoriales
    router.delete("/all", tutorials.deleteAll);

    // Usar la ruta base /api/tutorials para todas las rutas anteriores
    app.use('/api/tutorials', router);
};
