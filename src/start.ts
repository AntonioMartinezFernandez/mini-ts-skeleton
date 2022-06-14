// Dependencies
import App from './app';
import validateEnv from './utils/validateEnv';

validateEnv();

// Clear console
console.clear();

// Init server
const app = new App();
app.connectToMongoDatabase();
app.loadMiddlewares();
app.loadRoutes();

app.listen();
