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

document.getElementById('signinid').onclick= function() {
    // var chack = document.getElementById('uname').checkValidity() && getElementById('pwd').checkValidity();
    var uname = document.getElementById('uname').value;
    var pwd = document.getElementById('pwd').value;
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
}


var provider = new firebase.auth.GoogleAuthProvider();

document.getElementById('google-signin').onclick =  function (){

    firebase.auth().signInWithRedirect(provider);

    firebase.auth().getRedirectResult().then(function(result) {
        if (result.credential) {
          // This gives you a Google Access Token. You can use it to access the Google API.
          var token = result.credential.accessToken;
          // ...
        }
        // The signed-in user info.
        var user = result.user;
        console.log(result);
      }).catch(function(error) {
          console.log(error.message);
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
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