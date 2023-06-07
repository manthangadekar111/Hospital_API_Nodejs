const express = require('express');
const {registerDoctor, registerPatient, createReport, createAllReports, AllReports, login} = require('../controller/userControllers');
const passport = require('passport');
const router = express.Router();
   
router.post("/doctors/register" , registerDoctor);
router.post('/login' , login);
router.post("/patients/register", registerPatient);
router.post( "/patients/:id/create_report",
passport.authenticate("jwt", { session: false }),
createReport);
router.get("/patients/:id/create_allReports" ,createAllReports);
router.get("/allreport/:status" , AllReports);

module.exports = router;