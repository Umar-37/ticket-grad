let log = console.log
let db = firebase.firestore();
let auth=firebase.auth()
const eventTemplate=document.getElementById('eventTemplate')
const container=document.getElementById('eventContainer')
//export default db;


db.collection('user').doc('3711').get().then(snapshot => {
  //get specific document
  //log(snapshot.data())
})

auth.onAuthStateChanged(user=>{
    if(user){
        log('sign in very good im in the index page')
        getData()
      //  window.location='index.html'
    }
    else {
        log('sign out i am in the index page')
    }
})
//function signOut()
//--------------------------------
function render(doc){
  const temp=document.importNode(eventTemplate.content,true) 
  const img=temp.querySelector('img')
  const p=temp.querySelector('p')
  const spanLocation=temp.querySelector('#location-span-card')
  const spanDate=temp.querySelector('#date-span-card')
  ////
  img.src=doc.data().path
  p.textContent=doc.data().EventName
  spanLocation.textContent=doc.data().region
  spanDate.textContent=doc.data().date[0]

  container.appendChild(temp)
}
function getData(){
  db.collection('events').get().then(snapshot=>{
    snapshot.docs.forEach(doc=>{
      render(doc)
    })
  })
}