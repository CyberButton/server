import Questions from "../models/questionsSchema.js"
import Resluts from "../models/resultSchema.js"
import { Configuration, OpenAIApi } from "openai"

export async function getQuestions(req, res) {
    try {
        const q = await Questions.find()
        res.json(q)
    } catch (error) {
        res.json({error})
    }
}

export async function postQuestions(req, res) {
    try {
        Questions.insertMany({ 
            questions : [
                {
                    id: 1,
                    question : "Javascript is an _______ language",
                    options : [
                        'Object-Oriented',
                        'Object-Based',
                        'Procedural',
                    ]
                },
                {
                    id: 2,
                    question : "Following methods can be used to display data in some form using Javascript",
                    options : [
                        'document.write()',
                        'console.log()',
                        'window.alert()',
                    ]
                },
                {
                    id: 3,
                    question : "When an operator value is NULL, the typeof returned by the unary operator is:",
                    options : [
                        'Boolean',
                        'Undefined',
                        'Object',
                    ]
                },
                {
                    id: 4,
                    question : "What does the toString() method return?",
                    options : [
                        'Return Object',
                        'Return String',
                        'Return Integer'
                    ]
                },
                {
                    id: 5,
                    question : "Which function is used to serialize an object into a JSON string?",
                    options : [
                        'stringify()',
                        'parse()',
                        'convert()',
                    ]
                }
            ], 
            answers : [0, 1, 2, 1, 0]
    })
    res.json("succes posting")
    } catch (error) {
        res.json({error})
    }
}

export async function deleteQuestions(req, res) {
    try {
        const {quizId} = req.body;
        await Questions.findByIdAndRemove(quizId);
        res.json("questions delete funcion called succesfully")
    } catch (error) {
        res.json({error})
    }
}

//result
export async function getResults(req, res) {
    try {
        const r = await Resluts.find()
        res.json(r)
    } catch (error) {
        res.json({error})
    }
}

export async function postResults(req, res) {
    try {
        const { username, results, attempts, nameOfMCQ, correct, achived } = req.body
        if(!username || !results) {
            throw new Error('reslut useranme/result not provided')
        }

        Resluts.create({ username, results, attempts, nameOfMCQ, correct, achived })
        res.json("Result saved succesfully")

    } catch (error) {
        res.json({error})
    }
}

export async function deleteResults(req, res) {
    try {
        await Resluts.deleteMany()
        res.json("result deleted funcion called succesfully")
    } catch (error) {
        res.json({error})
    }
}

export async function generateQuestions(req, res) {
    try {
        const configuration = new Configuration({
            apiKey: process.env.OPENAI_API_KEY,
            });
        const openai = new OpenAIApi(configuration);

        const { prompt, numberOfMCQ, sourceType, userID, nameOfMCQ } = req.body

        // console.log({ prompt, numberOfMCQ, sourceType, userID, nameOfMCQ })

        // console.log(userID)
        const chatCompletion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{role: "system", content: `You are a proffesional MCQ(multiple choice question) generator. You make MCQs from the data given to you. To make those MCQs you only rely on the data provided to you even if its incorrect or misleading, your purpose is not to make totaly accurate MCQs but to make MCQs only from contetns of the data provided. You make questions and correct answer from provided data, while incorrect answer variants can be made up. You always respond in this json-like format { 
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
        {role: "user", content: `make me ${numberOfMCQ} MCQs from given ${sourceType}: "${prompt}"`}],
          });
              
        // Parse the API response string into a JSON object
        // const apiResponse = JSON.parse(chatCompletion.data.choices[0].message);

        // const data = `{
        //     "questions": [
        //       {
        //         "id": 1,
        //         "question": "who tf trynna  DEGUB?",
        //         "options": [
        //           "6.67 inches",
        //           "6.55 inches",
        //           "5.8 inches"
        //         ]
        //       },
        //       {
        //         "id": 2,
        //         "question": "Which Gorilla Glass version is used for the front of Poco X3 Pro?",
        //         "options": [
        //           "Gorilla Glass 6",
        //           "Gorilla Glass 5",
        //           "Gorilla Glass 3"
        //         ]
        //       },
        //       {
        //         "id": 3,
        //         "question": "What is the RAM capacity of Poco X3 Pro's 256GB variant?",
        //         "options": [
        //           "8GB",
        //           "6GB",
        //           "4GB"
        //         ]
        //       }
        //     ],
        //     "answers": [
        //       0,
        //       0,
        //       0
        //     ]
        //   }`
        
        let apiResponse;

        try {
            const data = chatCompletion.data.choices[0].message.content;
            console.log(data)
            apiResponse = typeof data === 'string' ? JSON.parse(data) : data;
        } catch (error) {
            console.error('Error parsing data:', error);
        }  
        

        // Extract the questions and answers from the parsed JSON
        const { questions, answers } = apiResponse;
        console.log({ questions, answers });

        Questions.create({questions, answers, userID, nameOfMCQ, numberOfMCQ})
        res.json({questions, answers, userID, nameOfMCQ, numberOfMCQ})
          
    } catch (error) {
        console.log(error)
        res.json({error})
    }
}