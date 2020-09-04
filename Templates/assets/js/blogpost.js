
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

// End of Sign Up from



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
    var password = document.getElementById('inpsw').value;

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

// getimge in view
var selectedFile={};
function onFileSelected(event) {
 selectedFile = event.target.files[0];
  var reader = new FileReader();

  var imgtag = document.getElementById("imageid");
  imgtag.title = selectedFile.name;

  reader.onload = function(event) {
      imgtag.src = event.target.result;
  };

  reader.readAsDataURL(selectedFile);
  }


var image,id,title,desc,date,intro,cont,subbtn;

function ready(){
  id =  document.getElementById('blogid').value;
  image =  document.getElementById('inpimg').value;
  title  =  document.getElementById('titleid').value;
  desc  =  document.getElementById('descid').value;
  date  =  document.getElementById('dateid').value;
  intro  =  document.getElementById('introid').value;
  cont  =  document.getElementById('contid').value;

}

function clearBlog(){
  document.getElementById('blogid').valu="";
  document.getElementById('inpimg').value="";
  document.getElementById('titleid').value="";
  document.getElementById('descid').value="";
  document.getElementById('dateid').value="";
  document.getElementById('introid').value="";
  document.getElementById('contid').value="";

}

document.getElementById('submit').onclick= e=>{
    ready();
    console.log(id,image,title,desc,date,intro,cont);
    firebase.database().ref('Blog/' + id).set({
      Id: id,
      Image: image,
      Title: title,
      Descripttion: desc,
      Date:date,
      Introduction:intro,
      Content: cont
    }).catch(e=>{
        if(e){
          alert("Data Not Saved !!");
        }
        else{
          alert("Data Saved !!");
          location.reload();
        }
      });
    saveImageBlog();
    clearBlog();
};


function saveImageBlog(){
    firebase.storage().ref('BlogImage/'+ id+'/blog.jpg').put(selectedFile).then(function(){
      console.log('Successfully uploaded');
    }).catch(e=> {
      console.log(e.message)
    });
}
// Select The Blog
  document.getElementById('bselect').onclick = function() {
      id =  document.getElementById('blogid').value;
      clearBlog();
      firebase.database().ref('Blog/' + id).on('value', function(snapshot) {
            document.getElementById('titleid').value=snapshot.val().Title;
            document.getElementById('descid').value=snapshot.val().Descripttion;
            document.getElementById('dateid').value=snapshot.val().Date;
            document.getElementById('introid').value=snapshot.val().Introduction;
            document.getElementById('contid').value=snapshot.val().Content;
            firebase.storage().ref('BlogImage/' +id+'/blog.jpg').getDownloadURL().then(imgUrl =>{
              document.getElementById("imageid").src = imgUrl;
            }).catch(e=>{
      
            })
      },function(error){
          if(error){
            alert("Data Not Found !!");
          }
          else{
            alert("Data Found !!");
          }
      });
      
  }
  
  
  // This is the Update Operation
  document.getElementById('bupdate').onclick = function() {
      ready();
      firebase.database().ref('Blog/' + id).update({
        Image: image,
        Title: title,
        Descripttion: desc,
        Date:date,
        Introduction:intro,
        Content: cont
      },error=>{
        if(error){
          alert("Data Not Updated!!");
        }
        else{
          alert("Data Updated !!");
          location.reload();
        }
      });
      firebase.storage().ref('BlogImage/'+ id+'/blog.jpg').put(selectedFile).then(function(){
        
      }).catch(e=> {
        console.log(e.message)
      });
      clearBlog();
  }
  
  // This is the Delete Operation
  document.getElementById('bdelete').onclick = function() {
    id =  document.getElementById('blogid').value;
    firebase.database().ref('Blog/' + id).remove();

    firebase.storage().ref('BlogImage/' +id+'/blog.jpg').delete().then(function() {
        console.log("Image Deleted !!")
    }).catch(function(error) {
        console.log("error Occured")    
    });
    location.reload();
    clearBlog();
  }



// Portfolio

var pselectedFile={};
function onpFileSelected(event) {
 pselectedFile = event.target.files[0];
  var reader = new FileReader();

  var imgtag = document.getElementById("pimageid");
  imgtag.title = pselectedFile.name;

  reader.onload = function(event) {
      imgtag.src = event.target.result;
  };

  reader.readAsDataURL(pselectedFile);
  }



var pimage,pid,ptitle,pexp,plink,psubbtn;

function pready(){
  pid =  document.getElementById('ppotid').value;
  pimage =  document.getElementById('pinpimg').value;
  ptitle  =  document.getElementById('ptitle').value;
  plink  =  document.getElementById('plink').value;
  pexp  =  document.getElementById('pexp').value;
}

