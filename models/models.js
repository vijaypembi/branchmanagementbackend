const mongoose = require("mongoose");

const branchSchema = mongoose.Schema(
    {
        branchDetails: {
            branchCode: { type: String, required: true },
            branchName: { type: String, required: true },
            branchShortName: { type: String, required: true },
            doorNumber: { type: String },
            street: { type: String },
            pincode: { type: String, required: true },
            locality: { type: String, required: true },
            city: { type: String, required: true },
            state: { type: String, required: true },
            panNumber: { type: String },
            gstIn: { type: String },
            branchType: { type: String, required: true },
            vehicleType: { type: String, required: true },
        },
        branchContactDetails: {
            contactNumber: { type: String },
            alternateContactNumber: { type: String },
            whatsappNumber: { type: String },
            emailId: { type: String },
        },
        branchInchargeDetails: {
            branchInchargeName: { type: String },
            contactNumber: { type: String },
            alternateContactNumber: { type: String },
            whatsappNumber: { type: String },
            emailId: { type: String },
        },
        contactPersonDetails: {
            contactPersonName: { type: String },
            contactNumber: { type: String },
            alternateContactNumber: { type: String },
            whatsappNumber: { type: String },
            emailId: { type: String },
        },
        openingDetails: {
            balance: { type: Number, default: 0 },
            date: { type: Date },
        },
        advanceRequestDetails: {
            minimumAmount: { type: Number, default: 0 },
            maximumAmount: { type: Number, default: 0 },
            monthlyMaximumAmount: { type: Number, default: 0 },
            maximumUnsettledAmount: { type: Number, default: 0 },
            effectiveDate: { type: Date },
        },
        bankDetails: [
            {
                accountNumber: { type: String },
                accountHolderName: { type: String },
                ifscCode: { type: String },
                bankName: { type: String },
                branchName: { type: String },
            },
        ],
        status: { type: Boolean, required: true, default: true },
    },
    { timestamps: true }
);
const Branch = mongoose.model("Branch", branchSchema);

module.exports = Branch;
