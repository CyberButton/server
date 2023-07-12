import mongoose from "mongoose";
const { Schema } = mongoose

const resultModel = new Schema({
    username : {type : String, default : ""},
    results : {type : Array, default : []},
    attempts : {type : Number, default : 0},
    points : {type : SVGAnimatedNumberList, default : 0},
    achived : {type : String, default : ""},
    createdAt : {type : Date, default : Date.now}
})

export const Resluts = mongoose.model('Question', resultModel)