function pclear(){
  document.getElementById('ppotid').value="";
  document.getElementById('pinpimg').value="";
  document.getElementById('ptitle').value="";
  document.getElementById('plink').value="";
  document.getElementById('pexp').value="";
  document.getElementById("pimageid").src = "";

}

document.getElementById('psubmit').onclick= e=>{
    pready();
    firebase.database().ref('Portfolio/' + pid).set({
      Id: pid,
      Image: pimage,
      Title: ptitle,
      Explanation:pexp,
      Link : plink

    }).catch(e=>{
      if(e)
        console.log(e.message);
      else
        {
          console.log("Portfolio Created !!");
          location.reload();
        }
      }
    );
    saveImagePortfolio();
    pclear();
};


function saveImagePortfolio(){
    firebase.storage().ref('Portfolio/'+ pid+'/port.jpg').put(pselectedFile).then(function(){
      console.log('Successfully uploaded');
    }).catch(e=> {
      console.log(e.message)
    });
}


// Select The PortFolio
document.getElementById('pselect').onclick = function() {
  pid =  document.getElementById('ppotid').value;
  clearBlog();
  firebase.database().ref('Portfolio/' + pid).on('value', function(snapshot) {

        document.getElementById('ptitle').value=snapshot.val().Title;
        document.getElementById('plink').value=snapshot.val().Link;;
        document.getElementById('pexp').value=snapshot.val().Explanation;;
        firebase.storage().ref('Portfolio/'+ pid+'/port.jpg').getDownloadURL().then(imgUrl =>{
          document.getElementById("pimageid").src = imgUrl;
        }).catch(e=>{
  
        })
  },function(error){
    if(error){
      alert("Data Not Found !!");
    }
    else
    {
      alert("Data Found !!");
    }
      
  });
  
}


// This is the Update Operation
document.getElementById('pupdate').onclick = function() {
  pready();
  firebase.database().ref('Portfolio/' + pid).update({
      Image: pimage,
      Title: ptitle,
      Explanation:pexp,
      Link : plink
  },e=>{
    if(e){
      console.log("Portfolio not updated!!");
    }
    else
    {
      console.log("PortFolio Updated !!");
      location.reload();
    }
  });
  firebase.storage().ref('Portfolio/'+ pid+'/port.jpg').put(pselectedFile).then(function(){
    
  }).catch(e=> {
    console.log(e.message)
  });
  pclear();
}

// This is the Delete Operation
document.getElementById('pdelete').onclick = function() {
  pid =  document.getElementById('ppotid').value;
  firebase.database().ref('Portfolio/' + pid).remove();

  firebase.storage().ref('Portfolio/'+ pid+'/port.jpg').delete().then(function() {
    console.log("Image Deleted !!")
}).catch(function(error) {
    console.log("error Occured")    
});
pclear();
}



// Contact from to read Messages


window.onload = function getContactData(){
  var ref =  firebase.database().ref('Contact');
  ref.on('value',getData,errorData);
}

function getData(data) {

       var conacts = data.val();
       var keys = Object.keys(conacts);
       console.log(keys);
       for(var i=0; i < keys.length;i++){
           var k = keys[i];
           var Name = conacts[k].Name;
           var email = conacts[k].Email;
           var Phone = conacts[k].PhoneNumber;
           var address = conacts[k].Address;
           var comment = conacts[k].Comment;
           
           addComment(Name,email,Phone,address,comment);
   
       }
   
  
}
function errorData(error){
   console.log(error.message);
}

function addComment(Name,email,Phone,address,comment){
  console.log(Name,email,Phone,address,comment);
   var ccontainer = document.getElementById('contact');
    var innerMessage = document.createElement('div');
    innerMessage.classList.add('message-item');

    ccontainer.appendChild(innerMessage);

   var namelbl = document.createElement('label');
   namelbl.innerText = "Full Name : "+Name;
   innerMessage.appendChild(namelbl);

   var emaillbl = document.createElement('label');
    emaillbl.setAttribute('id','button1');
    emaillbl.setAttribute('value',`${email}`);
    emaillbl.setAttribute('role','button');
    emaillbl.setAttribute('onclick',`parent.location="mailto:${email}"`);
   emaillbl.innerText = "Email Address : "+email;
   innerMessage.appendChild(emaillbl);
   var phonelbl = document.createElement('label');
   phonelbl.innerText = "Phone Number : "+Phone;
   innerMessage.appendChild(phonelbl);
   var addresslbl = document.createElement('label');
   addresslbl.innerText = "Physical Address : "+address;
   innerMessage.appendChild(addresslbl);
   var commentlbl = document.createElement('textarea');
   commentlbl.innerText = comment;
   innerMessage.appendChild(commentlbl);

}
