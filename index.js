const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const router = require('./routes/student.route');
const dns = require('dns');


dns.setServers(['8.8.8.8', '8.8.4.4']);

const port = process.env.PORT;
const uri = process.env.MONGODB_URI;

app.set('view engine', 'ejs');


mongoose.connect(uri)
.then(() => {
    console.log('We are in power, DB is a go');
})
.catch((err) => {
    console.log('DB failed to connect', err);
})

app.use(express.json()); // middleware to parse JSON bodies
app.use(express.urlencoded({ extended: true })); // middleware to parse URL-encoded bodies

app.use('/user', router);

// app.get('/', )

// app.get('/signup', );

// app.post('/poststudent', )

// app.get('/getstudents', );

// app.get('/getstudent/:id', );

// app.put('/updatestudent',);
 
// app.put('/updatestudent/:id', );

// app.delete('/delete/:id', );

// app.delete('/delete',);

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
