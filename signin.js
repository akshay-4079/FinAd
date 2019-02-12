
var config = {
    apiKey: "AIzaSyB7gA2q9btz0oF9SSriQ55ssA9d8M8x7Hg",
    authDomain: "finance-advice-c6b6e.firebaseapp.com",
    databaseURL: "https://finance-advice-c6b6e.firebaseio.com",
    projectId: "finance-advice-c6b6e",
    storageBucket: "finance-advice-c6b6e.appspot.com",
    messagingSenderId: "300919893789"
  };
  firebase.initializeApp(config);
  const txtEmail=document.getElementById('username');
  const txtEmail2=document.getElementById('userEmail');
  const pass=document.getElementById('pass');
  const pass2=document.getElementById('pass1');
  const btnlogin=document.getElementById('signin');
  const btnsignup=document.getElementById('signUp');
  const btnlogout=document.getElementById('logout');
btnlogin.addEventListener('click', e => {
const email=txtEmail.value;
const password=pass.value;
const auth= firebase.auth();
const promise=auth.signInWithEmailAndPassword(email,password);
promise.catch(e => console.log(e.message));
  });
btnsignup.addEventListener('click', e=> {
    const email=txtEmail2.value;
    const password=pass2.value;
    const auth= firebase.auth();
    const promise=auth.createUserWithEmailAndPassword(email,password);
    promise.catch(e => console.log(e.message));
});
firebase.auth().onAuthStateChanged(firebaseUser => {
    if (firebaseUser){
     location.replace('./UserPage.html')
        console.log(firebaseUser);
    }
    else
    {
        console.log('not logged in');
    }
});