var insur,postoff,assets,stocks,mutf;
google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);
function drawChart(insur,postoff,stocks,mutf,savings) {
  
    var data = google.visualization.arrayToDataTable([
    ['Option', 'Amount'],
    ['Insurance', savings*insur*0.01],
    ['PostOffice & Assets', savings*postoff*0.01],
    ['Stocks', savings*stocks*0.01],
    ['Mutual Funds',savings*mutf*0.01]
  ]);
    var options = {'title':'Your Ideal Portfolio',is3D:true,backgroundColor:'black',legend:{position: 'right', textStyle: {color: 'green', fontSize: 16}}}
    var chart = new google.visualization.PieChart(document.getElementById('chartContainer'));
    chart.draw(data, options);
  }
function riskcalc(risk)
{   
if (risk==1)
{
insur=30;
postoff=30;
stocks=10;
mutf=40;
return insur,postoff,stocks,mutf;
}
if(risk==2)
{ insur=20;
    postoff=20;
    stocks=20;
    mutf=40;
return insur,postoff,stocks,mutf;
}
else
{ insur=10;
    postoff=10;
    stocks=40;
    mutf=40;
}
}
const income=document.getElementById('income');
const expenses=document.getElementById('expenses');
const submit=document.getElementById('update');
const Risk=document.getElementById('risk');
var db = firebase.firestore();
firebase.auth().onAuthStateChanged(firebaseUser => {
    if (firebaseUser){
        var user = firebase.auth().currentUser;
        user.providerData.forEach(function (profile) {
            var email=profile.email;
                var a=db.collection('users').doc(email);
            a.get().then(function(doc) {
              if (doc.exists) {
                  var data=doc.data();
                  var savings=data.savings; 
                  var risk=data.risk;
                  console.log(savings);
                  riskcalc(risk);
                  drawChart(insur,postoff,stocks,mutf,savings);
                  
              } else {
                  console.log("No such document!");
              }
          }).catch(function(error) {
              console.log("Error getting document:", error);
          });
        submit.addEventListener( 'click' , e =>{
        var incom=income.value;
        var expense=expenses.value;
        var Ris=Risk.value;
        
        if(incom==""||expense==""||Ris=="")
        {
         alert('Please Fill Values Correctly')
        }
        else{

         var saving=incom-expense;
         riskcalc(Ris);
         drawChart(insur,postoff,stocks,mutf,saving);
         db.collection("users").doc(email).set({
            savings: saving,
            risk:Ris,
        },{merge:true});

        }
        console.log(incom,expense,Ris);
        

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
