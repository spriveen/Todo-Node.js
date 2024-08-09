const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//Connect to the database
mongoose.connect('mongodb+srv://riveen:riveen2024@onlinechannel.qxxc6ad.mongodb.net/?retryWrites=true&w=majority&appName=onlinechannel')
.then((console.log('mongodb connected')))

// create a  schema- this is like a bluerpoint
const todoSchema = new mongoose.Schema({
    item: String
});
const Todo = mongoose.model('Todo', todoSchema);



// var data = [{item: 'get milk'}, {item: 'walk dog'}, {item: 'kick some coding'}]
const urlencodedParser = bodyParser.urlencoded({extended: false});


module.exports = function(app){

app.get('/todo',async function(req, res){
  //get data from mongodb and pass it to view 
  try {
    // Get data from MongoDB
    const data = await Todo.find({});
    res.render('todo', { todos: data });
} catch (err) {
    res.status(500).send(err);
}

});
app.post('/todo', urlencodedParser,async function(req, res){

    try {
        const newTodo = new Todo({
            item: req.body.item
        });
        const data = await newTodo.save();
        res.json(data);   
    } catch (err) {
        res.status(500).sent(err);
    }
    //get data from the view an add it to  mongodb 
});

app.delete('/todo/:item' ,async function(req, res){
    try {
        const data = await Todo.deleteOne({ item: req.params.item.replace(/\-/g, " ") });
        res.json(data);
    } catch (err) {
        res.status(500).send(err);
    }
})
};
