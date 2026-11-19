const express = require('express')
const dotenv = require('dotenv')

dotenv.config();

const mongoDB = require('./config/db')

const cors = require('cors')

const app = express() // server calling

const PORT = process.env.PORT ||  3000

const adminApi = require('./routes/adminRoute')

const collegeApi = require('./routes/collegeRoute')

const sessionApi = require('./routes/sessionRoute')

const complaintTypeApi = require('./routes/complaintTypeRoute');

const complaintApi = require('./routes/complaintRoutes');

const userApi = require("./routes/userRoute");

const discussionApi = require("./routes/discussionRoute");

app.use(express.json())

app.use(cors())

mongoDB() //call


// api calling

app.use('/api/admin' , adminApi)
app.use('/api/college' , collegeApi)
app.use('/api/session' , sessionApi)
app.use('/api/complaintType', complaintTypeApi);
app.use('/api/complaint', complaintApi);

app.use("/api/user", userApi);

app.use("/api/discussion", discussionApi);



// api calling end
console.log(PORT);

app.listen(PORT , ()=>{
    console.log(`Server started on http://localhost:${PORT}/`);
    
})