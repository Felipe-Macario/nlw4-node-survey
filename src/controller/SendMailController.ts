import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { resolve } from 'path';

import { AppError } from '../errors/AppError';

import SendMailService from '../services/SendMailService';

import { SurveyRepository } from '../repositories/SurveyRepository';
import { SurveyUserRepository } from '../repositories/SurveyUserRepository';
import { UserRepository } from '../repositories/UserRepository';

class SendMailController {
    async execute(request: Request, response: Response) {
        const { email, survey_id } = request.body;

        const userRepository = getCustomRepository(UserRepository);
        const surveyRepository = getCustomRepository(SurveyRepository);
        const surveyUserRepository = getCustomRepository(SurveyUserRepository);

        const user = await userRepository.findOne({ email });
        if (!user)
            throw new AppError("User does not exist");

        const survey = await surveyRepository.findOne({ id: survey_id });
        if (!survey)
            throw new AppError("Survey does not exist");

        const npsTemplatePath = resolve(__dirname, "..", "views", "emails", "npsMail.hbs");

        const htmlMailVariables = {
            name: user.name,
            title: survey.title,
            description: survey.description,
            id: "",
            link: process.env.URL_MAIL
        }

        const previousSurveyAnswer = await surveyUserRepository.findOne({
            where: { user_id: user.id, value: null },
            relations: ["user", "survey"]
        });

        if (previousSurveyAnswer){
            htmlMailVariables.id = previousSurveyAnswer.id;
            await SendMailService.execute(email, survey.title, htmlMailVariables, npsTemplatePath);
            return response.json(previousSurveyAnswer);
        }

        const surveyUser = surveyUserRepository.create({
            user_id: user.id,
            survey_id
        });

        await surveyUserRepository.save(surveyUser);

        htmlMailVariables.id = surveyUser.id;

        await SendMailService.execute(email, survey.title, htmlMailVariables, npsTemplatePath);

        return response.json(surveyUser);
    }
}

export { SendMailController };