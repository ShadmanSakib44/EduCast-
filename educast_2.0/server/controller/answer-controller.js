import Answer from '../model/answer.js';

export const newAnswer = async (request, response) => {
    try {
        const answer = new Answer(request.body);
        await answer.save();

        response.status(200).json('Answer saved successfully');
    } catch (error) {
        response.status(500).json(error);
    }
}

export const getAnswers = async (request, response) => {
    try {
        const answers = await Answer.find({ questionId: request.params.id });
        
        response.status(200).json(answers);
    } catch (error) {
        response.status(500).json(error)
    }
}

export const deleteAnswer = async (request, response) => {
    try {
        const answer = await Answer.findById(request.params.id);
        await answer.delete()

        response.status(200).json('answer deleted successfully');
    } catch (error) {
        response.status(500).json(error)
    }
}
