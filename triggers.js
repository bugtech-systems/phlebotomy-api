const cron = require('node-cron')
const axios = require('axios')


cron.schedule('* * * * *', async () => {
	try {
		// LIVE
		await axios.get(`http://localhost:5005/api/v1/samsara/driver/vehicle/assignments?filterBy=drivers`)
		await axios.get(`http://localhost:5005/api/v1/samsara/vehicle/stats`)
		
		console.log('triggered')
		// LOCAL
		// await axios.get(`http://localhost:5001/api/v1/samsara/driver/vehicle/assignments?filterBy=drivers`)
		// await axios.get(`http://localhost:5001/api/v1/samsara/vehicle/stats`)
	} catch (error) {
		console.log(error)
	}
})