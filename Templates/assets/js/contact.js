
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