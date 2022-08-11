// import * as React from "react";
import React, { useState, useEffect } from "react";
import { Link } from "gatsby";

const Search = ({ children }) => {
  const [events, setEvents] = useState(null);
  const handleSearch = async (event) => {
    const data = await fetch(
      "https://app.ticketmaster.com/discovery/v2/events.json?keyword=" +
        event.target.value +
        "&apikey=Is8qRbhQMZ2EQ0e6a86GfBPg79vMDqb1"
    );
    const results = await data.json();
    let returnedEvents = [];
    if (results._embedded && results._embedded.events) {
      for (let event of results._embedded.events) {
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
      this.setState({ events: returnedEvents });
    }
  };
  return (
    <div id="search" className="border w-full bg-black py-12 flex justify-center items-center">
      <input type="text" onChange={handleSearch} />
    </div>
  );
};

export default Search;
