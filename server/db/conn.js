const mongoose =require ("mongoose");
const DB="mongodb+srv://shadmansakib:EduCast123456@cluster0.9mfuwd8.mongodb.net/Authusers?retryWrites=true&w=majority"
mongoose.connect(DB,{ 
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(()=> console.log("DataBase Connected")).catch((errr)=>{
    console.log(errr);
})