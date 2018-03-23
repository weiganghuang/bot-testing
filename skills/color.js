module.exports = function (controller) {

    controller.hears([/^color$/], 'direct_message,direct_mention', function (bot, message) {

        bot.startConversation(message, function (err, convo) {
            convo.say('This is a BotKit conversation sample.');

            convo.ask('What is your favorite color?', function (response, convo) {               
                query(convo)
                convo.say("Cool, I like '" + response.text + "' too!");
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
    var request = require("request");

    var options = { method: 'GET',
      url: 'https://171.70.124.118/wsapi/LTS-5.0/api/bug/CSCun66310/note/Release-note',
      timeout: 120000,
      headers: 
       { 'Postman-Token': '36b533c7-a276-4633-9e4d-f73d27bacd32',
         'Cache-Control': 'no-cache',
         Authorization: 'OAuth oauth_consumer_key=\\"8f21b566-3ba1-4aa8-a629-e109f6c1bbb2\\",oauth_signature_method=\\"HMAC-SHA1\\",oauth_timestamp=\\"1521760724\\",oauth_nonce=\\"QQniicDwLyO\\",oauth_version=\\"1.0\\",oauth_signature=\\"NEoMFSzF6Ow7%2FUufWt5j294ybh0%3D\\"' } };
    
    request(options, function (error, response, body) {
      if (error) throw new Error(error);
    
      console.log(body);
    });
}    
