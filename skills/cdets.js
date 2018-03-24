//
// Stores a user choice in botkit 'users' storage, so that the value can be retreived later
//
module.exports = function (controller) {

    controller.hears([/^cdets$/], 'direct_message,direct_mention', function (bot, message) {

        bot.startConversation(message, function (err, convo) {
            convo.say('This is a CDETS bot sample.');
            convo.ask('What is your CDETS id?', [
               { 
                pattern: "^CSC",
                callback: function (response, convo) {                 
                    convo.say("Ok, I got '" + response.text );
                    convo.say("Let me get the details for you");
                    var cdets = response.text;
                    console.log('cdets:'+ cdets + 'xxx');
                    var request = require("request");
                    var urlvar = 'https://cdetsng.cisco.com/wsapi/LTS-5.0/api/bug/' + cdets.toString() +'/note/Release-note';
                    console.log('url: '+ urlvar);
                    var options = { 
                        method: 'GET',
                        url: urlvar,
                        timeout: 300000,
                        oauth:{
                            consumer_key:'8f21b566-3ba1-4aa8-a629-e109f6c1bbb2',
                            consumer_secret:'ZIaGE2sqvCqND2T0KcqCwef0sydQs1GC',
                        },
                        /* headers: {
                                     
                            Authorization: 'OAuth oauth_consumer_key=\"8f21b566-3ba1-4aa8-a629-e109f6c1bbb2\",oauth_signature_method=\"HMAC-SHA1\",oauth_timestamp=\"1521760724\",oauth_nonce=\"QQniicDwLyO\",oauth_version=\"1.0\",oauth_signature=\"NEoMFSzF6Ow7%2FUufWt5j294ybh0%3D\"' 
                        }  */
                    };

                    var str = '';
                    request(options, function (error, response, body) {
                        if (error) throw new Error(error);
                        str = body.toString();
                        convo.say('got query result');
                        convo.say(str);
                    
                        console.log(body.toString());
                        convo.next();
                    });

                },
            },
            {
                default: true,
                callback: function (response, convo) {
                    convo.say("Sorry, CDETS starts with CSC, try again.");
                    convo.repeat();
                    convo.next();
                }
            }
        ], { key: "answer"});
        });

    });
};


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
                        //convo.say(message,'send query');
                        //query(convo)
                        //convo.transitionTo("success", `_stored user preference_`);
                       
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

