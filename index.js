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


app.listen(port, function(err){
    if(err)
    {
        console.log('Error in running the server', err);
    }
    console.log('Server is running on port:', port);
})