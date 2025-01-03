const Branch = require("../models/models.js");
const mongoose = require("mongoose");

// getBranches,
//     createBranch,
//     updateBranch,
//     deleteBranch,

// http://localhost:5000/api/branches
// http://localhost:5000/api/branches/:id
//http://localhost:5000/api/branches/searchBranch?branchName=chennai
const searchBranch = async (req, res) => {
    const { branchName } = req.query;

    if (!branchName) {
        return res.status(400).json({ error: "Query parameter is required" });
    }

    try {
        // Perform a case-insensitive search on the branchName or branchShortName fields
        const branches = await Branch.find({
            $or: [
                {
                    "branchDetails.branchName": {
                        $regex: branchName,
                        $options: "i",
                    },
                },
                {
                    "branchDetails.branchShortName": {
                        $regex: branchName,
                        $options: "i",
                    },
                },
            ],
        });

        // Return the search results
        if (branches.length === 0) {
            res.status(404).json({ message: "No branches found" });
        } else {
            res.status(200).json(branches);
        }
    } catch (error) {
        console.error("Error searching for branches:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const getBranches = async (req, res) => {
    try {
        const branches = await Branch.find();
        res.status(200).json({ branches });
    } catch (error) {
        console.error("Error getting Branch: ", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
const getBranchesById = async (req, res) => {
    const { id } = req.params;

    // Validate ID
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid or missing branch ID" });
    }

    try {
        const branches = await Branch.findById(id);
        res.status(200).json({ branches });
    } catch (error) {
        console.error("Error getting Branch: ", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
const createBranch = async (req, res) => {
    try {
        const {
            branchDetails,
            branchContactDetails,
            branchInchargeDetails,
            contactPersonDetails,
            openingDetails,
            advanceRequestDetails,
            bankDetails,
            status,
        } = req.body;

        const branch = await Branch.create({
            branchDetails,
            branchContactDetails,
            branchInchargeDetails,
            contactPersonDetails,
            openingDetails,
            advanceRequestDetails,
            bankDetails,
            status,
        });
        res.status(201).json({ branch });
    } catch (error) {
        console.error("Error posting Branch: ", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const updateBranch = async (req, res) => {
    const { id } = req.params;

    // Validate ID
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid or missing branch ID" });
    }

    // Validate Request Body
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({ error: "Request body cannot be empty" });
    }

    try {
        // Update branch by ID
        const updateBranchById = await Branch.findByIdAndUpdate(
            id,
            req.body,
            { new: true, runValidators: true } // Return updated document and enforce validation
        );

        if (!updateBranchById) {
            res.status(404).json({ error: "Branch not found" });
        } else {
            res.status(200).json({
                message: "Branch updated successfully",
                updatedBranch: updateBranchById,
            });
        }
    } catch (error) {
        console.error("Error updating Branch: ", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const deleteBranch = async (req, res) => {
    const { id } = req.params;

    // Validate ID
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid or missing branch ID" });
    }

    try {
        // Delete branch by ID
        const deleteBranchById = await Branch.findByIdAndDelete(id);

        if (!deleteBranchById) {
            res.status(404).json({ error: "Branch not found" });
        } else {
            res.status(200).json({
                message: "Branch deleted successfully",
            });
        }
    } catch (error) {
        console.error("Error deleting Branch: ", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = {
    searchBranch,
    getBranches,
    createBranch,
    updateBranch,
    deleteBranch,
    getBranchesById,
};
