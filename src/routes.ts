import { Router } from 'express';

import { UserController } from './controller/UserController';
import { SurveyController } from './controller/SurveyController';
import { SendMailController } from './controller/SendMailController';
import { AnswerController } from './controller/AnswerController';
import { NpsController } from './controller/NpsController';

const router = Router();

const userController = new UserController();
const surveyController = new SurveyController();
const sendMailController = new SendMailController();
const answerController = new AnswerController();
const npsController = new NpsController();

router.post("/user", userController.create);

router.post("/survey", surveyController.create);
router.get("/survey", surveyController.show);

router.post("/sendMail", sendMailController.execute);

router.get("/answer/:value", answerController.execute);

router.get("/nps/:survey_id", npsController.execute);

export { router };