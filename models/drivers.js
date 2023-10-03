const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DriverSchema = new Schema({
    id: {
        type: Number,
    },
    name: {
        type: String,
    },
    username: {
        type: String,
    },
    eldSettings: {
        rulesets: [
            {
                cycle: String,
                shift: String,
                restart: String,
                break: String
            }
        ]
    },
    timezone: String,
    updatedAtTime: Date,
    createdAtTime: Date,
    carrierSettings: {
        carrierName: String,
        mainOfficeAddress: String,
        dotNumber: {
            type: Number,
            default: 0
        },
        homeTerminalName: String,
        homeTerminalAddress: String,

    },
    driverActivationStatus: String,
    isDeactivated: {
        type: Boolean,
        default: false
    },
    usDriverRulesetOverride: {
        usStateToOverride: String,
        cycle: String,
        restart: String,
        restbreak: String
    }
    // requisition: [{ type: Schema.Types.ObjectId, ref: 'Requisition' }]
}, {
    timestamps: true
});

const Driver = mongoose.model('Driver', DriverSchema);

module.exports = Driver;