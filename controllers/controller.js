import { translateText } from "../google_translate.js";
import Questions from "../models/questionsSchema.js"
import Resluts from "../models/resultSchema.js"
import { Configuration, OpenAIApi } from "openai"
import PDFDocument from 'pdfkit';

export async function generatePDF(req, res) {
    const data = req.body;
    console.log(data)
    const doc = new PDFDocument();

    // Create the PDF content here based on the 'data' received from the frontend
    doc.font('Helvetica-Bold').fontSize(20).text('Questionnaire', { align: 'center' });

    data.questions.forEach((question, index) => {
        doc.moveDown().font('Helvetica').fontSize(15).text(`${index + 1}. ${question.question}`);

        question.options.forEach((option, optIndex) => {
            const isCorrect = data.answers[index] === optIndex;
            doc.moveDown().text(`${isCorrect ? '[X]' : '[ ]'} ${option}`);
        });
    });

    // Pipe the PDF to the response
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=AIquiz.pdf');
    doc.pipe(res);
    doc.end();
}

export async function getQuestions(req, res) {
    try {
        const q = await Questions.find()
        res.json(q)
    } catch (error) {
        res.json({ error })
    }
}

export async function postQuestions(req, res) {
    try {
        Questions.insertMany({
            questions: [
                {
                    id: 1,
                    question: "Javascript is an _______ language",
                    options: [
                        'Object-Oriented',
                        'Object-Based',
                        'Procedural',
                    ]
                },
                {
                    id: 2,
                    question: "Following methods can be used to display data in some form using Javascript",
                    options: [
                        'document.write()',
                        'console.log()',
                        'window.alert()',
                    ]
                },
                {
                    id: 3,
                    question: "When an operator value is NULL, the typeof returned by the unary operator is:",
                    options: [
                        'Boolean',
                        'Undefined',
                        'Object',
                    ]
                },
                {
                    id: 4,
                    question: "What does the toString() method return?",
                    options: [
                        'Return Object',
                        'Return String',
                        'Return Integer'
                    ]
                },
                {
                    id: 5,
                    question: "Which function is used to serialize an object into a JSON string?",
                    options: [
                        'stringify()',
                        'parse()',
                        'convert()',
                    ]
                }
            ],
            answers: [0, 1, 2, 1, 0]
        })
        res.json("succes posting")
    } catch (error) {
        res.json({ error })
    }
}

export async function deleteQuestions(req, res) {
    try {
        const quizId = req.params.quizId; // Get the quizId from req.params
        await Questions.findByIdAndRemove(quizId);
        res.json("questions delete function called successfully");
    } catch (error) {
        res.json({ error });
    }
}

// for adimin stats
export async function getAdminStats(req, res) {
    try {
        const q = await Questions.find();
        // Calculate the total number of questions based on the "numberOfMCQ" property
        const numberTotalQuestions = q.reduce((acc, question) => acc + question.numberOfMCQ, 0);

        // Extract unique userIDs using a Set
        const uniqueUserIDs = new Set(q.map(question => question.userID));

        // Create an object containing both stats
        const stats = {
            totalQuestions: numberTotalQuestions,
            totalUsers: uniqueUserIDs.size
        };
        res.json(stats)
    } catch (error) {
        console.log(error)
        res.json({ error })
    }
}


//result
export async function getResults(req, res) {
    try {
        const r = await Resluts.find()
        res.json(r)
    } catch (error) {
        res.json({ error })
    }
}

export async function postResults(req, res) {
    try {
        const { username, results, attempts, nameOfMCQ, correct, achived } = req.body
        if (!username || !results) {
            throw new Error('reslut useranme/result not provided')
        }

        Resluts.create({ username, results, attempts, nameOfMCQ, correct, achived })
        res.json("Result saved succesfully")

    } catch (error) {
        res.json({ error })
    }
}

export async function deleteResults(req, res) {
    try {
        await Resluts.deleteMany()
        res.json("result deleted funcion called succesfully")
    } catch (error) {
        res.json({ error })
    }
}

