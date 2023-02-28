import mongoose from 'mongoose';

const Connection = async (username, password) => {
    const URL = "mongodb+srv://shadmansakib:EduCast123456@cluster0.9mfuwd8.mongodb.net/Authusers?retryWrites=true&w=majority";
    try {
        await mongoose.connect(URL, { useNewUrlParser: true })
        console.log('Database connected successfully');
    } catch (error) {
        console.log('Error while connecting to the database ', error);
    }
};

export default Connection;

