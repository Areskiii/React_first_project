/*
var express = require('express');
var app = express();
var fs = require("fs");

app.get('/listUsers', function (req, res) {
   fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
       console.log( data );
       res.end( data );
   });
})


app.post('/addUser', function (req, res) {
	console.log( req );
   // First read existing users.
   fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
       data = JSON.parse( data );
       //data["user4"] = user["user4"];
      // console.log( data );
	   
       res.end( JSON.stringify(data));
   });
})

app.get('/:id', function (req, res) {
   // First read existing users.
   fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
      var users = JSON.parse( data );
      var user = users["user" + req.params.id] 
      console.log( user );
      res.end( JSON.stringify(user));
   });
})

app.delete('/deleteUser', function (req, res) {

   // First read existing users.
   fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
       data = JSON.parse( data );
       delete data["user" + 2];
       
       console.log( data );
       res.end( JSON.stringify(data));
   });
})


var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)

})
*/



var express = require('express');
var app = express();
var cors = require('cors');
var fs = require("fs");
var bp = require('body-parser');

// CORS

app.use(cors());

app.use(function(req, res, next) {
    //res.header("Access-Control-Allow-Origin", "*");
    //res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(bp.json());

app.get('/listUsers', function(req, res) {
    fs.readFile(__dirname + "/" + "users_steps.json", 'utf8', function(err, data) {
        console.log(data);
        res.end(data);
    });
})

app.get('/listTodos', function (req, res) {
    fs.readFile( __dirname + "/" + "todos.json", 'utf8', function (err, data) {
        console.log( data );
        res.end( data );
    });
})

app.get('/GetOne/:id', function(req, res) {
    // First read existing users.
    fs.readFile(__dirname + "/" + "users_steps.json", 'utf8', function(err, data) {
        var users = JSON.parse(data);
        console.log(users);
        console.log(req.params.id);
        var user = users.find(u => u.id == req.params.id);
        console.log(user);
        res.end(JSON.stringify(user));
    });
})

app.put('/updateUser/:id', function(req, res) {
    console.log(req.body);
    // First read existing users.
    fs.readFile(__dirname + "/" + "users_steps.json", 'utf8', function(err, data) {
        //
        tab = JSON.parse(data);
        //
        var userDel = tab.find(u => u.id == req.params.id);
        tab.splice(tab.indexOf(userDel, 1));
        //
        tab.push(req.body);

        console.log(tab);

        var content = JSON.stringify(tab);

        //fs.writeFile(__dirname + "/" + "phraseFreqs_update.json", content, 'utf8', function(err) {
        fs.writeFile(__dirname + "/" + "users_steps.json", content, 'utf8', function(err) {
            if (err) {
                return console.log(err);
            }

            console.log("The file was saved!");
        });

        //data["user4"] = user["user4"];
        // console.log( data );

        res.end(content);
    });
})



app.delete('/deleteUser/:id', function(req, res) {
    console.log(req.body);
    // First read existing users.
    fs.readFile(__dirname + "/" + "users_steps.json", 'utf8', function(err, data) {
        //
        tab = JSON.parse(data);
        //
        var userDel = tab.find(u => u.id == req.params.id);
        tab.splice(tab.indexOf(userDel, 1));
        //

        console.log(tab);

        var content = JSON.stringify(tab);

        //fs.writeFile(__dirname + "/" + "phraseFreqs_delete.json", content, 'utf8', function(err) {
        fs.writeFile(__dirname + "/" + "users_steps.json", content, 'utf8', function(err) {
            if (err) {
                return console.log(err);
            }

            console.log("The file was saved!");
        });

        //data["user4"] = user["user4"];
        // console.log( data );

        res.end(content);
    });
})


app.post('/addTodo', function (req, res) {
	console.log( req.body );
   // First read existing users.
   fs.readFile( __dirname + "/" + "todos.json", 'utf8', function (err,data) {
	//
       tab = JSON.parse( data );
		tab.push(req.body);

		console.log( tab );

			var content = JSON.stringify(tab);

		fs.writeFile( __dirname + "/" + "todos.json", content, 'utf8', function
		(err) {
		if (err) {
			return console.log(err);
		}

	});

       //data["user4"] = user["user4"];
      // console.log( data );

       res.end( content);
   });
})


app.post('/addUser', function(req, res) {
    console.log(req.body);
    // First read existing users.
    fs.readFile(__dirname + "/" + "users_steps.json", 'utf8', function(err, data) {
        //
        tab = JSON.parse(data);
        tab.push(req.body);

        console.log(tab);

        var content = JSON.stringify(tab);

        //fs.writeFile(__dirname + "/" + "phraseFreqs.json", content, 'utf8', function(err) {
        fs.writeFile(__dirname + "/" + "users_steps.json", content, 'utf8', function(err) {
            if (err) {
                return console.log(err);
            }

            console.log("The file was saved!");
        });

        //data["user4"] = user["user4"];
        // console.log( data );

        res.end(content);
    });
})



var server = app.listen(8081, function() {

    var host = server.address().address
    var port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port)

})