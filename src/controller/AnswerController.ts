import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';

import { AppError } from '../errors/AppError';

import { SurveyUserRepository } from '../repositories/SurveyUserRepository';

class AnswerController {
    async execute(request: Request, response: Response) {
        const { value } = request.params;
        const { s } = request.query;

        const surveyUserRepository = getCustomRepository(SurveyUserRepository);

        const surveyUser = await surveyUserRepository.findOne({
            id: String(s)
        });

        if (!surveyUser)
            throw new AppError("User Answer was not found!");

        surveyUser.value = Number(value);

        surveyUserRepository.save(surveyUser);

        return response.json(surveyUser);
    }
}

export { AnswerController };