const http = require("http");

const server = http.createServer((req, res) => {
  //  if (req.url === "/admin"){
  //     res.end("hey this is the admin pannel!!")
  //     return;
  //  }
  //  res.end("this is the kingdom of saroj kandel")

  if (req.url === "/admin") {
    res.end("hey this is the admin pannel!!");
  } else {
    res.end("this is the kingdom of saroj kandel");
  }
});
console.log("hello i am writing on the behalf of my young friend")
server.listen(5856);
