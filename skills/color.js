module.exports = function (controller) {

    controller.hears([/^color$/], 'direct_message,direct_mention', function (bot, message) {

        bot.startConversation(message, function (err, convo) {
            convo.say('This is a BotKit conversation sample.');

            convo.ask('What is your favorite color?', function (response, convo) {
                
                convo.say("Cool, I like '" + response.text + "' too!");
                query(convo)
                convo.next();
            });
        });

    });
};

function invoke() {
    var spawn = require("child_process").spawn
    var pythonProcess = spawn('python',['./test.py']);

}
function query(convo) {
    var http = require("https");

var options = {
  "method": "GET",
  "hostname": [
    "cdetsng",
    "cisco",
    "com"
  ],
  "path": [
    "wsapi",
    "LTS-5.0",
    "api",
    "bug",
    "CSCun66310",
    "note",
    "Release-note"
  ],
  "headers": {
    "Authorization": "OAuth oauth_consumer_key=\\\"8f21b566-3ba1-4aa8-a629-e109f6c1bbb2\\\",oauth_signature_method=\\\"HMAC-SHA1\\\",oauth_timestamp=\\\"1521760724\\\",oauth_nonce=\\\"QQniicDwLyO\\\",oauth_version=\\\"1.0\\\",oauth_signature=\\\"NEoMFSzF6Ow7%2FUufWt5j294ybh0%3D\\\"",
    "Cache-Control": "no-cache",
    "Postman-Token": "493819fc-5846-4f43-85a0-be973a78219c"
  }
};

var req = http.request(options, function (res) {
  var chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function () {
    var body = Buffer.concat(chunks);
    console.log(body.toString());
  });
});

req.end();
}

