const prefix = require('../config/config.json').prefix;

const menu = `
*Xvoid*

*⌊ Menu ⌉*

⌖ ${prefix}menu/help
⌖ ${prefix}donate
⌖ ${prefix}ownerbot/ownerbot
⌖ ${prefix}join [Group Link]

*⌊ Other ⌉*

⌖ ${prefix}about


*⌊ Fun ⌉*

⌖ ${prefix}wallpaper [use !about-wallpaper]
⌖ ${prefix}dog
⌖ ${prefix}cat
⌖ ${prefix}fox
⌖ ${prefix}bird
⌖ ${prefix}lizard
⌖ ${prefix}shiba
⌖ ${prefix}bunny
⌖ ${prefix}duck
⌖ ${prefix}panda
⌖ ${prefix}girl
⌖ ${prefix}silverplaybutton [Text]
⌖ ${prefix}goldplaybutton [Text]
⌖ ${prefix}neondevil [Text]
⌖ ${prefix}firewing [Text]
⌖ ${prefix}angelwing [Text]

*⌊ Media ⌉*

⌖ ${prefix}ytmp3 [link]
⌖ ${prefix}ytmp4 [link]
⌖ ${prefix}tiktok [link more info use !about-tiktok]
⌖ ${prefix}tiktokmusic [sound_link]
⌖ ${prefix}playvn [title]
⌖ ${prefix}playv [title]

`

const nsfw = `

⌖ ${prefix}xnxx [Title]
⌖ ${prefix}xnxxdl [link] [still in progress]
⌖ ${prefix}nhder
⌖ ${prefix}blowjob [Random IMG]
⌖ ${prefix}neko [Random IMG]
⌖ ${prefix}maid [Random IMG]

`
const adminmenu = `
⌖ *${prefix}add*
⌖ *${prefix}kick* @tag
⌖ *${prefix}promote* @tag
⌖ *${prefix}demote* @tag
⌖ *${prefix}mutegrup*
⌖ *${prefix}tagall*
⌖ *${prefix}setprofile*
⌖ *${prefix}del*
⌖ *${prefix}welcome*
`
const donate = `
⌖ https://saweria.co/AbramSatria
⌖ https://trakteer.id/projectred
⌖ https://sociabuzz.com/projectred/tribe
`

const sourcecode = `
This source code / bot is an open-source (free) program written using Javascript, you can use, copy, modify, combine, publish, distribute, sublicense, and or sell copies without removing the main author of this source code / bot.
By using this source code / bot, you agree to the following Terms and Conditions:
- Source code / bots do not store your data on our servers.
- Source code / bot is not responsible for your orders to this bot.
- Source code / bot you can see at https://github.com/CyrusCore/xvoid-bot
Instagram: 
Best regards, CyNetics.`

module.exports = {menu, adminmenu, donate, nsfw, sourcecode}