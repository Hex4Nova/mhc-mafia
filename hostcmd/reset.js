exports.run = (client, message, args) => {
  const fs = require('fs');
  const data = require("./../data/id.json");
  const data_fn = __dirname + "/../data/id.json";
  let dataLW = require(__dirname + "/../data/will.json");
  const dataLW_fn = __dirname + "/../data/will.json";
  let dataCH = require(__dirname + "/../data/ch.json");
  const dataCH_fn = __dirname + "/../data/ch.json";
  let dataID = data.id
  let dataPP = data.pp
  const dataW = require("./../data/w.json");
  const dataWM = dataW.lastmsg;
  const dataWL = dataW.lover;
  const dataW_fn = __dirname + "/../data/w.json";
  
  const roleAlive = message.guild.roles.get('442613191139262464');
  const roleDead = message.guild.roles.get('442613265676107776');
  const aliveList = roleAlive.members;
  const deadList = roleDead.members;
  
  if  (message.member.roles.find("name", "Host") && message.author.id == 132262525818503168) {
    if (args[0] == "YESIMSURE") {
    async function resetgame() {
    
      message.channel.send(":construction: **The game is being reset, please stand by.** :construction:");
      
      message.channel.send("Clearing player data...");
      let keys = Object.keys(dataID);
      for (let i in keys) {
        dataID[keys[i]] = "";
        dataPP[keys[i]] = "";
        dataLW[keys[i]] = "";
      }
      keys = Object.keys(dataWM);
      for (var i in keys) {
        dataWM[keys[i]] = "";
      }
      
      message.channel.send("Deleting private channels...");
      let category1 = client.channels.get(dataCH.pricat).children;
      await category1.forEach((value, key, map) => {value.delete();});
      
      message.channel.send("Deleting public channels...");
      let category2 = client.channels.get(dataCH.pubcat).children;
      await category2.forEach((value, key, map) => {value.delete();});
      
      message.channel.send("Creating setup channel...");
      let setup_channel = await message.channel.guild.createChannel('「setup」', 'text')
      await setup_channel.setParent(dataCH.pubcat)
      .then(channel => {channel.overwritePermissions(message.guild.id, {SEND_MESSAGES: false});});
      dataCH.setup = setup_channel.id;
      
      message.channel.send("Creating logbook channel...");
      let logbook_channel = await message.channel.guild.createChannel('「logbook」', 'text')
      await logbook_channel.setParent(dataCH.pubcat)
      .then(channel => {channel.overwritePermissions(message.guild.id, {SEND_MESSAGES: false});});
      dataCH.logbook = logbook_channel.id;
      
      message.channel.send("Creating trial channel...");
      let trial_channel = await message.channel.guild.createChannel('「trial」', 'text')
      await trial_channel.setParent(dataCH.pubcat)
      .then(channel => {channel.overwritePermissions(message.guild.id, {SEND_MESSAGES: false});});
      dataCH.trial = trial_channel.id;
      
      message.channel.send("Creating city-hall channel...");
      let public_channel = await message.channel.guild.createChannel('city-hall', 'text')
      await public_channel.setParent(dataCH.pubcat)
      .then(channel => {channel.overwritePermissions(message.guild.id, {SEND_MESSAGES: false});
                        channel.overwritePermissions('442613191139262464', {SEND_MESSAGES: true});
                       });
      dataCH.public = public_channel.id;
      
      message.channel.send("Creating post-office channel...");
      let whisper_channel = await message.channel.guild.createChannel('post-office', 'text')
      await whisper_channel.setParent(dataCH.pubcat)
      .then(channel => {channel.overwritePermissions(message.guild.id, {SEND_MESSAGES: false});
                        channel.overwritePermissions('442613191139262464', {SEND_MESSAGES: true});
                       });
      dataCH.whisper = whisper_channel.id;
      
      message.channel.send("Creating graveyard channel...");
      let deadcat = client.channels.get('448221234837323777').children;
      deadcat.forEach((value, key, map) => {value.delete();});
      
      let dead_channel = await message.channel.guild.createChannel('graveyard', 'text')
      await dead_channel.setParent('448221234837323777')
      .then(channel => {channel.overwritePermissions(message.guild.id, {VIEW_CHANNEL: false});
                        channel.overwritePermissions('442613265676107776', {VIEW_CHANNEL: true});
                        channel.overwritePermissions('460028455464206337', {VIEW_CHANNEL: true, SEND_MESSAGES: false});
                       });
      dataCH.dead = dead_channel.id;
      
      message.channel.send("Removing ingame roles...");
      for (let [sf, user] of aliveList) {
        await user.removeRole('442613191139262464');
        await user.setNickname('');
      }
      for (let [sf, user] of deadList) {
        await user.removeRole('442613265676107776');
        await user.setNickname('');
      }
      
      message.channel.send("**The game has been reset.**");
    }
      
      resetgame().then(() => {
        fs.writeFile(data_fn, JSON.stringify(data, null, 2), function (err) {if (err) return console.log(err);});
        fs.writeFile(dataLW_fn, JSON.stringify(dataLW, null, 2), function (err) {if (err) return console.log(err);});
        fs.writeFile(dataCH_fn, JSON.stringify(dataCH, null, 2), function (err) {if (err) return console.log(err);});
        fs.writeFile(dataW_fn, JSON.stringify(dataW, null, 2), function (err) {if (err) return console.log(err);});
      });
      
    } else {
      message.channel.send(":warning: **Are you sure you want to reset all channels and player data? This is irreversible!**");
    }
  }
}