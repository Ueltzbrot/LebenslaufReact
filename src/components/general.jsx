import {useState} from 'react';
import handleGlobalSubmit from './buttons';

export default function General({generalPerson, setGeneralPerson, setCurrentShown, currentShown}){

    const [isShown, setIsShown] = useState(false);
    function handleChange(e){
        const {name, value} = e.target;
        const newPerson = {...generalPerson, [name]: value};
        setGeneralPerson(newPerson);
    }

    function handleSubmit(event){
        handleGlobalSubmit(event, generalPerson, "General Informations");
           setIsShown(!isShown);   
           setCurrentShown({...currentShown, general:true});
    }

    function handleEdit(e){
        e.preventDefault();
        setIsShown(false);
    }

    return (
        <Card>
            <Input person={generalPerson} onChange={handleChange} onSubmit={handleSubmit} isShown={isShown} handleEdit={handleEdit} />
        </Card>   
    );
}

function Card({children}){
    return (
        <div className="card">
            {children}
        </div>
    );
}

function Input({person, onChange,onSubmit, isShown, handleEdit}){
    return (
        <>
            <form onSubmit={onSubmit}>
            <label htmlFor="name">Name:</label>
            <input
                id="name"
                type="text"
                name="name"
                placeholder="HammerName"
                value={person.name}
                onChange={onChange}
                readOnly = {isShown}
            />

            <label htmlFor="email">Email:</label>
            <input
                id="email"
                type="text"
                name="email"
                placeholder="Hhallo@hallo"
                value={person.email}
                onChange={onChange}
                readOnly = {isShown}
            />

            <label htmlFor="phone">Phone:</label>
            <input
                id="phone"
                type="tel"
                name="phone"
                placeholder="12345"
                value={person.phone}
                onChange={onChange}
                readOnly = {isShown}
            />
             {isShown ? (
                 <button type="button" value="edit" onClick={handleEdit}>Edit</button>
               
            ): (  <button type="submit" value="submit">Submit</button>

            )}
            </form>
        </>
    );
}