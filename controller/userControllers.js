// module.exports.test = (req , res, next)=>{
//     res.send("<h1>Hello World!!</h1>");
// };

const Doctor = require('../models/doctors');
const Patient = require('../models/patients');
const jwt = require('jsonwebtoken');

module.exports.registerDoctor = async (req, res, next) => {
    try {
        const doctor = await Doctor.create(req.body);

        res.status(200).json({
            success: true,
            message: "doctor created successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "could not create a doctor, internal server error",
        });
    }
};

module.exports.login = async  (req  , res, next)=>{
    try{
        const user = Doctor.find(req.body);
if(user){
    const token  = jwt.sign(user.id , "secret");
    res.status(200).json({
        success  : true,
        token,
    })
}else{
    res.status(404)({
        success : false,
        message : "name or password do not match"

    })
}

    }catch(error){
        res.status(500).json({
            success: false,
            message: "Wrong Password",
        });
    }
}






module.exports.registerPatient = async (req, res, next) => {
    try {
        req.body.doctor = "648076603e77b0e7b6ac3541";
        const patient = await Patient.create(req.body);

        res.status(200).json({
            success: true,
            message: "successfully created patients",
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "could not create a Patient, internal server error",
        });
    }
};


module.exports.createReport = async (req, res, next) => {
    try {
        const patient = await Patient.findById(req.params.id);

        req.body.date = Date.now();

        patient.reports.push(req.body);

        patient.save();

        res.status(200).json({
            success: true,
            message: "report submitted succesfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "could not created a  report, internal server error",
        });
    }
};


module.exports.createAllReports = async (req, res, next) => {
    try {

        const patient = await Patient.findById(req.params.id);

        res.status(200).json({
            success: true,
            reports: patient.reports,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "could not created a  All report, internal server error",
        });
    }
}
module.exports.AllReports = async (req, res, next) => {
    try {
        const patient = await Patient.find({
            reports: { $elemMatch: { status: req.params.status } },
        });

        res.status(200).json({
            success: true,
            data: patient,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "could not able to fetch the reports",
        });
    }
};
