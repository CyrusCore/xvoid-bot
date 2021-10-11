const { prefix } = require('../../config/config.json').prefix

exports.wait = () => {
    return `Please wait a moment~`
}

exports.ok = () => {
    return `Ok desu~`
}

exports.wrongFormat = () => {
    return `Incorrect format! Please check the usage in *${prefix}menu*.`
}

exports.emptyMess = () => {
    return `Please enter the message!`
}

exports.cmdNotFound = (cmd) => {
    return `Command *${prefix}${cmd}* not found!`
}

exports.blocked = (ownerNumber) => {
    return `Bot not receiving calls. You have been blocked because breaking the rules!\n\nContact the owner: wa.me/${ownerNumber.replace('@c.us', '')}`
}

exports.ownerOnly = () => {
    return `This command only Owner-sama can use!`
}

exports.doneOwner = () => {
    return `Done, Owner-sama~`
}

exports.groupOnly = () => {
    return `This command can only be used in group!`
}

exports.adminOnly = () => {
    return `This command can only be used by group admins!`
}

exports.notNsfw = () => {
    return `NSFW command hasn't been enabled!`
}

exports.nsfwOn = () => {
    return `NSFW command was successfully *enabled*!`
}

exports.nsfwOff = () => {
    return `NSFW command was successfully *disabled*!`
}

exports.nsfwAlready = () => {
    return `NSFW command was successfully enabled before.`
}

exports.addedGroup = (chat) => {
    return `Thank you for inviting me, members of *${chat.contact.name}*!\n\nPlease register by typing:\n*${prefix}register* name | age`
}

exports.nhFalse = () => {
    return `Invalid code!`
}

exports.listBlock = (blockNumber) => {
    return `
*── 「 HALL OF SHAME 」 ──*
Total blocked: *${blockNumber.length}* user(s)\n
    `
}

exports.notPremium = () => {
    return `Sorry! This command can only be used by premium users.`
}

exports.notAdmin = () => {
    return `The user is not an admin!`
}

exports.adminAlready = () => {
    return `Cannot promote a user who is an admin already!`
}

exports.botNotPremium = () => {
    return `This bot does not support premium commands. Please contact the owner of this bot.`
}

exports.botNotAdmin = () => {
    return `Make the bot as admin first!`
}

exports.ytFound = (res) => {
    return `
*── 「 YOUTUBE 」 ──*
Video has been found!
➸ *Title*: ${res.title}
➸ *Description*:
${res.desc}
➸ *Duration*: ${res.duration}
    
Media is being send, please wait...
    `
}

exports.notRegistered = () => {
    return `You haven't registered in our database!\n\nPlease register by typing:\n*${prefix}register* name | age`
}

exports.registered = (name, age, userId, time, serial) => {
    return `
*── 「 REGISTRATION 」 ──*
    
Your account has been created with data below:
➸ *Name*: ${name}
➸ *Age*: ${age}
➸ *ID*: ${userId}
➸ *Registered time*: ${time}
➸ *Serial*: ${serial}
    
Note:
Don't share your *serial* to anyone!
    
Type *${prefix}rules* first ok~
    `
}

exports.registeredAlready = () => {
    return `You've registered before.`
}

exports.received = (pushname) => {
    return `Hello ${pushname}!\nThank you for reporting, we will work on it ASAP.`
}

exports.daily = (time) => {
    return `Sorry, but you have reached the limit using this commands.\nPlease wait *${time.hours}* hour(s) *${time.minutes}* minute(s) *${time.seconds}* second(s) more.`
}


exports.musiclimit = () => {
    return `The Music size is too large!`
}

exports.videoLimit = () => {
    return `The video size is too large!`
}

exports.joox = (result) => {
    return `
*── 「 JOOX 」 ──*
Song has been found!
➸ *Artist*: ${data.artist}
➸ *Title*: ${data.judul}
➸ *Album*: ${data.album}
➸ *Size*: ${data.size}
    
Media is being send, please wait...
    `
}

