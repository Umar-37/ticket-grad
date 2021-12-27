let log = console.log
let db = firebase.firestore();
let auth = firebase.auth()
////////
const eventTemplate = document.querySelector('template')
const container = document.querySelector('#container')
//
const eventName = document.querySelector('#eventName')
const location = document.querySelector('#location')
const loader = document.getElementById('loader-1');
const submitionButton = document.querySelector('button');

const LOCAL_STORAGE_EVENT_ID = 'eventId'
var eventId = JSON.parse(localStorage.getItem(LOCAL_STORAGE_EVENT_ID))
    || null;
//
const LOCAL_STORAGE_TICKET = 'theTicket'
auth.onAuthStateChanged(user => {
    if (user) {
        log('sign in very good im in the event page')
        getData()
        document.querySelector('form').addEventListener('submit', e => { checkout(e, user) })
    }
    else {
        document.getElementById('sign/login').classList.toggle('hidden')
        log('sign out i am in the event page')

        //  window.location='index.html'
    }
})
//function area //-------------------------
function checkout(event, user) {
    const data = {}
    event.preventDefault()
    submitionButton.disabled = true
    loader.classList.toggle('hidden')
    let formData = new FormData(document.querySelector('form'))
    //log(formData.values([0]))
    var theDate = new Date().toJSON().slice(0, 10).replace(/-/g, '/');
    for (var pair of formData.entries()) {
            console.log(pair[0],pair[1])
        data['buyer'] = user.uid
        data['eventId'] = eventId[0]
        data['ticketType'] = pair[1]
        data['ticketId'] = Date.now().toString()
        data['date'] = theDate
        data['path'] = theDocument.path
        data['eventName'] = theDocument.EventName
    }
    log(data)
        localStorage.setItem(LOCAL_STORAGE_TICKET, JSON.stringify(data))
    createDoc(data)
}
function createDoc(dataUser) {
    decrement(dataUser)

    db.collection("purchases").add(dataUser)
        .then(() => {
            console.log("Document successfully written!");
            window.location = 'checkout.html'
        })
        .catch((error) => {

            console.error("Error writing document: ", error.code);
            popUp(error.code)
        });

}
function decrement(dataUser) {
    let type = dataUser.ticketType
    let arr = [theDocument[type][0], theDocument[type][1], (theDocument[type][2]) - 1]
    if (type == 'regTicket') {
        db.collection('events').doc(dataUser.eventId).set({ regTicket: arr }, { merge: true }).then(() => { log('update sucss') }).catch(e => { log('udpate faild:', e) })
    }
    else if (type == 'silTicket') {
        db.collection('events').doc(dataUser.eventId).set({ silTicket: arr }, { merge: true }).then(() => { log('update sucss') }).catch(e => { log('udpate faild:', e) })
    }
    else { db.collection('events').doc(dataUser.eventId).set({ vipTicket: arr }, { merge: true }).then(() => { log('update sucss') }).catch(e => { log('udpate faild:', e) }) }
}
function getData() {
    db.collection('events').doc(eventId[0]).get().then(doc => {
        renderTicket(doc)
        //make it globle
        globalThis.theDocument = doc.data()
        //redirect()
    })
        .catch(error => log('error while geting data: ', error))
}
function createTicket(type, price, theName) {
    const temp = document.importNode(eventTemplate.content, true)
    let typeTag = temp.querySelector('#type')
    let priceTag = temp.querySelector('#price')
    let name = temp.querySelector('#name')

    typeTag.textContent = type
    priceTag.textContent = price
    name.setAttribute('name', 'type')
    name.setAttribute('value', theName)
    container.appendChild(temp)
}
function renderTicket(doc) {
    let types = doc.data()
    eventName.textContent += types.EventName
    location.textContent += types.region
    if (types.vipTicket[0]) {
        createTicket(types.vipTicket[0], types.vipTicket[1], 'vipTicket')
        createTicket(types.silTicket[0], types.silTicket[1], 'silTicket')
        createTicket(types.regTicket[0], types.regTicket[1], 'regTicket')
    } else if (types.silTicket[0]) {
        if(types.silTicket[0]!='VIP'){
        createTicket(types.silTicket[0], types.silTicket[1], 'silTicket')
        createTicket(types.regTicket[0], types.regTicket[1], 'regTicket')
        }
        // else{
        // createTicket(types.silTicket[0], types.silTicket[1], 'vipTicket')
        // createTicket(types.regTicket[0], types.regTicket[1], 'regTicket')
 
        // }
    } else {
        createTicket(types.regTicket[0], types.regTicket[1], 'regTicket')
        //just one ticket
    }

}
//