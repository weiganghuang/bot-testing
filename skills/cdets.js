module.exports = function (controller) {

    controller.hears([/^CDETS$/], "direct_message,direct_mention", function (bot, message) {

        bot.startConversation(message, function (err, convo) {

            convo.ask("CDETS?", [
                {
                    pattern: "^CSC",
                    callback: function (response, convo) {
                        convo.say('You entered  ' + response.text + ' I will get the information');
                        var ddts = response.text;
                        var secret = "ZIaGE2sqvCqND2T0KcqCwef0sydQs1GC";
                        var key = "8f21b566-3ba1-4aa8-a629-e109f6c1bbb2";
                        var url = "https://cdetsng.cisco.com/wsapi/LTS-5.0/api/bug/${ddts}/note/Release-note";
                        var request = require("request");

var options = { method: 'GET',
  url: 'https://cdetsng.cisco.com/wsapi/LTS-5.0/api/bug/CSCun66310/note/Release-note',
  headers: 
   { 'Postman-Token': 'ea7b5e5f-164f-4de2-ba3e-66d2a21ca011',
     'Cache-Control': 'no-cache',
     Authorization: 'OAuth oauth_consumer_key=\\"8f21b566-3ba1-4aa8-a629-e109f6c1bbb2\\",oauth_signature_method=\\"HMAC-SHA1\\",oauth_timestamp=\\"1521751302\\",oauth_nonce=\\"ZI9Vas1cdcS\\",oauth_version=\\"1.0\\",oauth_signature=\\"Av8E1%2B3RBB7E2j6wVtOGtWUFWEA%3D\\"' } };
//conv.say('about to send request');
request(options, function (error, response, body) {
  if (error) throw new Error(error);
  conv.say('yes  ' + body)
  console.log(body);
});
                        convo.next();
                    },
                },
                {
                    default: true,
                    callback: function (response, convo) {
                        convo.say("Sorry, I don't understand. check your format, did you have a space after mention?...");
                        convo.repeat();
                        convo.next();
                    }
                }
            ]);
        });
    });
};
