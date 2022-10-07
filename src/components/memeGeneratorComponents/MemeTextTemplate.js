import React from 'react';
import { AiFillSetting } from "react-icons/ai";
import FontConfig from './FontConfig'; 

// zustand state
import { useMemeGeneratorStore } from '../../store/store';

import { resizeMemeText, toggleConfig } from '../../store/functions'; // function that toggles the fontConfig component

export default function MemeTextTemplate( { id, text } ) {
  const { templates, updateTemplates, deleteTemplate } = useMemeGeneratorStore(state => ({ templates: state.templates, updateTemplates: state.updateTemplates, deleteTemplate: state.deleteTemplate, } ));
  const currentTemplate = templates[id];

  const updateText = (e) => { // update the text and listen for resize font-size "event"
    const { id, value } = e.target;
    const imgTemplate = document.querySelectorAll(`.img-template`);
    const updatedTemplates = templates.map(tem => tem.id === id ? { ...tem, text: value } : tem ); // map over the templates state and updating the text property of the template object used to render this instance of meme template.
    
    updateTemplates(updatedTemplates);

    // the following function gets the image-template, its span child, also the templates state, plus the id and the updateTemplates function
    resizeMemeText(imgTemplate[id].firstChild, imgTemplate[id], templates, id, updateTemplates); // it mainly handles the resize font-size event for the image-template, once its text reaches the width break point
  }

  const handleChange = (e) => { // function that handles the input control for react.
    const { name, value } = e.target;

    const updatedTemplates = templates.map(tem => (
        tem.id === id ? 
        {
            ...tem,
            [name]: value
        } : tem
        ) )
    updateTemplates(updatedTemplates);
  }

  return (
    <div className="mm-text-template" id={id}>
        <input type="text" name="memeText" value={text} id={id} className="template" placeholder={`Text#${Number(id) + 1}`} onChange={(e) => updateText(e)}/>
        <div className="mm-template-config">
            <input type="color" name="color" value={currentTemplate.color} className="mm-font-color" onChange={(e) => handleChange(e)}/>
            <input type="color" name="outlineColor" value={currentTemplate.outlineColor} className="mm-font-color" onChange={(e) => handleChange(e)}/>
            <div className="settings-icon" onClick={() => toggleConfig(id)}><AiFillSetting /></div>
            <FontConfig id={id} handleChange={handleChange}/>
        </div>
        {id > 1 && <div className="deleteTemplate-icon" onClick={() => deleteTemplate(id)}>-</div>}
    </div>

  )
}
