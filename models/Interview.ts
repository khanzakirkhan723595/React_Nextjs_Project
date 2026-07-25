import mongoose from "mongoose";


const InterviewSchema = new mongoose.Schema({

    role:{
        type:String,
        required:true
    },


    experience:{
        type:String,
        required:true
    },


    topic:{
        type:String,
        required:true
    },


    questions:[
        {
            question:String,
            answer:String,
            score:Number
        }
    ],


    overallScore:{
        type:Number,
        default:0
    }


},
{
    timestamps:true
}
);



const Interview =
mongoose.models.Interview ||
mongoose.model("Interview", InterviewSchema);



export default Interview;