import React from "react"

function EventTemplate(props) {
  console.log('props',props);
  return (
    <div>
      <h1>{props.pageContext.event.name}</h1> // how to get props from createPages data?
    </div>
  )
}

export default EventTemplate