import React, { useEffect } from 'react';
import { BsArrowCounterclockwise } from "react-icons/bs";
import { dragResizeTemplate, getTemplateStyle } from '../../store/functions';
import { useMemeGeneratorStore } from '../../store/store'

export default function MemeTextContent( { text, id } ) {
  const templates = useMemeGeneratorStore(state => state.templates);
  const style = getTemplateStyle(templates[id]);

  useEffect(() => {
    const mmImageWrapper = document.querySelector(".mm-img-wrapper");
    const templates = document.querySelectorAll(".img-template");
    const points = document.querySelectorAll(".point");

    dragResizeTemplate(templates[id], mmImageWrapper, points);
  }, [])

  return (
    <div className={`img-template #${id}`} >
      <div className={`img-template-text #${id}`} style={style}>{text}</div>
      <div className={`nw point #${id}`}></div>
      <div className={`nc point #${id}`}></div>
      <div className={`ne point #${id}`}></div>
      <div className={`cw point #${id}`}></div>
      <div className={`ce point #${id}`}></div>
      <div className={`sw point #${id}`}></div>
      <div className={`sc point #${id}`}></div>
      <div className={`se point #${id}`}></div>
      <div className={`circle point #${id}`} style={ {color: style.color} }>c</div>
    </div>
  )
}
