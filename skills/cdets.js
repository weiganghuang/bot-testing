module.exports = function (controller) {

    controller.hears([/^CDETS$/], "direct_message,direct_mention", function (bot, message) {

        bot.startConversation(message, function (err, convo) {

            convo.ask("CDETS?", [
                {
                    pattern: "^CSC*",
                    callback: function (response, convo) {
                        convo.say('Cool, I like ' + response.text + ' too!');
                        convo.next();
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
            ]);
        });
    });
};
