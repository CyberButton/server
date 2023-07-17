import mongoose from "mongoose";
const { Schema } = mongoose

const questionModel = new Schema({
    questions : {type : Array, default : []},
    answers : {type : Array, default : []},
    createdAt : {type : Date, default : Date.now},
    userID : {type : String, default : ""},
    nameOfMCQ : {type : String, default : ""},
    numberOfMCQ : {type : Number, default : 0}
})

export default mongoose.model('Question', questionModel)