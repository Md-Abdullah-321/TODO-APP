const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


// Define the todo schema as a separate schema
const todoSchema = new mongoose.Schema({
    task: {
      type: {
        title: {
          type: String,
          required: true,
        },
        priority: {
          type: String,
          enum: ['low', 'medium', 'high'],
        },
        status: {
          type: String,
          enum: ['todo', 'in-progress', 'done'],
        },
        tag: {
          type: String,
          enum: ['personal', 'work', 'urgent', 'important'],
        },
        description: {
          type: String,
        },
      },
      required: true,
    },
    dueDate: {
      type: Date,
    },
  });
  // Define the todo schema as a separate schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }, 
    email: {
        type: String,
        required: true
    }, 
    phone:  {
        type: String,
        required: true
    }, 
    password: {
        type: String,
        required: true
    }, 
    // Add the todos field as an array of todo subdocuments
  todos: [todoSchema],
    tokens:[
        {
            token:{
                type: String, 
                required:true
            }
        }
    ]
})

// Hash password before Saving:
userSchema.pre('save', async function(next) {
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password, 12);
        next();
    }
})

//Generate jsonwebtoken:
userSchema.methods.generateAuthToken = async function(next){
    try{
        let token = jwt.sign({_id:this._id}, process.env.SECRET_KEY);

        //Adding token to Schema:
        this.tokens = this.tokens.concat({token:token});
        await this.save();
        return token;
        next();
    }catch(e){
        console.log(e);
    }
}

const User = mongoose.model('USER',userSchema);
module.exports = User;