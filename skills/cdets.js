//
// Stores a user choice in botkit 'users' storage, so that the value can be retreived later
//
module.exports = function (controller) {

    controller.hears([/^CDETS$/], 'direct_message,direct_mention', function (bot, message) {

        // Check if a User preference already exists
        var userId = message.raw_message.actorId;
        bot.reply(message, 'hi,  CDETS?  ')
        controller.storage.users.get(userId, function (err, data) {
            if (err) {
                bot.reply(message, 'could not access storage, err: ' + err.message, function (err, message) {
                    bot.reply(message, 'sorry, I am not feeling well \uF613! try again later...');
                });
                return;
            }
            askForFavoriteColor(controller, bot, message, userId);
        });
    });
}

function askForFavoriteColor(controller, bot, message, userId) {
    bot.startConversation(message, function (err, convo) {

        convo.ask("CDETS?", [
            {
                pattern: "^blue|green|pink|red|yellow|CSC",
                callback: function (response, convo) {

                    // Store color as user preference
                    var pickedColor = convo.extractResponse('answer');
                    var userPreference = { id: userId, value: pickedColor };
                    controller.storage.users.save(userPreference, function (err) {
                        if (err) {
                            convo.say(message, 'sorry, could not access storage, err: ' + err.message);
                            convo.next();
                            return;
                        }

                        convo.transitionTo("success", `_stored user preference_`);
                    });

                },
            },
            {
                default: true,
                callback: function (response, convo) {
                    convo.say("Sorry, I don't know this color. Try another one...");
                    convo.repeat();
                    convo.next();
                }
            }
        ], { key: "answer" });

        // Success thread
        convo.addMessage(
            "Cool, I love '{{responses.answer}}' too",
            "success");
    });

}

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
    "Authorization": "OAuth oauth_consumer_key=\\\"8f21b566-3ba1-4aa8-a629-e109f6c1bbb2\\\",oauth_signature_method=\\\"HMAC-SHA1\\\",oauth_timestamp=\\\"1521751302\\\",oauth_nonce=\\\"ZI9Vas1cdcS\\\",oauth_version=\\\"1.0\\\",oauth_signature=\\\"Av8E1%2B3RBB7E2j6wVtOGtWUFWEA%3D\\\"",
    "Cache-Control": "no-cache",
    "Postman-Token": "d2a3175d-b59a-4dd7-ac0d-67666e8c43d0"
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

