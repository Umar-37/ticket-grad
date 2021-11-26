//import {AirDatepicker}from "./../node_modules/air-datepicker/index.es";
const en=require('air-datepicker/locale/en').default
const AirDatepicker=require('air-datepicker')
//import en from "air-datepicker/locale/en";


let startDate = new Date('2021-07-20');
let tomorrowDate = new Date(startDate);
tomorrowDate.setDate(tomorrowDate.getDate()+1)

let options = {
  locale: en,
    startDate,
    multipleDates: true,
    selectedDates: [startDate, '2021-07-25', 1626307200000]
}

let dp = new AirDatepicker("#dp", options);
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
    this.input.accept="image/*"
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
