const cron = require('node-cron')
const axios = require('axios')


cron.schedule('* * * * *', async () => {
	await axios.get('http://localhost:5001/api/v1/samsara/driver/vehicle/assignments?filterBy=drivers')
	await axios.get('http://localhost:5001/api/v1/samsara/vehicle/stats')
	
})