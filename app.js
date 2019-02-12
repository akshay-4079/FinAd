

var config = {
    apiKey: "AIzaSyB7gA2q9btz0oF9SSriQ55ssA9d8M8x7Hg",
    authDomain: "finance-advice-c6b6e.firebaseapp.com",
    databaseURL: "https://finance-advice-c6b6e.firebaseio.com",
    projectId: "finance-advice-c6b6e",
    storageBucket: "finance-advice-c6b6e.appspot.com",
    messagingSenderId: "300919893789"
  };
  var Todate=new Date();
  
   firebase.initializeApp(config);
const logout=document.getElementById('logout');
   const stock=document.getElementById('stock');
const datebut=document.getElementById('datebut');
var db = firebase.firestore();
firebase.auth().onAuthStateChanged(firebaseUser => {
    if (firebaseUser){
        var datechange=true;
        var user = firebase.auth().currentUser;
        user.providerData.forEach(function (profile) {
            var email=profile.email;
            var dateener=false;
            logout.addEventListener('click', e=> {
                firebase.auth().signOut();
            });
            datebut.addEventListener('click', e=> {
                var date=document.getElementById('date');
                const date1=date.value;
                console.log(date1);
                var a=moment(date1);
                var b=moment(Todate);
                var c=b.diff(a,'days');
                dateener=true;
                if(c==0){
                    datechange=false;
                }
                else{
                    datechange=true;
                }
                console.log(datechange);
            });
            
            var dataexsist=false;
            console.log(email);
               var a = db.collection("users").doc(email);
               a.get().then(function(doc) {
                if (doc.exists) {
                    dataexsist=true;
                    var data=doc.data();
                    var stocks=data.stocks;
                    console.log(data);
                    console.log(stocks);
                   document.getElementById('stocks2').innerHTML=stocks; 
                } else {
                    dataexsist=false;
                    console.log("No such document!");
                }
            }).catch(function(error) {
                console.log("Error getting document:", error);
            });
            
              stock.addEventListener('click', e=> {
                  if (dateener==true){
                if(dataexsist==false || datechange==true){
                var xhttp = new XMLHttpRequest();
               
                xhttp.onreadystatechange = function() {
                  if (this.readyState == 4 && this.status == 200) {
                    myFunction1(this);
                  }
                };
                xhttp.open("GET", "Stocks.xml", true);
                xhttp.send();
              function myFunction1(xml) {
                var i;
                var xmlDoc = xml.responseXML;
                var marquee1="<marquee>";
                var x = xmlDoc.getElementsByTagName("stock");
                
                for (i = 0; i <20; i++) { 
                   var a=Math.floor(Math.random()*199)+1;
                  marquee1+= "&nbsp&nbsp" +
                  x[a].getElementsByTagName("name")[0].childNodes[0].nodeValue +
                  "&nbsp&nbsp" +
                  x[a].getElementsByTagName("price")[0].childNodes[0].nodeValue +
                  "&nbsp&nbsp"+
                  x[a].getElementsByTagName("eps")[0].childNodes[0].nodeValue +
                  "&nbsp&nbsp";
                  a++
                }
                marquee1+="&nbsp&nbsp</marquee>";
                document.getElementById("stocks2").innerHTML = marquee1;
                db.collection("users").doc(email).set({
                    name: email,
                    stocks:marquee1,
                },{merge:true});
            }
        }
    }
        else{
            console.log('date is same');
        } 
               });   
        }); 






        console.log(firebaseUser);
    }
    else
    {
        location.replace('./index.html');
        console.log('not logged in');
    }
});

