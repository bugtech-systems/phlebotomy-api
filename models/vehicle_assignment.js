const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VehicleAssignmentSchema = new Schema({
	startTime: String,
	endTime: String,
	isPassenger: {
		type: Boolean,
		default: false
	},
	assignedAtTime: String,
	assignmentType: {
		type: String,
		enum: ['HOS', 'idCard', 'static', 'faceId', 'tachograph', 'safetyManual', 'RFID', 'trailer', 'external'],
	},
	driver: {
		id: String,
		name: String
	},
	vehicle: {
		id: String,
		name: String,
		externalIds: {
			serial: String,
			vin: String
		}
	}
}, {
	timestamps: true
});

const VehicleAssignment = mongoose.model('VehicleAssignment', VehicleAssignmentSchema);
module.exports = VehicleAssignment;