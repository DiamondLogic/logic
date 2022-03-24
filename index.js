// Load up the discord.js library
const Discord = require("discord.js");

// This is your client. Some people call it `bot`, some people call it `self`, 
// some might call it `cootchie`. Either way, when you see `client.something`, or `bot.something`,
// this is what we're refering to. Your client.
const client = new Discord.Client();

// Here we load the config.json file that contains our token and our prefix values. 
const config = require("./config.json");
// config.token contains the bot's token
// config.prefix contains the message prefix.

client.on("ready", () => {
  // This event will run if the bot starts, and logs in, successfully.
  console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`); 
  // Example of changing the bot's playing game to something useful. `client.user` is what the
  // docs refer to as the "ClientUser".
  client.user.setActivity(`Do =Help For Help`);
});
client.on("guildCreate", guild => {
  // This event triggers when the bot joins a guild.
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
  client.user.setActivity(`Serving ${client.guilds.size} servers`);
});
client.on('ready', () => {
    console.log("Connected as " + client.user.tag)
})

client.on('ready', () => {
    // List servers the bot is connected to
    console.log("Servers:")
    client.guilds.forEach((guild) => {
        console.log(" - " + guild.name)

        // List all channels
        guild.channels.forEach((channel) => {
            console.log(` -- ${channel.name} (${channel.type}) - ${channel.id}`)
        })
    })
})


client.on("guildDelete", guild => {
  // this event triggers when the bot is removed from a guild.
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
  client.user.setActivity(`Serving ${client.guilds.size} servers`);
});


client.on("message", async message => {
  // This event will run on every single message received, from any channel or DM.
  
  // It's good practice to ignore other bots. This also makes your bot ignore itself
  // and not get into a spam loop (we call that "botception").
  if(message.author.bot) return;
  
  // Also good practice to ignore any message that does not start with our prefix, 
  // which is set in the configuration file.
  if(message.content.indexOf(config.prefix) !== 0) return;
  
  // Here we separate our "command" name, and our "arguments" for the command. 
  // e.g. if we have the message "+say Is this the real life?" , we'll get the following:
  // command = say
  // args = ["Is", "this", "the", "real", "life?"]
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  
  if(command == 'help'){
    message.delete().catch(O_o=>{});
    message.channel.send("\n1)  =gay (This is a joke) \n2) =welp \n3) =staff (This command is only for staff) \n4) =help (brings up this menu)  \n5) =abdl (Only for @abdl) \n6) =ok \n7) =jonny \n8) =hello")
  }
  if(command == 'staff') {
    if(!message.member.roles.some(r=>["Staff-Team"].includes(r.name)) ) 
      return message.reply("Sorry, you don't have permissions to use this!");
    message.delete().catch(O_o=>{});
		message.channel.send('\nHere are the commands for Staff:\n1) =Kick @usertag [Reason]\n2) =ban @usertag  [Reason]\n3) =say [Anything You Want]\n3) =Ping \n4) =purge [Ammount +1]')
  }
  if(command == 'sub') {
    message.delete().catch(O_o=>{});
    message.author.send('Subscribe to these links: \nDiamondForDaysYT: \nhttps://www.youtube.com/DiamondForDaysYT \nThe Flamer: \nhttps://www.youtube.com/channel/UCJPHfAdJjZML0xQ7cYnVtfQ \nTheRealMck: \nhttps://www.twitch.tv/thetruemck/ \nThanks And Enjoy The Content.')
  }
  if(command === 'rules'){
    message.delete()
    message.channel.send("**These are some Basic Rules More detailed rules are in the Server: ** \n1) You're allowed to swear, as long as you aren't targeting it at people \n2) Don't be rude. If you disagree with someone's political, ethical or religious belief, keep it to yourself. \n3) No spam or chainmail \n4)  No disrespect, homophobia, sexism, racism, etc. \n5) The @Staff-Team is always right and dont try to over rule, this will = a instant ban \n6) Keep conversation in the relevant rooms")
  }
  if(command == 'gay' ){
    message.delete().catch(O_o=>{});
     message.reply('Ha Gayyyyyy!')
  }
  
  if(command == 'welp') {
    message.delete().catch(O_o=>{}); 
    message.channel.send(" Comming Soon")
 }
  if(command === 'ok'){
    message.delete().catch(O_o=>{})
    message.channel.send('OK! :ok: :yum:  :smile: ')
}
 if(command === 'jonny'){
   message.delete()
   message.channel.send('Heres JONNY: https://tenor.com/view/heresjohnny-jacknicholson-shining-gif-5390104 ')
}
 
 if(command === 'hello'){
   message.delete().catch(O_o=>{})
   message.channel.send('HELLO THERE!: \nhttps://tenor.com/view/hello-there-gif-9442662')
 }
  if(command === "ping") {
    // Calculates ping between sending a message and editing it, giving a nice round-trip latency.
    // The second ping is an average latency between the bot and the websocket server (one-way, not round-trip)
    const m = await message.channel.send("Ping?-JUST CALCULATING MATE");
    m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
  }
  if(command === "say") {
    // makes the bot say something and delete the message. As an example, it's open to anyone to use. 
    // To get the "message" itself we join the `args` back into a string with spaces: 
    const sayMessage = args.join(" ");
    // Then we delete the command message (sneaky, right?). The catch just ignores the error with a cute smiley thing.
    message.delete().catch(O_o=>{}); 
    // And we get the bot to say the thing: 
    message.chann.send(sayMessage);
  }
  
  if(command === "kick") {
    message.delete().catch(O_o=>{});
    // This command must be limited to mods and admins. In this example we just hardcode the role names.
    // Please read on Array.some() to understand this bit: 
    // https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/some?
    if(!message.member.roles.some(r=>["Staff-Team"].includes(r.name)) ) 
      return message.reply("Sorry, you don't have permissions to use this!");
    
    // Let's first check if we have a member and if we can kick them!
    // message.mentions.members is a collection of people that have been mentioned, as GuildMembers.
    // We can also support getting the member by ID, which would be args[0]
    let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    if(!member)
      return message.reply("Please mention a valid member of this server");
    if(!member.kickable) 
      return message.reply("I cannot kick this user! Do they have a higher role?");
    
    // slice(1) removes the first part, which here should be the user mention or ID
    // join(' ') takes all the various parts to make it a single string.
    let reason = args.slice(1).join(' ');
    if(!reason) reason = "No reason provided";
    message.delete().catch(O_o=>{}); 
    // Now, time for a swift kick in the nuts!
    await member.kick(reason)
      .catch(error => message.reply(`Sorry ${message.author} I couldn't kick because of : ${error}`));
    message.channel.send(`${member.user.tag} has been kicked by ${message.author.tag} because: ${reason}`);

  }
  
  if(command === "ban") {
    message.delete().catch(O_o=>{});
    // Most of this command is identical to kick, except that here we'll only let admins do it.
    // In the real world mods could ban too, but this is just an example, right? ;)
    if(!message.member.roles.some(r=>["Staff-Team"].includes(r.name)) )
      return message.reply("Sorry, you don't have permissions to use this!");
    
    let member = message.mentions.members.first();
    if(!member)
      return message.reply("Please mention a valid member of this server");
    if(!member.bannable) 
      return message.reply("I cannot ban this user! Do they have a higher role? ");

    let reason = args.slice(1).join(' ');
    if(!reason) reason = "No reason provided";
    message.delete().catch(O_o=>{}); 
    await member.ban(reason)
      .catch(error => message.reply("Sorry ${message.author} I couldn't ban because of : ${error}"));
    message.channel.send(`${member.user.tag} has been banned by ${message.author.tag} because: ${reason}`);
  }
  
  if(command === "purge") {
    message.delete().catch(O_o=>{});
    if(!message.member.roles.some(r=>["Staff-Team"].includes(r.name)) )
      return message.reply("Sorry, you don't have permissions to use this!");
    // This command removes all messages from all users in the channel, up to 100.
    
    // get the delete count, as an actual number.
    const deleteCount = parseInt(args[0], 10);
    
    // Ooooh nice, combined conditions. <3
    if(!deleteCount || deleteCount < 1 || deleteCount > 100000)
      return message.reply("Please provide a number between 2 and 100 for the number of messages to delete");
    
    // So we get our messages, and delete them. Simple enough, right?
    message.delete().catch(O_o=>{}); 
    const fetched = await message.channel.fetchMessages({limit: deleteCount});
    message.channel.bulkDelete(fetched)
      .catch(error => message.reply(`Couldn't delete messages because of: ${error}`));
  }
});

client.on('guildMemberAdd', member => {
  member.user.send("***`Welcome to the Server:` *** \n1) If you are from the **ABDL Land server**, please go to the `roles channel` and read the different roles. \n\n\n2) If you are from, the **LogicDiscord Server** please `read` the `rules` and `accept` them. \n\n\n  **These are some Basic Rules More detailed rules are in the Server: ** \n1) You're allowed to swear, as long as you aren't targeting it at people \n2) Don't be rude. If you disagree with someone's political, ethical or religious belief, keep it to yourself. \n3) No spam or chainmail \n4)  No disrespect, homophobia, sexism, racism, etc. \n5) The @Staff-Team is always right and dont try to over rule, this will = a instant ban \n6) 6) Keep conversation in the relevant rooms");
});

client.on('message', (msg) => {
  // msg.content.includes('dsddsd') is for a word inside a sentence, however msg.content('dds') is at the start
  if(msg.content === 'Hi') {
    let userId = msg.author.id;
    msg.channel.send('HELLO THERE!: \nhttps://tenor.com/view/hello-there-gif-9442662');
    }
});

client.on('messgae', (msg)=>{
  if(msg.content === 'ok'){
    message.channel.send('OK! :ok: :yum:  :smile: ');
  }
});
client.login(config.token);
