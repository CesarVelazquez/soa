

var express = require('express');
var mongojs = require('mongojs');
/*var app = express();*/

var db = mongojs('polizas', ['polizas']);
var bodyParser = require('body-parser');


//SOCKET IO
	var app = require('express')();
	var http = require('http').Server(app);
	var io = require('socket.io')(http);

	http.listen(3000, function(){
	  console.log('listening on *:3000');
	});

	var usrs = 0;
	io.sockets.on('connection', function(socket) {  
	    console.log('Un cliente se ha conectado');
	    usrs += 1;
	    io.emit('conectado', usrs );


	    socket.on('disconnect', function() {
	    	usrs -= 1;
	      console.log('Usuario desconectado');
	      io.emit('desconectado: ', usrs );

  		 });
	});

//




// Indicamos el directorio que toma como plantilla ( de contenido estático HTML, CSS, JS)
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

app.get('/polizas', function (req, res){
	console.log("Recibí una petición GET");



	db.polizas.find(function(err, docs){
		console.log(docs);
		res.json(docs);
	});

	app.post('/polizas', function(req, res){
		console.log(req.body);
		db.polizas.insert(req.body, function(err, doc){
			res.json(doc);
			io.emit("prueba", "Registro nuevo");	
			io.emit("actualizar", "nuevo");		
		});
	});

	app.delete('/polizas/:id', function (req, res){
		var id = req.params.id;
		console.log(id);
		db.polizas.remove({_id: mongojs.ObjectId(id)}, function(err, doc){
			res.json(doc);
			io.emit("actualizar", "borrado");		

		});
	});

	app.get('/polizas/:id', function(req, res){
		var id = req.params.id;
		console.log(id);
		db.polizas.findOne({_id: mongojs.ObjectId(id)}, function(err, doc){
			res.json(doc);

		});
	});

	app.put('/polizas/:id', function(req, res){
		var id = req.params.id;
		db.polizas.findAndModify({query: {_id: mongojs.ObjectId(id)}, 
			update:{$set: {nombre: req.body.nombre, fnacimiento: req.body.fnacimiento, sexo: req.body.sexo, direccion: req.body.direccion, telefono: req.body.telefono, }},
			new: true}, function(err, doc){
				res.json(doc);

			});
		io.emit("actualizar", "actualizado");	
		});

});


/*setInterval( function() {

  var msg = Math.random();
  io.emit('message', msg);
  console.log (msg);

}, 1000);*/




/*app.listen(3000);*/
console.log("Servidor corriendo en puerto 3000");