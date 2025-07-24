import { sequelize } from "./config/database";
import app from "./app";
import seedPaymentStatuses from "./utils/PaymentStatusSeeds";
import seedProducts from "./utils/productsServiceSeeds";

const port = process.env.PORT || 3000;

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

        seedPaymentStatuses();
        seedProducts();
    } catch (error) {
        console.error('❌ Unable to connect to the database:', error);
    }
}

initializeDatabase().then(() => {
  app.listen(port, () => {
    console.log(`✅ Server running on port ${port}`);
  });
});
