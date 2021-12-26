let log = console.log
let db = firebase.firestore();
let auth = firebase.auth()
////////
const container = document.querySelector('#container')
const template = document.querySelector('template')
auth.onAuthStateChanged(user => {
    if (user) {
        log('sign in very good im in the index page')
        getData(user)
        ///
        //search()

        //  window.location='index.html'
    }
    else {
        document.getElementById('sign/login').classList.toggle('hidden')
        log('sign out i am in the index page')
    }
})


//function area
function getData(user) {
    db.collection('purchases').where('buyer', '==', user.uid).get().then(snapshot => {
        snapshot.docs.forEach(doc => {
            render(doc)
            //redirect()
        })
    })
}
function render(doc) {
    //clearElement(container)
    const temp = document.importNode(template.content, true)
    let img = temp.querySelector('img')
    //let h2 = temp.querySelector('#h2')
    //let location = temp.querySelector('#location')
    let type = temp.querySelector('#type')
    let name = temp.querySelector('#name')
    ////
    var qrcode = new QRCode(temp.getElementById("qrcode-2"), {
	text: doc.data().ticketId,
	width: 128,
	height: 128,
	colorDark : "#5868bf",
	colorLight : "#ffffff",
	correctLevel : QRCode.CorrectLevel.H
});
///
    img.src = doc.data().path
    //h2.textContent = doc.data().eventName
    //location=textContent=doc.data().location
    if (doc.data().ticketType  == 'regTicket') {
    type.textContent ='Regular'||'default'
    }
    else if (doc.data().ticketType  == 'silTicket') {
    type.textContent ='Silver'||'default'
    }
    else type.textContent ='VIP'||'default'
   // type.textContent = doc.data().ticketType ||'default'
    name.textContent = doc.data().eventName || 'default'
    //location.textContent = ''//doc.data().ticketId || 'default'

    container.appendChild(temp)
}