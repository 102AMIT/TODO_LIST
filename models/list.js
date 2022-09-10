const mongoose=require('mongoose');

const todolistSchema=new mongoose.Schema({

    description:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    }
});

const Todo=mongoose.model('Todo',todolistSchema);
module.exports=Todo;