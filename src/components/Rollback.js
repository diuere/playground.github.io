import React from 'react';
import { BsFillArrowUpSquareFill } from "react-icons/bs";

export default function Rollback() {
  return (
    <div className="rollback-wrapper" id="rollbackWrapper">
        <a href="#mainHeader" id="rollbackIcon" aria-label="roll back arrow button"><BsFillArrowUpSquareFill /></a>
    </div>
  )
}