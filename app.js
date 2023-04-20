require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger/swagger.json');
const mongoose = require('mongoose');

const app = express();

// Middleware
app.use(cors({
  origin: "*"
}));

app.use(bodyParser.json());



//Initialize MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/phlebotomy-api', {
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



// Import route modules
const clientRoutes = require('./routes/client');
const patientRoutes = require('./routes/patient');
const sampleRoutes = require('./routes/sample');
const dispatchHistoryRoutes = require('./routes/dispatch_history');
const panelRoutes = require('./routes/panel');
const phlebotomistRoutes = require('./routes/phlebotomist');
const scheduleRoutes = require('./routes/schedule');
const siteRoutes = require('./routes/site');
const teamRoutes = require('./routes/team');
const requisitionRoutes = require('./routes/requisition');
const ridRoutes = require('./routes/rid');

//Swagger Docs
app.use('/api/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


// Use routes in the app
app.use('/api/clients', clientRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/requisitions', requisitionRoutes);
app.use('/api/samples', sampleRoutes);
app.use('/api/dispatchHistories', dispatchHistoryRoutes);
app.use('/api/panels', panelRoutes);
app.use('/api/phlebotomists', phlebotomistRoutes);
app.use('/api/schedules', scheduleRoutes);
app.use('/api/sites', siteRoutes);
app.use('/api/teams', teamRoutes);
app.use('/api/rid', ridRoutes);

// Start server
const PORT = process.env.PORT || 5005;
let server = app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

server.setTimeout(500000);