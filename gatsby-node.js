// async node-fetch
// https://www.npmjs.com/package/node-fetch

const path = require("path");

const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

exports.createPages = async function ({ actions }) {
  // fetch query here
  const eventData = await fetch(
    "https://app.ticketmaster.com/discovery/v2/events.json?keyword=baseball&apikey=Is8qRbhQMZ2EQ0e6a86GfBPg79vMDqb1"
  );
  const events = await eventData.json();
  events._embedded.events.forEach((node) => {
    const eventPath = path.parse(node.url);
    const url = eventPath.dir.split("/");
    let slug = url[url.length - 2];
    const name = node.name; 
    const eventTemplate = require.resolve("./src/templates/event.js");
    if (slug != "www.ticketmaster.com") {
      actions.createPage({
        path: slug,
        component: eventTemplate,
        context: {
          event: node,
        },
      });
    }
  });
};
