import { useState } from 'react'
import './App.css'
import General from "./components/general.jsx"
import Experience from "./components/experience.jsx"
import Practical from "./components/practical.jsx"

function App() {

const [generalPerson, setGeneralPerson] = useState({name: "", email: "", phone: ""});
const [education, setEducation] = useState([]);
const [practicalExperience1, setPracticalExperience1] = useState([]);
const [currentEditEducation, setCurrentEditEducation] = useState([]);
const [currentEditPractical, setCurrentEditPractical] = useState([]);
const [currentShown, setCurrentShown] = useState({
  general: false,
  education:false,
  practical:false
})

function handleEditEducation(element){
  setCurrentEditEducation([{...element}])
}

function handleDeleteEducation(element){
  const newForm = education.filter((e) =>{
    return e.id!=element.id;
  })
  setEducation(newForm)
  if(newForm.length == 0) {
    setCurrentShown({...currentShown, education:false})
  }
}



function handleEditPractical(element){
  setCurrentEditPractical([{...element}])
}

function handleDeletePractical(element){
  const newForm = practicalExperience1.filter((e) =>{
    return e.id!=element.id;
  })
  setPracticalExperience1(newForm)
  if(newForm.length == 0) {
    setCurrentShown({...currentShown, practical:false})
  }
}


  return (
    <div className='container'>
    <div className='input'>
      <General generalPerson={generalPerson} setGeneralPerson={setGeneralPerson} 
      setCurrentShown={setCurrentShown} currentShown={currentShown}
      />
      <Experience 
      key={currentEditEducation.length > 0 ? currentEditEducation[0].id : "new-edu"}
      education={education} setEducation={setEducation} 
      setCurrentShown={setCurrentShown} currentShown={currentShown} 
      currentEdit={currentEditEducation} setCurrentEdit={setCurrentEditEducation} />
      <Practical 
      key={currentEditPractical.length > 0 ? currentEditPractical[0].id : "new-prac"}
      setCurrentShown={setCurrentShown} currentShown={currentShown}
      setPracticalExperience1={setPracticalExperience1} practicalExperience1={practicalExperience1}
      currentEdit={currentEditPractical} setCurrentEdit={setCurrentEditPractical}
      />
    </div>
    <div>
      {currentShown.general ? (
    <div className='generalInformation'>
      <h2>Allgemeine Informationen</h2>
      <p><strong>Name:</strong> {generalPerson.name}</p>
      <p><strong>Email:</strong> {generalPerson.email}</p>
      <p><strong>Phone:</strong> {generalPerson.phone}</p>
    </div>): null}

    {currentShown.education ? (
    <div className="education">
    <h2>Academic Career</h2>

    {education.map((element,index) =>{
      return(
        <div key={element.id || index} className="educationEntry">
      <p><strong>School Name:</strong> {element.schoolName}</p>
      <p><strong>Title of Study:</strong> {element.titleOfStudy}</p>
      <p><strong>Begin:</strong> {element.beginning}</p>
      <p><strong>End:</strong> {element.end}</p>
      <button className="educationEntryEdit" onClick={() => handleEditEducation(element)}>Edit</button>
      <button className="educationEntryDelete" onClick={() => handleDeleteEducation(element)}>Delete</button>
      </div>
      )
    })}

    </div>) : null}


      {currentShown.practical ? (
     <div className="practical">
    <h2>Work Experience</h2>
        {practicalExperience1.map((element, index) =>{
          return (
          <div key={element.id || index} className="practicalEntry">        
      <p><strong>Company Name:</strong> {element.companyName}</p>
      <p><strong>Position:</strong> {element.positionTitle}</p>
      <p><strong>Main Responsibilities:</strong> {element.mainRes}</p>
      <p><strong>Begin:</strong> {element.beginning}</p>
      <p><strong>End:</strong> {element.end}</p>
      <button className="educationEntryEdit" onClick={() => handleEditPractical(element)}>Edit</button>
      <button className="practicalEntryDelete" onClick={() => handleDeletePractical(element)}>Delete</button>
      </div>)
        })}
    </div>): null}
    </div>
    </div>
  )
}

export default App