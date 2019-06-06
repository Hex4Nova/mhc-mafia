exports.run = (client, message, args) => {
  
  var answers = ["It is certain.","It is decidedly so.","Without a doubt.","Yes - definitely.","You may rely on it.","As I see it, yes.","Most likely.","Outlook good.","Yes.","Signs point to yes.","Reply hazy, try again.","Ask again later.","Better not tell you now.","Cannot predict now.","Concentrate and ask again.","Don't count on it.","My reply is no.","My sources say no.","Outlook not so good.","Very doubtful."]

  var set = answers[Math.floor(Math.random() * answers.length)];
  
  if (args[0] === undefined) {
    message.channel.send(":8ball: "+message.author.username+", you must ask a question to get an answer!\n\n**Usage:** `.8ball <question>`");
  } else {
    message.channel.send(":8ball: "+message.author.username+", **"+set+"**");
  }
}