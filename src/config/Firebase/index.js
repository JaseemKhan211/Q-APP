import * as firebase from 'firebase';


const firebaseConfig = {
    apiKey: "AIzaSyB1aQi2jlboPhA-CdMJcHvi7vwqGnZxDtY",
    authDomain: "q-app-b2861.firebaseapp.com",
    databaseURL: "https://q-app-b2861.firebaseio.com",
    projectId: "q-app-b2861",
    storageBucket: "q-app-b2861.appspot.com",
    messagingSenderId: "833576767598",
    appId: "1:833576767598:web:e600ac11e04ff5b628d67f",
    measurementId: "G-9WG38FJHJW"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const auth = firebase.auth()
  const db = firebase.firestore();

  const registerUser = async (email, password) =>{
    return await auth.createUserWithEmailAndPassword(email, password);
  }
  
  const loginUser = async (email, password) =>{
    return await auth.signInWithEmailAndPassword(email, password);
  }
  
  const Companies_list_data_add = (companyName, since, timings, address, totalToken, remainingToken) =>{
    db.collection('Companies List')
    .add
    ({
      companyName,
      since,
      timings,
      address,
      totalToken, 
      remainingToken
    })
    .then(() =>{
      alert('Transaction Successful')
    })
  }
  
  const Companies_list_data_get = () =>{
    return db.collection('Companies List')
    .get()
}

  const facbookLogin = () =>{
    const provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(result) {
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      // ...
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
  }
  const get_specific_data = (transactionsId) =>{
    return db.collection('Companies List')
    .doc(transactionsId)
    .get()
  }

  export{
    registerUser,
    loginUser,
    firebase,
    Companies_list_data_add,
    Companies_list_data_get,
    facbookLogin,
    get_specific_data
  }