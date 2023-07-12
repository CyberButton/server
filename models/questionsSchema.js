import mongoose from "mongoose";
const { Schema } = mongoose

const questionModel = new Schema({
    questions : {type : Array, default : []},
    answers : {type : Array, default : []},
    createdAt : {type : Date, default : Date.now}
})

export const Questions = mongoose.model('Question', questionModel)