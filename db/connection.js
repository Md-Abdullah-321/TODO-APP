const mongoose = require('mongoose');

// Connnecting To Database:
const DB = process.env.DATABASE; 
mongoose.set('strictQuery', true);
mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
.then(() => {
        console.log(`Database Connected`);
}).catch((err) => console.log(err));