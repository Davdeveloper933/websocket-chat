let express = require('express');
let app = express();


let server = require('http').createServer(app);
const io = require('socket.io')(server);
server.listen(3000);

const sockets = io.sockets;

app.get('/',function(req,res) {
    res.sendFile(__dirname+'/client/index.html');
});

app.use('/client',express.static(__dirname+'/client'));

io.on('connection',async (socket) => {
    var $liveIpAddress = socket.handshake.address;
    const count = io.engine.clientsCount;

      //check socket io online users
//   if (!$ipsConnected.hasOwnProperty($liveIpAddress)) {
//     $ipsConnected[$liveIpAddress] = 1;
//     flags++;
//             //socket io real time online users example
//             // socket.emit('socket_io_counter', flags);
//  }
 console.log("Good Luck, client is connected");
 socket.emit('socket_io_counter', $liveIpAddress);
 console.log(count,socket.handshake)
    
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

      /* Your Live (socket.io client flags) Disconnect socket */
//   socket.on('disconnect', function() {
//     if ($ipsConnected.hasOwnProperty($liveIpAddress)) {
//        delete $ipsConnected[$liveIpAddress];
//       flags--;
//       socket.emit('socket_io_counter', flags);
//     }
//  });
})