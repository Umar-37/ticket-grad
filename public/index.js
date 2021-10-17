let log = console.log;
let db = firebase.firestore();

    
db.collection('user').doc('*').get().then(snapshot => {
  //get specific document
  console.log(snapshot.data())
})