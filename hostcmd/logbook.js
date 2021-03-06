exports.run = (client, message, args) => {
  const dataChannel = require.main.require("./data/channel.json");
  const dataPlayer = require.main.require("./data/player.json");
  const dataSetup = require.main.require("./data/setup.json");
  const dataTime = require.main.require("./data/time.json");
  const fnTime = process.cwd() + "/data/time.json";

  const $roleinfo = require.main.require("./const/roleinfo.json");
  const $function = require.main.require("./const/function.js");

  if (args[0] === "list") {
    message.channel.send(":scroll: **Logbook Entries:**\n*"+dataTime.logbookEntries.join("\n")+"*");
  } else
  if (args[0] === "demo") {
    let displayPhase = (dataTime.night === false) ? "day " : "night "
    message.channel.send($function.logbook(message, displayPhase + dataTime.dayNo, dataTime.logbookEntries));
  } else
  if (args[0] === "add") {

    let logbookEvent = (args[1] === "death") ? ["death", dataPlayer.userId[args[2]], args[3]]
                     : (args[1] === "attorney") ? ["attorney", dataPlayer.userId[args[2]]]
                     : (args[1] === "amnesiac") ? ["amnesiac", args.slice(2).join(" ")]
                     : (args[1] === "secretary") ? ["secretary", args.slice(2).join(" ")]
                     : (args[1] === "reveal") ? ["reveal", dataPlayer.userId[args[2]], args.slice(3).join(" ")]
                     : (args[1] === "trialdeath") ? ["trialdeath", dataPlayer.userId[args[2]], args[3]]
                     : undefined

    if (logbookEvent !== undefined) {
      dataTime.logbookEntries.push(logbookEvent)
      message.channel.send(":pen_fountain: **Added entry:** "+logbookEvent)
      $function.writeFile(fnTime, dataTime)
    }

  } else
  if (args[0] === "clear") {
    message.channel.send(":wastebasket: **Deleted Logbook Entries:**\n*"+dataTime.logbookEntries.join("\n")+"*");
    dataTime.logbookEntries = [];
    $function.writeFile(fnTime, dataTime)

  }
}
