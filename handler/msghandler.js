require('dotenv').config()
const { decryptMedia } = require('@open-wa/wa-automate')
const moment = require('moment-timezone')
moment.tz.setDefault('America/Los_Angeles')
const axios = require('axios')
const fetch = require('node-fetch')
const appRoot = require('app-root-path')
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const db_group = new FileSync(appRoot+'/lib/data/group.json')
const db = low(db_group)
db.defaults({ group: []}).write()
const removeBackgroundFromImageBase64 = require('remove.bg')
const exec = require('child_process')
const cariKasar = require('../lib/dirtywords')
const _txt= require('../commands/menu')
const ownerNumber = require('../config/config.json').ownernumber
const { processTime } = require('../utils')
const fs = require('fs-extra')
const banned = JSON.parse(fs.readFileSync('./database/banned.json'))
const simi = JSON.parse(fs.readFileSync('./database/simi.json'))
const ngegas = JSON.parse(fs.readFileSync('./database/ngegas.json'))
const setting = JSON.parse(fs.readFileSync('./database/setting.json'))
const welcome = JSON.parse(fs.readFileSync('./database/welcome.json'))
const color = require('../utils/color')
const xvoidApi = require('../api/xvoidApi')
const _function = require('../lib/index')
const prefix = require('../config/config.json').prefix
const lolhuman = require('../config/api.json').lolhuman
const apizeks = require('../config/api.json').zeks
const faq = require('../commands/about')
const canvas = require('canvacord')
const requests = require("node-fetch")
const bent = require('bent')
const { daily, level, register, afk, reminder, premium, limit} = require('../function/index')
//JSON DATABASE
const _nsfw = JSON.parse(fs.readFileSync('./database/group/nsfw.json'))
const _antilink = JSON.parse(fs.readFileSync('./database/group/antilink.json'))
const _antinsfw = JSON.parse(fs.readFileSync('./database/group/antinsfw.json'))
const _leveling = JSON.parse(fs.readFileSync('./database/group/leveling.json'))
const _welcome = JSON.parse(fs.readFileSync('./database/group/welcome.json'))
const _autosticker = JSON.parse(fs.readFileSync('./database/group/autosticker.json'))
const _ban = JSON.parse(fs.readFileSync('./database/bot/banned.json'))
const _premium = JSON.parse(fs.readFileSync('./database/bot/premium.json'))
const _mute = JSON.parse(fs.readFileSync('./database/bot/mute.json'))
const _registered = JSON.parse(fs.readFileSync('./database/bot/registered.json'))
const _level = JSON.parse(fs.readFileSync('./database/user/level.json'))
let _limit = JSON.parse(fs.readFileSync('./database/user/limit.json'))
const _afk = JSON.parse(fs.readFileSync('./database/user/afk.json'))
const _reminder = JSON.parse(fs.readFileSync('./database/user/reminder.json'))
const _daily = JSON.parse(fs.readFileSync('./database/user/daily.json'))
const _stick = JSON.parse(fs.readFileSync('./database/bot/sticker.json'))
const _setting = JSON.parse(fs.readFileSync('./database/bot/setting.json'))

