const socket = require('socket.io-client')('ws://127.0.0.1:3001');

socket.emit('test', {aaa:'bb'}, function(data) {
  console.log("aaaaaaa");
  console.log(data);
})
