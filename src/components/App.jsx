import React,{useEffect, useState} from 'react';
import './App.css';
import cloudImage from "./picture/cloud.png";
import Logo from "./picture/logo.png";
import TicketType from './Ticket-type';
import FormInput from './Forms-input';
import TicketHead from './TicketHead';
// @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');
// @import url('https://fonts.googleapis.com/css2?family=Alatsi&display=swap');
// @import url('https://fonts.googleapis.com/css2?family=Jeju+Myeongjo&display=swap');

function App() {
  const [formInputsValue,setFormInputsValue] = useState({
    ticketno:1,
    name:"",
    email:"",
    textarea:""
  })
  const [imageUrl,setImageUrl] = useState("")
  const [errors,setErrors] =useState()
  const [,setSaveData] =useState([])
  const [savedFormData,setSavedFormData] = useState(false)


  async function getUpdatedValue(data){
    // object.keys(newErrors).length === 0
    console.log(Object.keys(data).length)
    if (Object.keys(data).length > 60){
      const response = await JSON.parse(data);
      setSaveData(response)
    }
  }
  // console.log(saveData)
  console.log(formInputsValue)
  useEffect(()=>{
    const data = window.localStorage.getItem("MY_SAVED_FORM_INFO")
    console.log(data)
    getUpdatedValue(data)
    // if (data){
    //   setSaveData(JSON.parse(data))
    // }
  },[savedFormData])

  useEffect(()=>{
    // function SendToLocalStorage(){
      window.localStorage.setItem("MY_SAVED_FORM_INFO",JSON.stringify(formInputsValue))
    // } 
    // SendToLocalStorage()
    // eslint-disable-next-line
  },[savedFormData])

  
  
  async function handlePictureUpload(event){
    const imageFile = event.target.files[0]
    if (!imageFile)return
    
    const data = new FormData()  //created a formData object
    data.append("file",imageFile)  //(file) keyword name ill use in cloudinary
    data.append("upload_preset","hngtask_user_uploaded_photo")  //the name i used in cloudinary site
    data.append("cloud_name","dshceqjzm") //go to api key in cloudinary, youll see the name
    
    const response = await fetch("https://api.cloudinary.com/v1_1/dshceqjzm/image/upload",{
      method:"POST",
      body:data,
    })
    const uploadedImageUrl = await response.json()
    setImageUrl(uploadedImageUrl.url)
  }
  function handleSubmit(event){
    // console.log(event)
  }
  console.log(imageUrl)
  function isValidEmail(email){
    const emailRegex = /^\S+@\S+\.\S+$/;
    return emailRegex.test(email)
  }
  
function handleValue(e){
  const value = e.target.value
  const name = e.target.name
  
  setFormInputsValue(prev=>{
    return{
      ...prev,
      [name]:value
    }
  })
  setSavedFormData(!savedFormData)

}

function handleSubmitClick(event){
  // console.log(formInputsValue)
  let newErrors = {}

  if (!formInputsValue.ticketno){
    newErrors.ticketno="Please select the no of tickets"
  }
  if (!formInputsValue.name){
    newErrors.name="Full name is required"
  }
  if (!formInputsValue.email){
    newErrors.email = "Email is required"
  } else if (!isValidEmail(formInputsValue.email)){
    newErrors.email ="Invalid email format"
  }
  // setSavedFormData(true)
 
  setErrors(newErrors)
  event.preventDefault()
}
// console.log(formInputsValue)

  return (
    <div className="App">
    {/* <h1 className='novoh'>Novoh</h1> */}
    <header className="header">
      <img className="logo-image" src={Logo} alt=""/>
      <nav className="nav-menu">
        <ul className="menu-container">
          <li className="menu-Items">Event</li>
          <li className="menu-Items">My Tickets</li>
          <li className="menu-Items">About Project</li>
        </ul>
      </nav>
      <button className="tickets-button">MY TICKETS</button>
    </header>
    <main className='content-body'>

    <div className="section-1">
      <TicketHead
        head={"Ticket Selection"}
        steps={"Step 1/3"}
      />
      <span className='space-span'>
      <div className='span-progress'></div>
      </span>
    
      <div className='top-section1'>
        <h1 className='display-head'>Techember Fest "25</h1>
        <p className='display-head-text'>Join us for an unforgettable experience at <br/>TechWorld! Secure your spots now</p>
        <p className='display-head-other-text'>📍TechWorld || March 15,2025 | 7:00 PM</p>
      </div>
      <div className='bottom-section1'>
        <p className='select-ticket-text'>Select Ticket type</p>
        <div className='ticket-type-container'>
          <TicketType/>
          <TicketType/>
          <TicketType/>
        </div>
        <FormInput 
          label={"Number of tickets"}
          type={"number"}
          value={formInputsValue.ticketno}
          name={"ticketno"}
          action={handleValue}
        />
          {errors&&<div className='error'>{errors.ticketno}</div>}
          <div className='submit-buttons'>
            <button className='first-button'>Cancel</button>
            <button type="submit" className='second-button'>Next</button>
          </div>
      </div>
    </div>

    <div className="section-1 section2">
      <TicketHead
        head={"Attendee Details"}
        steps={"Step 2/3"}
      />
      <span className='space-span'>
      <div className='span-progress'></div>
      </span>
      <div className="section-container">
        <div className="upload-image-section">
          <h2 className='select-image'>Upload Profile Photo</h2>
          <div className="upload-photo-container">
              <label for="myImage" className='custom-image'>
                <img src={cloudImage} alt=""/>
                <p className='upload-image-text'>Drag and drop or click to upload</p>
              </label>
              <input id="myImage" className='inner-image-container' type="file" onChange={handlePictureUpload}/>
          </div>
        </div>


        <form onSubmit={handleSubmit} className="form-container">
          {/* <div className='form-section-cont'>
            <label className='form-section-title'>Enter yout name</label>
            <input value={formInputsValue.name} onChange={handleValue} type="text" name="name"/>
          </div> */}
          <FormInput 
          label={"Enter your fullname"}
          type={"text"}
          value={formInputsValue.name}
          name={"name"}
          action={handleValue}
        />
            {errors&&<div className='error'>{errors.name}</div>}
          {/* <div className='form-section-cont'>
            <label className='form-section-title'>Enter your email</label>
            <input value={formInputsValue.email} onChange={handleValue} type="email" name="email" placeholder='hello@avioflagos.io' required="true"/>

          </div> */}
          <FormInput 
          label={"Enter your email"}
          type={"email"}
          value={formInputsValue.email}
          name={"email"}
          placeholder={"hello@avioflagos.io"}
          action={handleValue}
          required={true}
        />
            {errors&&<div className='error'>{errors.email}</div>}
          <div className='form-section-cont'>
            <label className='form-section-title'>About the project</label>
            <textarea className="form-section-input text-area" value={formInputsValue.textarea} onChange={handleValue} name="textarea" placeholder='Textarea'/>
          </div>
          <div className='submit-buttons'>
            <button className='first-button'>Back</button>
            <button type="submit" className='second-button' onClick={handleSubmitClick}>Get My Free Ticket</button>
          </div>
        </form>
      </div>
    </div>



    <div className='section-1 section2'>
    <TicketHead
        head={"Ready"}
        steps={"Step 3/3"}
      />
      <span className='space-span'>
      <div className='span-progress'></div>
      </span>
      <div className='last-page-top-container'>
      <h1 className='last-page-title'>Your Ticket is Booked!</h1>
      <p className='last-page-text'>You can download or Check your email for a copy</p>
      </div>
      <div className='ticket-generator-main'>
        {/* more details when you get there */}
        <div className='ticket-content-background'>
          <div className='ticket-content-top'>
            <h1 className='ticket-content-head'>Techember Fest "25</h1>
            <p className='ticket-content-text-first'>📍 04 Rumens road, Ikoyi, Lagos</p>
            <p className='ticket-content-text-first'>📅 March 15, 2025 | 7:00 PM</p>
            <img className="ticket-content-pic" src="" alt=""/> 
            
          <div className='ticket-content-bottom'>
            <div className='ticket-content-bottom-component1'>
              <p className='ticket-bottom-component-name'>Enter your name</p>
              <p className='ticket-bottom-component-answer'>Novoh Sada1</p>
            </div>
            <div className='ticket-content-bottom-component2'>
              <p className='ticket-bottom-component-name'>Enter your name</p>
              <p className='ticket-bottom-component-answer'>Novoh Sada2</p>
            </div>
            <div className='ticket-content-bottom-component3'>
              <p className='ticket-bottom-component-name'>Enter your name</p>
              <p className='ticket-bottom-component-answer'>Novoh Sada3</p>
            </div>
            <div className='ticket-content-bottom-component4'>
              <p className='ticket-bottom-component-name'>Enter your name</p>
              <p className='ticket-bottom-component-answer'>Novoh Sada4</p>
            </div>
            <div className='special-request-bottom-component'>
              <p className='special-request-title'>Enter your name</p>
              <p className='ticket-request-answer'>Novoh Sada</p>
            </div>
          </div>
            <img className="barcode-image" src="https://i.ibb.co/W3cK42J/image-1.png" alt=""/>       
          </div>
        </div> 
      </div>
      <div className='submit-buttons'>
            <button className='first-button'>Book another ticket</button>
            <button className='second-button' type="submit">Download Ticket</button>
      </div>
      </div>
    </main>
    </div>
  );
}
export default App;
