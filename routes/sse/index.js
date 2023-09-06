const Router = require('koa-router')
const { streamEvents } = require('http-event-stream')
// const subscriptions = require('../../db/subscriptions');

const router = new Router();
const obj = {
   action: "Идёт перемещение мяча по полю, игроки и той, и другой команды активно пытаются атаковать",
   freekick: "Нарушение правил, будет штрафной удар",
   goal: 'Отличный удар! И Г-О-Л!',
}
console.log(JSON.stringify(Object.keys(obj)))

const arr = ['Привет', 'Каку тебя дела?', 'все хорошо...', 'Пока и спокойной ночи'];


router.get('/sse', async (ctx) => {
   // ctx.response.body = { status: "ok" };
   streamEvents(ctx.req, ctx.res, {
      async fetch(lastEventId) {
         console.log(lastEventId);
         console.log('ласт ив132');
         return [];
      },
      stream(sse) {
         function gameStart() {
            setTimeout(() => {
               sse.sendEvent({
                  data: 'Игра началась',

               });
            }, 2000);
         }
         gameStart();

         let count = 1;
         let result;
         let basic = false;
         function sendEvents([], item) {


            let x = Math.random();
            if (x < 0.5) {    // 
               result = obj.action;

            } else if (x >= 0.5 & x < 0.9) {
               result = obj.freekick;

            }
            else if (x >= 0.9) {
               result = obj.goal;

            }
            sse.sendEvent({
               data: result,
               id: count,
            });
            count++;
            if (count === 5) {
               // count = 0;
               basic = true;

            }

            return basic;
         }

         let timer = setInterval(() => {
            console.log(basic)
            if (basic === true) {
               console.log('Подождите немного... Обновляемся...');

               //-------------
               //еще 1 вариант для остановки
               // clearInterval(timer);
               //ctx.res.end();
               // return;


               // basic = false;
               // count = 0;
               // ctx.res.end('OK')
               //   ctx.res.body= 'Подождите немного... Обновляемся...';
               //   sse.sendEvent({
               //    data:  ctx.res.body,

               // });

               sse.sendEvent({
                  data: 'Подождите немного... Обновляемся...',
                  //непонятно с ласт эвент ид

               });
               count = 1;
               setTimeout(() => {
                  // ctx.res.end();
                  // console.log('////');
                  gameStart();
               }, 2000);

               setTimeout(() => {
                  // ctx.res.end();
                  // console.log('////');

                  basic = false;
               }, 5000);
               return
            }
            sendEvents(arr, {})
         }, 5000);

         // arr.forEach((el) => {
         // sse.sendEvent({
         //    //  setInterval(() => {sendEvents(arr, {})}, 5000)

         //    data: arr[i],
         //    id: i,
         // })

         // sse.sendEvent({
         //    //  setInterval(() => {sendEvents(arr, {})}, 5000)

         //    data: arr[i],
         //    id: i+1,
         // })
         // setInterval(() => {sse.sendEvent({
         //    //  setInterval(() => {sendEvents(arr, {})}, 5000)

         //    data: arr[0],
         //    id: i+1,
         // })}, 5000) 
         // sse.sendEvent({
         //    //  setInterval(() => {sendEvents(arr, {})}, 5000)

         //    data: arr[1],
         //    id: i+1,
         // })
         // console.log(arr.length)
         //   res.end()
         // arr.push(sse.sendEvent.data);
         // }, 5000);
         // }


         // }, 5000)



         // console.log(arr[i])
         // res.end()
         //   setInterval(() => {sendEvents(arr, {})}, 5000)

         // function sendEvents(item) {

         //    sse.sendEvent({
         //       data: JSON.stringify({
         //          count: db.length,
         //          item,

         //       }),
         //       id: item.phone
         //    })

         // }
         // sse.sendEvent({ data: String(subscriptions.db.length) })
         //чтобы цифры менялись без перезагрузки страницы!!!=>
         //  subscriptions.listen(f)
         // subscriptions.listen(() => {

         //    sse.sendEvent({ data: String(subscriptions.db.length) })
         // })
         //  f(subscriptions.db, {})
         // const y = setInterval(() => { sendEvents(arr, {}) }, 5000)

         //   sendEvents(arr, {})
         console.log('e2');
         ctx.response.body = 'sse';
         return () => { };


      },

   })
   ctx.respond = false;
});
//  export default router;
// для фронта
module.exports = router
