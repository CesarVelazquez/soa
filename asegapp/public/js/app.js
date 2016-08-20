//Inicializar Firebase 

 var config = {
    apiKey: "AIzaSyCaNbhPnIxapz8rKvbygoXZYoCa7OdK94s",
    authDomain: "soa-final.firebaseapp.com",
    databaseURL: "https://soa-final.firebaseio.com",
    storageBucket: "soa-final.appspot.com",
  };
  firebase.initializeApp(config);


 
  $( document ).ready(function() {
    


  	// AUTH Firebase
    firebase.auth().onAuthStateChanged(firebaseUser => {
   		if (firebaseUser) {
        $('#user').append(firebaseUser['email']);
   		}else{
   			window.location.href = "index.html";
   		}
   });

    //Logout Firebase
    const btnLogout = document.getElementById('btnLogout');
    btnLogout.addEventListener('click', e=> {
    	firebase.auth().signOut();
    });
  
  });



  

  