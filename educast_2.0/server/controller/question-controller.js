
import Question from '../model/question.js';


export const createQuestion = async (request, response) => {
    try {
        const question = await new Question(request.body);
        question.save();

        response.status(200).json('Question saved successfully');
    } catch (error) {
        response.status(500).json(error);
    }
}

export const updateQuestion = async (request, response) => {
    try {
        const question = await Question.findById(request.params.id);

        if (!question) {
            response.status(404).json({ msg: 'Question not found' })
        }
        
        await Question.findByIdAndUpdate( request.params.id, { $set: request.body })

        response.status(200).json('Question updated successfully');
    } catch (error) {
        response.status(500).json(error);
    }
}

export const deleteQuestion = async (request, response) => {
    try {
        const question = await Question.findById(request.params.id);
        
        await question.delete()

        response.status(200).json('Question deleted successfully');
    } catch (error) {
        response.status(500).json(error)
    }
}

export const getQuestion = async (request, response) => {
    try {
        const question = await Question.findById(request.params.id);

        response.status(200).json(question);
    } catch (error) {
        response.status(500).json(error)
    }
}

export const getAllQuestions = async (request, response) => {
    let username = request.query.username;
    let categoryq = request.query.categoryq;
    let questions;
    try {
        if(username) 
            questions = await Question.find({ username: username });
        else if (categoryq) 
            questions = await Question.find({ categoriesq: categoryq });
        else 
            questions = await Question.find({});
            
        response.status(200).json(questions);
    } catch (error) {
        response.status(500).json(error)
    }
}