export async function generateQuestions(req, res) {

    try {

        const configuration = new Configuration({
            apiKey: process.env.OPENAI_API_KEY,
        });
        const openai = new OpenAIApi(configuration);

        const { prompt, numberOfMCQ, sourceType, userID, nameOfMCQ, lang } = req.body

        const fullText = [{
            role: "system", content: `You are a proffesional MCQ(multiple choice question) generator. You make MCQs from the data given to you. To make those MCQs you only rely on the data provided to you even if its incorrect or misleading, your purpose is not to make totaly accurate MCQs but to make MCQs only from contetns of the data provided. You make questions and correct answer from provided data, while incorrect answer variants can be made up. You always respond in this json-like format { 
            questions : [
                {
                    id: _1_,
                    question : _question 1_,
                    options : [
                        _Option0_,
                        _Option1_,
                        _Option2_,
                    ]
                },
                {
                    id: _2_,
                    question : _question 2_,
                    options : [
                        _Option0_,
                        _Option1_,
                        _Option2_,
                    ]
                }
            ], 
            answers : [
        _2_,
        _0_
        ]
        }  where answers array contains indexes of correct answers in this example _option2_ is the correct answer for _question1_ and _option0_ is for _question 2_. Finally you dont include any special symbols/charachters try to replace them with text.`},
        // {role: "user", content: `${lang === 'ru' ? ("Мне нужно "+ numberOfMCQ +" MCQ из заданных данных") : ("make me " + numberOfMCQ + " MCQs from given data")}: "${prompt}"`}]
        { role: "user", content: `make me ${numberOfMCQ} MCQs from given data: "${prompt}"` }]


        const keyWords = [
            {
                role: "system", content: `You are a proffesional MCQ(multiple choice question) generator. You make fun, informative and engaging MCQs related the key words that will be given to you. You always respond in this json-like format { 
                questions : [
                    {
                        id: _1_,
                        question : _question 1_,
                        options : [
                            _Option0_,
                            _Option1_,
                            _Option2_,
                        ]
                    },
                    {
                        id: _2_,
                        question : _question 2_,
                        options : [
                            _Option0_,
                            _Option1_,
                            _Option2_,
                        ]
                    }
                ], 
                answers : [
        _2_,
        _0_
        ]
        }  where answers array contains indexes of correct answers in this example _option2_ is the correct answer for _question1_ and _option0_ is for _question 2_. Finally you dont include any special symbols/charachters try to replace them with text.`},
            // {role: "user", content: `${lang === 'ru' ? ("Мне нужно " + numberOfMCQ + " MCQ из заданных ключевых слов") : ("make me " + numberOfMCQ + " MCQs from given key words")}: "${prompt}"`}

            { role: "user", content: `make me ${numberOfMCQ} MCQs from given key words: "${prompt}"` }


        ]

        const chatCompletion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: sourceType === "key words" ? keyWords : fullText,
        });

        let apiResponse;

        try {
            const data = chatCompletion.data.choices[0].message.content;
            apiResponse = JSON.parse(data);
        } catch (error) {
            console.error('Error parsing data:', error);
            throw (error)
        }


        // Extract the questions and answers from the parsed JSON
        let { questions, answers } = apiResponse;
        if (lang === 'ru') {
            questions = await translateQuestionsArray(questions, "ru");
        }

        Questions.create({ questions, answers, userID, nameOfMCQ, numberOfMCQ })
        res.json({ questions, answers, userID, nameOfMCQ, numberOfMCQ })

    } catch (error) {
        console.log(error)
        res.status(500).send("pease try again")
    }
}

// Function to translate the questions array (asynchronous)
async function translateQuestionsArray(questionsArray, target) {
    const translatedQuestions = await Promise.all(questionsArray.map(async (question) => {
        const translatedOptions = await Promise.all(question.options.map(async (option) => {
            return await translateText(option, target);
        }));

        return {
            ...question,
            question: await translateText(question.question, target),
            options: translatedOptions
        };
    }));

    return translatedQuestions;
}