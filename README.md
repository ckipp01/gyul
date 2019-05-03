# 귤

gyul is a micro wiki engine for displaying information for the chronica ecosystem.

I often find myself reaching for what I know, when the solution may be overkill. For simple static sites, we don't always need giant frameworks. This is my attempt at creating something small to fulfill that purpose for my [wiki, wiki.chronica.xyz](https://wiki.chronica.xyz).

gyul works by a factory function creating an object which creates a record of all the possible keys in the site and their relevant information. Then by passing it the hash of the url it does a look up in the object and returns the necessary data.
If you look at the index.html page you'll see what is shown below:

```javascript
const GYUL = Gyul()
GYUL.package(window.location.hash)`
```

This creates the main object and then the pacakge fucntion uses the key to locate the correct object, iterate through the temlate, logs, tags, and data it contains to create what you'll see on each page.
The structure of the GYUL object is below:

```javascript
GYUL
  package: rawKey => { iterates throw data using the template and renders the dom }
  showInfo: rawKey => { changes the main element on the page to show the main info of the current key's data }
  showLogs: rawKey => { changes the main element on the page to show the logs of the current key's type }
  showStats: rawKey => { changes the main element on the page to show the stats and breakdown of the time spent on the key's entries }
  showTags: rawKey => { changes the main element on the page to show the related tags to the key }
  switchHeader: rawKey => { changes the header element on the page to match the header element found in the key's template }
  report: () => { gives a report to the console on missing projects and tags from the CRATE }
```

There are basically two main important script files that power gyul. One is gyul.js where the factory function is, and all of the necessary methods to parse the data and turn it into dom elements.
The other file, tempate.js, does just want it sounds like and provides multiple different templates that gyul can choose from to determine how things are layed out.
The next iteration of this plans on doing all of this on the sever side and just handing up the necssary data in order to not have to rely on JS on the client side.
