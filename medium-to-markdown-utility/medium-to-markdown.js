const mediumToMarkdown = require('medium-to-markdown');
const urls = require("./urls");
const fsPromises = require('fs/promises')
const path = require('path');
const { time } = require('console');

console.log(urls);

for(i = 0; i < urls.length; i++){
  console.log("Processing " + urls[i])
  mediumToMarkdown.convertFromUrl(urls[i])
  .then(async function (markdown) {
    
    await fsPromises.writeFile(path.join(__dirname, Date.now() + ".md"), markdown);
  });
}