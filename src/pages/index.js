import React, { useState, useEffect } from "react";
import { graphql, useStaticQuery } from "gatsby";

const IndexPage = () => {
  const [events, setEvents] = useState(null);
  useEffect(() => {
    (async () => {
      const data = await fetch("https://app.ticketmaster.com/discovery/v2/events.json?apikey=Is8qRbhQMZ2EQ0e6a86GfBPg79vMDqb1");
      const response = await data.json();
      console.log('response',response);
      setEvents(response._embedded.events);
  })();
}, []);

if (events === null) {
  return null;
}
    
  return (
    <main>
      {events.length > 0 ? (
        events.map(event => (
          <p key={event.id}>{event.name}</p>
        ))
      ) : (
        <p>No events</p>
      )}
    </main>
  );
};

export default IndexPage;

export const Head = () => <title>Home Page</title>;
