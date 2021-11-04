
let log = console.log
 let db = firebase.firestore();
let auth=firebase.auth()
//export default db;


db.collection('user').doc('3711').get().then(snapshot => {
  //get specific document
  log(snapshot.data())
})

auth.onAuthStateChanged(user=>{
    if(user){
        log('sign in very good im in the index page')
      //  window.location='index.html'
    }
    else {
        log('sign out i am in the index page')
    }
})
//function signOut()
