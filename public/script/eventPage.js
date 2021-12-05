let log = console.log
let db = firebase.firestore();
let auth = firebase.auth()
////////
const container = document.getElementById('container')
const eventTemplate = document.getElementById('template')
const LOCAL_STORAGE_EVENT_ID = 'eventId'
var eventId = JSON.parse(localStorage.getItem(LOCAL_STORAGE_EVENT_ID))
    || [];
/////////

auth.onAuthStateChanged(user => {
    if (user) {
        log('sign in very good im in the event page')
        getData()
    }
    else {
    document.getElementById('sign/login').classList.toggle('hidden')
        log('sign out i am in the event page')

        //  window.location='index.html'
    }
})
//////////
function render(doc) {
    const temp = document.importNode(eventTemplate.content, true)
    const name = temp.querySelector('#name')
    const location = temp.querySelector('#loacation')
    const date = temp.querySelector('#date')
    const time = temp.querySelector('#time')
    const des = temp.querySelector('#description')
    //console.log(doc.data());
    ////
    //img.src=doc.data().path
    name.textContent = doc.data().EventName
    location.textContent += doc.data().region
    // add date
    doc.data().date.forEach(theDate => {
        date.textContent += theDate + '- '
    })
    date.textContent = date.textContent.substring(0, date.textContent.length - 2)//to remove the last comma ","
    //time
    time.textContent += doc.data().time
    //descripting

    des.textContent += doc.data().description
    //img.setAttribute('data-event-id',doc.id)

    container.appendChild(temp)
    document.getElementById('img').style.background = 'url(' + doc.data().path + ')'
    document.getElementById('img').style.backgroundSize = 'cover'
    document.getElementById('img').style.backgroundPosition = 'center'
}
function getData() {
    db.collection('events').doc(eventId[0]).get().then(doc => {
        render(doc)
        //redirect()
    })
}