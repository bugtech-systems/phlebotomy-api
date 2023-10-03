const moment = require("moment/moment");
const Driver = require("../models/drivers");
const axios = require('axios');
const VehicleAssignment = require("../models/vehicle_assignment");
const VehicleStatsHistory = require("../models/vehicle_stats_history");

/* 01 */
// @Driver: Create driver
// Method: POST
// params: /driver
exports.createDriver = async (req, res) => {
	let {
		username,
		name,
		password,
		phone,
	} = req.body

	if (!username || !name || !password) {
		return res.json({
			code: 400,
			message: "Field is required"
		})
	}

	const options = {
		method: 'POST',
		url: `${process.env.SAMSARA_URL}/fleet/drivers`,
		headers: {
			accept: 'application/json',
			'content-type': 'application/json',
			authorization: `Bearer ${process.env.SAMSARA_TOKEN}`
		},
		data: {
			name,
			username,
			password
		}
	};

	try {
		const response = await axios.request(options)
		console.log(response, "RESPONSE!")
		if (response) {
			const newDriver = await Driver.create(response.data.data)
			return res.status(201).json({
				code: 201,
				message: "Successfully Created Driver.",
				data: newDriver
			})
		}
	} catch (error) {
		console.error(error, "ERROR RESPONSE");
		return res.status(400).json({
			code: 400,
			message: error
		})
	}
};

// @Driver: Get drivers
// Method: GET
// params: /drivers
exports.getDrivers = async (req, res) => {
	let {
		driverActivationStatus,
		parentTagIds,
		limit,
		after,
		tagIds,
		attributeValueIds,
		updatedAfterTime,
		createdAfterTime
	} = req.query;

	let drivers = await Driver.find(req.query)

	console.log(drivers)

	return res.status(200).json({
		code: 200,
		message: "Drivers List.",
		data: drivers
	})
}

// @Driver: Get driver
// Method: GET
// params: /driver/:id
exports.getDriver = async (req, res) => {
	try {
		let { id } = req.params;
		let driver;

		if (id.length == 24) {
			driver = await Driver.findById(id)
		} else {
			// driver = await Driver.findOne({ id: id})

			const options = {
				method: 'GET',
				url: `${process.env.SAMSARA_URL}/fleet/drivers/${id}`,
				headers: {
					accept: 'application/json',
					authorization: `Bearer ${process.env.SAMSARA_TOKEN}`
				}
			};
			const response = await axios.request(options)
			if (response) {
				return res.status(200).json({
					code: 200,
					message: "Success",
					data: response.data.data
				})
			}
		}

		return res.status(200).json({
			code: 200,
			message: "Success",
			data: driver
		})
	} catch (error) {
		console.log(error)
		return res.status(400).json({
			code: 400,
			message: error.message
		})
	}
}

// @Driver: Update driver
// Method: PATCH
// params: /driver/:id
exports.updateDriver = async (req, res) => {




	return res.status(200).json({
		code: 201,
		message: "Success",
		data: {}
	})
}

/* 02 */
// @Driver-Vehicle Assignments: Create Driver-Vehicle Assignment
// Method: POST
// params: /driver/vehicle-assignments
exports.createDriverVehicleAssignment = async (req, res) => {
	let {
		endTime,
		startTime,
		driverId,
		vehicleId,
	} = req.body

	if (!driverId || !vehicleId) {
		return res.status(400).json({
			message: "driverId and vehicleId is required."
		})
	}

	const options = {
		method: 'POST',
		url: `${process.env.SAMSARA_URL}/fleet/driver-vehicle-assignments`,
		headers: {
			accept: 'application/json',
			'content-type': 'application/json',
			authorization: `Bearer ${process.env.SAMSARA_TOKEN}`
		},
		data: {
			assignedAtTime: moment.utc().format(),
			endTime: moment.utc(endTime).format(),
			driverId,
			vehicleId,
			startTime: moment.utc(startTime).format(),
		}
	}

	console.log(options, "WEW DATA BA?")

	try {
		const vehicleAssignment = await axios.request(options)
		if (vehicleAssignment) {
			let { data } = vehicleAssignment.data;
			console.log(data, "DATA NI VEHICLE DESTRUCTURED")

			// const createVehicleAssignment = await VehicleAssignment.create({
			// 	startTime: moment.utc(startTime).format(),
			// 	endTime: moment.utc(endTime).format(),
			// 	assignedAtTime: moment.utc().format(),
			// 	driver: {

			// 	}
			// 	vehicleId,
			// })

		}

	} catch (error) {
		console.log(error, "ERROR IN TRY CATCH")
		return res.status(400).json({
			code: 400,
			message: error.message
		})
	}
}

