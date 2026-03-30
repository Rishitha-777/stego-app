// Fix for button click (important)
document.addEventListener("DOMContentLoaded", () => {
  let btn = document.getElementById("nextBtn");
  if(btn){
    btn.addEventListener("click", encode);
  }
});

function encode(){
 let msg = document.getElementById('msg').value;

 if(msg === ""){
   alert("Enter message");
   return;
 }

 localStorage.setItem('secretMsg', msg);
 window.location = 'video.html';
}

function generateKey(){
 return Math.floor(1000 + Math.random()*9000).toString();
}

function generateLink(){
 let key = generateKey();
 let msg = localStorage.getItem('secretMsg');

 let encodedMsg = encodeURIComponent(msg);

 let link = `${window.location.origin}/view.html?msg=${encodedMsg}&key=${key}`;

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
   alert('Link copied! Share it on WhatsApp 📲');
 }
}

function decode(){
 let params = new URLSearchParams(window.location.search);

 let realKey = params.get('key');
 let msg = decodeURIComponent(params.get('msg'));

 let input = document.getElementById('key').value;

 if(input === realKey){

   let output = document.getElementById('output');

   if(msg.toLowerCase().includes("love")){
     output.innerHTML = `
     <h2 style="color:red;">❤️ ${msg} ❤️</h2>
     <p>💖💖💖💖💖💖💖</p>`;
   }
   else if(msg.toLowerCase().includes("haha") || msg.toLowerCase().includes("funny")){
     output.innerHTML = `
     <h2>😂 ${msg} 😂</h2>
     <p>🤣🤣🤣🤣🤣🤣</p>`;
   }
   else{
     output.innerHTML = `<h2>😎 ${msg}</h2>`;
   }

 } else {
   alert("Wrong key ❌");
 }
}