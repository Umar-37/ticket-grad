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


form.addEventListener('submit', e => {
    e.preventDefault();
    log(email.value,
        password.value);

    auth.createUserWithEmailAndPassword(email.value, password.value).then(cred => {
        //if he sign up then let's crete docment for him in database
        createUserInfo(cred, orgName.disabled)
    })
        .catch(cred => {
            log(cred, "this is inside catch")
        })



    //  form.reset()
})

//---------------- function area -----------------------
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
        })
        .catch((error) => {
            console.error("Error writing document: ", error.code);
        });

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