module.exports = async (client, message) => {
    try{
        const { id, body, mimetype, type, t, from, sender, content, caption, author, isGroupMsg, chat, quotedMsg, quotedMsgObj, mentionedJidList, chatId } = message;
        const { name, shortName, pushname, formattedName } = sender;
        const { formattedTitle, isGroup, contact, groupMetadata } = chat;
        const chats = (type === 'chat') ? body : (type === 'image' || type === 'video') ? caption : ''
        const botOwner = require('../config/config.json').owner
        const botGroup = require('../config/config.json').support
        const botPrefix = require('../config/config.json').prefix
        const botAdmin = require('../config/config.json').admin
        const groupId = isGroupMsg ? chat.groupMetadata.id : ''
        const groupAdmins = isGroupMsg ? await client.getGroupAdmins(groupId) : ''
        const isGroupAdmins = groupAdmins.includes(sender.id) || false
        const args = body.trim().split(/ +/).slice(1)
        const botNumber = (await client.getHostNumber()) + '@c.us';
        const q = args.join(' ')
        const ar = body.trim().split(/ +/).slice(1)
        const isAdmin = groupMetadata ? groupMetadata.participants.find((res) => res.id === sender.id).isAdmin : undefined;
        const isOwner = sender.id === ownerNumber
        const isBotAdmin = groupMetadata ? groupMetadata.participants.find((res) => res.id === botNumber).isAdmin : undefined;
        const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
        const errorurl2 = 'https://steamuserimages-a.akamaihd.net/ugc/954087817129084207/5B7E46EE484181A676C02DFCAD48ECB1C74BC423/?imw=512&&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false'
        const errorur121 = 'https://i.imgur.com/VKoNMIR.png'
        const pengirim = sender.id
        const isBanned = banned.includes(pengirim)
        const isOwnerBot = ownerNumber.includes(pengirim)
        const isAdminBot = botAdmin.includes(pengirim)
        const isDetectorOn = isGroupMsg ? _antilink.includes(groupId) : false
        const isSimi = simi.includes(chatId)
        const isNgegas = ngegas.includes(chatId)
        const isKasar = await cariKasar(chats)
        const ind = require('../message/index').ind
        const eng = require('../message/index').eng
        const eng1 = require('../message/index').eng1
        const ind1 = require('../message/index').ind1
        const isLevelingOn = isGroupMsg ? _leveling.includes(groupId) : false

        const validMessage = caption ? caption : body;
        if (!validMessage || validMessage[0] != botPrefix) return;
    
        const command = validMessage.trim().split(' ')[0].slice(1);
        const arguments = validMessage.trim().split(' ').slice(1);
        const senderId = sender.id.split('@')[0] || from.split('@')[0];
        const urlRegex = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
    
        // debug
        console.debug(color('yellow', isGroup ? '[GROUP]' : '[PERSONAL]'), `!${command} | ${sender.id} ${isGroup ? 'FROM ' + formattedTitle : ''}`, color('yellow', moment().format()));

        if (isBanned) {
            return console.log(color('[BAN]', 'red'), color(moment(t * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname))
          }

        client.onMessageDeleted(async (message) => {
            client.SendText(from, 'Why You Deleting your message?', id)
        })

        //Anti Virtex
        if (isGroupMsg && !isGroupAdmins && isBotGroupAdmins && !isOwner) {
            if (chats.length > 5000) {
                await client.sendTextWithMentions(from, `@${sender.id} is detected sending a virtext.\nYou will be kicked!`)
                await client.removeParticipant(groupId, sender.id)
             }
         } 
        if (isGroupMsg && !isGroupAdmins && isBotGroupAdmins && isDetectorOn && !isOwner) {
            if (chats.match(new RegExp(/(https:\/\/chat.(?!whatsapp.com))/gi))) {
                console.log(color('[KICK]', 'red'), color('Received a fake group link!', 'yellow'))
                await client.reply(from, 'Fake group link detected!', id)
                await client.removeParticipant(groupId, sender.id)
            }
        }

        const allChats = await client.getAllChats();
        switch (command) {
            //Info
            case 'about':
                await client.sendText(from, faq.help, id)
                break;
            case 'about-tiktok':
                await client.sendText(from, faq.tiktok, id)
                break;
            case 'about-me':
                await client.sendText(from, faq.me, id)
                break;
            case 'about-wallpaper':
                await client.sendText(from, faq.wallpaper, id)
                break;
            case 'about-api':
                await client.sendText(from, faq.api, id)
                break;
            case 'help':
            case 'menu':
                const img5 = 'https://cdn.iconscout.com/icon/free/png-256/node-js-3445765-2878691.png'
                await client.sendFileFromUrl(from, img5, '', _txt.menu, id)
                break;
            case 'adminmenu':
                if (!isGroupMsg) return client.reply(from, 'Sorry, this command can only be used in groups!', id)
                if (!isGroupAdmins) return client.reply(from, 'Fail, this command can only be used by group admins!', id)
                await client.sendText(from, _txt.adminmenu, id)
                break;
            case 'donate':
                await client.sendText(from, _txt.donate)
                break;
            case 'owner':
            case 'ownerbot':
                await client.sendContact(from, ownerNumber)
                break;
            case 'join':
                if (args.length == 0) return client.reply(from, `If you want to invite bots to a group, please invite or by typing ${prefix}join [group link]`, id)
                let linkgrup = body.slice(6)
                let islink = linkgrup.match(/(https:\/\/chat.whatsapp.com)/gi)
                let chekgrup = await client.inviteInfo(linkgrup)
                if (!islink) return client.reply(from, 'Sorry the group link is wrong! please send the correct link', id)
                if (isOwnerBot) {
                    await client.joinGroupViaLink(linkgrup)
                          .then(async () => {
                              await client.sendText(from, 'Successfully joined the group via the link!')
                              await client.sendText(chekgrup.id, `Hai minna~, Im client Bot. To find out the commands on this Bot type ${prefix}menu`)
                          })
                } else {
                    let cgrup = await client.getAllGroups()
                    if (cgrup.length > groupLimit) return client.reply(from, `Sorry, the group on this bot is full\nMax Group is: ${groupLimit}`, id)
                    await client.joinGroupViaLink(linkgrup)
                          .then(async () =>{
                              await client.reply(from, 'Successfully joined the group via the link!', id)
                          })
                          .catch(() => {
                              client.reply(from, 'Fail!', id)
                          })
                }
                break;
            //Admins Group
            case 'add':
                if (!isGroupMsg) return client.reply(from, 'Sorry, this command can only be used in groups!', id)
                if (!isGroupAdmins) return client.reply(from, 'Fail, this command can only be used by group admins!', id)
                if (!isBotGroupAdmins) return client.reply(from, 'Failed, please add bot as group admin!', id)
                if (args.length !== 1) return client.reply(from, `To use ${prefix}add\nUse: ${prefix}add <number>\nexample: ${prefix}add 628xxx`, id)
                    try {
                        await client.addParticipant(from,`${args[0]}@c.us`)
                    } catch {
                        client.reply(from, 'Unable to add target', id)
                    }
                break;
            case 'kick':
                if (!isGroupMsg) return client.reply(from, 'Sorry, this command can only be used in groups!', id)
                if (!isGroupAdmins) return client.reply(from, 'Fail, this command can only be used by group admins!', id)
                if (!isBotGroupAdmins) return client.reply(from, 'Failed, please add bot as group admin!', id)
                if (mentionedJidList.length === 0) return client.reply(from, 'Sorry, the message format is wrong.\nPlease tag one or more people to be excluded', id)
                if (mentionedJidList[0] === botNumber) return await client.reply(from, 'Sorry, the message format is wrong.\nUnable to log out the bot account myself', id)
                await client.sendTextWithMentions(from, `Request accepted, Kick:\n${mentionedJidList.map(x => `@${x.replace('@c.us', '')}`).join('\n')}`)
                for (let i = 0; i < mentionedJidList.length; i++) {
                    if (groupAdmins.includes(mentionedJidList[i])) return await client.sendText(from, 'Failed, you cannot remove the group admin.')
                    await client.removeParticipant(groupId, mentionedJidList[i])
                }
                break;
            case 'promote':
                if (!isGroupMsg) return client.reply(from, 'Sorry, this command can only be used in groups!', id)
                if (!isGroupAdmins) return client.reply(from, 'Fail, this command can only be used by group admins!', id)
                if (!isBotGroupAdmins) return client.reply(from, 'Failed, please add bot as group admin!', id)
                if (mentionedJidList.length !== 1) return client.reply(from, 'Sorry, I can only promote 1 user', id)
                if (groupAdmins.includes(mentionedJidList[0])) return await client.reply(from, 'Sorry, the user is already an admin.', id)
                if (mentionedJidList[0] === botNumber) return await client.reply(from, 'Sorry, wrong message format.\nUnable to promote own bot account', id)
                await client.promoteParticipant(groupId, mentionedJidList[0])
                await client.sendTextWithMentions(from, `Request accepted, Added @${mentionedJidList[0].replace('@c.us', '')} As Admin.`)
                break;
            case 'demote':
                if (!isGroupMsg) return client.reply(from, 'Sorry, this command can only be used in groups!', id)
                if (!isGroupAdmins) return client.reply(from, 'Fail, this command can only be used by group admins!', id)
                if (!isBotGroupAdmins) return client.reply(from, 'Failed, please add bot as group admin!', id)
                if (mentionedJidList.length !== 1) return client.reply(from, 'Sorry, can only demote 1 user', id)
                if (!groupAdmins.includes(mentionedJidList[0])) return await client.reply(from, 'Sorry, the user is not an admin yet.', id)
                if (mentionedJidList[0] === botNumber) return await client.reply(from, 'Sorry, wrong message format.\nUnable to demote own bot account', id)
                await client.demoteParticipant(groupId, mentionedJidList[0])
                await client.sendTextWithMentions(from, `Request accepted, Removing @${mentionedJidList[0].replace('@c.us', '')} As Admin.`)
                break;
            case 'del':
                if (!isGroupAdmins) return client.reply(from, 'Fail, this command can only be used by group admins!', id)
                if (!quotedMsg) return client.reply(from, `Sorry, wrong message format please.\nReply bot message with caption ${prefix}del`, id)
                if (!quotedMsgObj.fromMe) return client.reply(from, `Sorry, wrong message format please.\nReply bot message with caption ${prefix}del`, id)
                client.deleteMessage(quotedMsgObj.chatId, quotedMsgObj.id, false)
                break;
            case 'tagall':
            case 'everyone':
                if (!isGroupMsg) return client.reply(from, 'Sorry, this command can only be used in groups!', id)
                if (!isGroupAdmins) return client.reply(from, 'Fail, this command can only be used by group admins!', id)
                const groupMem = await client.getGroupMembers(groupId)
                let hehex = '╔══✪〘 Mention All 〙✪══\n'
                for (let i = 0; i < groupMem.length; i++) {
                    hehex += '╠➥'
                    hehex += ` @${groupMem[i].id.replace(/@c.us/g, '')}\n`
                }
                hehex += '╚═〘 *X V O I D  B O T* 〙'
                await client.sendTextWithMentions(from, hehex)
                break;
            case 'welcome':
                if (!isGroupMsg) return client.reply(from, 'Sorry, this command can only be used in groups!', id)
                if (!isGroupAdmins) return client.reply(from, 'Fail, this command can only be used by group admins!', id)
                if (!isBotGroupAdmins) return client.reply(from, 'Failed, please add bot as group admin!', id)
                if (args.length !== 1) return client.reply(from, `Make BOT greet new members who join the group chat!\n\nUsage:\n${prefix}welcome on\n${prefix}welcome off`, id)
                if (args[0] == 'on') {
                    welcome.push(chatId)
                    fs.writeFileSync('./database/welcome.json', JSON.stringify(welcome))
                    client.reply(from, 'Welcome Message is now activated!', id)
                } else if (args[0] == 'off') {
                    let xporn = welcome.indexOf(chatId)
                    welcome.splice(xporn, 1)
                    fs.writeFileSync('./database/welcome.json', JSON.stringify(welcome))
                    client.reply(from, 'Welcome Message is now disabled', id)
                } else {
                    client.reply(from, `Make BOT greet new members who join the group chat!\n\nUsage:\n${prefix}welcome on\n${prefix}welcome off`, id)
                }
                break;
            case 'setprofile':
                if (!isGroupMsg) return client.reply(from, 'Sorry, this command can only be used in groups!', id)
                if (!isGroupAdmins) return client.reply(from, 'Fail, this command can only be used by group admins!', id)
                if (!isBotGroupAdmins) return client.reply(from, 'Failed, please add bot as group admin!', id)
                if (isMedia && type == 'image' || isQuotedImage) {
                    const dataMedia = isQuotedImage ? quotedMsg : message
                    const _mimetype = dataMedia.mimetype
                    const mediaData = await decryptMedia(dataMedia, uaOverride)
                    const imageBase64 = `data:${_mimetype};base64,${mediaData.toString('base64')}`
                    await client.setGroupIcon(groupId, imageBase64)
                } else if (args.length === 1) {
                    if (!isUrl(url)) { await client.reply(from, 'Sorry, the link you sent is invalid.', id) }
                    client.setGroupIconByUrl(groupId, url).then((r) => (!r && r !== undefined)
                    ? client.reply(from, 'Sorry, the link you sent does not contain an image.', id)
                    : client.reply(from, 'Successfully changed group profile', id))
                } else {
                    client.reply(from, `These commands are used to change the group chat icon/profile\n\n\nUsage:\n1. Please send/reply an image with the caption ${prefix}setprofile\n\n2. Please type ${prefix}setprofile linkImage`)
                }
                break;
            case 'mutegrup':
                if (!isGroupMsg) return client.reply(from, 'Sorry, this command can only be used in groups!', id)
                if (!isGroupAdmins) return client.reply(from, 'Fail, this command can only be used by group admins!', id)
                if (!isBotGroupAdmins) return client.reply(from, 'Failed, please add bot as group admin!', id)
                if (args.length !== 1) return client.reply(from, `To change the group chat settings so that only admins can chat\n\nUsage:\n${prefix}mutegroup on\n${prefix}mutegroup off`, id)
                if (args[0] == 'on') {
                    client.setGroupToAdminsOnly(groupId, true).then(() => client.sendText(from, 'Successfully changed so that only admins can chat!'))
                } else if (args[0] == 'off') {
                    client.setGroupToAdminsOnly(groupId, false).then(() => client.sendText(from, 'Successfully changed so all members can chat!'))
                } else {
                    client.reply(from, `To change the group chat settings so that only admins can chat\n\nUsage:\n${prefix}mutegroup on\n${prefix}mutegroup off`, id)
                }
                break;
            case 'antilink':
                if (!isGroupMsg) return await client.reply(from, eng1.groupOnly(), id)
                if (!isGroupAdmins) return await client.reply(from, eng1.adminOnly(), id)
                if (!isBotGroupAdmins) return await client.reply(from, eng1.botNotAdmin(), id)
                if (ar[0] === 'enable') {
                    if (isDetectorOn) return await client.reply(from, eng1.detectorOnAlready(), id)
                    _antilink.push(groupId)
                    fs.writeFileSync('./database/group/antilink.json', JSON.stringify(_antilink))
                    await client.reply(from, eng1.detectorOn(name, formattedTitle), id)
                } else if (ar[0] === 'disable') {
                    _antilink.splice(groupId, 1)
                    fs.writeFileSync('./database/group/antilink.json', JSON.stringify(_antilink))
                    await client.reply(from, eng1.detectorOff(), id)
                } else {
                    await client.reply(from, eng1.wrongFormat(), id)
                }
            break          
            //Media
            case 'ytmp3':
                if (args.length == 0) return client.reply(from, `To download songs from youtube\ntype: ${prefix}ytmp3 [link_yt]`, id)
                const linkmp3 = args[0].replace('https://youtu.be/','').replace('https://www.youtube.com/watch?v=','')
                xvoidApi.ytmp3(`https://www.youtube.com/watch?v=${linkmp3}`)
                .then(async(res) => {
                    if (res.error) return client.sendFileFromUrl(from, `${res.url}`, '', `${res.error}`)
                    await client.sendFileFromUrl(from, `${res.result.thumb}`, '', `Song found\n\nTitle: ${res.result.title}\nSize: ${res.result.size}\nWait sending...`, id)
                    await client.sendFileFromUrl(from, `${res.result.link}`, '', '', id)
                    .catch(() => {
                        client.reply(from, `This URL ${args[0]} It's been downloaded before. URL will be reset after 1 hour/60 minutes`, id)
                    })
                })
                break;
            case 'ytmp4':
                if (args.length == 0) return client.reply(from, `To download songs from youtube\ntype: ${prefix}ytmp4 [link_yt]`, id)
                const linkmp4 = args[0].replace('https://youtu.be/','').replace('https://www.youtube.com/watch?v=','')
                xvoidApi.ytmp4(`https://www.youtube.com/watch?v=${linkmp4}`)
                .then(async(res) => {
                    if (res.error) return client.sendFileFromUrl(from, `${res.url}`, '', `${res.error}`)
                    await client.sendFileFromUrl(from, `${res.result.thumb}`, '', `Song found\n\nTitle: ${res.result.title}\nSize: ${res.result.size}\nWait sending...`, id)
                    await client.sendFileFromUrl(from, `${res.result.link}`, '', '', id)
                    .catch(() => {
                        client.reply(from, `This URL ${args[0]} It's been downloaded before. URL will be reset after 1 hour/60 minutes`, id)
                    })
                })
                break;
            case 'tiktok':
                if (args.length == 0) return client.reply(from, `To download video from tiktok Type: !tiktok myhuman/zeks [Vid_Link]`)
                await client.reply(from, eng.wait, id);
                const linkwm = args[0].replace(' https://vt.tiktok.com/','')
                xvoidApi.tiktokwm(`https://vt.tiktok.com/${linkwm}`)
                .then(async(res) => {
                    if (res.error) return client.sendFileFromUrl(from, `${res.noWaterMarkUrl}`, '', id)
                    await client.sendFileFromUrl(from, `${res.noWaterMarkUrl}`, '', `_*TikTok Downloader*_\n\nName: ${res.authorMeta.name}\nNick: ${res.authorMeta.nickName}\nFans: ${res.authorMeta.fans}\nRatio: ${res.videoMeta.ratio}\nComment: ${res.commentCount}`, id)
                }).catch(() => {
                    client.reply(from, `This URL ${args[0]} It's been downloaded before. URL will be reset after 1 hour/60 minutes`, id)
                })
                break;
            case 'tiktokmusic':
                if (!q) return client.reply(from, `Please type !tiktokmusic [music_link]`, id)
                await client.reply(from, eng1.wait(), id)
                await client.sendFileFromUrl(from, `https://api.lolhuman.xyz/api/tiktokmusic?apikey=${lolhuman}&url=${q}`, 'tiktok.mp3', '', id)
                break;
            case 'playv':
                if (!q) return client.reply(from, `Please type !playv [Title]`, id)
                client.reply(from, 'Wait..', id)
                const getvid = await axios.get(`https://api.zeks.xyz/api/ytplaymp4?q=${q}&apikey=${apizeks}`)
                if (getvid.data.status == false) return client.reply(from, `Website error`, id)
                const { title, url_video, size, thumbnail, source } = getvid.data.result
                if (Number(size.split(' MB')[0]) > 15.00) return client.sendFileFromUrl(from, thumbnail, 'thumb.jpg', `「 PLAY MP4 」\n\n• Judul : ${title}\n• Filesize : ${size}\n\n_Sorry, Video duration exceeds 15 MB. Please download the video via the link below.\n${url_video}`, id)
                await client.sendFileFromUrl(from, thumbnail, 'pic.jpg', `「 PLAY 」\n\n➸ Title : ${title}\n➸ Filesize : ${size}\n➸ Link : ${source}\n\n_Video is being sent_`, id)
                await client.sendFileFromUrl(from, url_video, 'thumb.mp4', '', id)
                break;
            case 'playvn':
                if (!q) return client.reply(from, `Please type !playvn [Title]`, id)
                await client.reply(from, `Wait`, id)
                const plan = await axios.get(`https://api.zeks.xyz/api/ytplaymp3?apikey=${apizeks}&q=${q}`)
                if (Number(plan.data.result.size.split('MB')[0]) >= 10.00) return client.reply(from, 'Sorry, the duration of the music has exceeded the maximum limit of 10 MB!', id)
                await client.sendFileFromUrl(from, plan.data.result.thumbnail, 'pic.jpg', `Title: ${plan.data.result.title}\n➸ Filesize : ${plan.data.result.size}\n➸ Link : ${plan.data.result.source}\n\nWait a moment Bot is Sending Voice Note `, id)
                const plon = await fetch(plan.data.result.url_audio)
                const buplon = await plon.buffer()
                await fs.writeFile('./media/playvn.mp3', buplon)
                await client.sendPtt(from, './media/playvn.mp3', id)
                await fs.unlinkSync('./media/playvn.mp3')
                break;
            case 'spotifysearch':
                case 'searchspotify':
                    if (args.length == 0) return client.reply(from, `Shows the spotify list you are looking for!\nUse ${prefix}spotifysearch song title\nExample: ${prefix}spotifysearch young`, id)
                    const carispotify = body.slice(15)
                    client.reply(from, eng1.wait, id)
                    const spotifyapi = await axios.get(`https://api.zeks.me/api/spotify?apikey=${apizeks}&q=${carispotify}`)
                    const spotifydata = spotifyapi.data
                    const spotres = spotifydata.data
                    let spotifytext = `*「 S P O T I F Y 」*\n`
                    for (let i = 0; i < spotres.length; i++) {
                        spotifytext += `\n─────────────────\n\n*•Title:* ${spotres[i].title}\n*•Artists:* ${spotres[i].artists}\n*•Album:* ${spotres[i].album}\n*•Url:* ${spotres[i].url}\n`
                    }
                    await client.sendFileFromUrl(from, spotres[0].thumb, 'img.jpg', spotifytext, id)
                        .catch(err => {
                            console.log(err)
                            client.reply(from, 'An error occurred, please try again', id)
                        })
                        .catch(err => {
                            console.log(err)
                            client.reply(from, err.message, id)
                        })
                    break;
            //Admins Bot
            case 'bye':
                if (!isAdminBot) return client.reply(from, `Sorry This Command Is For Bot Admins`, id)
                if (!isGroupMsg) return client.reply(from, 'Group Only', id)
                client.sendText(from, 'Good bye... ( ⇀‸↼‶ )').then(() => client.leaveGroup(groupId))
                break;
            case 'ban':
                if (!isOwnerBot) return client.reply(from, 'Bot Owner and Admin bot Only', id)
                if (!isAdminBot) return client.reply(from, `Admin Bot and Bot owner only`)
                if (args.length == 0) return client.reply(from, `To ban someone from being able to use commands\n\nHow to type: \n${prefix}ban add 628xx --to enable\n${prefix}ban del 628xx --to disable\n\nHow to quickly ban multiple groups type: \n${prefix}ban @tag @tag @tag`, id)
                if (args[0] == 'add') {
                    banned.push(args[1]+'@c.us')
                    fs.writeFileSync('./settings/banned.json', JSON.stringify(banned))
                    client.reply(from, 'Success banned targets!')
                } else
                if (args[0] == 'del') {
                    let xnxx = banned.indexOf(args[1]+'@c.us')
                    banned.splice(xnxx,1)
                    fs.writeFileSync('./settings/banned.json', JSON.stringify(banned))
                    client.reply(from, 'Success unbanned targets!')
                } else {
                 for (let i = 0; i < mentionedJidList.length; i++) {
                    banned.push(mentionedJidList[i])
                    fs.writeFileSync('./settings/banned.json', JSON.stringify(banned))
                    client.reply(from, 'Success ban targets!', id)
                    }
                }
                break;
            case 'broadcast':
            case 'bc': 
                if (!isOwnerBot) return client.reply(from, 'Bot Owner And Admin Only!', id)
                if (!isAdminBot) return client.reply(from, `Bot Owner And Admin Only!`, id)
                if (args.length == 0) return client.reply(from, `To broadcast to all chats type:\n${prefix}bc [message]`)
                let msg = body.slice(4)
                const chatz = await client.getAllChatIds()
                for (let idk of chatz) {
                    var cvk = await client.getChatById(idk)
                    if (!cvk.isReadOnly) client.sendText(idk, `〘 *X V O I D  B C* 〙\n\n${msg}`)
                    if (cvk.isReadOnly) client.sendText(idk, `〘 *X V O I D  B C* 〙\n\n${msg}`)
                }
                client.reply(from, 'Broadcast Success!', id)
                break;
            //Bot Owner
            case 'leaveall':
                if (!isOwnerBot) return client.reply(from, 'Bot Owner Only', id)
                const allChatz = await client.getAllChatIds()
                const allGroupz = await client.getAllGroups()
                for (let gclist of allGroupz) {
                    await client.sendText(gclist.contact.id, `Sorry bots are cleaning, total chat is active : ${allChatz.length}`)
                    await client.leaveGroup(gclist.contact.id)
                    await client.deleteChat(gclist.contact.id)
                }
                client.reply(from, 'Success leave all group!', id)
                break;
            case 'clearall':
                if (!isOwnerBot) return client.reply(from, 'Bot Owner Only', id)
                const allChatx = await client.getAllChats()
                for (let dchat of allChatx) {
                    await client.deleteChat(dchat.id)
                }
                client.reply(from, 'Success clear all chat!', id)
                break;
            //Nsfw
            case 'xnxx': {
                if (!q) return await client.sendText(from, `Type !xnxx Title`)
                const xtext = message.body.replace('!xnxx', '')
                pemisah = xtext.split("|")
                const search = pemisah[0]
                const responlo = await requests("https://h4ck3rs404-api.herokuapp.com/api/xnxx-search?q=" + xtext + "&apikey=404Api")
                const datas = await responlo.json()
                const img = 'https://yt3.ggpht.com/ytc/AAUvwngpbURJyno0rvS4aza889YDF7-oXbRyopWO0bZO=s900-c-k-c0x00ffffff-no-rj'
                const asu = datas.result
                if (pemisah.length == 1) {
                    let num = 0
                    let fox = "*_Xnxx Search_*\n\n"
                    for (var a = 0; a < asu.length; a++) {
                        num += 1
                        fox += "\nTitle : " + asu[a].judul
                        fox += "\nView : " + asu[a].viewers
                        fox += "\nInfo : " + asu[a].info
                        fox += "\nLink : " + asu[a].url
                        fox += "\nNum : " + num
                    }
                    client.sendFileFromUrl(from, img, 'porn.jpg', fox, `${sender}`)
                }
            }
                break;
            case 'xnxxdl': {
                const vioo = await axios.get(`https://h4ck3rs404-api.herokuapp.com/api/xnxx?url=${q}&apikey=404Api`)
                await client.reply(from, `Please wait, the video sent will take longer if the size is large\nSize Videos : ${vioo.data.size}`, id)
                await client.sendFileFromUrl(from, vioo.data.vid, 'bokep.mp4', `Title : ${vioo.data.judul}\nSize : ${vioo.data.size}`, id)
            }
                break;
            case 'nhder':
                if (args.length !== 1) return await client.reply(from, 'Input The Doujin Code!', id)
                await client.reply(from, eng1.wait(), id)
                try {
                    const kodeDojin = args[0]
                    const proccessLink = `https://nhder.herokuapp.com/download/nhentai/${kodeDojin}/zip`
                    const captionDojin = `------[ NHENTAI DOWNLOADER ]------\n\n➸ Code doujin: ${kodeDojin}`
                    await client.sendFileFromUrl(from, proccessLink, `${kodeDojin}.zip`, captionDojin, id)
                } catch (err) {
                    console.error(err)
                    await client.reply(from, `Error!\n${err}`, id)
                    }
                break;
            //Fun
            case 'girl':
                const imglink = 'https://h4ck3rs404-api.herokuapp.com/api/randomcewek?apikey=404Api'
                await client.sendFileFromUrl(from, imglink, '', '', id)
            case 'wallpaper':
                if (!q) return client.reply(from, `To Get Wallpaper Type: !wallpaper [tech/muslim/code/cyberspace/mountain]`)
                if (args[0] == 'tech') {
                    const tech = 'https://server-api-rey.herokuapp.com/api/wallpaper/teknologi?apikey=ditofficial'
                    client.sendFileFromUrl(from, tech, '', '', id)
                } else if (args[0] == 'muslim') {
                    const muslim = 'https://server-api-rey.herokuapp.com/api/wallpaper/islami?apikey=ditofficial'
                    client.sendFileFromUrl(from, muslim, '', '', id)
                } else if (args[0] == 'code') {
                    const code = 'https://server-api-rey.herokuapp.com/api/wallpaper/programing?apikey=ditofficial'
                    client.sendFileFromUrl(from, code, '', '', id)
                } else if (args[0] == 'cyberspace') {
                    const cyberspace = 'https://server-api-rey.herokuapp.com/api/wallpaper/cyberspace?apikey=ditofficial'
                    client.sendFileFromUrl(from, cyberspace, '', '', id)
                } else if (args[0] == 'mountain') {
                    const mountain = 'https://server-api-rey.herokuapp.com/api/wallpaper/mountain?apikey=ditofficial'
                    client.sendFileFromUrl(from, mountain, '', '', id)
                } else if (args[0] == 'girl') {
                    const girl = 'https://server-api-rey.herokuapp.com/api/wallpaper/cecan2?apikey=ditofficial'
                    client.sendFileFromUrl(from, girl, '', '', id)
                } else if (args[0] == 'boy') {
                    const boy = 'https://server-api-rey.herokuapp.com/api/wallpaper/cogan2?apikey=ditofficial'
                    client.sendFileFromUrl(from, boy, '', '', id)
                } else if (args[0] == 'hacker') {
                    const hacker = 'https://server-api-rey.herokuapp.com/api/wallpaper/hekel?apikey=ditofficial'
                    client.sendFileFromUrl(from, hacker, '', '', id)
                } else if (args[0] == 'satanic') {
                    const satanic = 'https://server-api-rey.herokuapp.com/api/wallpaper/satanic?apikey=ditofficial'
                    client.sendFileFromUrl(from, satanic, '', '', id)
                } else if (args[0] == 'gaming') {
                    const gaming = 'https://server-api-rey.herokuapp.com/api/wallpaper/gaming?apikey=ditofficial'
                    client.sendFileFromUrl(from, gaming, '', '', id)
                }
                break;
            case 'dog':
                const dog = 'https://h4ck3rs404-api.herokuapp.com/api/dog?apikey=404Api'
                client.sendFileFromUrl(from, dog, '', '', id)
                break;
            case 'cat':
                const cat = 'https://h4ck3rs404-api.herokuapp.com/api/cat?apikey=404Api'
                client.sendFileFromUrl(from, cat, '', '', id)
                break;
            case 'fox':
                const fox = 'https://h4ck3rs404-api.herokuapp.com/api/fox?apikey=404Api'
                client.sendFileFromUrl(from, fox, '', '', id)
                break;
            case 'bird':
                const bird = 'https://h4ck3rs404-api.herokuapp.com/api/bird?apikey=404Api'
                client.sendFileFromUrl(from, bird, '', '', id)
                break;
            case 'lizard':
                const lizard = 'https://h4ck3rs404-api.herokuapp.com/api/lizard?apikey=404Api'
                client.sendFileFromUrl(from, lizard, '', '', id)
                break;
            case 'shiba':
                const shiba = 'https://h4ck3rs404-api.herokuapp.com/api/shiba?apikey=404Api'
                client.sendFileFromUrl(from, shiba, '', '', id)
                break;
            case 'bunny':
                const bunny = 'https://h4ck3rs404-api.herokuapp.com/api/bunny?apikey=404Api'
                client.sendFileFromUrl(from, bunny, '', '', id)
                break;
            case 'duck':
                const duck = 'https://h4ck3rs404-api.herokuapp.com/api/duck?apikey=404Api'
                client.sendFileFromUrl(from, duck, '', '', id)
                break; 
            case 'panda':
                const panda = 'https://h4ck3rs404-api.herokuapp.com/api/panda?apikey=404Api'
                client.sendFileFromUrl(from, panda, '', '', id) 
                break;
            case 'silverplaybutton':
                if (!q ) return client.sendText(from, `Please Type: !silverplaybutton [text]`, id)
                const silver = `https://server-api-rey.herokuapp.com/api/maker/silverbutton?text=${q}&apikey=ditofficial`
                await client.sendFileFromUrl(from, silver, '', '', id)       
                break;
            case 'goldplaybutton':
                if (!q ) return client.sendText(from, `Please Type: !goldplaybutton [text]`, id)
                const gold = `https://server-api-rey.herokuapp.com/api/maker/goldbutton?text=reyganz&apikey=ditofficial`
                await client.sendFileFromUrl(from, gold, '', '', id)       
                break;

        };
    } catch (err) {
        console.log(color('[ERROR]', 'red'), err)
    }
}
