// async node-fetch
// https://www.npmjs.com/package/node-fetch

const path = require('path');



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
    console.log('eventPath',eventPath);
    const slug = eventPath.dir.replace("https://www.ticketmaster.com/","").replace("event","");
    console.log('slug',slug);
    const name = node.name;
    const eventTemplate = require.resolve("./src/templates/event.js");
    actions.createPage({
      path: slug,
      component: eventTemplate,
      context: { slug: slug, name: name },
    });
  });
};
