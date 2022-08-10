import React from "react"

function EventTemplate({pageContext}) {
  return (
    <div>
      <h1>{pageContext.event.name}</h1> 
      <img src={pageContext.event.images[0].url} />
      <p class="text-lg">{pageContext.event.dates.start.localDate}</p>
      <p class="text-lg">{pageContext.event.dates.start.localTime}</p>  
    </div>
  )
}

export default EventTemplate