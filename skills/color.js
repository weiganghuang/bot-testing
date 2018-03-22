module.exports = function (controller) {

    controller.hears([/^color$/], 'direct_message,direct_mention', function (bot, message) {

        bot.startConversation(message, function (err, convo) {
            convo.say('This is a BotKit conversation sample.');

            convo.ask('What is your favorite color?', function (response, convo) {
                
                convo.say("Cool, I like '" + response.text + "' too!");
                //invoke()
                convo.next();
            });
        });

    });
};
function invoke() {
    var spawn = require("child_process").spawn

}
function query(convo) {
    var unirest = require("unirest");

    var req = unirest("GET", "https://cdetsng.cisco.com/wsapi/LTS-5.0/api/bug/CSCun66310/note/Release-note");
    
    req.headers({
      //"Postman-Token": "e45590e2-79b2-4f8c-a554-2a4d513ed072",
      "Cache-Control": "no-cache",
      "Authorization": "OAuth oauth_consumer_key=\\\"8f21b566-3ba1-4aa8-a629-e109f6c1bbb2\\\",oauth_signature_method=\\\"HMAC-SHA1\\\",oauth_timestamp=\\\"1521759362\\\",oauth_nonce=\\\"KThl8SvRIuw\\\",oauth_version=\\\"1.0\\\",oauth_signature=\\\"oMoXqBrVVimd6kzz%2B8sAld9g48I%3D\\\""
    });
    
    
    req.end(function (res) {
      if (res.error) throw new Error(res.error);
    
      console.log(res.body);
    });
    
}

