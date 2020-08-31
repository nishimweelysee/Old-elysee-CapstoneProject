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

var nameV, emailV, phoneV, addressV,commentV;

function ready() {
    nameV = document.getElementById('name').value;
    emailV = document.getElementById('email').value;
    phoneVar = document.getElementById('phoneid').value;
    addressV = document.getElementById('address').value;
    commentV = document.getElementById('comment').value;
}

function clear() {
    document.getElementById('name').value="";
    document.getElementById('email').value="";
    document.getElementById('phoneid').value="";
    document.getElementById('address').value="";
    document.getElementById('comment').value="";
}

// This is the Insert Operation
document.getElementById('comment-btn').onclick = function() {
    ready();
    console.log(nameV,emailV,phoneVar,addressV,commentV);
    firebase.database().ref('Contact/' + nameV).set({
        Name: nameV,
        Email: emailV,
        PhoneNumber: phoneVar,
        Address: addressV,
        Comment: commentV
    });
    clear();
}