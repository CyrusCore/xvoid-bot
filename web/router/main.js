__path = process.cwd()

var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
    res.sendFile(__path + '/web/index.html')
})

router.get('/docs', (req, res) => {
    res.sendFile(__path + '/web/docs.html')
})

router.get('/personal', (req, res) => {
    ser.sendFile(__path + '/web/personal.html')
})

router.get('/config', (req, res) => {
    config = {
        status: true,
        result: {
            prefix : '!',
            botname: 'Xvoid',
            ownername: 'AbramSatria',
            instagram: 'iota_id_',
            youtube : 'Gak Punya',
            telegram: 't.me/CyNetics',
            whatsappOwner: '+62859185953185'
        }
    }
    res.json(config)
})

module.exports = router