const express = require("express");

const {
    getBranches,
    createBranch,
    updateBranch,
    deleteBranch,
    searchBranch,
    getBranchesById,
} = require("../controllers/controllers.js");

const router = express.Router();
// http://localhost:5000/api/branches
// http://localhost:5000/api/branches/:id
//http://localhost:5000/api/branches/searchBranch?branchName=chennai

router.route("/searchbranch").get(searchBranch);
router.get("/searchbranch", searchBranch);
router.route("/").get(getBranches).post(createBranch);
router
    .route("/:id")
    .get(getBranchesById)
    .put(updateBranch)
    .delete(deleteBranch);

module.exports = router;
