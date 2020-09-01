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

function openCity(evt, cityName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
  }


//   Login from JS
var modal = document.getElementById('id01');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
//End of Login Form css



// Sign up From JS
// Get the modal
var modal = document.getElementById('id02');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

//End of Sign Up from


function onFileSelected(event) {
    var selectedFile = event.target.files[0];
    var reader = new FileReader();

    var imgtag = document.getElementById("imageid");
    imgtag.title = selectedFile.name;

    reader.onload = function(event) {
        imgtag.src = event.target.result;
    };

    reader.readAsDataURL(selectedFile);
    }


var image,title,desc,date,intro,cont,subbtn;

function ready(){
    image =  document.getElementById('imageid');
    title  =  document.getElementById('titleid');
    desc  =  document.getElementById('descid');
    date  =  document.getElementById('dateid');
    intro  =  document.getElementById('introid');
    cont  =  document.getElementById('contid');
    subbtn =  document.getElementById('submit');
}

document.getElementById('signoutbtn').onclick = function signout(){
    
    firebase.auth().signOut().then(function() {
        // Sign-out successful.
        console.log('Looged Out');
      }).catch(function(error) {
        // An error happened.
        console.log(error.message);
      });
}

document.getElementById('signupbtnid').onclick = function signupWithEmailAndPass(){
    var email = document.getElementById('upemail').value;
    var pass = document.getElementById('uppsw').value;
    console.log(email,pass);
    firebase.auth().createUserWithEmailAndPassword(email,pass)
    .catch(e=> {
        console.log(e.message)
    });
}

var btnLogin = document.getElementById('loginbtn');
btnLogin.addEventListener('click', e=>{
	var email = document.getElementById('inuname').value;
    var password = document.getElementById('inpwd').value;

	firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
      });
});

firebase.auth().onAuthStateChanged(firebaseUser => {
	if(firebaseUser){
        console.log(firebaseUser);
	}
	else{
        console.log('not looged in');
    }
});
// Password Validation 


function validatePassword(){
var password = document.getElementById("uppsw"), confirm_password = document.getElementById("uppsw-repeat");
console.log(password,confirm_password);  
if(password.value != confirm_password.value) {
    confirm_password.setCustomValidity("Passwords Don't Match");
  } else {
    confirm_password.setCustomValidity('');
  }
}