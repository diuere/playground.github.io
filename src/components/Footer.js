import React from 'react'
import Rollback from './Rollback'
import SmContact from './SmContact'

export default function Footer() {
  return (
    <footer className="main-footer">
        <div className="container">
            <Rollback />
            <div className="content-wrapper">
                <h4>Play Ground</h4>
                <p>This is a test website composed of many and mostly unrelated apps created with the purpose of demonstrating the abilities of a junior front end developer.</p>
                <SmContact />
            </div>
            <div className="copyright-wrapper">
                <p>Copyright &copy; 2022 Diuere Santos. All right reserved.</p>
          </div>
        </div>
    </footer>
  )
}
