import React from 'react';
import { BsGithub } from "react-icons/bs";
import { BsTwitter } from "react-icons/bs";
import { BsInstagram } from "react-icons/bs";
import { BsLinkedin } from "react-icons/bs";

export default function SmContact({text}) {
  return (
    <ul className="sm-contact-wrapper">
        <li className="sm-contact-icon">
            <a href="https://github.com/diuere" target="_blank" aria-label="facebook contact">
                <BsGithub /> <span>{text ? text[0] : ""}</span>
            </a>
            
        </li>
        <li className="sm-contact-icon">
            <a href="https://twitter.com/diuere_souza" target="_blank" aria-label="twitter contact">
                <BsTwitter /> <span>{text ? text[1] : ""}</span>
            </a>
            
        </li>
        <li className="sm-contact-icon">
            <a href="https://www.instagram.com/diuere_souza/" target="_blank" aria-label="instagram contact">
                <BsInstagram /> <span>{text ? text[2] : ""}</span>
            </a>
            
        </li>
        <li className="sm-contact-icon">
            <a href="https://br.linkedin.com/in/diuere-souza-2a72b9223" target="_blank" aria-label="linkedin contact">
                <BsLinkedin /> <span>{text ? text[3] : ""}</span>
            </a>
        </li>
    </ul>
  )
}
