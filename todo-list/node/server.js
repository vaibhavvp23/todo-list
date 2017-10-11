var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 9090;
app.listen(port);
console.log('Server is running at: ' + port);

var todoArray = [];

app.get('/api/getData', function(req, res) {
    res.json({ message: todoArray });
});

app.post('/api/addData', function(req, res) {
    var obj = {
        'todo': req.body.todo,
        'createDate': req.body.createDate,
        'completeDate': req.body.completeDate
    }
    todoArray.push(obj);

    res.json({ message: todoArray });
});

app.post('/api/markComplete', function(req, res) {
    todoArray[req.body.recordId].completeDate = req.body.completeDate;
    res.json({ message: todoArray });
});