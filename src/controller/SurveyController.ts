import { Request, Response } from 'express';
import { getCustomRepository } from "typeorm";

import { SurveyRepository } from "../repositories/SurveyRepository";

class SurveyController{
    async show (request: Request, response: Response) {
        const surveyRepository = getCustomRepository(SurveyRepository);

        const surveys = await surveyRepository.find();

        return response.json(surveys);
    }

    async create (request: Request, response: Response) {
        const { title, description } = request.body;

        const surveyRepository = getCustomRepository(SurveyRepository);

        const survey = surveyRepository.create({
            title, description
        });

        await surveyRepository.save(survey);

        return response.status(201).json(survey);
    }
}

export { SurveyController };