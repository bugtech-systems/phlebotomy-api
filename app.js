require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger/swagger.json');
const mongoose = require('mongoose');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

//Initialize MongoDB
mongoose.connect('mongodb://localhost/phlebotomy-api', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
  // Create and initialize the database here
})
.catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});

// Routes
const phlebotomistsRoutes = require('./routes/phlebotomist');
const phlebotomySchedulesRoutes = require('./routes/phlebotomySchedule');
const teamsRoutes = require('./routes/team');
const sitesRoutes = require('./routes/site');
const clientsRoutes = require('./routes/client');

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