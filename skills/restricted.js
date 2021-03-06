module.exports = function (controller) {

    controller.hears([/^restricted$/], "direct_message,direct_mention", function (bot, message) {

        bot.startConversation(message, function (err, convo) {

            convo.ask("What is your favorite color from restricted?", [
                {
                    pattern: "^blue|green|pink|red|yellow|CSC",
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
