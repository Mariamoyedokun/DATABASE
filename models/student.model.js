const mongoose = require('mongoose');

const studentSchema = mongoose.Schema({
    firstName: {type: String, required: true,minlength: 3, maxlength: 20},
    lastName: {type: String, required: true, minlength: 3, maxlength: 20},
    email: {type: String, required: true, unique: true},
    studentId: {type: String, required: true, unique: true},
    activeStatus: {type: Boolean, required: true, default: false},
    password: {type: String, required: true}
});

const studentModel = mongoose.model('students', studentSchema);
module.exports = studentModel;