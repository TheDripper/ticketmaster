import * as React from "react";
import { Link } from "gatsby";

const Events = ({ events, children }) => {
  return (
      <div id="events" className="w-full p-8">
        {events.length > 0 ? (
          events.map((event) => (
            <div className="event border w-1/2 relative">
              <img src={event.thumbnail} />
              <p key={event.id}>{event.name}</p>
              <a
                href={event.link}
                className="cursor-pointer absolute w-full h-full top-0 left-0 z-10 opacity-0"
              >
                {event.name}
              </a>
            </div>
          ))
        ) : (
          <p>No events</p>
        )}
      </div>
  );
};

export default Events;
