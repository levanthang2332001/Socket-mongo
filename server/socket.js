const express = require('express');
const http = require("http");

const app = express();
const {Server} = require("socket.io");
const server = http.createServer(app);
const io = new Server(server,{
    cors: "http://127.0.0.1:5500/",
});

app.get('/news', (res,req) => {
    return res.send("Hello");
})


io.on('connection', socket => {
    console.log(`${socket.id}`);

    socket.on("chat message", message => {
        console.log(message);
        socket.broadcast.emit("chat message",message);
    })

    socket.on("disconnect", () => {
        socket.broadcast.emit("chat message", `${socket.id}`)
    })
})

const PORT = 5500;
server.listen(PORT, () => console.log(`http://localhost:${PORT}`));
