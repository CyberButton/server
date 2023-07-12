import Questions from "../models/questionsSchema.js"
import Resluts from "../models/resultSchema.js"

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
            questions : [0], 
            answers : [1]
    }//,
    //     function(err, data) {
    //         res.json({msg : "data saved succesfully"})
    //     }
    )
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
        const { username, results, attempts, points, achieved } = req.body
        if(!username || !results) {
            throw new Error('reslut useranme/result not provided')
        }

        Resluts.create({ username, results, attempts, points, achieved })
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