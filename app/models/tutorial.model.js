module.exports = (sequelize, Sequelize) => {
    const Tutorial = sequelize.define('tutorial', {
        title: {
            type: Sequelize.STRING(255), // Definido como 255 para claridad y consistencia
            allowNull: false, // Aseguramos que el título no sea nulo
            validate: {
                notEmpty: true,  // Validación: el título no puede estar vacío
                len: [1, 255]    // Longitud opcional: entre 1 y 255 caracteres
            }
        },
        description: {
            type: Sequelize.TEXT, // Usamos TEXT si la descripción puede ser más larga
            allowNull: true, // La descripción puede ser nula
            validate: {
                len: [0, 500] // Longitud máxima: 500 caracteres
            }
        },
        published: {
            type: Sequelize.BOOLEAN,
            allowNull: false, // Aseguramos que "published" no sea nulo
            defaultValue: false // Valor por defecto
        }
    }, {
        timestamps: true, // Añade createdAt y updatedAt automáticamente
        underscored: true, // Convierte los nombres de columnas a snake_case (ej. created_at)
        paranoid: true,    // Habilita eliminación lógica (marcando deletedAt)
        indexes: [
            { fields: ['title'] }, // Index para el campo title (útil para búsquedas)
            { fields: ['published'] } // Index para el campo published
        ]
    });

    return Tutorial;
};
