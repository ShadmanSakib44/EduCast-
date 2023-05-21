import mongoose from 'mongoose';

const AnswerSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    questionId: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    answers: {
        type: String,
        required: true
    }
});


const answer = mongoose.model('answer', AnswerSchema);

export default answer;
//extra