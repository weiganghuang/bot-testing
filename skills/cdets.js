module.exports = function (controller) {

    controller.hears([/^CDETS$/], "direct_message,direct_mention", function (bot, message) {

        bot.startConversation(message, function (err, convo) {

            convo.ask("CDETS?", [
                {
                    pattern: "^CSC",
                    callback: function (response, convo) {
                        convo.say('You entered  ' + response.text + ' I will get the information');
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
