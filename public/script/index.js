let log = console.log
let db = firebase.firestore();
let auth = firebase.auth()
const eventTemplate = document.getElementById('eventTemplate')
const container = document.getElementById('eventContainer')
//var eventId=0;
const LOCAL_STORAGE_EVENT_ID = 'eventId'
var eventId = JSON.parse(localStorage.getItem(LOCAL_STORAGE_EVENT_ID))
  || [];//get local storge if have,if not then create empty array

auth.onAuthStateChanged(user => {
  if (user) {
    log('sign in very good im in the index page')
    getData()

    //  window.location='index.html'
  }
  else {
    document.getElementById('sign/login').classList.toggle('hidden')
    log('sign out i am in the index page')
  }
})
//function signOut()
//--------------------------------
function render(doc) {
  clearElement(container)
  const temp = document.importNode(eventTemplate.content, true)
  const img = temp.querySelector('img')
  const p = temp.querySelector('p')
  const spanLocation = temp.querySelector('#location-span-card')
  const spanDate = temp.querySelector('#date-span-card')
  const eventCard = temp.querySelector('#eventCard')
  ////
  img.src = doc.data().path
  p.textContent = doc.data().EventName
  spanLocation.textContent = doc.data().region
  spanDate.textContent = doc.data().date[0]
  eventCard.setAttribute('data-event-id', doc.id)
  img.setAttribute('data-event-id', doc.id)

  container.appendChild(temp)
}
function clearElement(element) {
  //while (element.firstChild) {
  console.log(element);
  //element.removeChild(element.firstChild)
}
function redirect() {
  document.querySelectorAll('[data-event-id]').forEach(element => {
    element.addEventListener('click', event => {
      event.stopPropagation()
      if (event.target.ndoeName = "IMG") {
        eventId = []
        eventId.push(event.target.dataset.eventId)
        console.log(eventId);
        localStorage.setItem(LOCAL_STORAGE_EVENT_ID, JSON.stringify(eventId))
        window.location = 'eventPage.html' //
      }
    }, false)
  })

}
function getData() {
  db.collection('events').get().then(snapshot => {
    snapshot.docs.forEach(doc => {
      render(doc)
      redirect()
    })
  })
}