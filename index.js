const express = require('express');
const path = require('path');
const port = 8000;
const app = express();

//setting up mongo
const db = require('./config/mongoose');
const Todo = require('./models/tododb');

//setup the view engine
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.urlencoded());
app.use(express.static('assets'));


//fetching all todos from db
app.get('/', function(request, response){
    // return response.render('home', {
    //     title: "TODO App"
    // });

    Todo.find({}, function(err, todo ){
        if(err)
        {
            console.log('Error in fetching Todos from DB');
            return;
        }
        return response.render('home', {
            title: "TODO App",
            todo_list: todo
        });
    })
});


//create todo item
app.post('/create-todo', function(request, response){
    // console.log(request.body);
    // console.log("todo desc: ", request.body.task_name);
    // console.log("category: ", request.body.category);
    // console.log("date: ", request.body.date);
    // return response.redirect('back');
    Todo.create({
        todoDesc: request.body.task_name,
        category: request.body.category,
        date: request.body.date
    }, function(err, newTodo){
        if(err){
            console.log('error in creating todo!');
            return;
        }
        console.log('***********', newTodo);
        return response.redirect('back');
    });
});

//for deleting todo from db
app.get('/delete-todo', function(request, response){

    //get the id from query in the url
    let id = request.query.id;


    //find the todo in the database using id and delete
    Todo.findByIdAndDelete(id, function(err){
        if(err){
            console.log('Error in deleting an object from database');
            return;
        }
        return response.redirect('back');
    });
    // Todo.deleteMany({_id:{$in:request.body.id}}, function(err, todo) {
    //     if (err) {
    //       console.error(err);
    //       return response.redirect('back');
    //     } else {
    //       return response.redirect('back');
    //     }
    //   });
});

//listening from port 
app.listen(port, function(err){
    if(err)
    {
        console.log('Error in running the server', err);
    }
    console.log('Server is running on port:', port);
})