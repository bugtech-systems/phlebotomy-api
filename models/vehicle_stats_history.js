const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VehicleStatsHistorySchema = new Schema({
	id: String,
	name: String,
	externalIds: {
		serial: String,
		vin: String
	},
	gpsOdometerMeters: {
		time: String,
		value: String
	},
	gps: {
		time: String,
		latitude: String,
		longitude: String,
		headingDegrees: String,
		speedMilesPerHour:String,
		reverseGeo: {
			formattedLocation: String
		},
		isEcuSpeed: {
			type: Boolean,
			default: false
		}
	}
}, {
	timestamps: true
});

const VehicleStatsHistory = mongoose.model('VehicleStatsHistory', VehicleStatsHistorySchema);
module.exports = VehicleStatsHistory;