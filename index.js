const { create, decryptMedia} = require ("@open-wa/wa-automate")
const figlet = require("figlet")
const handler = require('./handler/index')
const color = require('./utils/index').color
const groupLimit = require('./config/groupLimit.json').limitgroups
const prefix = require('./config/config.json').prefix
const messageLog = require('./utils/index').messageLog
var express = require('express'),
    cors = require('cors'),
    secure = require('ssl-express-www');
const PORT = process.env.PORT || 8080 || 5000 || 3000
const options = {
    sessionId: 'XVOID',
    qrTimeout: 0,
    authTimeout: 0,
    cacheEnabled: false,
    useChrome: true,
    killProcessOnBrowserClose: true,
    throwErrorOnTosBlock: false,
    chromiumArgs: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--aggressive-cache-discard',
        '--disable-cache',
        '--disable-application-cache',
        '--disable-offline-load-stale-cache',
        '--disk-cache-size=0'
    ]
}
var mainrouter = require('./web/router/main')
var app = express()
app.enable('trust proxy');
app.set("json spaces",2)
app.use(cors())
app.use(secure)
app.use(express.static("public"))

app.use('/', mainrouter)

const ops = process.platform;
if (ops === 'win32' || ops === 'win64') options['executeablePath'] = 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe';
else if (ops === 'linux') options['executeablePath'] = '/usr/bin/google-chrome-stable';
else if (ops === 'darwin') options['executeablePath'] = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';


const startbot = async() => {
    try{
        const Client = await create(options)
        process.stdout.write('\x1Bc');
        console.log(color(figlet.textSync('----------------', {horizontalLayout: 'default' })))
        console.log(color(figlet.textSync('Xvoid x Zen.KK', {horizontalLayout: 'default' })))
        console.log(color(figlet.textSync('----------------', {horizontalLayout: 'default' })))
        

        Client.onStateChanged((state) => {
            console.log(color('[~>>]', 'red'), state)
            if (state == 'CONFLICT' || state === 'UNLAUNCHED') Client.forceRefocus()
        })

        Client.onAddedToGroup(async (chat) => {
            const groups = await Client.getAllGroups()
            console.log(`Xvoid Has Been Added To Group `)
            if (groups.length > groupLimit) {
                await Client.sendText(chat.id `Sorry, the group on this Bot is full\nMax Group is: ${groupLimit}`).then(() => {
                    Client.leaveGroup(chat.id)
                    Client.deleteChat(chat.id)
                })
            }
        })

        Client.onIncomingCall(async (callData) => {
            await Client.sendText(callData.peerJid, 'Sorry The Bot Will Block You Because You Calling The Bot.Contact Owner For Unblock *+62859185953185*')
            .then(async () => {
                await Client.contactBlock(callData.peerJid)
            })
        })

        Client.onGlobalParticipantsChanged(async (event) => {
            const welcome = JSON.parse(fs.readFileSync('./settings/welcome.json'))
            const gcChat = await Client.getChatById(event.chat)
            const pcChat = await Client.getContact(event.who)
            let { pushname, verifiedName, formattedName } = pcChat
            pushname = pushname || verifiedName || formattedName
            const isWelcome = welcome.includes(event.chat)
            const botNumbers = await Client.getHostNumber() + '@c.us'
            const { name } = gcChat
            const sts = await Client.getStatus(event.who)
            try {
                if (event.action === 'add' && event.who !== botNumbers && isWelcome) {
                    const pic = await Client.getProfilePicFromServer(event.who)
                    if (pic === undefined) {
                        var pp = 'https://i.ibb.co/QX2P5dv/w644.jpg'
                    } else {
                        var pp = pic
                    }
                    await Client.sendFileFromUrl(event.chat, pp, 'profile.jpg', `Welcome to the group *${name}*\n*Name :* ${pushname}\n*Bio :* ${sts.status}\n\nHope you stay in our group~`)
                } else if (event.action === 'remove' && event.who !== botNumbers && isWelcome) {
                    await Client.sendTextWithMentions(event.chat, `@${event.who.replace('@c.us', '')} Good Bye`)
                }
            } catch (err) {
                console.error(err)
            }
        })

        Client.onMessage(async (message) => {
            if (message.body === 'PE') {
                await Client.sendText(message.from, '👋 Hello! type: !menu for menu');
            }
            if (message.body === 'Pe') {
                await Client.sendText(message.from, '👋 Hello! type: !menu for menu');
            }
            if (message.body === 'pe') {
                await Client.sendText(message.from, '👋 Hello! type: !menu for menu');
            }
            if (message.body === 'P') {
                await Client.sendText(message.from, '👋 Hello! type: !menu for menu');
            }
            if (message.body === 'p') {
                await Client.sendText(message.from, '👋 Hello! type: !menu for menu');
            }           
            if (message.body === 'Hi') {
                await Client.sendText(message.from, '👋 Hello! type: !menu for menu');
            }
            if (message.body === 'hi') {
                await Client.sendText(message.from, '👋 Hello! type: !menu for menu');
            }
            if (message.body === 'Hello') {
                await Client.sendText(message.from, '👋 Hello! type: !menu for menu');
            }
            if (message.body === 'hello') {
                await Client.sendText(message.from, '👋 Hello! type: !menu for menu');
            }
            if (message.body === 'bot') {
                await Client.sendText(message.from, '👋 Hello! type: !menu for menu');
            }
            if (message.body === 'Bot') {
                await Client.sendText(message.from, '👋 Hello! type: !menu for menu');
            }
            handler.messageHandler(Client, message)
            Client.getAmountOfLoadedMessages()
            .then((msg) => {
                if (msg >= 3000) {
                    console.log('[Client]', color(`Loaded Message Reach ${msg}, cuting message cache...`, 'yellow'))
                    Client.cutMsgCache()
                }
            })
        })

    } catch (error) {
        console.log(error)
    }
};
startbot();
app.listen(PORT, () => {
    console.log(color("Server running on port " + PORT,'green'))
})
module.exports = app
