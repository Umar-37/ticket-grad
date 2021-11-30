let log = console.log;
let db = firebase.firestore();
let auth = firebase.auth()
//////////////////////////////
const formData = new FormData(document.querySelector('form'))
 window.onload = function() {
      initApp();
    };
//////////////////////////////
function initApp(){
  auth.onAuthStateChanged(function(user) {
    if(user){
document.querySelector('form').addEventListener('submit', e => {
  e.preventDefault()
  dataUser = {} //define it as globel object to access it in code below
  looping(user)
  createDoc()
  // console.log(dp.selectedDates);
  // console.log(formData);
})
    }else window.location='indexHisham.html'  //enable this
 })

  }
//-------function area------------------
function looping(user) {
  for (var pair of formData.entries()) {
    if (pair[0] == 'date') {
      //idk take it from here https://stackoverflow.com/questions/12482961/change-values-in-array-when-doing-foreach
      dp.selectedDates.forEach(function (part, index) {
        //must convert it to a string by toString ,then remove what we dont want by replace function 
        this[index] = part.toString().replace('00:00:00 GMT+0300 (Arabian Standard Time)', '');
      }, dp.selectedDates); // use arr as this
      pair[1] = dp.selectedDates
    }
    dataUser[pair[0]] = pair[1];
  }
  dataUser.owner=user.uid
}
function createDoc() {
  delete dataUser.file //becasue it contain the img data and firebase does not store this type of object
  db.collection("events").add(dataUser)
    .then(() => {
      console.log("Document successfully written!");
    })
    .catch((error) => {
      console.error("Error writing document: ", error.code);
    });
}










































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

