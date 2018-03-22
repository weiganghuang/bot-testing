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
            //convo.say('done query')
            //console.log(body.toString());
        });
    });

    req.end(); 
}

