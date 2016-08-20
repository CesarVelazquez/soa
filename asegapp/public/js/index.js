


//Inicializar Firebase

 var config = {
    apiKey: "AIzaSyCaNbhPnIxapz8rKvbygoXZYoCa7OdK94s",
    authDomain: "soa-final.firebaseapp.com",
    databaseURL: "https://soa-final.firebaseio.com",
    storageBucket: "soa-final.appspot.com",
  };
  firebase.initializeApp(config);

  //LOGIN - Tomar elementos

   const txtEmail = document.getElementById('txtEmail');
   const txtPassword = document.getElementById('txtPassword');
   const txtEmail2 = document.getElementById('txtEmail2');
   const txtPassword2 = document.getElementById('txtPassword2');
   const btnLogin = document.getElementById('btnLogin');
   const btnSign = document.getElementById('btnSign');

   // Evento Login
   btnLogin.addEventListener('click', e=> {
   		const email = txtEmail.value;
   		const pass = txtPassword.value;
   		const auth = firebase.auth();
   		 //Login
	   const promise = auth.signInWithEmailAndPassword(email, pass);
	   	promise.catch(e => console.log(e.message));
	    promise.catch(e =>alert(e.message));
	   return false;   
   });

   btnSign.addEventListener('click', e => {
   		const email = txtEmail2.value;
   		const pass = txtPassword2.value;
   		const auth = firebase.auth();
   		 //Login
	   const promise = auth.createUserWithEmailAndPassword(email, pass);
	   promise.catch(e => console.log(e.message));

	   return false;  
   });

   // Listener para Auth en tiempo real
   firebase.auth().onAuthStateChanged(firebaseUser => {
   		if (firebaseUser) {
   			window.location.href = "app.html";
   		}else{
   			console.log('Usuario no logueado');
   		}
   });













// Toggle Function
$('.toggle').click(function(){
  // Switches the Icon
  $(this).children('i').toggleClass('fa-pencil');
  // Switches the forms  
  $('.form').animate({
    height: "toggle",
    'padding-top': 'toggle',
    'padding-bottom': 'toggle',
    opacity: "toggle"
  }, "slow");
});