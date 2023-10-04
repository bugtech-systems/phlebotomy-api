const cron = require('node-cron')
const axios = require('axios')


cron.schedule('* * * * *', async () => {
	try {
		await axios.get(`http://localhost:5005/api/v1/samsara/driver/vehicle/assignments?filterBy=drivers`)
		await axios.get(`http://localhost:5005/api/v1/samsara/vehicle/stats`)
	} catch (error) {
		console.log(error)
	}
})