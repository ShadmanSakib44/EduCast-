import mongoose from 'mongoose';

const tutorSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    
    hourlyRate: {
        type: Number,
        required: true
    }
    
});

const Tutor = mongoose.model('Tutor', tutorSchema);

export default Tutor;