// @Driver-Vehicle Assignments: Update Driver-Vehicle Assignment
// Method: PATCH
// params: /driver/:id/vehicle-assignments
exports.updateDriverVehicleAssignment = async (req, res) => {
	let { id } = req.params
	let { vehicleId, startTime } = req.body;

	try {
		const options = {
			method: 'PATCH',
			url: `${process.env.SAMSARA_URL}/fleet/driver-vehicle-assignments`,
			headers: {
				accept: 'application/json',
				'content-type': 'application/json',
				authorization: `Bearer ${process.env.SAMSARA_TOKEN}`
			},
			data: {
				driverId: id,
				startTime,
				vehicleId
			}
		};

		const response = await axios.request(options)
		console.log(response.data, "RESPONSE HERE!")
		if (response) {

			return res.status(201).json({
				code: 201,
				message: 'Success',
				data: response.data.data
			})
		}

	} catch (error) {
		console.log(error.message)
		return res.json({
			code: 404,
			message: error.message
		})
	}
}

// @Driver-Vehicle Assignments: Get Driver-Vehicle Assignment
// Method: GET
// params: /driver/vehicle-assignments
exports.getDriverVehicleAssignments = async (req, res) => {
	let { filterBy, driverIds, startTime, endTime, driverTagIds, vehicleTagIds, after, assignmentType } = req.query;

	console.log(req.query, "QUERY PARAMS")
	const queryString = Object.entries(req.query)
		.map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
		.join('&');
	let array = []

	try {

		const options = {
			method: 'GET',
			url: `${process.env.SAMSARA_URL}/fleet/driver-vehicle-assignments?${queryString}`,
			headers: {
				accept: 'application/json',
				authorization: `Bearer ${process.env.SAMSARA_TOKEN}`
			}
		};

		console.log(options, "OPTIONS")

		const response = await axios.request(options)
		if (response) {
			array = response.data.data;
			console.log(response.data.data, "SUCCESS RESPONSE")

			let responseArray = await Promise.all(array.map(async (data) => {
				let newObject = {
					startTime: data.startTime,
					endTime: data.endTime,
					assignedAtTime: data.assignedAtTime,
					assignmentType: data.assignmentType,
					driver: {
						id: data.driver.id,
						name: data.driver.name
					},
					vehicle: {
						id: data.vehicle.id,
						name: data.vehicle.name,
						serial: data.vehicle.externalIds['samsara.serial'],
						vin: data.vehicle.externalIds['samsara.vin'],
					}
				}
				console.log(data, "DATA INE!")
				const newAssignment = await VehicleAssignment.create(newObject)

				return newAssignment;
			}))
			return res.json(responseArray)
		}

	} catch (error) {
		console.log(error.message)
		return res.json({
			code: 404,
			message: error.message
		})
	}
}

// @Driver-Vehicle Assignments: Delete Driver-Vehicle Assignment
// Method: DELETE
// params: /driver/vehicle-assignments
exports.deleteDriverVehicleAssignment = async (req, res) => {
	let {
		assignedAtTime,
		endTime,
		isPassenger,
		startTime,
		vehicleId
	} = req.body;


	try {
		const options = {
			method: 'DELETE',
			url: `${process.env.SAMSARA_URL}/fleet/driver - vehicle - assignments`,
			headers: {
				accept: 'application/json',
				'content-type': 'application/json',
				authorization: `Bearer ${process.env.SAMSARA_TOKEN} `
			},
			data: {
				assignedAtTime,
				endTime,
				isPassenger,
				startTime,
				vehicleId
			}
		}

		const response = await axios.request(options)
		if (response) {
			console.log(response)
			return res.json({
				code: 204,
				message: 'Successfully Deleted'
			})
		}


	} catch (error) {
		console.log(error, "ERROR RESPONSE")
		return res.status(404).json({
			code: 404,
			message: error.message
		})
	}
}

