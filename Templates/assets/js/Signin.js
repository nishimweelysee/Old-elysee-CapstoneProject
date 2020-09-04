
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
if(document.getElementById('uname').checkValidity()){
	firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
        alert("Invalid credentials");
      });
    }
    else
    {
        alert("invalid Name format!!");
    }
});
