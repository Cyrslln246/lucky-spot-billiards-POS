import { auth, db } from './firebase-config.js';
import { signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";
import { collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";

const loginSection = document.getElementById('login-section');
const posSection = document.getElementById('pos-section');
const adminControls = document.getElementById('admin-controls');

document.addEventListener('DOMContentLoaded', () => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      loginSection.style.display = 'none';
      posSection.style.display = 'block';
      if (user.email === 'admin@classmates.com') {
        adminControls.style.display = 'block';
      }
    }
  });
});

window.login = async function() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    alert('Login failed: ' + err.message);
  }
}

window.addItem = async function() {
  const name = document.getElementById('item-name').value;
  const price = parseFloat(document.getElementById('item-price').value);
  if (name && !isNaN(price)) {
    await addDoc(collection(db, "inventory"), { name, price });
    alert("Item added.");
  }
}

window.addSale = async function() {
  const desc = document.getElementById('sale-desc').value;
  const amount = parseFloat(document.getElementById('sale-amount').value);
  if (desc && !isNaN(amount)) {
    await addDoc(collection(db, "sales"), { desc, amount, date: new Date().toISOString() });
    alert("Sale/Expense added.");
  }
}

window.downloadReport = async function() {
  const salesSnap = await getDocs(collection(db, "sales"));
  let csv = "Description,Amount,Date\n";
  salesSnap.forEach(doc => {
    const d = doc.data();
    csv += `${d.desc},${d.amount},${d.date}\n`;
  });
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = "sales_report.csv";
  a.click();
}