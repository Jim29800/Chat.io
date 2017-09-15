const express = require('express')
const app = express()
var http = require('http').Server(app);
var io = require('socket.io')(http);
var ent = require('ent');
//path vers le dossier public
app.use(express.static('public'));
//dirige sur l'index à la racine
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
})
//Lors de la connexion d'un utilisateur :
io.on('connection', function(socket){
    socket.on('nouveau_client', function(pseudo) {
        pseudo = ent.encode(pseudo);
        socket.pseudo = pseudo;
        //Affiche à tous les utilisateur déjà connectés, le psuedo du nouvel utilisateur      
        socket.broadcast.emit('chat message', pseudo + ' viens de se connecté');
        //Affiche à l'utilisateur courant un message à sa connexion
        socket.emit('chat message', 'Vous êtes connecté en tant que : ' + pseudo);
    });
    //Permet l'affichage des messages envoyer par les utilisateurs
    socket.on('chat message', function(msg){
        io.emit('chat message', msg);
    });
    //Lorsque qu'un utilisateur ferme le chat :
    socket.on('disconnect', function(){
        //Affiche à tous les utilisateur connectés, qu'un utilisateur viens de se déconnecté
        socket.broadcast.emit('chat message', socket.pseudo + ' viens de se déconnecté !');
    });
});




//Défini l'écoute du serveur sur le port 
http.listen(3000, function () {
    console.log('app listening on port 3000!')
})