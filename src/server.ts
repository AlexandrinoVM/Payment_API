import { sequelize } from "./config/database";
import app from "./app";


const port = process.env.PORT || 3000;

app.listen(port,() => {
  console.log(`✅ Server running on port ${port}`);
})

async function initializeDatabase() {
    try {
        await sequelize.authenticate();
        sequelize.sync({ alter: true }) 
            .then(() => {
                console.log('tables synchronized.');
            })
            .catch((error) => {
                console.error('Error trying to synchronize tables:', error);
            });
        console.log('✅ Database connection established successfully.');
    } catch (error) {
        console.error('❌ Unable to connect to the database:', error);
    }
}

initializeDatabase();
