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




function myFunction() {
    var x = document.getElementById("topnav");
    console.log(x)
    if (x.className === "topnavclass") {
        x.className += " responsive";
    } else {
        x.className = "topnavclass";
    }
}


function openForm() {
    document.getElementById("myForm").style.display = "block";
}

function closeForm() {
    document.getElementById("myForm").style.display = "none";
}

var img,fimg,signbtn,photobtn;
function getData(){
    img = document.getElementById('user-img');
    fimg = document.getElementById('edit-img');
    signbtn = document.getElementById('signin-top');
    photobtn = document.getElementById('user-option');
}

function putImage(imgUrl,st1,st2){
    getData();
    img.src = imgUrl;
    fimg.src = imgUrl;
    signbtn.style.display = st1;
    photobtn.style.display = st2;
}
function putUsername(username,email,phone){
    console.log(username,email,phone);
    document.getElementById('top-username').textContent = username;
    document.getElementById('updname').value = username;
    document.getElementById('updemail').value = email;
    document.getElementById('updphone').value = phone;
}

function showoption(){
    var op = document.getElementById('user-option');
    var ulElement = document.querySelector( "#user-option ul" );
    var style = document.querySelector( "#user-option ul" ).style.display;
    if(style=="none")
        ulElement.style.display = "inline";
    else
        ulElement.style.display = "none";
}

function logout(){
	firebase.auth().signOut().then(function() {
        // Sign-out successful.
        console.log('Looged Out');
      }).catch(function(error) {
        // An error happened.
        console.log(error.message);
      });
};

firebase.auth().onAuthStateChanged(firebaseUser => {
	if(firebaseUser){
        console.log(firebaseUser);
        
        firebase.storage().ref('Users/' +firebaseUser.uid+'/profile.jpg').getDownloadURL().then(imgUrl =>{
            putImage(imgUrl,"none","inline");
        })
        firebase.database().ref('users/' + firebaseUser.uid).on('value', function(snapshot) {
            console.log(snapshot.val().Username, snapshot.val().PhoneNumber, snapshot.val().Email);
            putUsername(snapshot.val().Username,snapshot.val().Email,snapshot.val().PhoneNumber);
        });
            
        
	}
	else{
        console.log('not looged in');
        putImage("https://as2.ftcdn.net/jpg/01/18/03/33/500_F_118033377_JKQA3UFE4joJ1k67dNoSmmoG4EsQf9Ho.jpg","inline","none");
        putUsername("","","");
    }
});

function onFileSelected(event) {
    var selectedFile = event.target.files[0];
    var reader = new FileReader();

    var imgtag = document.getElementById("edit-img");
    imgtag.title = selectedFile.name;

    reader.onload = function(event) {
        imgtag.src = event.target.result;
    };

    reader.readAsDataURL(selectedFile);
    }


    