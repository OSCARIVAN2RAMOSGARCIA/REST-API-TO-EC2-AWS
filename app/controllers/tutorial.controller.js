const db = require('../models');
const Tutorial = db.tutorials;
const { Op } = require('sequelize');

// Crear y guardar un nuevo tutorial
exports.create = (req, res) => {
  if (!req.body.title) {
    return res.status(400).send({
      message: "El título no puede estar vacío."
    });
  }

  const tutorial = {
    title: req.body.title,
    description: req.body.description || null, // Si no se proporciona, se asigna null
    published: req.body.published ?? false // Valor por defecto si no se especifica
  };

  Tutorial.create(tutorial)
    .then(data => {
      res.status(201).send(data); // Respuesta con status 201 (Creado)
    })
    .catch(err => {
      console.error(err); // Agregar log para depuración
      res.status(500).send({
        message: err.message || "Ocurrió un error al crear el tutorial"
      });
    });
};

// Recuperar todos los tutoriales
exports.findAll = (req, res) => {
  const title = req.query.title;
  const condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Tutorial.findAll({ where: condition })
    .then(data => {
      res.status(200).send(data); // Respuesta con status 200 (OK)
    })
    .catch(err => {
      console.error(err); // Log para depuración
      res.status(500).send({
        message: err.message || 'Ocurrió un error al recuperar los tutoriales'
      });
    });
};

// Recuperar un solo tutorial por ID
exports.findOne = (req, res) => {
  const id = req.params.id;

  // Verificar si el ID es válido (número)
  if (isNaN(id)) {
    return res.status(400).send({
      message: "El ID proporcionado no es válido."
    });
  }

  Tutorial.findByPk(id)
    .then(data => {
      if (data) {
        res.status(200).send(data); // Si existe, devolverlo con status 200
      } else {
        res.status(404).send({
          message: `No se pudo encontrar el tutorial con id=${id}.`
        });
      }
    })
    .catch(err => {
      console.error(err); // Log para depuración
      res.status(500).send({
        message: `Error al recuperar el tutorial con id=${id}`
      });
    });
};

// Actualizar un tutorial por ID
exports.update = (req, res) => {
  const id = req.params.id;

  // Verificar si el ID es válido (número)
  if (isNaN(id)) {
    return res.status(400).send({
      message: "El ID proporcionado no es válido."
    });
  }

  Tutorial.update(req.body, {
    where: { id: id }
  })
    .then(([num]) => {
      if (num === 1) {
        res.status(200).send({
          message: "El tutorial se actualizó con éxito."
        });
      } else {
        res.status(404).send({
          message: `No se pudo actualizar el tutorial con id=${id}. Tal vez el tutorial no fue encontrado o el cuerpo de la solicitud está vacío.`
        });
      }
    })
    .catch(err => {
      console.error(err); // Log para depuración
      res.status(500).send({
        message: `Error al actualizar el tutorial con id=${id}`
      });
    });
};

// Eliminar un tutorial por ID
exports.delete = (req, res) => {
  const id = req.params.id;

  // Verificar si el ID es válido (número)
  if (isNaN(id)) {
    return res.status(400).send({
      message: "El ID proporcionado no es válido."
    });
  }

  Tutorial.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num === 1) {
        res.status(200).send({
          message: "El tutorial se eliminó con éxito."
        });
      } else {
        res.status(404).send({
          message: `No se pudo eliminar el tutorial con id=${id}. Tal vez el tutorial no fue encontrado.`
        });
      }
    })
    .catch(err => {
      console.error(err); // Log para depuración
      res.status(500).send({
        message: `No se pudo eliminar el tutorial con id=${id}`
      });
    });
};

// Eliminar todos los tutoriales
exports.deleteAll = (req, res) => {
  Tutorial.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.status(200).send({ message: `${nums} tutoriales fueron eliminados con éxito.` });
    })
    .catch(err => {
      console.error(err); // Log para depuración
      res.status(500).send({
        message: err.message || "Ocurrió un error al eliminar todos los tutoriales."
      });
    });
};

// Recuperar todos los tutoriales publicados
exports.findAllPublished = (req, res) => {
  Tutorial.findAll({ where: { published: true } })
    .then(data => {
      res.status(200).send(data); // Respuesta con status 200 (OK)
    })
    .catch(err => {
      console.error(err); // Log para depuración
      res.status(500).send({
        message: err.message || "Ocurrió un error al recuperar los tutoriales publicados."
      });
    });
};
