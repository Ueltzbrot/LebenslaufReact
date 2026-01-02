import {useState} from 'react';
import handleGlobalSubmit from './buttons';

export default function Experience({education, setEducation, 
    currentShown, setCurrentShown, currentEdit, setCurrentEdit
    }){

       const [currentForm, setCurrentForm] = useState(currentEdit.length == 0 ? {
        schoolName: "", 
        titleOfStudy: "",
        beginning: "", 
        end: ""
    }: currentEdit[0]);


    function handleChange(e){
        const {name, value} = e.target;
        const newForm = {...currentForm, [name]: value};
        setCurrentForm(newForm);
    }


    function handleSubmit(event){
        handleGlobalSubmit(event, education, "School")  

        if (currentEdit.length == 0){
         setEducation([...education, {...currentForm, id: crypto.randomUUID() }])}

        else{
            const newForm = education.map((element) => {
                return element.id=== currentEdit[0].id ? {...currentForm, id: currentEdit[0].id} : element;
            })
        setEducation(newForm)
        setCurrentEdit([]);
        
        }
    setCurrentShown({...currentShown, education:true})
     setCurrentForm({schoolName:"", titleOfStudy:"", beginning:"", end:"" })  
    }



    return(
        <Card>
            <Input currentForm={currentForm} onChange={handleChange} onSubmit={handleSubmit} currentEdit={currentEdit}/>
        </Card>   
    );
}


function Card({children}){
    return(
        <div className="card">
            {children}
        </div>
    );
}

function Input({currentForm, onChange, onSubmit, currentEdit}){
    return (
        <>
        <form onSubmit={onSubmit}>
            
            <label htmlFor="schoolName">School Name:</label>
            <input
                id="schoolName"
                type="text"
                name="schoolName"
                placeholder="School Name"
                value={currentForm.schoolName}
                onChange={onChange}
            />

            <label htmlFor="titleOfStudy">Title Of Study:</label>
            <input
                id="titleOfStudy"
                type="text"
                name="titleOfStudy"
                placeholder="Wirtschaftswissenschaften"
                value={currentForm.titleOfStudy}
                onChange={onChange}
            />

            <label htmlFor="beginning">Start Year:</label>
            <input
                id="beginning"
                type="number"
                min="1900"
                max="2099"
                name="beginning"
                placeholder="2015"
                value={currentForm.beginning}
                onChange={onChange}
            />

            <label htmlFor="end">End Year:</label>
            <input
                id="end"
                type="number"
                min="1900"
                max="2099"
                name="end"
                placeholder="2020"
                value={currentForm.end}
                onChange={onChange}
            />

             <button type="submit" value="submit">Submit</button>
            </form>
        </>
    );
}