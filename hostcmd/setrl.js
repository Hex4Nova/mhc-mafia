exports.run = (client, message, args) => {
  const dataPlayer = require.main.require("./data/player.json");
  const fnPlayer = process.cwd() + "/data/player.json";
  const dataChannel = require.main.require("./data/channel.json");
  const fnChannel = process.cwd() + "/data/channel.json";
  const dataSetup = require("./../data/setup.json");
  const fnSetup = process.cwd() + "/data/setup.json";

  const $function = require.main.require("./const/function.js");

  let old = dataSetup.rolelist
  dataSetup.rolelist = args
  message.channel.send("**Role list saved as: **"+dataSetup.rolelist+"\n\n*Was: "+old+"*");
  $function.writeFile(fnSetup, dataSetup)
}
