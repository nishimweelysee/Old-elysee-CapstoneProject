 // Your web app's Firebase configuration
 var firebaseConfig = {
    apiKey: "AIzaSyDjCatQB9VeBlVm7vaQQhRIrYQ-a7O_cLo",
    authDomain: "elysee-capstoneproject.firebaseapp.com",
    databaseURL: "https://elysee-capstoneproject.firebaseio.com",
    projectId: "elysee-capstoneproject",
    storageBucket: "elysee-capstoneproject.appspot.com",
    messagingSenderId: "1048146286907",
    appId: "1:1048146286907:web:a1c19eb4d8f5d65ac07f1e",
    measurementId: "G-BRPLLNHCND"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
//sign in

function withUsername(uname,pwd){
    // var chack = document.getElementById('uname').checkValidity() && getElementById('pwd').checkValidity();
    firebase.database().ref('users/' + uname).on('value', function(snapshot) {

        if (snapshot.val().Username == uname && snapshot.val().Password == pwd) {
            alert("Login Successully!!");
            document.getElementById('username-top').innerHTML = snapshot.val().Username;
        }
        else if(snapshot.val().Email == uname && snapshot.val().Password == pwd) {
                alert("Login Successully!!");
                document.getElementById('username-top').innerHTML = snapshot.val().Username;
        } else if (snapshot.val().Username == uname && snapshot.val().Password != pwd) {
            alert("Invalid Password");
        } else if (snapshot.val().Email == uname && snapshot.val().Password != pwd) {
            alert("Invalid Password");
        } else {
            alert("Invalid Username");
        }
    })
    clear();
}
function clear(){
    document.getElementById('uname').value = "";
    document.getElementById('pwd').value ="";
}


var provider = new firebase.auth.GoogleAuthProvider();

document.getElementById('google-signin').onclick =  function (){

    firebase.auth().signInWithRedirect(provider);

    firebase.auth().getRedirectResult().then(function(result) {
        if (result.credential) {
          var token = result.credential.accessToken;
        }
        var user = result.user;
        console.log(result);
      }).catch(function(error) {
          console.log(error.message);
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
      });
    // firebase.auth().signInWithPopup(provider).then(function(result) {
    //     // This gives you a Google Access Token. You can use it to access the Google API.
    //     var token = result.credential.accessToken;
    //     // The signed-in user info.
    //     var user = result.user;
    //     // ...
    //     console.log(user);
    //   }).catch(function(error) {
    //     // Handle Errors here.
    //     var errorCode = error.code;
    //     var errorMessage = error.message;
    //     // The email of the user's account used.
    //     var email = error.email;
    //     // The firebase.auth.AuthCredential type that was used.
    //     var credential = error.credential;
    //     // ...
    //     console.log(error.message);
    //   });
};
var btnLogin = document.getElementById('signinid');
btnLogin.addEventListener('click', e=>{
	var email = document.getElementById('uname').value;
    var password = document.getElementById('pwd').value;

	firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
      });
});

var btnLogout = document.getElementById('btnlogout');
btnLogout.addEventListener('click',e=>{
	firebase.auth().signOut().then(function() {
        // Sign-out successful.
        console.log('Looged Out');
      }).catch(function(error) {
        // An error happened.
        console.log(error.message);
      });
});
var img = document.getElementById('user-img');
var signbtn = document.getElementById('signin-top');
var photobtn = document.getElementById('user-option');
firebase.auth().onAuthStateChanged(firebaseUser => {
	if(firebaseUser){
        console.log(firebaseUser);
        
        firebase.storage().ref('Users/' +firebaseUser.uid+'/profile.jpg').getDownloadURL().then(imgUrl =>{
            img.src = imgUrl;
        })
        signbtn.style.display = "none";
        photobtn.style.display = "inline";
	}
	else{
        console.log('not looged in');
        signbtn.style.display = "inline";
        photobtn.style.display = "none";
        img.src = "https://as2.ftcdn.net/jpg/01/18/03/33/500_F_118033377_JKQA3UFE4joJ1k67dNoSmmoG4EsQf9Ho.jpg";
	}
});


function showoption(){
    var op = document.getElementById('user-option');
    var ulElement = document.querySelector( "#user-option ul" );
    var style = document.querySelector( "#user-option ul" ).style.display;
    if(style=="none")
        ulElement.style.display = "inline";
    else
        ulElement.style.display = "none";
}