// 🔥 Firebase imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, setDoc, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// 🔐 Your Firebase config (you gave this)
const firebaseConfig = {
  apiKey: "AIzaSyCuSOVvewMqzK8ykjaaECNF-EanNrlLguE",
  authDomain: "stego-app-f05a6.firebaseapp.com",
  projectId: "stego-app-f05a6",
  storageBucket: "stego-app-f05a6.firebasestorage.app",
  messagingSenderId: "872083664846",
  appId: "1:872083664846:web:f8ed436f5c4bf7b6c1459f",
  measurementId: "G-GTY8JCEK2C"
};

// 🚀 Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 🟢 STEP 1: Save message
window.encode = function () {
  let msg = document.getElementById("msg").value;

  if (msg === "") {
    alert("Enter message");
    return;
  }

  localStorage.setItem("tempMsg", msg);
  window.location = "video.html";
};

// 🔑 Generate key
function generateKey() {
  return Math.floor(1000 + Math.random() * 9000).toString();
}

// 🔗 Generate link + store in Firebase
window.generateLink = async function () {
  let key = generateKey();
  let msg = localStorage.getItem("tempMsg");

  let id = Math.random().toString(36).substring(2, 8);

  // Save in Firebase
  await setDoc(doc(db, "messages", id), {
    msg: msg,
    key: key
  });

  let baseURL = "https://rishitha-777.github.io/steg-app";
  let link = `${baseURL}/view.html?id=${id}`;

  document.getElementById("link").innerHTML =
    `🔗 ${link}<br>🔑 Key: <b>${key}</b><br><br>
     <button onclick="shareLink('${link}','${key}')">📤 Share</button>`;
};

// 📤 Share function
window.shareLink = function (link, key) {
  let text = `🔐 Secret Message\nLink: ${link}\nKey: ${key}`;

  if (navigator.share) {
    navigator.share({
      text: text,
      url: link
    });
  } else {
    navigator.clipboard.writeText(text);
    alert("Copied! Share on WhatsApp 📲");
  }
};

// 🔓 Decode message
window.decode = async function () {
  let params = new URLSearchParams(window.location.search);
  let id = params.get("id");

  let docRef = doc(db, "messages", id);
  let docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    alert("Invalid link ❌");
    return;
  }

  let data = docSnap.data();
  let input = document.getElementById("key").value;

  if (input === data.key) {
    let msg = data.msg;
    let output = document.getElementById("output");

    // 🎨 Styled output
    if (msg.toLowerCase().includes("love")) {
      output.innerHTML = `❤️ ${msg} ❤️ 💖💖💖`;
    } else if (
      msg.toLowerCase().includes("funny") ||
      msg.toLowerCase().includes("haha")
    ) {
      output.innerHTML = `😂 ${msg} 😂 🤣🤣🤣`;
    } else {
      output.innerHTML = `😎 ${msg}`;
    }
  } else {
    alert("Wrong key ❌");
  }
};
