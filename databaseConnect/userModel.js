const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true
    },
    topics:{
        type:Array,
        require:true
    },
    forks:{
        type:Number,
        require:true
    },
    stargazers_count:{
        type:Number,
        require:true
    },
    html_url:{
        type:String,
        require:true
    }
});

const User = new mongoose.model("user",userSchema);

module.exports = User;