$(function () {
    //demande à l'utilisateur de choisir un pseudo
    var pseudo = prompt('Quel est votre pseudo ?');
    while (pseudo === undefined || pseudo == "") {
        pseudo = prompt('Quel est votre pseudo ?');
    }
    var socket = io();
    $('form').submit(function(){
        socket.emit('chat message', $('#m').val());
        $('#m').val('');
        return false;
    });
    socket.on('chat message', function(msg){
        $('#messages').append($('<li>').text(msg));
    });
    // On demande le pseudo, on l'envoie au serveur et on l'affiche dans le titre
    //var pseudo = prompt('Quel est votre pseudo ?');
    socket.emit('nouveau_client', pseudo);
    //change l'onglet de la page
    document.title = pseudo + ' - ' + document.title;
});