let log = console.log;
let db = firebase.firestore();
let auth = firebase.auth()
let storageRef = firebase.storage().ref();
let theImg = null;
let path;
const fileImg = document.getElementById("file");
let container = document.getElementById('here')
const temp = document.getElementById('mass-template');
///////////
const submitionButton = document.getElementById('submitionButton');
const loader = document.getElementById('loader-1');
///////
var count = 0;
//////////////////////////////
fileImg.addEventListener("change", handleFiles, false);
function handleFiles() {
  theImg = this.files[0]; /* now you can work with the file list */
}

//const formData = new FormData(document.querySelector('form'))
window.onload = function () {
  initApp();
};
//////////////////////////////
function initApp() {
  auth.onAuthStateChanged(function (user) {
    if (user) {
      document.querySelector('form').addEventListener('submit', e => {
        submitionButton.disabled = 'true'
        //submitionButton.classList.toggle('hidden')
        loader.classList.toggle('hidden')
        pop = 0 //globle varible
        formData = new FormData(document.querySelector('form'))
        e.preventDefault()
        dataUser = {} //define it as globel object to access it in code below
        looping(user)
        if (pop >= 1) { return 0 }
        path = saveImg(theImg)
        //createDoc(path)
        //form.reset()
      })
    } else window.location = 'indexHisham.html'  //enable this
  })

}
//-------function area------------------
function looping(user) {
  let cccount=0
  let array=[]
  let array1=[]
  let array2=[]
  // let ticketData=pair[0]=='ticketPrice'||pair[0]=='ticketPrice1'||pair[0]=='ticketPrice2'||
  //     pair[0]=='ticketType'||pair[0]=='ticketType1'||pair[0]=='ticketType2'||
  //     pair[0]=='numberTickets'||pair[0]=='numberTickets1'||pair[0]=='numberTickets2';

   for (var pair of formData.entries()) {
    log(pair[0] + ':', pair[1])
    if (pair[1] == '' || pair[1].name == '') {
      pop = 1;
      popUp('fill the blank')
      break;
    }
    if (pair[0] == 'date') {
      //idk take it from here https://stackoverflow.com/questions/12482961/change-values-in-array-when-doing-foreach
      dp.selectedDates.forEach(function (part, index) {
        //must convert it to a string by toString ,then remove what we dont want by replace function 
        this[index] = part.toString().replace('00:00:00 GMT+0300 (Arabian Standard Time)', '');
      }, dp.selectedDates); // use arr as this
      pair[1] = dp.selectedDates
    }if(pair[0]=='ticketPrice'||pair[0]=='ticketPrice1'||pair[0]=='ticketPrice2'||
      pair[0]=='ticketType'||pair[0]=='ticketType1'||pair[0]=='ticketType2'||
      pair[0]=='numberTickets'||pair[0]=='numberTickets1'||pair[0]=='numberTickets2'){
        
      //dataUser.types=pair[1]
      if(pair[0]=='ticketType'||pair[0]=='ticketPrice'||pair[0]=='numberTickets')
      array.push(pair[1])
      else if(pair[0]=='ticketType1'||pair[0]=='ticketPrice1'||pair[0]=='numberTickets1')
      array1.push(pair[1])
      else array2.push(pair[1])
      
      cccount++
      log(dataUser)
    }else dataUser[pair[0]] = pair[1];
  }

  dataUser.owner = user.uid
  dataUser.regTicket =array 
  dataUser.silTicket =array1
  dataUser.vipTicket =array2 
}
function createDoc(Path) {
  delete dataUser.file //becasue it contain the img data and firebase does not store this type of object
  dataUser.path = Path
  db.collection("events").add(dataUser)
    .then(() => {
      console.log("Document successfully written!");
      form.reset()
      window.location = 'indexHisham.html'
    })
    .catch((error) => {

      console.error("Error writing document: ", error.code);
      popUp(error.code)
    });
}
function saveImg(file) {
  console.log('this is the pic', file);
  var metadata = {
    'contentType': file.type
  };

  // Push to child path.
  let pathToImg = 'default';
  storageRef.child('images/' + file.name).put(file, metadata).then(function (snapshot) {
    console.log('Uploaded', snapshot.totalBytes, 'bytes.');
    console.log('File metadata:', snapshot.metadata);
    pathToImg = snapshot.metadata.fullPath
    storageRef.child(pathToImg).getDownloadURL().then((url) => {
      pathToImg = url;
      createDoc(pathToImg)//document.getElementById('linkbox').innerHTML = '<img src="' +  url + '">Click For File</a>';
    });
    //createDoc(pathToImg)
    return pathToImg  // Let's get a download URL for the file.
    // snapshot.ref.getDownloadURL().then(function(url) {
    //   console.log('File available at', url);
    //   document.getElementById('linkbox').innerHTML = '<img src="' +  url + '">Click For File</a>';
    // });
  }).catch(function (error) {
    console.error('Upload failed:', error);
    popUp(error.code)
  });
}
function popUp(mass) {
  submitionButton.disabled = false
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
////////////////////--end of function related to saveing data-----------------------
////////////////////////////////////////////////////////////////////////////////////////////
//-----------------start of DOM manipulation 













































//import {AirDatepicker}from "./../node_modules/air-datepicker/index.es";
const en = require('air-datepicker/locale/en').default
const AirDatepicker = require('air-datepicker')
//import en from "air-datepicker/locale/en";


///
var dateObj = new Date();
let month = dateObj.getUTCMonth() + 1; //months from 1-12
let day = dateObj.getUTCDate();
let year = dateObj.getUTCFullYear();
let today = year + "/" + month + "/" + day;
let options = {
  locale: en,
  minDate: today,
  today,
  multipleDates: true
  // ,  selectedDates: [today]
}
var dp = new AirDatepicker("#dp", options);
////////////////////////////////////////////////////////
//    code that handle image viewing

class ImageInputField extends HTMLElement {
  connectedCallback() {
    // Configure click listeners for the two buttons
    // and a change listener for the input field
    this.configureListeners()

    // Hide the remove button by default as initially
    // there won't be a file selected
    this.removeButton.style.display = "none"

    // Hide the input field as it's only used under
    // the hood.
    // The user clicks on the "Select Image" button
    this.input.style.display = "none"

    // Restrict the input field to images only
    this.input.accept = "image/*"
  }

  get input() {
    return this.querySelector("input[type=file]")
  }

  get selectButton() {
    return this.querySelector("button[select]")
  }

  get removeButton() {
    return this.querySelector("button[remove]")
  }

  get preview() {
    return this.querySelector("img[preview]")
  }

  removeImage() {
    this.preview.removeAttribute("src")
    this.input.value = ""
    this.removeButton.style.display = "none"
  }

  // Read the image off the disk and set it to our img element
  showPreview(image) {
    let reader = new FileReader();
    reader.onload = (event) => {
      this.preview.setAttribute("src", event.target.result)
    }

    reader.readAsDataURL(image);
    this.removeButton.style.removeProperty("display")
  }

  configureListeners() {
    this.input.addEventListener('change', event => {
      let file = event.target.files[0]
      this.showPreview(file)
    })

    this.selectButton.addEventListener('click', () => {
      this.input.click()
    })

    this.removeButton.addEventListener('click', () => {
      this.removeImage()
    })
  }
}

// Register our custom element with the CustomElementRegistry
customElements.define('image-input-field', ImageInputField)
/////////////////////////////////////////////////////////

