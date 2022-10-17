import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
// zustand
import shallow from "zustand/shallow";
import { useMemeGeneratorStore } from '../store/store';

import MemeTextContent from '../components/memeGeneratorComponents/MemeTextContent';
import MemeTextTemplate from '../components/memeGeneratorComponents/MemeTextTemplate';
import CloseGameInfo from '../components/CloseGameInfo';


import { getMemeImageUrl, getMemeTemplate, insertImage, toggleAddMeme, toggleConfig, uploadImage } from '../store/functions'; // function for the template used


const memeURL = "https://api.imgflip.com/get_memes";

export default function MemeGeneratorPage() {
    const { data, refetch } = useQuery(["memeImage"], () => getMemeImageUrl(memeURL),
    {
        refetchOnWindowFocus: false,
    });

    const { templates, addTemplate, updateTemplates } = useMemeGeneratorStore(state => ( { templates: state.templates, addTemplate: state.addTemplate, updateTemplates: state.updateTemplates, } )
    , shallow);
    const [memeImage, setMemeImage] = useState("https://static.wixstatic.com/media/5bf821_906dcc08471c4ddfb9924ab1f040ff7c~mv2.png"); // state that's used as src for the image element, thus the meme image itself
    const [imageFile, setImageFile] = useState(""); // state for the selected image file

    const createTemplate = () => { // functions that can modify templates by pushing a new template into it
        const id = templates.length;
        const template = getMemeTemplate(id); // it utilizes the templates.length as the id for each new template created

        if(templates.length < 8){ // limit of 8 templates.
            addTemplate(template)
        }
    };
    
    const removeTemplates = () => { // reset the templates array to its initial state.
        const newTemplates = [getMemeTemplate(0)];

        updateTemplates(newTemplates);
        toggleConfig(); // close the fontConfig component in case if it's opened when the user clicks on reset template
    }

    // components
    const templatesElem = templates.map(tem => <MemeTextTemplate key={tem.id} id={tem.id} text={tem.text} />)
    const textOnImage = templates.map(tem => <MemeTextContent key={tem.id} id={tem.id} text={tem.text}/>)

    const getRandomMeme = (refetchPromise, updateMemeImage) => {
        refetchPromise(); // refetch the useQuery call
        return updateMemeImage; // return the uploadImage function
    }

    const handleDownloadRequest = () => {
        window.alert("Unfortunately, this functionality is not available.")
    }
 
  return (
    <main className='memeGenerator-page page' id="memeGeneratorPage">
        <div className="container">
            <div className="mm-generator-wrapper">
                <div className="mm-img-wrapper">
                    <img src={memeImage} alt="meme image" draggable="false"/>
                    {textOnImage}
                </div>
                <div className="generate-mm-wrapper">
                    <button className='add-img-btn main-btn-style' onClick={toggleAddMeme}>
                        <span>add image</span>
                    </button>
                    <button className='get-random-mm-btn main-btn-style' onClick={() => getRandomMeme(refetch, uploadImage(data, setMemeImage))}>
                        <span>random image</span>
                    </button>
                </div>
                <div className="mm-overlay main-overlay-style">
                        <div className="add-img-wrapper">
                            <CloseGameInfo toggleAddMeme={toggleAddMeme}/>
                            <button className="paste-img ">
                                Choose file
                                <input type="file" name="" id="" accept="image/*" onChange={(e) => insertImage(null, e.target.files[0], setImageFile)}/>
                            </button>
                            <h5>OR</h5>
                            <input type="text" name="" id="" placeholder='Paste image or image URL' onChange={(e) => insertImage(e.target.value, null, setImageFile)}/>
                            <input type="button" value="upload image" className="upload-img-btn main-btn-style" onClick={() => uploadImage(imageFile, setMemeImage)}/>
                        </div>
                    </div>
                <div className="mm-text-template-wrapper">
                    {templatesElem}
                </div>
                <div className="create-template-wrapper">
                    <button className="reset-templates main-btn-style" onClick={removeTemplates}>
                        <span>Reset templates</span>
                    </button>
                    <button className="create-template main-btn-style" onClick={createTemplate}>
                        <span>Create template</span>
                    </button>
                </div>
                <div className="download-img-wrapper">
                    <button className="download-mmImg-btn main-btn-style" onClick={handleDownloadRequest}>
                        <span>download image</span>
                    </button>
                </div>
            </div>
        </div>
    </main>
  )
}
