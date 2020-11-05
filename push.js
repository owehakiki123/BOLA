var webPush = require('web-push');
 
const vapidKeys = {
   "publicKey": "BAzxf8zYwdyvGSR5WQw-IgENtsgdf68wkP-gwmQ7FOh5GwksdhSAW4E-0bGhitIx7ZmzC8_7Ic8hz9wLzwtiDXo",
   "privateKey": "TGJtFVzbKR1b1kkWeHBO7WU3sGN_oraGjoN-cseJAJo"
};
 
 
webPush.setVapidDetails(
   'mailto:example@yourdomain.org',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
var pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/c_sfhU6Bicc:APA91bGYo-_aSRpHtzNG8B1h8XXXIZ2SAYIA1SCn4cqOIbb7QEG0SznJRmIXj2pbikoKYfqPRYNvWFm3_oMe4nwaUbJWirYogqo6bB63mjwBt_tJZncr1jfJFQRqrLqDCz4n0rOeUOnc",
   "keys": {
       "p256dh": "BL9bUq+eIXZmLpaBbLCP70rww1ltmyoPMTEOE8sRqysoKcxs4dHDxwR1r/sLv9mdiPl2wW/FU4Krxk58d4sCGes=",
       "auth": "bCrfVnn+0Q8Mfak45WH2TA=="
   }
};
var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';
 
var options = {
   gcmAPIKey: '160660235605',
   TTL: 60
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options
).then ((success)=>{
    console.log(success)
})
.catch ((error)=>{
    console.log(error)
})