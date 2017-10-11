var todos = [];
var serverURL = "http://localhost:9090/api";

function get_todos() {
    $.ajax({
        type: 'GET',
        url: serverURL + "/getData",
        data: 'Todo',
        datatype: 'json',
        success: function(data) {
            console.log(data);
            todos = data.message;
            show();
        },
        error: function(xhr, status, error) {
            console.log("Error");
        }
    });
}

function add() {
    var obj = {
        'todo': document.getElementById('task').value,
        'createDate': new Date().toJSON().slice(0, 10).replace(/-/g, '/'),
        'completeDate': ''
    }

    $.ajax({
        type: 'POST',
        url: serverURL + "/addData",
        data: obj,
        datatype: 'json',
        success: function(data) {
            get_todos();
            console.log(data);
        },
        error: function(xhr, status, error) {
            console.log("Error");
        }
    });
    return false;
}

function show() {

    if (todos.length > 0 && todos.length != undefined) {
        var html = '';
        for (var i = todos.length - 1; i >= 0; i--) {
            var isCompleted = todos[i].completeDate;
            if (isCompleted != '') {
                isCompleted = todos[i].completeDate;
            } else {
                isCompleted = '<button id="' + i + '" onclick="markComplete(' + i + ')">Mark Completed</button>';
            }
            html += '<tr>' +
                '<td>' + todos[i].todo + '</td>' +
                '<td>' + todos[i].createDate + '</td>' +
                '<td>' + isCompleted + '</td>' +
                '</tr>';
        };
        document.getElementById('todoList').innerHTML = html;
    }
}

function markComplete(recordId) {
    var obj = {
        'recordId': recordId,
        'completeDate': new Date().toJSON().slice(0, 10).replace(/-/g, '/')
    }

    $.ajax({
        type: 'POST',
        url: serverURL + "/markComplete",
        data: obj,
        datatype: 'json',
        success: function(data) {
            get_todos();
        },
        error: function(xhr, status, error) {
            console.log("Error marking it Complete.");
        }
    });
}

document.getElementById('add').addEventListener('click', add);
get_todos();