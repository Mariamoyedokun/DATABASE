const studentModel = require("../models/student.model");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const transporter = require("../services/nodemailer.service");
const getHomepage = (req, res) => {
    res.send('Hello World');
}

const getSignupPage = (req, res) => {
    res.render('signup');
}

const getLoginPage = (req, res) => {
    res.render('login');
}

const login = async (req, res) => {
    try {
        console.log(req.body);
        const userData = await studentModel.findOne({ email: req.body.email });
        if(!userData){
          res.json({message: "user not found", status: false})
        } else{
            const verify = await bcrypt.compare(req.body.password, userData.password);
            if(verify){
                const token = jwt.sign(userData, process.env.JWT_SECRET, {expiresIn: '1min'});
                res.json({message: "login successful", token})
            } else{
                 res.json({message: "invalid credentials", status: false})
            }
        }
    }catch (err) {
        console.log(err);
    }
}

const postStudent = async (req, res) => {
    // const { firstName, lastName, email, password } = req.body;
    // const payload = { firstName, lastName, email, password };
    console.log(req.body);
    // res.send(payload);
    // res.status(201).json({status: true, message: req.body})
    // res.send({status:201, message: payload})

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        req.body.password = hashedPassword;

        const newStudent = new studentModel(req.body);

        const savedStudent = await newStudent.save();

        if (savedStudent) {
            const info = await transporter.sendMail({
                from: `My School ${process.env.SMTP_USER}`, // sender address
                to: req.body.email, // list of recipients
                subject: "Welcome Onboard", // subject line
                // text: "Hello world?", // plain text body
                html: `<b>Hello ${req.body.firstName}</b>`, // HTML body
            });

            console.log("Message sent: %s", info.messageId);
        }
        console.log('Student saved successfully:', savedStudent);
        res.status(201).json({ status: true, message: 'Student saved successfully', data: savedStudent });
    }
    catch (err) {
        console.log('Error saving student:', err);
        res.status(400).json({ status: false, message: 'Error saving student', error: err });
    }
}

const getStudents = async (req, res) => {
    try {
        // console.log('Fetching all students');
        const allStudents = await studentModel.find();
        console.log('Students fetched successfully:', allStudents);
        res.status(200).json({ status: true, message: 'Students fetched successfully', data: allStudents });
    }
    catch (err) {
        console.log('Error fetching students:', err);
        res.status(400).json({ status: false, message: 'Error fetching students', error: err });
    }
}

const getStudentById = async (req, res) => {
    try {
        const student = await studentModel.findById(req.params.id);
        console.log('Student fetched successfully:', student);

        if (!student) {
            return res.status(400).json({ status: false, message: 'Student not found' });
        }

        res.status(200).json({ status: true, message: 'Student fetched successfully', data: student });
    }
    catch (err) {
        console.log('Error fetching student:', err);
        res.status(400).json({ status: false, message: 'Error fetching student', error: err });
    }
}

const updateStudent = async (req, res) => {
    try {
        const updatedData = await studentModel.findOneAndUpdate(
            {
                email: req.body.email
            },
            req.body
        );

        console.log('Data updated successfully:', updatedData);
        res.status(200).json({ status: true, message: 'Data updated successfully', updatedData })
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ status: false, message: 'Error updating data', error: err });
    }
}

const updateStudentById = async (req, res) => {
    try {
        const updatedStudent = await studentModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        console.log('Data updated successfully:', updatedData);
        res.status(200).json({ status: true, message: 'Data updated successfully', updatedStudent })
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ status: false, message: 'Error updating data', error: err });
    }
}

const deleteStudentById = async (req, res) => {
    try {
        const updatedStudent = await studentModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        console.log('Data updated successfully:', updatedData);
        res.status(200).json({ status: true, message: 'Data updated successfully', updatedStudent })
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ status: false, message: 'Error updating data', error: err });
    }
}

const deleteStudent = async (req, res) => {
    try {
        const deletedStudent = await studentModel.findOneAndDelete(
            {
                email: "Ajagbemi@gmail.com"
            }
        );

        console.log('Data deleted successfully:', updatedData);
        res.status(200).json({ status: true, message: 'Data deleted successfully', updatedData })
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ status: false, message: 'Error deleting data', error: err });
    }
}

module.exports = {
    getHomepage,
    getLoginPage,
    getSignupPage,
    postStudent,
    login,
    getStudents,
    getStudentById,
    updateStudent,
    updateStudentById,
    deleteStudentById,
    deleteStudent
}