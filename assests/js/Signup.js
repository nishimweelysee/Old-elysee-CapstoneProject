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

var nameV, passV, phoneV, emailV;

function ready() {
    nameV = document.getElementById('userid').value;
    passV = document.getElementById('userpass').value;
    phoneV = document.getElementById('userphone').value;
    emailV = document.getElementById('useremail').value;
}

// This is the Insert Operation
document.getElementById('insert').onclick = function() {
    ready();
    console.log(nameV, passV, phoneV, emailV);
    firebase.database().ref('users/' + nameV).set({
        Username: nameV,
        Password: passV,
        PhoneNumber: phoneV,
        Email: emailV
    });
}

//Select Operation

// document.getElementById('select').onclick = function() {
//     ready();
//     firebase.database().ref('users/' + nameV).on('value', function(snapshot) {
//         console.log(snapshot.val().Username, snapshot.val().PhoneNumber, snapshot.val().Email);
//         document.getElementById('namebox').value = snapshot.val().Username;
//         document.getElementById('secbox').value = snapshot.val().PhoneNumber;
//         document.getElementById('genbox').value = snapshot.val().Email;
//     });

// }


// // This is the Update Operation
// document.getElementById('update').onclick = function() {
//     ready();
//     console.log(nameV, passV, phoneV, emailV);
//     firebase.database().ref('users/' + nameV).update({
//         Password: passV,
//         PhoneNumber: phoneV,
//         Email: emailV
//     });
// }

// // This is the Delete Operation
// document.getElementById('delete').onclick = function() {
//     ready();
//     firebase.database().ref('users/' + nameV).remove();
// }

