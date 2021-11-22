let log = console.log;
let db = firebase.firestore();
let auth = firebase.auth()
//----------------------
let form =document.getElementById('form')
let email =document.getElementById('email-address')
let pass =document.getElementById('password')
//-------------------------
form.addEventListener('submit',e=>{
    e.preventDefault()

auth.signInWithEmailAndPassword(email.value,pass.value).then(cred=>{
console.log(cred.user)
//window.location='indexHisham.html'
//form.reset()
}).catch(error =>{
    log('some shit happen\n',error)
})

})
