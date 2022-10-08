import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import SmContact from '../components/SmContact';

export default function ContactPage() {
    const form = useRef();

    const sendEmail = (e) => { // sending emails using EmailJS
      e.preventDefault();
  
      emailjs.sendForm('service_e8tjba3', 'template_bhovy0m', form.current, 'J-tFMwV5sJF45Q8em')
        .then((result) => {
            console.log(result.text);
        }, (error) => {
            console.log(error.text);
        });

      e.target.reset();
    };

  return (
    <main className="contactPage page" id="contactPage">
        <div className="container">
            <div className='additional-contact-info'>
                <h2>Get in touch</h2>
                <p>if you found my work somewhat promisor in any way and want to contact me, I'll be more than happy to reply!</p>

                <SmContact text={["Github", "Twitter", "Instagram","linkedIn"]}/>
            </div>

            <form ref={form} onSubmit={sendEmail} className="contact-form">
                <h3>Send an Email</h3>

                <input type="text" name="from_name" id="" placeholder='your name' required/>
                <input type="email" name="from_email" id="" placeholder='your email' required/>
                <textarea name="message" id="" cols="30" rows="10" placeholder='your message' required/>
                <button className="contact-btn main-btn-style">
                    <span>send</span>
                </button>
            </form>
        </div>
    </main>
  )
}
