let log = console.log
let db = firebase.firestore();
let auth = firebase.auth()
const eventTemplate = document.getElementById('eventTemplate')
const container = document.getElementById('eventContainer')
//submit button for search functionality
const form = document.getElementById('searchForm');
//var eventId=0;
const LOCAL_STORAGE_EVENT_ID = 'eventId'
var eventId = JSON.parse(localStorage.getItem(LOCAL_STORAGE_EVENT_ID))
  || [];//get local storge if have,if not then create empty array
let array;
let array2;
let array3
var theDate = new Date()
auth.onAuthStateChanged(user => {
  if (user) {
    db.collection('users').doc(user.uid).get().then(snapshot => {
      if (snapshot.data().userType == 1) {
        document.getElementById('dashboard').classList.toggle('hidden')

        getData()
        search()
      } else {
        document.getElementById('myTicket').classList.toggle('hidden')
        getData()
        search()
      }
    })

    log('sign in very good im in the index page', user.uid)

    //  window.location='index.html'
  }
  else {
    getData()
    ///
    search()
    document.getElementById('sign/login').classList.toggle('hidden')
    //document.getElementById('dashboard').classList.toggle('hidden')
    log('sign out i am in the index page')
  }
})
//function signOut()
//--------------------------------
function search() {
  form.addEventListener('submit', e => {
    array = []
    array2 = []
    array3 = []
    e.preventDefault()
    let formData = new FormData(form)
    for (var pair of formData.entries()) {
      if (pair[0] == 'location') { array.push(pair[1].toLowerCase()) }
      if (pair[0] == 'category') { array2.push(pair[1]) }
      if (pair[0] == 'date') {
        array3.push(pair[1])
      }
    }
    dataFilter()
  })
}
function dataFilter() {
  let eventRef = db.collection('events');
  let query = 'default'
  if (array.length > 0) {
    query = eventRef.where('region', 'in', array)
  }
  else if (array2 > 0) {
    query = eventRef.where('eventType', 'in', array2)
  }
  else { query = eventRef }
  query.get().then(event => {
    //now event have only dammam events
    clearElement(container)
    event.forEach(element => {
      let day = parseInt(element.data().date[0].substring(8, 10))//day number like 09
      let month = getMonthFromString(element.data().date[0].slice(4, 7))//day number like 09
      let year = parseInt(element.data().date[0].substring(11, 15))//day number like 09
      let dateObj = { day, month, year }
      if (array2.length > 0) {
        if (array2.includes(element.data().eventType)) {
          if (array.length > 0) {
            log('inside the third if')
            dateChecker(element, array3, dateObj)
            redirect()
          } else {
            log('iam in the first else')
            render(element)
            redirect()
          }

        }
      }
      else {
        log('iam in the second else')
        dateChecker(element, array3, dateObj, array3)
        redirect()
        //render(element)
      }
    });
  }).catch(e => console.log('wrong thing', e))
  // }//else popUp('there are\'t Concert event')
}
//this function is bad, but it works 
function dateChecker(element, array3, dateObj, ifArray3) {
  if (ifArray3) { array3 = ifArray3 }
  let day = dateObj.day
  let month = dateObj.month
  let year = dateObj.year
  switch (array3[0]) {
    case "today": if (theDate.getDate() == day && theDate.getFullYear()==year) {
      render(element)
    }
      break;
    case "week": if (theDate.getDate() - 7 <= day && theDate.getDate() + 7 >= day) { render(element); }
      break;
    case "month": if (month == (theDate.getMonth() + 1)) { render(element); }
      break;
    case "year": if (theDate.getFullYear() == year) { render(element); }
      break;
    default: if (month <= (theDate.getMonth() + 1) && theDate.getFullYear() <= year) { log('in the defualt:'); render(element); }
      break;
  }
}
function render(doc) {
  //clearElement(container)
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
  while (element.firstChild) {
    //console.log(element);
    element.removeChild(element.firstChild)
  }
}
function redirect() {
  log('inside redireect ')
  // for(let i=0;i<2000;i++){
  //   log(i)
  // }
  document.querySelectorAll('[data-event-id]').forEach(element => {
    log(element)
    element.addEventListener('click', event => {
      event.stopPropagation()
      log('the event:',event)
      if (event.target.ndoeName = "IMG") {
        //     AudioB()
        eventId = []
        eventId.push(event.target.dataset.eventId)
        localStorage.setItem(LOCAL_STORAGE_EVENT_ID, JSON.stringify(eventId))
        window.location = 'eventPage.html' //
      }
    }, false)
  })
}
// function AudioB(){
//  var audio = new Audio('https://cdn.discordapp.com/attachments/863205908376322068/921852653238108200/video0.mov');
//              audio.play();
//              for(let x=0;x<9999;x++){

//              }
// }
function getData() {
  db.collection('events').get().then(snapshot => {
    snapshot.docs.forEach(doc => {
      render(doc)
    })
      redirect()
  })
}
function getMonthFromString(mon) {
  return new Date(Date.parse(mon + " 1, 2012")).getMonth() + 1
}