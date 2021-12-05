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
    document.getElementById('sign/login').classList.toggle('hidden')
    log('sign in very good im in the event page')
    getData()
  }
  else {
    log('sign out i am in the event page')

    //  window.location='index.html'
  }
})
//////////
function redirect() {
  document.querySelectorAll('[data-button-redirect]').forEach(element => {
    element.addEventListener('click', event => {
      event.stopPropagation()
      if (event.target.ndoeName = "BUTTON") {
        eventId = []
        eventId.push(event.target.dataset.eventId)
        console.log(eventId);
        localStorage.setItem(LOCAL_STORAGE_EVENT_ID, JSON.stringify(eventId))
        window.location = 'eventPage.html' //
      }
    }, false)
  })

}
function render(doc) {
  const temp = document.importNode(eventTemplate.content, true)
  const name = temp.querySelector('#name')
  const location = temp.querySelector('#location')
  const date = temp.querySelector('#date')
  const img = temp.querySelector('#img')
  //console.log(doc.data());
  ////
  img.src = doc.data().path
  name.textContent = doc.data().EventName
  location.textContent += doc.data().region
  // add date
  doc.data().date.forEach(theDate => {
    date.textContent += theDate + '- '
  })
  date.textContent = date.textContent.substring(0, date.textContent.length - 2)//to remove the last comma ","
  //time
  //descripting

  temp.querySelector('#button').setAttribute('data-event-id', doc.id)

  container.appendChild(temp)
}
function getData() {
    let eventRef=db.collection('events');
    let query='default'
      switch (window.location.pathname) {
        case '/indexAnwar.html':
        query=eventRef.where("eventType","==","Concert")
            break;
        case '/sport.html':
        query=eventRef.where('eventType','==','Sport')
            break;
        case '/entertainment.html':
        query=eventRef.where('eventType','==','Entertainment')
            break;
        case '/theater.html':
        query=eventRef.where('eventType','==','Theater')
            break;
        default:
          console.log('some thing worng happen');
      }
      query.get().then(event=>{
        event.forEach(element => {
            render(element)
            redirect()
        });
      }).catch(e=>console.log(e))
         // }//else popUp('there are\'t Concert event')
}