exports.gsm = (result) => {
    return `
*── 「 GSMARENA 」 ──*
➸ *Model*: ${result.title}
➸ *Spesification*: ${result.spec}
    `
}

exports.receipt = (result) => {
    return `
*${result.title}*
${result.desc}
➸ *Ingredients*: ${result.bahan}
➸ *Steps*:
${result.cara}
    `
}

exports.ytResult = (urlyt, title, channel, duration, views) => {
    return `
*── 「 YOUTUBE 」 ──*
➸ *Title*: ${title}
➸ *Channel*: ${channel}
➸ *Duration*: ${duration}
➸ *Views*: ${views}
➸ *Link*: ${urlyt}
    `
}

exports.profile = (username, status, premi, benet, adm, level, requiredXp, xp) => {
    return `
*── 「 USER INFO」 ──*
➸ *Username*: ${username}
➸ *Status*: ${status}
➸ *Premium*: ${premi}
➸ *Banned*: ${benet}
➸ *Admin*: ${adm}
=_=_=_=_=_=_=_=_=_=_=_=_=
*── 「 PROGRESS 」 ──*
➸ *Level*: ${level}
➸ *XP*: ${xp} / ${requiredXp}
    `
}

exports.detectorOn = (name, formattedTitle) => {
    return `
*── 「 ANTI GROUP LINK 」 ──*
Attention for all *${(name || formattedTitle)}* members.
This group has an anti-group link detector, if one of you sending a group link then you'll be kicked immediately.
Thank you for your attention.
- Admin *${(name || formattedTitle)}*
    `
}

exports.detectorOff = () => {
    return `Anti-group link feature was successfully *disabled*!`
}

exports.detectorOnAlready = () => {
    return `Anti-group link feature has been enabled before.`
}

exports.antiNsfwOn = (name, formattedTitle) => {
    return `
*── 「 ANTI NSFW LINK 」 ──*
Attention for all *${(name || formattedTitle)}* members.
This group has an anti-NSFW link detector, if one of you sending a NSFW link then you'll be kicked immediately.
Thank you for your attention.
- Admin *${(name || formattedTitle)}*
    `
}

exports.antiNsfwOff = () => {
    return `Anti-NSFW link feature was successfully *disabled*!`
}

exports.antiNsfwOnAlready = () => {
    return `Anti-NSFW link feature has been enabled before.`
}

exports.linkDetected = () => {
    return `
*── 「 ANTI GROUP LINK 」 ──*
You've sent a group link!
Sorry, but you have to leave...
    `
}

exports.levelingOn = () => {
    return `Leveling feature was successfully *enabled*!`
}

exports.levelingOff = () => {
    return `Leveling feature was successfully *disabled*!`
}

exports.levelingOnAlready = () => {
    return `Leveling feature has been enabled before.`
}

exports.levelingNotOn = () => {
    return `Leveling feature hasn't been enabled!`
}

exports.levelNull = () => {
    return `You don't have any level yet!`
}

exports.welcome = (event) => {
    return `Welcome @${event.who.replace('@c.us', '')}!`
}

exports.welcomeOn = () => {
    return `Welcome feature was successfully *enabled*!`
}

exports.welcomeOff = () => {
    return `Welcome feature was successfully *disabled*!`
}

exports.welcomeOnAlready = () => {
    return `Welcome feature has been enabled before.`
}

exports.minimalDb = () => {
    return `Need at least *10* users that have a level in database!`
}

exports.autoStikOn = () => {
    return `Auto-sticker feature was successfully *enabled*!`
}

exports.autoStikOff = () => {
    return `Auto-sticker feature was successfully *enabled*!`
}

exports.autoStikOnAlready = () => {
    return `Auto-sticker feature has been enabled before.`
}

exports.afkOn = (pushname, reason) => {
    return `
*── 「 AFK MODE 」 ──*
    
AFK feature has been successfully *enabled*!
➸ *Username*: ${pushname}
➸ *Reason*: ${reason}
    `
}

