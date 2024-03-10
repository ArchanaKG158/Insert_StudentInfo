const express = require("express");
const multer = require("multer");
const router = express.Router();
const {
  InsertStudent,
  getAllUsers,
  // adminUser,
  updateUser,
  deleteUser,
  viewSingleUser,
} = require("../controllers/student_controller");
const fetchTeacher = require("../Middleware/Teacher");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });
router.post(
  "/insertStudent",
  fetchTeacher,
  upload.single("fprofile"),
  InsertStudent
);
router.get("/getAllUsers", fetchTeacher, getAllUsers);
// router.get("/adminUser", adminUser);
router.put("/updateUser/:id", upload.single("fprofile"), updateUser);
router.delete("/deleteUser/:id", deleteUser);
router.get("/viewSingleUser/:id", fetchTeacher, viewSingleUser);
module.exports = router;
