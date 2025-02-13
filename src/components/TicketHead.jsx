import React from "react";

function TicketHead(prop){
  return(
    <div className="top-section-head">
        <div className='top-section-texts'>{prop.head}</div>
        <div className='top-section-steps'>{prop.steps}</div>
      </div>
  )
}
export default TicketHead;