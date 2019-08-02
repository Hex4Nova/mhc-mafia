exports.run = (client, message, args) => {
const fs = require('fs');
const dataPlayer = require.main.require("./data/player.json");
const dataChannel = require.main.require("./data/channel.json");
const dataWhisper = require.main.require("./data/whisper.json");
const fnWhisper = process.cwd() + "/data/whisper.json";
const $function = require.main.require("./const/function.js")


  if (args[0] !== undefined) { // argument exists

    let targetMember = message.guild.members.get(dataPlayer.userId[args[0]]); // get member object

    if (targetMember.id === undefined) {
      message.channel.send("Could not find any player by the ID **"+args[0]+"**.");
    } else if (args[1] !== undefined) {
      let love = client.users.get(dataPlayer.userId[args[1]]);
      message.channel.send(`:heart: ${user} and ${love} is now in love with each other!`);
      dataWhisper.lover[dataPlayer.userId[args[0]]] = dataPlayer.userId[args[1]];
      dataWhisper.lover[dataPlayer.userId[args[1]]] = dataPlayer.userId[args[0]];

    } else if (dataWhisper.lover[dataPlayer.userId[args[0]]] !== undefined) { // checks if specified player has a lover
      message.channel.send(`:broken_heart: ${user} and ${dataWhisper.lover[dataPlayer.userId[args[0]]]} is loveless!`);
      delete dataWhisper.lover[dataWhisper.lover[dataPlayer.userId[args[0]]]]; // delete second player: the first bracket selects the lover of the specified player.
      delete dataWhisper.lover[dataPlayer.userId[args[0]]]; // delete first player
    }
    $function.writeFile(fnWhisper, dataWhisper);
  }

}
