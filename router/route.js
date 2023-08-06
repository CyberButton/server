import { Router } from "express"
import * as controller from '../controllers/controller.js'
const router = Router()

//router.get('/questions', controller.getQuestions)
//router.post("/questions", controller.insertQuestions)

router.route('/test')
    .get(controller.test)

router.route('/questions')
    .get(controller.getQuestions)
    .post(controller.postQuestions)

    
router.route('/questions/:quizId')
    .delete(controller.deleteQuestions);

router.route('/results')
    .get(controller.getResults)
    .post(controller.postResults)
    .delete(controller.deleteResults)

router.route('/mcq-gen')
    .post(controller.generateQuestions)

router.route('/admin-stats')
    .get(controller.getUserCount)
    
export default router