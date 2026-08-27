const express = require('express');
const router = express.Router();
const {
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
} = require('../controllers/student.controller');


router.get('/', getHomepage);
router.get('/signup', getSignupPage); //getsignuppage
router.get('/loginform', getLoginPage); //getloginpage
router.post('/poststudents', postStudent); //postsignupinfo 
router.post('/login', login); //postlogininfo
router.get('/getstudents', getStudents);
router.get('/getstudent/:id', getStudentById);
router.put('/updatestudent', updateStudent);
router.put('/updatestudent/:id', updateStudentById);
router.delete('/delete/:id', deleteStudentById);
router.delete('/delete', deleteStudent);

module.exports = router;