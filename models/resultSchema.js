import mongoose from "mongoose";
const { Schema } = mongoose

const resultModel = new Schema({
    username : {type : String, default : ""},
    results : {type : Array, default : []},
    attempts : {type : Number, default : 0},
    nameOfMCQ : {type : String, default : ""},
    correct : {type : Number, default : 0},
    achived : {type : String, default : ""},
    createdAt : {type : Date, default : Date.now}
})

export default mongoose.model('Result', resultModel)