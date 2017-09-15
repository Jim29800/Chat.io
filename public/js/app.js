function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
var color = getRandomColor();
$(function () {
    //demande à l'utilisateur de choisir un pseudo
    var pseudo = prompt('Quel est votre pseudo ?');
    while (pseudo === undefined || pseudo == "") {
        pseudo = prompt('Quel est votre pseudo ?');
    }
    var socket = io();
    $('form').submit(function(){
        socket.emit('chat message', color , pseudo , $('#m').val());
        $('#m').val('');
        return false;
    });
    socket.on('chat message', function(color,pseudo,msg){
        //'<strong style="color: ' + color + '";>' + pseudo + '</strong> : '+
        $('#messages').append($('<li>').html('<strong style="color: ' + color + '";>' + pseudo + '</strong> : '+ msg));
    });
    // On demande le pseudo, on l'envoie au serveur et on l'affiche dans le titre
    //var pseudo = prompt('Quel est votre pseudo ?');
    socket.emit('nouveau_client', pseudo, color);
    //change l'onglet de la page
    document.title = pseudo + ' - ' + document.title;
});
