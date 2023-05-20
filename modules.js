////////OS MODULES////////
// require is the function used to import module 
// os is a built in module
const os = require('os') 

//info about current user
const user = os.userInfo()

//method returns system uptime in seconds 
console.log(`The System Uptime is ${os.uptime()} seconds`);

//more using os built in methods
const currentOS = {
    name:os.type(),
    release:os.release(),
    totalMem:os.totalmem(),
    freeMem: os.freemem()
}

console.log(currentOS);

////////PATH MODULES////////
//path module
const path = require("path");

//returns a platform specific separator
console.log(path.sep);

//joins path
const filePath = path.join("/content", "subfolder", "test.txt");
console.log(filePath);

const base = path.basename(filePath);
console.log(base);

//path.resolve returns absolute path
const absolute = path.resolve(__dirname, "content", "subfolder", "test.txt");
console.log(absolute);


////////FS MODULES////////
//using destructuring
//readFileSync & writeFileSync are synchronous
//readFile and writeFile are asynchronous
const { readFileSync, writeFileSync, readFile, writeFile } = require("fs");

//reads contents of the txt files
const first = readFileSync("./content/first.txt", "utf8");
const second = readFileSync("./content/second.txt", "utf8");
console.log(first, second);

//creates new file. if file already exists, the contents get overwritten.
writeFileSync(
  "./content/result-sync.txt",
  `Here is the result: ${first}, ${second}`
);

//this will return undefined in the console log for the result, but the function does create a new txt file with the expected content
readFile("./content/first.txt", "utf8", (err, result) => {
  if (err) {
    return;
    console.log(err);
  }
  const first = result;
  readFile("./content/second.txt", "utf8", (err, result) => {
    if (err) {
      return;
      console.log(err);
    }
    const second = result;
    writeFile(
      "./content/result-async.txt",
      `Here is the result: ${first}, ${second}`,
      (err, result) => {
        if (err) {
          return;
          console.log(err);
        }
        console.log(result);
      }
    );
  });
});


////////HTTP MODULE////////
const http = require("http");

const server = http.createServer((request, response) => {
  if (request.url === "/") {
    response.end("Welcome to our home page");
  }
  if (request.url === "/about") {
    response.end("A little about us");
  }
  response.end(
    `<h1>Oops!</h1>
    <p>We can't seem to find the page you are looking for</p>
    <a href="/">Back Home</a>`
  );
});

server.listen(5000);
