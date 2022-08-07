import React, { useState, useEffect } from "react";
import { graphql, useStaticQuery } from "gatsby";


const IndexPage = () => {
  const [events, setEvents] = useState(null);
  useEffect(() => {
    (async () => {
      const data = await fetch(
        "https://app.ticketmaster.com/discovery/v2/events.json?keyword=baseball&apikey=Is8qRbhQMZ2EQ0e6a86GfBPg79vMDqb1"
      );
      const response = await data.json();
      console.log("response", response);
      let returnedEvents = [];
      for (let event of response._embedded.events) {
        let eventData = {
          id: event.id,
          name: event.name,
          startDate: event.dates.start.localDate,
          startTime: event.dates.start.localTime,
          thumbnail: event.images[0].url,
          link: event.url,
        };
        returnedEvents.push(eventData);
      }
      setEvents(returnedEvents);
    })();
  }, []);

  if (events === null) {
    return null;
  }

  return (
    <main>
      <div id="events" className="w-full p-8">
        {events.length > 0 ? (
          events.map((event) => (
            <div className="event border w-1/2 relative">
              <img src={event.thumbnail} />
              <p key={event.id}>{event.name}</p>
              <a
                href={event.link}
                className="cursor-pointer absolute w-full h-full top-0 left-0 z-10 opacity-0"
              >{event.name}</a>
            </div>
          ))
        ) : (
          <p>No events</p>
        )}
      </div>
    </main>
  );
};

export default IndexPage;

export const Head = () => <title>Home Page</title>;
