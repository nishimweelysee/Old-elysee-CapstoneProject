
var nameV, passV, phoneV, emailV,photoV;

function ready() {

    nameV = document.getElementById('userid');
    passV = document.getElementById('userpass');
    phoneV = document.getElementById('userphone');
    emailV = document.getElementById('useremail');
    photoV = document.getElementById('uploadpic');
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
    if(nameV.checkValidity() && passV.checkValidity() && phoneV.checkValidity() && emailV.checkValidity() && photoV.checkValidity()){
        firebase.auth().createUserWithEmailAndPassword(emailV.value,passV.value).then(async auth=>{
            firebase.storage().ref('Users/'+ auth.user.uid+'/profile.jpg').put(file).then(function(){
                console.log('Successfully uploaded');
            }).catch(e=> {
                console.log(e.message)
            });
            firebase.database().ref('users/' + auth.user.uid).set({
                Username: nameV.value,
                Password: passV.value,
                PhoneNumber: phoneV.value,
                Email: emailV.value,
                ProfileImage:photoV.value
            }).catch(e=>{
                console.log(e.message);
                }
            );
            clear();
        }).catch(e=> {
            console.log(e.message)
        });
    }
    else{
        alert("Invalid Input");
    }
}
