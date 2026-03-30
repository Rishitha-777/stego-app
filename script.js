function encode(){
 let msg = document.getElementById('msg').value;
 if(msg===""){ alert("Enter message"); return; }

 localStorage.setItem('secretMsg', msg);
 window.location = 'video.html';
}

function generateKey(){
 return Math.floor(1000 + Math.random()*9000).toString();
}

function generateLink(){
 let key = generateKey();
 let msg = localStorage.getItem('secretMsg');

 let id = Math.random().toString(36).substring(2,8);

 // store data locally
 localStorage.setItem(id, JSON.stringify({msg, key}));

 let baseURL = "https://rishitha-777.github.io/steg-app";

 let link = `${baseURL}/view.html?id=${id}`;

 document.getElementById('link').innerHTML =
 `🔗 ${link}<br>🔑 Key: <b>${key}</b><br><br>
 <button onclick="shareLink('${link}','${key}')">📤 Share</button>`;
}

function shareLink(link,key){
 let text = `🔐 Secret Message\nLink: ${link}\nKey: ${key}`;

 if(navigator.share){
   navigator.share({
     title: 'Secret Message',
     text: text,
     url: link
   });
 } else {
   navigator.clipboard.writeText(text);
   alert("Copied! Share on WhatsApp 📲");
 }
}

function decode(){
 let params = new URLSearchParams(window.location.search);
 let id = params.get('id');

 let data = JSON.parse(localStorage.getItem(id));

 if(!data){
   alert("Invalid link ❌");
   return;
 }

 let input = document.getElementById('key').value;

 if(input === data.key){

   let msg = data.msg;
   let output = document.getElementById('output');

   if(msg.toLowerCase().includes("love")){
     output.innerHTML = `❤️ ${msg} ❤️ 💖💖💖`;
   }
   else if(msg.toLowerCase().includes("funny") || msg.toLowerCase().includes("haha")){
     output.innerHTML = `😂 ${msg} 😂 🤣🤣🤣`;
   }
   else{
     output.innerHTML = `😎 ${msg}`;
   }

 } else {
   alert("Wrong key ❌");
 }
}
