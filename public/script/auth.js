let log = console.log;
let db = firebase.firestore();
let auth=firebase.auth()

const form=document.querySelector('[data-form]')
const email=form['email']
const password=form['password']



form.addEventListener('submit',e=>{
    e.preventDefault();
    log(email.value,
    password.value);

    auth.createUserWithEmailAndPassword(email.value,password.value).then(cred=>{
    log(cred.user._delegate.uid)
})
    form.reset()
})

auth.onAuthStateChanged(user=>{
    if(user){
        log('sign in very good')

        window.location='index.html'
        log(user)
    }
    else {
        log('sign out')
    }
})


//  db.collection('user').doc('3711').get().then(snapshot => {
//    //get specific document
//    console.log(snapshot.data())
//  })
