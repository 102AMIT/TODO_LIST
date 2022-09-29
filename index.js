const express=require('express');//here we are include the express and uses functionality
const app=express();//this is our express function we store in app variable for triggered the express

const port=process.env.PORT||8000;//by default website run on port 80 but for now we set the to 8000.

// get mongobd
const db=require('./config/mongoose');

const Todo=require('./models/list');
// const router = require('./routes');


//middleware

app.use(express.urlencoded());

// here we are accessing our static folder like css file etc

app.use(express.static('assets'));

//use express router by using middleware 

//here we are telling index.js to use the route
// app.use('/',require('./routes'));

//set up the view engine
app.set('view engine','ejs');
app.set('views','./views');

// sending data to database 

app.post('/creat',function(req,res){

    Todo.create(req.body,function(err,data){
        if(err){
            console.log('err in creating db',err);
            return;
        }
        console.log(data);
        return res.redirect('back');
    })

});

// printing the todolist in browser

app.get('/',function(req,res){
    Todo.find({},function(err,data){
        if(err){
            console.log('error in fetching the data from the db :',err);
                return;  
        }
        
        return res.render('home',{title:'TODO APP',task:data});
   
    })
})

//delete button todo list



app.get('/delete',function(req,res){

    // console.log(req.body);
    console.log(req.query);
    var length=Object.keys(req.query).length;
    // console.log(Object.keys(req.query)[2]);
    for(let i=2;i<length;i++){
        Todo.findByIdAndDelete(Object.keys(req.query)[i],function(err){
            if(err){
                console.log("error in deleting the data from db",err);
                return;
            }
            
        });
    }
    return  res.redirect('back');
});




app.listen(port,function(err){
    if(err){
        // console.log("Error",err);
        //we also write like that
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`server is running on port :${port}`);
})