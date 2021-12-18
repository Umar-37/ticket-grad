const LOCAL_STORAGE_TICKET = 'theTicket'
var ticket= JSON.parse(localStorage.getItem(LOCAL_STORAGE_TICKET)) ||null
console.log(ticket)
render()
//function area---------
function render(){
 let   id =document.getElementById('number')
 let   type =document.getElementById('type')
 let   name =document.getElementById('name')
 id.textContent=ticket.ticketId
 if(ticket.ticketType=='regTicket'){
 type.textContent='Regular'
 }
 else if(ticket.ticketType=='silTicket'){
     type.textContent="silver"
 }else type.textContent="VIP"
 name.textContent=ticket.eventName
}