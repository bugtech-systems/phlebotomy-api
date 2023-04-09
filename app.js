const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger/swagger.yaml');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
const phlebotomistsRoutes = require('./routes/phlebotomists');
const phlebotomySchedulesRoutes = require('./routes/phlebotomySchedules');
const teamsRoutes = require('./routes/teams');
const sitesRoutes = require('./routes/sites');
const clientsRoutes = require('./routes/clients');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/phlebotomists', phlebotomistsRoutes);
app.use('/phlebotomy-schedules', phlebotomySchedulesRoutes);
app.use('/teams', teamsRoutes);
app.use('/sites', sitesRoutes);
app.use('/clients', clientsRoutes);

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});