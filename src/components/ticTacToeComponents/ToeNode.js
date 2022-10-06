import React from 'react'

export default function ToeNode({ id, value, handleSelection }) {
    const handleClick = () => {
        if(handleSelection) handleSelection(id);
    }

  return (
    <div className="toe-node" onClick={() => handleClick()}>{value}</div>
  )
}
