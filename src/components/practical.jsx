import {useState} from 'react';
import handleGlobalSubmit from './buttons';

export default function Practical({currentShown, setCurrentShown, setPracticalExperience1, practicalExperience1, currentEdit, setCurrentEdit}){

    const [currentForm, setCurrentForm] = useState(currentEdit.length == 0 ? {
        companyName: "", 
        positionTitle: "",
        mainRes: "", 
        beginning: "", 
        end: ""
    } : currentEdit[0]);

    function handleChange(e){
        const {name, value} = e.target;
        const newForm = {...currentForm, [name]: value};
        setCurrentForm(newForm);
    }

    function handleSubmit(event){
        event.preventDefault();
        handleGlobalSubmit(event, currentForm, "Practical Experience");

        if(currentEdit.length == 0){
            setPracticalExperience1([...practicalExperience1, {...currentForm, id: crypto.randomUUID() }]);
        } else {
            const newForm = practicalExperience1.map((element) => {
                return element.id === currentEdit[0].id ? {...currentForm, id: currentEdit[0].id} : element;
            });
            setPracticalExperience1(newForm);
            setCurrentEdit([]);
        }

        setCurrentShown({...currentShown, practical:true});
        setCurrentForm({companyName:"", positionTitle:"", mainRes:"", beginning:"", end:"" });
    }

    return(
        <Card>
            <Input currentForm={currentForm} onChange={handleChange}  onSubmit={handleSubmit}/>
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

function Input({currentForm, onChange, onSubmit}){
    return (
        <>
    <form onSubmit={onSubmit}> 

            <label htmlFor="companyName">Company Name:</label>
            <input
                id="companyName"
                type="text"
                name="companyName"
                placeholder="Company Name"
                value={currentForm.companyName}
                onChange={onChange}
            />

            <label htmlFor="positionTitle">Title of your position:</label>
            <input
                id="positionTitle"
                type="text"
                name="positionTitle"
                placeholder="Fachkundiger"
                value={currentForm.positionTitle}
                onChange={onChange}
            />

            <label htmlFor="mainRes">Main Responsibilities:</label>
            <input
                id="mainRes"
                type="text" 
                name="mainRes"
                placeholder="cool sein"
                value={currentForm.mainRes}
                onChange={onChange}
            />

            <label htmlFor="beginningPractical">Start Year:</label>
            <input
                id="beginningPractical"
                type="number"
                min="1900"
                max="2099"
                name="beginning"
                placeholder="2020"
                value={currentForm.beginning}
                onChange={onChange}
            />
            <label htmlFor="endPractical">End Year:</label>
            <input
                id="endPractical"
                type="number"
                min="1900"
                max="2099"
                name="end"
                placeholder="2025"
                value={currentForm.end}
                onChange={onChange}
            />
            <button type="submit" value="submit">Add Experience</button>
            
            </form>
        </>
    );
}