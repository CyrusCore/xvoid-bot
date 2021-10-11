const prefix = require('../config/config.json').prefix;

const menu = `
*Xvoid*

*⌊ Menu ⌉*

⌖ ${prefix}menu/help
⌖ ${prefix}donate
⌖ ${prefix}ownerbot/ownerbot
⌖ ${prefix}join [Group Link]
⌖ ${prefix}

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
⌖ ${prefix}silverplaybutton
⌖ ${prefix}goldplaybutton

*⌊ Media ⌉*

⌖ ${prefix}ytmp3 [link]
⌖ ${prefix}ytmp4 [link]
⌖ ${prefix}tiktok [link more info use !about-tiktok]
⌖ ${prefix}tiktokmusic [sound_link]
⌖ ${prefix}playvn [title]
⌖ ${prefix}playv [title]

*⌊ Nsfw ⌉*

⌖ ${prefix}xnxx [Title]
⌖ ${prefix}xnxxdl [link] [still in progress]

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

module.exports = {menu, adminmenu, donate}