exports.afkOnAlready = () => {
    return `AFK feature has been enabled before.`
}

exports.afkMentioned = (getReason, getTime) => {
    return `
*── 「 AFK MODE 」 ──*
Sssttt! This person in currently AFK, don't bother!
➸ *Reason*: ${getReason}
➸ *Since*: ${getTime}
    `
}

exports.afkDone = (pushname) => {
    return `*${pushname}* is back from AFK, welcome~`
}

exports.gcMute = () => {
    return `
*── 「 MUTED 」 ──*
    
Only admins who can send message in this group.
    `
}

exports.gcUnmute = () => {
    return `
*── 「 UNMUTED 」 ──*
All members can send message in this group now.
    `
}

exports.notNum = (q) => {
    return `"${q}", are not a numbers!`
}

exports.playstore = (app_id, title, developer, description, price, free) => {
    return `
*── 「 PLAY STORE 」 ──*
    
➸ *Name*: ${title}
➸ *ID*: ${app_id}
➸ *Developer*: ${developer}
➸ *Free*: ${free}
➸ *Price*: ${price}
➸ *Description*: ${description}
    `
}

exports.shopee = (nama, harga, terjual, shop_location, description, link_product) => {
    return `
*── 「 SHOPEE 」 ──*
➸ *Name*: ${nama}
➸ *Price*: ${harga}
➸ *Sold*: ${terjual}
➸ *Location*: ${shop_location}
➸ *Product link*: ${link_product}
➸ *Description*: ${description}
    `
}

exports.registeredFound = (name, age, time, serial, userId) => {
    return `
*── 「 REGISTERED 」 ──* 
Account has been found!
➸ *Name*: ${name}
➸ *Age*: ${age}
➸ *ID*: ${userId}
➸ *Registered time*: ${time}
➸ *Serial*: ${serial}
    `
}

exports.registeredNotFound = (serial) => {
    return `Account with serial: *${serial}* not found!`
}

exports.ytPlay = (result) => {
    return `
*── 「 PLAY 」 ──*
➸ *Title*: ${result.title}
➸ *Duration*: ${result.duration}
➸ *Link*: ${result.url}
Media is being send, please wait...
    `
}

exports.pcOnly = () => {
    return `This command can only be used in private chat!`
}

exports.linkNsfw = () => {
    return `
*── 「 ANTI NSFW LINK 」 ──*
You've sent a group link!
Sorry, but you have to leave...
    `
}

exports.ageOld = () => {
    return `You're too old for using this feature! Please go back to your youth to be able to using this feature.`
}

exports.menuText = () => {
    return `
╔══❉ *𝐓𝐞𝐱𝐭 𝐌𝐚𝐤𝐞𝐫 (VF)* ❉═══
║
║ For spaces, use *+*
║ Example: ${prefix}text1 neon good+morning
║
╟⊱ *${prefix}text1 burnpaper* _text_
╟⊱ *${prefix}text1 candlemug* _text_
╟⊱ *${prefix}text1 lovemsg* _text_
╟⊱ *${prefix}text1 mugflower* _text_
╟⊱ *${prefix}text1 narutobanner* _text_
╟⊱ *${prefix}text1 paperonglass* _text_
╟⊱ *${prefix}text1 romancetext* _text_
╟⊱ *${prefix}text1 shadowtext* _text_
╟⊱ *${prefix}text1 tiktokeffect* _text_
║
╚══❉ *BocchiBot* ❉════
    `
}

exports.fakeLink = () => {
    return `Ow, this link looks kinda suspicious, for the security of the members of this group I'm gonna kick you.\nBye~.`
}

exports.muteChatOn = () => {
    return `Successfully *mute* bot for this group!`
}

exports.muteChatOff = () => {
    return `Successfully *unmute* bot for this group!`
}

exports.muteChatOnAlready = () => {
    return `Bot is already muted in this group!`
}