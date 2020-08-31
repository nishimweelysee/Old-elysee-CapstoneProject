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

var nameV, passV, phoneV, emailV,photoV;

function ready() {
    nameV = document.getElementById('userid').value;
    passV = document.getElementById('userpass').value;
    phoneV = document.getElementById('userphone').value;
    emailV = document.getElementById('useremail').value;
    photoV = document.getElementById('uploadpic').value;
}
function clear() {
    document.getElementById('userid').value ="";
    document.getElementById('userpass').value ="";
    document.getElementById('userphone').value ="";
    document.getElementById('useremail').value ="";
    document.getElementById('uploadpic').value="";
}
var file = {};

var fileButton = document.getElementById('uploadpic');

//Listen for file 
fileButton.addEventListener('change', function(e){
    //Get File
    file = e.target.files[0];
});

function signupWithEmailAndPass(){
    firebase.auth().createUserWithEmailAndPassword(emailV,passV).then(auth=>{
        firebase.storage().ref('Users/'+ auth.user.uid+'/profile.jpg').put(file).then(function(){
            console.log('Successfully uploaded')
        }).catch(e=> {
            console.log(e.message)
        });
    }).catch(e=> {
        console.log(e.message)
    });
}


// This is the Insert Operation
document.getElementById('insert').onclick = function() {
    ready();
    signupWithEmailAndPass();
    console.log(nameV, passV, phoneV, emailV,photoV);
    firebase.database().ref('users/' + nameV).set({
        Username: nameV,
        Password: passV,
        PhoneNumber: phoneV,
        Email: emailV,
        ProfileImage:photoV
    });
    clear();
}

