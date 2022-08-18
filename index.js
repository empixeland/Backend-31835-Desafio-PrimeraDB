const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const PORT = process.env.PORT || 4000;
const { Server } = require("socket.io");
const io = new Server(server);
// const knex = require("./src/db"); // KNEX DE MYSQL ( PRODUCTS )
// const knex = require("./knexfile"); // KNEX DE SQL LITE 3 ( CHATS)


const arr = [
  {
    title: "Guitar Stratocaster",
    price: 100,
    thumbnail:
      "Url de la foto del producto",
    id: 1,
  },
  {
    title: "Guitar Telecaster",
    price: 120,
    thumbnail:
      "url de la foto del producto",
    id: 2,
  },
  {
    title: "Guitar Jazz Master",
    price: 150,
    thumbnail:
      "url de la foto del producto",
    id: 3,
  },
  {
    title: "Bass Jazz",
    price: 110,
    thumbnail:
      "url de la foto del producto",
    id: 4,
  },
  {
    title: "Bass Presicion",
    price: 140,
    thumbnail:
      "url de la foto del producto",
    id: 5,
  },
];



const msgs = [];


app.use(express.static(__dirname + "/public"));

server.listen(4000, () => {
  console.log("Server is running on port:" + PORT);
});

app.use(express.json());

io.on("connection", (socket) => {
  console.log("User has joined successfully.");

  socket.emit("msg_back", msgs);

  socket.emit("data_ready", arr);

  socket.on("data_client", (data) => {
    msgs.push(data);

    io.sockets.emit("msg_back", msgs);
    //#region
    // knex
    //   .from("logs")
    //   .select("*")
    //   .del()
    //   .then(() => {
    //     console.log("updated");
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });

    // knex("logs")
    //   .insert(msgs)
    //   .then(() => {
    //     console.log("Msgs from chat added successfully!").catch((err) => {
    //       console.log(err);
    //     });
    //   });
    //#endregion
  });

  socket.on("data_array", (data) => {
    arr.push(data);
    //#region 
    // knex
    //   .from("prods")
    //   .select("*")
    //   .del()
    //   .then(() => {
    //     console.log("updated");
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    // //arr.map((item) => {
    // knex("prods")
    //   .insert(arr)
    //   .then(() => {
    //     console.log("Products fueron agregados a la tabla").catch((err) => {
    //       console.log(err);
    //     });
    //   });

    //#endregion
    io.sockets.emit("data_ready", arr);
  });

  //Rutas
});
app.get("/", (req, res) => {
  res.sendFile("index.html");
});