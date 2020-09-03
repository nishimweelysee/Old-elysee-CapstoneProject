
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
document.getElementById('insert').onclick = function signupWithEmailAndPass(){
    ready();
    firebase.auth().createUserWithEmailAndPassword(emailV,passV).then(async auth=>{
        firebase.storage().ref('Users/'+ auth.user.uid+'/profile.jpg').put(file).then(function(){
            console.log('Successfully uploaded');
        }).catch(e=> {
            console.log(e.message)
        });
        firebase.database().ref('users/' + auth.user.uid).set({
            Username: nameV,
            Password: passV,
            PhoneNumber: phoneV,
            Email: emailV,
            ProfileImage:photoV
        }).catch(e=>{
            console.log(e.message);
            }
        );
        clear();
    }).catch(e=> {
        console.log(e.message)
    });
}
