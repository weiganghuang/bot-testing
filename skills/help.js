//
// Command: help
//
module.exports = function (controller) {

    controller.hears([/^help$/], 'direct_message,direct_mention', function (bot, message) {
        var text = "Here are my skills:";
        text += "\n- " + bot.appendMention(message, "color") + ": ask to pick a random color";
        text += "\n- " + bot.appendMention(message, "restricted") + ": let a user pick a color among a set of options";
        text += "\n- " + bot.appendMention(message, "storage1") + ": store picked color as a user preference";
        text += "\n- " + bot.appendMention(message, "threads") + ": branch to another thread";
        text += "\n- " + bot.appendMention(message, "variables") + ": enriched user-context among threads";
        text += "\n- " + bot.appendMention(message, "CDETS") + ": enter CSC to get details";
        text += "\n\nI also understand:";
        text += "\n- " + bot.appendMention(message, "about") + ": shows metadata about myself";
        text += "\n- " + bot.appendMention(message, "help") + ": spreads the word about my skills";
        text += "\n- " + bot.appendMention(message, "show [skill]") + ": display the code of the specified skill";
        bot.reply(message, text);
    });
}
