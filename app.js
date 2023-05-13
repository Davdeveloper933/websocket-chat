let express = require('express');
let app = express();
let players = {};

let server = require('http').createServer(app);
const io = require('socket.io')(server);

app.get('/',function(req,res) {
    res.sendFile(__dirname+'/client/index.html');
});

app.use('/client',express.static(__dirname+'/client'));

io.on('connection', socket => {
    console.log(socket.id)
    
    socket.emit('message', 'Привет, народ!')
    // io.emit('message', 'Привет, народ!') //Всем подключенным клиентам
    socket.broadcast.emit('message', 'Привет, народ!') // Всем подключенным клиентам, кроме отправителя
    // Комната - это произвольный канал, к которому сокет может
    // присоединяться (join) и который он может покидать (leave). 
    // Она может использоваться для передачи события только определенным клиентам.
    // socket.join('some room')
    // console.log(socket.rooms)
    socket.on('sendMsgToServer', (data)=>{
        io.emit('addToChat',data)
    });
})


server.listen(4141);