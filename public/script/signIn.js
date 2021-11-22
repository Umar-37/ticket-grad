let log = console.log;
let db = firebase.firestore();
let auth = firebase.auth()
//----------------------
let form = document.getElementById('form')
let email = document.getElementById('email-address')
let pass = document.getElementById('password')
const temp = document.getElementById('mass-template');

let container = document.getElementById('here')
var count=0;
//-------------------------
form.addEventListener('submit', e => {
    e.preventDefault()
    auth.signInWithEmailAndPassword(email.value, pass.value).then(cred => {
        console.log(cred.user)
        window.location = 'indexHisham.html'
        //form.reset()
    }).catch(error => {
        if (error.code == 'auth/wrong-password') {
            popUp('Wrong password. Try again')
        }
        else if (error.code == 'auth/too-many-requests') {
            popUp('Accouont temporary suspended, try after one hour')
        }
        else if (error.code == 'auth/user-not-found') {
            popUp('User not found. Sign up first')

        } else {
            popUp('something wrong happen')
        }
    })

})
function popUp(mass) {
    const tempNode = document.importNode(temp.content, true)
    const popUp=document.querySelectorAll('[data-new-toFade]')[count]

    if(popUp){
    popUp.classList.toggle('hidden')
    log(popUp)
    count++;
    }
    tempNode.querySelector('label').innerText = mass
    container.appendChild(tempNode)
}