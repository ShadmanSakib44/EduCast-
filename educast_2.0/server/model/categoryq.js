import mongoose from 'mongoose';

const CategoryQSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});


const categoryq = mongoose.model('categoryq', CategoryQSchema);

export default categoryq;