/* 03 */
// @Vehicle Stats: Get Stats snapshots
// Method: GET
// params: /vehicles/stats
exports.snapStats = async (req, res) => {
	let array = [];

	try {
		const statsOption = {
			method: 'GET',
			url: `${process.env.SAMSARA_URL}/fleet/vehicles/stats?types=gpsOdometerMeters,gps`,
			headers: {
				accept: 'application/json',
				authorization: `Bearer ${process.env.SAMSARA_TOKEN}`
			}
		};

		const statsHistory = await axios.request(statsOption)
		if (statsHistory) {
			array = statsHistory.data.data;

			let arrayResponse = await Promise.all(array.map(async (data) => {

				console.log(data.externalIds, "HERE DATA")

				let newObj = {
					id: data.id,
					name: data.name,
					externalIds: {
						serial: data.externalIds?.['samsara.serial'],
						vin: data.externalIds?.['samsara.vin']
					},
					gpsOdometerMeters: {
						time: data.gpsOdometerMeters?.time,
						value: data.gpsOdometerMeters?.value
					},
					gps: {
						time: data.gps?.time,
						latitude: data.gps?.latitude,
						longitude: data.gps?.longitude,
						headingDegrees: data.gps?.headingDegrees,
						speedMilesPerHour: data.gps?.speedMilesPerHour,
						reverseGeo: {
							formattedLocation: data.gps?.reverseGeo?.formattedLocation
						},
						isEcuSpeed: data.gps?.isEcuSpeed
					}
				}

				const newVehicleStatsHistory = await VehicleStatsHistory.create(newObj)
				return newVehicleStatsHistory;
			}))
			return res.json(arrayResponse)
		} else {
			return res.json(400).json({
				code: 400,
				message: `Someting wen't wrong!`
			})
		}
	} catch (error) {
		console.log(error)
	}
}

// @Vehicle Stats: Get Stats feed
// Method: GET
// params: /vehicles/stats/feed
exports.feedStats = async (req, res) => {
	// Search for vehicle using samsara.vin or samsara.serial
	let { vin, serial } = req.query;
	let vehicleIds;
	console.log("vin", vin, "serial", serial)
	if (!vin && !serial) {
		return res.status(401).json({
			message: "samsara.vin or samsara.serial is required"
		})
	}

	let query = vin ? `samsara.vin:${vin}` : `samsara.serial:${serial}`

	const driverOption = {
		method: 'GET',
		url: `${process.env.SAMSARA_URL}/fleet/vehicles/${query}`,
		headers: {
			accept: 'application/json',
			authorization: `Bearer ${process.env.SAMSARA_TOKEN}`
		}
	};

	const driverResponse = await axios.request(driverOption)
		.then((response) => {
			let { data } = response.data
			vehicleIds = data.id
		}).catch((error) => {
			console.log(error.response.data, "ERROR")
			return res.status(400).json(error.response.data)
		})

	try {
		const options = {
			method: 'GET',
			url: `${process.env.SAMSARA_URL}/fleet/vehicles/stats?vehicleIds=${vehicleIds}&types=gpsOdometerMeters,gps`,
			headers: {
				accept: 'application/json',
				authorization: `Bearer ${process.env.SAMSARA_TOKEN}`
			}
		};

		const response = await axios.request(options)
		// console.log(response.data.data)

		return res.status(200).json({
			code: 200,
			message: "Success",
			data: response.data.data
		})
	} catch (error) {
		console.log(error)
	}
}

// @Vehicle Stats: Get Historical stats
// Method: GET
// params: /vehicles/stats/history
exports.historicalStats = async (req, res) => {

	return res.status(200).json({
		code: 200,
		message: "Success",
		data: {}
	})
}