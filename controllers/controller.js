import Questions from "../models/questionsSchema"
import Resluts from "../models/resultSchema"

export async function getQuestions(req, res) {
    try {
        const q = await Questions.find()
        res.json(q)
    } catch (error) {
        res.json({error})
    }
}

export async function postQuestions(req, res) {
    res.json("questions api POST request")
}

export async function deleteQuestions(req, res) {
    res.json("questions api DELETE request")
}

//result
export async function getResults(req, res) {
    res.json("RESULTS api get request")
}

export async function postResults(req, res) {
    res.json("RESULTS api POST request")
}

export async function deleteResults(req, res) {
    res.json("RESULTS api DELETE request")
}