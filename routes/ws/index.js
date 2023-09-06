// const Router = require('koa-router')
const WS = require('ws')
// const router = new Router();
// const wsServer = WS.Server({ server });
const chat = [];
const arr = [];
let count = 0;
const chatMessege = [];
const clients = {};


function wss(x) {

   x.on('connection', function connection(ws, request, client) {

      // window.location.reload();


      const errCallback = (e) => { console.log(e); };
      // по другому-
      // ws.on('error', console.error());


      // const id = Math.random();
      // clients[id] = ws;
      // console.log("новое соединение " + id);

      // clients[count] = ws;
      console.log(`Присоединился ${client}`)


      ws.on('message', (e) => {

         count++;
         const arr1 = e.split(',');
         const index = chat.findIndex(item => arr1[0] === item.name);
         const obj = {};
         obj.chat = [];
         obj.id = count;
         obj.name = arr1[0];
         // вот после этого этапа какое то сохрание результата что ли идет??
         if (index === -1 && arr1[1] === 'user') {

            // if (obj.name === undefined) {
            //    obj.id = count;
            //    obj.name = arr1[0];
            //    // for (let i = 0; i <= chat.length; i++) {
            //    //    chat[i].id = count;
            //    //    chat[i].name = arr1[0];
            //    // }

            //    chat.push(obj);
            // }
            chat.push(obj);
            // chat.forEach((el) => {
            //    el.id = count;
            //    el.name = arr1[0];
            //    return
            // })
            console.log(`Пользователь ${count}/${client} присоединился и написал сообщение`);



            // console.log(chat)

            Array.from(x.clients)
               .filter(client => client.readyState === WS.OPEN)
               .forEach(client => {


                  // console.log(clients[count]);
                  // console.log( Array.from(x.clients)[0]);

                  // if (obj.name) {
                  //    const arr = obj.chat;
                  //    arr.push(e);
                  //    client.send(JSON.stringify({ message: e, type: 'user' }));
                  //    return;
                  //    // ws.send(JSON.stringify({ arr }), errCallback);
                  // }
                  console.log(`Пользователю ${client} отправлены данные`);
                  client.send(JSON.stringify({ message: obj.name, type: arr1[1], id: obj.id }));
                  client.send(JSON.stringify({ chat }), errCallback);

               });


            console.log(chat);
         }
         else if (arr1[1] === 'chat') {
            console.log(arr1)
            console.log(arr1[2], JSON.stringify(obj.id))

            chat.forEach((el) => {
               // const index1 = chat.findIndex(el => JSON.stringify(el.id) === arr1[2])
               // console.log('index1' + index1)
               if (arr1[2] === JSON.stringify(el.id)) {
                  el.chat.push(arr1[0]);
                  console.log(arr1[0])
                  // client.send(JSON.stringify({ message: arr1[0], type: arr1[1] }));
                  // console.log(chat)
                  // ws.send(JSON.stringify({ el }), errCallback);

                  return obj.name = el.name;
               }



            })
            Array.from(x.clients)
               .filter(client => client.readyState === WS.OPEN)
               .forEach(client => {


                  client.send(JSON.stringify({ message: arr1[0], type: arr1[1], name: obj.name }));
                  client.send(JSON.stringify({ chat, type: arr1[1] }), errCallback);
                  console.log(chat)

                  //проверить сейчас
                  // client.send(JSON.stringify({ message: arr1[0], type: arr1[1] }));

                  // obj.chat = arr;

               });
            // ws.send(JSON.stringify({ chat, type: arr1[1] }), errCallback);
            // ws.send(JSON.stringify({ arr }), errCallback);
         }

         else {
            console.log(`Имя ${arr1[0]} занято, выберите другое`);
            ws.send(JSON.stringify(`Имя ${arr1[0]} занято, выберите другое`), errCallback);
         }

         //-----------------
         // chat.push(e);
         // chat.forEach((el) => {
         //    if (e === el) {
         //       console.log(el, e)
         //    } else
         //       console.log(el)
         // })
         //---------------


      });
      ws.on('close', () => {
         // chat.length = 0;
         const index = chat.findIndex(el => el.id === count);
         if (index !== -1) {
            chat.splice(index, 1);
            chat = [];

         }
         console.log(`Пользователь ${count} ушел!`, chat)
         ws.send(JSON.stringify(`close`), errCallback);

      })


   });
}

module.exports = wss;