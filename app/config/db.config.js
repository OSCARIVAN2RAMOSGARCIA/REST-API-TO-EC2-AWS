module.exports = {
    HOST: "myrdsdatabase.cvc2somm4wrk.us-east-2.rds.amazonaws.com",
    USER: process.env.DB_USER || 'postgres', // Usamos una variable de entorno
    PASSWORD: process.env.DB_PASSWORD || 'ramos4321', // Usamos una variable de entorno
    DB: "myrdsdatabase",
    dialect: 'postgres',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 1000
    }
};
