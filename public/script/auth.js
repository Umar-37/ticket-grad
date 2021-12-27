let log = console.log;
let db = firebase.firestore();
let auth = firebase.auth()
//-------buyer data---------------
const form = document.getElementById('form')
const email = document.getElementById('email-address')
const password = document.getElementById('password')
const phone = document.getElementById('phone')
//-------organizer data------------------------
let orgName = document.getElementById('name-org')
let busAdd = document.getElementById('business-add')
let bank = document.getElementById('bank')
let street = document.getElementById('street-address')
let iban = document.getElementById('iban')
//	-------------------------------------			
const submitBuyer = document.getElementById('buyerButton')

const loader = document.getElementById('loader-1');
window.pop = 0 //globle varible
const temp = document.getElementById('mass-template');
var count = 0;

form.addEventListener('submit', e => {
    window.formData = new FormData(document.querySelector('form'))
    loader.classList.toggle('hidden')
    checker()
    e.preventDefault();
    log(email.value,
        password.value);




    //  form.reset()
})

//---------------- function area -----------------------
function checker() {
    let passwordChecker;
    for (var pair of formData.entries()) {
        if (!pair[1] == '') {
            pop = 0
        }
        log(pair[0] + ':', pair[1])
        if (pair[0] == '' || pair[1] == '') {
            pop = 1;
            popUp('fill the blank')
            //loader.classList.toggle('hidden')
            break;
        }
        if (pair[0] == 'ThePassword' || pair[0] == 'conform-password') {
            if (pair[0] == 'ThePassword') {
                passwordChecker = pair[1]
            }
            if (pair[0] == 'conform-password') {
                if (!pair[1] == '' && !pair[1].includes(passwordChecker)) {
                    popUp('write your and password and conform it again')
                    pop = 1;
                    break;
                }
            }
            popUp('fill the blank')
            //loader.classList.toggle('hidden')
            break;
        }
        if(pair[0]=='postal-code'){
            let isnum = /^\d+$/.test(pair[1]);
            if(!isnum){
                pop=1
                popUp('ZIP must contain only digits')
                break;
            }
        }

    }
    if (pop == 0) {
        auth.createUserWithEmailAndPassword(email.value, password.value).then(cred => {
            //if he sign up then let's crete docment for him in database
            createUserInfo(cred, orgName.disabled)
        })
            .catch(error => {
                if (error.code == 'auth/wrong-password') {
                    popUp('Wrong password. Try again', true)
                }
                else if (error.code == 'auth/too-many-requests') {
                    popUp('Accouont temporary suspended, try after one hour')
                }
                else if (error.code == 'auth/user-not-found') {
                    popUp('User not found. Sign up first')

                } else if (error.code == 'auth/email-already-in-use') {
                    popUp('email already in use')

                } else {
                    popUp('something wrong happen')
                }
                // loader.classList.toggle('hidden') 
            })
    }
    pop=0
}
function popUp(mass){
    popUpMassege(' ')
    popUpMassege(mass)
}

function popUpMassege(mass) {
    //submitionButton.disabled = false
    loader.classList.toggle('hidden')
    const tempNode = document.importNode(temp.content, true)
    const popUp = document.querySelectorAll('[data-new-toFade]')[count]

    //passwrod ? pass.value='':false;

    if (popUp) {
        popUp.classList.toggle('hidden')
        log(popUp)
        count++;
    }
    tempNode.querySelector('label').innerText = mass
    container.appendChild(tempNode)
}

function createUserInfo(data, isBuyer) {
    //if isBuyer false that mean he is organizer
    if (isBuyer) {
        var newUser = {
            id: data.user.uid,
            email: data.user.email,
            password: password.value,
            name: null || "default",
            phoneNum: phone.value,
            userType: 0
        }
    }
    else {
        var newUser = {
            id: data.user.uid,
            email: data.user.email,
            password: password.value,
            organizationName: orgName.value || "default",
            phoneNum: phone.value,
            bank: bank.value,
            streetAddress: street.value,

            iban: iban.value,
            userType: 1
        }
    }
    // now create user document
    createUserDoc(newUser)

}

function createUserDoc(user) {

    db.collection("users").doc(user.id).set(user)
        .then(() => {
            console.log("Document successfully written!");
            window.location = 'indexHisham.html'
        })
        .catch(error => {
            if (error.code == 'auth/wrong-password') {
                popUp('Wrong password. Try again', true)
            }
            else if (error.code == 'auth/too-many-requests') {
                popUp('Accouont temporary suspended, try after one hour')
            }
            else if (error.code == 'auth/user-not-found') {
                popUp('User not found. Sign up first')

            } else if (error.code == 'auth/email-already-in-use') {
                popUp('email already in use')

            } else {
                popUp('something wrong happen')
            }
        })

}

// function userData() {
//     const user = firebase.auth().currentUser;
//     if (user !== null) {
//         // The user object has basic properties such as display name, email, etc.
//         const displayName = user.displayName;
//         const email = user.email;
//         const photoURL = user.photoURL;
//         const emailVerified = user.emailVerified;
//         log('this is the user:')
//         log(user)
//     }
//     else
//         log('bad thing')
// }

//  db.collection('user').doc('3711').get().then(snapshot => {
//    //get specific document
//    console.log(snapshot.data())
//  })
