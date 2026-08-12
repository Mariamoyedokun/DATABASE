const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const dns = require('dns');
const studentModel = require('./models/student.model');

dns.setServers(['8.8.8.8', '8.8.4.4']);

const port = process.env.PORT;
const uri = process.env.MONGODB_URI;


mongoose.connect(uri)
    .then(() => {
        console.log('We are in power, DB is a go');
    })
    .catch((err) => {
        console.log('DB failed to connect', err);
    })

app.use(express.json()); // middleware to parse JSON bodies


app.get('/', (req, res) => {
    res.send('Hello World');
})


app.post('/poststudent', async (req, res) => {
    // const { firstName, lastName, email, password } = req.body;
    // const payload = { firstName, lastName, email, password };
    console.log(req.body);
    // res.send(payload);
    // res.status(201).json({status: true, message: req.body})
    // res.send({status:201, message: payload})

    try {
        const newStudent = new studentModel(req.body);

        const savedStudent = await newStudent.save();
        console.log('Student saved successfully:', savedStudent);
        res.status(201).json({ status: true, message: 'Student saved successfully', data: savedStudent });
    }
    catch (err) {
        console.log('Error saving student:', err);
        res.status(400).json({ status: false, message: 'Error saving student', error: err });
    }
})

app.get('/getstudents', async (req, res) => {
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
});

app.get('/getstudent/:id', async (req, res) => {
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
});

app.put('/updatestudent', async (req, res) => {
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
});

app.delete('/delete/:id', async (req, res) => {
    try {
        const deletedData = await studentModel.findByIdAndDelete(req.params.id)
        console.log('Data deleted successfully:', deletedData);
         res.status(200).json({ status: true, message: 'Data deleted successfully', deletedData })
    }
    catch (err) {
        console.log(err);
         res.status(400).json({ status: false, message: 'Error deleting data', error: err });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// const obj = {
//     named: 'Kakuri',
//     aged: 876,
//     statused: true
// }

// const {aged, named, statused} = obj;
// const details = {aged,named,statused}
// console.log(details);
