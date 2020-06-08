const express = require('express');
const path = require('path');
const port = 8000;
const app = express();

//setup the view engine
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.urlencoded());
app.use(express.static('assets'));

app.get('/', function(request, response){
    return response.render('home', {
        title: "TODO App"
    });
});


app.listen(port, function(err){
    if(err)
    {
        console.log('Error in running the server', err);
    }
    console.log('Server is running on port:', port);
})