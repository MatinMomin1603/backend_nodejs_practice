const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost:27017/matinDemoSample").then(() => {
    console.log(`Connection succesfully to db`);
}).catch((error) => {
    console.log('error :', error);
});