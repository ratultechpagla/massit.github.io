var firebaseConfig = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ":",
    measurementId: ""
  };
  firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth()
  const db = firebase.firestore()
  //Check if signed in
  chkUser()
  function chkUser(){
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      document.querySelector("#accSignedOut").style.display = "none"
      document.querySelector("#logOutBtn").removeAttribute = "style"
      document.querySelector("#accSignedIn").removeAttribute = "style"
      document.querySelector("#currentEmail").innerHTML = auth.currentUser.email
    }
    else{        
        console.log("oh!")
      document.querySelector("#accSignedOut").removeAttribute = "style"
      document.querySelector("#logOutBtn").style.display = "none"
      document.querySelector("#accSignedIn").style.display = "none"
    }
  });
  }

//Add User
document.querySelector("#upPass").addEventListener("keyup",(e)=>{
    if(e.keyCode == 13){
        addUser()
    }
})
function setName(){
    var user = firebase.auth().currentUser;
    user.updateProfile({
        displayName: document.querySelector("#upUser").value,
      })
}
function addUser(){
    let email = document.querySelector("#upEmail").value
    let password = document.querySelector("#upPass").value
    firebase.auth().createUserWithEmailAndPassword(email, password).then(
        setName(),
        chkUser()
        )
        .catch(function(error) {
          var errorCode = error.code;
          var errorMessage = error.message;
          document.querySelector("#log").innerHTML = `${errorMessage} : ${errorCode}`
        })
}



//Sign In
document.querySelector("#inPass").addEventListener("keyup",(e)=>{
    if(e.keyCode == 13){
        inUser()
        chkUser()
    }
})
function inUser(){
    let email = document.querySelector("#inEmail").value
    let password = document.querySelector("#inPass").value
  firebase.auth().signInWithEmailAndPassword(email, password).then(
    chkUser()
  ).catch(function(error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    document.querySelector("#log").innerHTML = `${errorMessage} : ${errorCode}`
  });

}


//Sign Out
function logOut(){
    firebase.auth().signOut().then(function() {

        chkUser()
    }).catch(function(error) {
        alert(error)
    });
}