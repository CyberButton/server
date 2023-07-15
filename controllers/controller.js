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
    res.json("questions api DELETE request")
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
        const { username, results, attempts, points, achived } = req.body
        if(!username || !results) {
            throw new Error('reslut useranme/result not provided')
        }

        Resluts.create({ username, results, attempts, points, achived })
        res.json("Result saved succesfully" )

    } catch (error) {
        res.json({error})
    }
}

export async function deleteResults(req, res) {
    try {
        await Resluts.deleteMany()
    res.json("reskuts delete funcion called succesfully")
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

        const chatCompletion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{role: "user", content: "Hello world"}],
          });
          res.json(chatCompletion.data.choices[0].message);
    } catch (error) {
        res.json({error})
    }
}