const { create, decryptMedia} = require ("@open-wa/wa-automate")
const figlet = require("figlet")
const handler = require('./handler/index')
const color = require('./utils/index').color
const groupLimit = require('./config/groupLimit.json').limitgroups
const prefix = require('./config/config.json').prefix
const messageLog = require('./utils/index').messageLog
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

const ops = process.platform;
if (ops === 'win32' || ops === 'win64') options['executeablePath'] = 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe';
else if (ops === 'linux') options['executeablePath'] = '/usr/bin/google-chrome-stable';
else if (ops === 'darwin') options['executeablePath'] = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';


const startbot = async() => {
    try{
        const Client = await create(options)
        console.clear()
        console.log(color(figlet.textSync('----------------', {horizontalLayout: 'default' })))
        console.log(color(figlet.textSync('Xvoid Api', {horizontalLayout: 'default' })))
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

        Client.onMessage(async (message) => {
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