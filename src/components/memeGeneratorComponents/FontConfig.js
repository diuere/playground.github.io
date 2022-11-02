import React from 'react';
import { getMemeTemplate } from '../../store/functions';
import { useMemeGeneratorStore } from '../../store/store';

export default function FontConfig( props ) {
    const { 
            id, // coming from the position of this specific template in the templates, thus its id value
            handleChange // coming from its parent (the MemeTextContent)
        } = props;

    const { templates, updateTemplates } = useMemeGeneratorStore(state => ({ templates: state.templates, updateTemplates: state.updateTemplates, } ));

    const currentTemplate = templates[id];
    
    const removeChange = () => {  // function that reset all the changes
        const updatedTemplates = templates.map(tem => tem.id === id ? { ...getMemeTemplate(id), text: templates[id].text } : tem )
        
        updateTemplates(updatedTemplates);
    }

    // function that provides the boolean for the checked property of the radio and checkbox btn
    const checked = (value, property) => value === property;

  return (
    <div className="font-config-wrapper">
        <div className="font-config-op font-config">
            <label htmlFor="fontFc">
                <span>Font</span>
                <select name="font" id="fontFc" onChange={(e) => handleChange(e)}>
                    <option value="">--choose--</option>
                </select>
            </label>
            
            <button className="reset-config-btn main-btn-style" onClick={removeChange}>remove</button>
        </div>
        <div className="font-config-op transform-config">
            <label htmlFor="allcapFc">
                ALL CAPS <input type="checkbox" name="textTransform" value={checked("ALL CAPS", currentTemplate.textTransform) ? "" : "ALL CAPS"} id="allcapsFc" checked={checked("ALL CAPS", currentTemplate.textTransform)} onChange={(e) => handleChange(e)} size="20"/>
            </label>
            <label htmlFor="boldFc">
                <b>Bold</b> <input type="checkbox" name="fontWeight" value={checked("bold", currentTemplate.fontWeight) ? "" : "bold"} id="boldboldFc" checked={checked("bold", currentTemplate.fontWeight)} onChange={(e) => handleChange(e)}/> 
            </label>
            <label htmlFor="italicFc">
                <em>Italic</em> <input type="checkbox" name="fontStyle" value={checked("italic", currentTemplate.fontStyle) ? "" : "italic"} id="italicFc" checked={checked("italic", currentTemplate.fontStyle)} onChange={(e) => handleChange(e)}/> 
            </label>
        </div>
        <div className="font-config-op outline-width-config">
            <label htmlFor="outlineWidthFc">Outline Width</label>
            <input type="number" name="outlineWidth" value={currentTemplate.outlineWidth} id="outlineWidthFc" min="0" max="9" onChange={(e) => handleChange(e)}/> 
        </div>
        <div className="font-size-config">
            <label htmlFor="fontSizeFc">{"Font Size (px)"}</label>
            <input type="number" name="fontSize" value={currentTemplate.fontSize} id="fontSizeFc" min="0" max="64" onChange={(e) => handleChange(e)}/> 
        </div>
        <div className="line-height-config">
            <label htmlFor="lineHeightFc">{"Line Height (px)"}</label>
            <input type="number" name="lineHeight" value={currentTemplate.lineHeight} id="lineHeightFc" min="1" max="5" step="0.1" onChange={(e) => handleChange(e)}/> 
        </div>
        <div className="font-config-op opacity-config">
            <label htmlFor="opacityFc">Opacity</label>
            <div className="slide-bar">
                <div id="slide"></div>
            </div>
            <input type="number" name="opacity" value={currentTemplate.opacity} id="opacityFc" min="0" max="1" step="0.1" onChange={(e) => handleChange(e)}/>
        </div>
    </div>
  )
}
