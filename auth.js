<script type="module">
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

/* 🔥 FIREBASE CONFIG */
const firebaseConfig = {
  apiKey: "AIzaSyBx3J9aGn_98rTPgurMMKw_GR3puIMj4Ms",
  authDomain: "colourcash-ea60e.firebaseapp.com",
  projectId: "colourcash-ea60e"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

/* ================= REGISTER ================= */
window.registerUser = async (email, pass, cpass) => {
  if (!email || !pass || !cpass) return alert("All fields required");
  if (pass !== cpass) return alert("Password not match");

  try {
    const res = await createUserWithEmailAndPassword(auth, email, pass);

    await setDoc(doc(db, "users", res.user.uid), {
      email: email,
      wallet: 100,
      createdAt: serverTimestamp()
    });

    location.href = "index.html";
  } catch (e) {
    alert(e.message);
  }
};

/* ================= LOGIN ================= */
window.loginUser = async (email, pass) => {
  try {
    await signInWithEmailAndPassword(auth, email, pass);
    location.href = "index.html";
  } catch {
    alert("Wrong email or password");
  }
};

/* ================= LOGOUT ================= */
window.logoutUser = async () => {
  await signOut(auth);
  location.href = "login.html";
};

/* ================= PAGE PROTECT ================= */
window.protectPage = () => {
  onAuthStateChanged(auth, user => {
    if (!user) location.href = "login.html";
  });
};

/* ================= GET WALLET ================= */
window.getWallet = async () => {
  const snap = await getDoc(doc(db, "users", auth.currentUser.uid));
  return snap.data().wallet;
};
</script>
