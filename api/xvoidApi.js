const axios = require('axios')
const link = 'https://arugaz.herokuapp.com'
const fileyt = 'https://raw.githubusercontent.com/ArugaZ/scraper-results/main/20201111_230923.jpg'
const eroryt = 'https://raw.githubusercontent.com/ArugaZ/scraper-results/main/20201111_234624.jpg'
const apizeks = require('../config/api.json').zeks
const fetchText = require('../tools/fetcher').fetchText
const fetchJson = require('../utils/fetcher').fetchJson

const dewabatch = async (judul) => new Promise((resolve, reject) => {
	axios.get(`${link}/api/dewabatch?q=${judul}`)
	.then((res) => {
		const textdew = `${res.data.result}\n\nSinopsis: ${res.data.sinopsis}`
		resolve({link: res.data.thumb, text: textdew})
	})
	.catch((err) => {
		reject(err)
	})
})

const cekzodiak = async (nama,tgl,bln,thn) => new Promise((resolve, reject) => {
    axios.get(`${link}/api/getzodiak?nama=${nama}&tgl-bln-thn=${tgl}-${bln}-${thn}`)
    .then((res) => {
        const text = `Nama: ${res.data.nama}\nUltah: ${res.data.ultah}\nZodiak: ${res.data.zodiak}`
        resolve(text)
    })
    .catch((err) =>{
        reject(err)
    })
})

const cooltext = async (teks) => new Promise((resolve, reject) => {
	axios.get(`https://api.haipbis.xyz/randomcooltext?text=${teks}`)
	.then((res) => {
		const textc = `Teks: ${res.data.text}\nGambar: ${res.data.image}`
		resolve({link: res.data.image, text: textc})
	})
	.catch((err) => {
		reject(err)
	})
})

const cerpen = async () => new Promise((resolve, reject) => {
	axios.get(`https://myhuman.cf/api/cerpen`)
	.then((res) => {
		resolve(res.data)
	})
	.catch((err) => {
		reject(err)
	})
})

const cersex = async () => new Promise((resolve, reject) => {
	const ransex = Math.floor(Math.random() * 2) + 1
	axios.get(`https://myhuman.cf/api/cersex`)
	.then((res) => {
		resolve(res.data)
	})
	.catch((err) => {
		reject(err)
	})
})

const puisi = async () => new Promise((resolve, reject) => {
	const puiti = ['1','3']
	const ranisi = puiti[Math.floor(Math.random() * puiti.length)]
	axios.get(`${link}/api/puisi${ranisi}`)
	.then((res) => {
		resolve(res.data)
	})
	.catch((err) => {
		reject(err)
	})
})

const ytmp3 = async (url) => new Promise((resolve, reject) => {
    axios.get(`https://api.zeks.me/api/ytmp3/2?apikey=ziv0AG4hoWiurIExT9rHpIFIscH&url=${url}`)
    .then((res) => {
		resolve(res.data)
    })
    .catch((err) =>{
        reject(err)
    })
})

const tiktok = async (url) => new Promise((resolve, reject) => {
	axios.get(`https://freerestapi.herokuapp.com/api/tiktok?url=${url}&nowm=1`)
	.then((res) => {
		resolve(res.data)
	})
	.catch((err) => {
		reject(err)
	})
})

const ytmp4 = async (url) => new Promise((resolve, reject) => {
    axios.get(`https://api.zeks.me/api/ytmp4/2?apikey=ziv0AG4hoWiurIExT9rHpIFIscH&url=${url}`)
    .then((res) => {
		resolve(res.data)
    })
    .catch((err) =>{
        reject(err)
    })
})

const fb = async (url) => new Promise((resolve, reject) => {
	axios.get(`${link}/api/fb?url=${url}`)
	.then((res) => {
		if (res.data.error) resolve({status: 'error', link: res.data.result})
		resolve({linkhd: res.data.result.hd, linksd: res.data.result.sd})
	})
	.catch((err) =>{
        reject(err)
    })
})

const stalkig = async (url) => new Promise((resolve, reject) => {
    axios.get(`https://api.zeks.me/api/igstalk?apikey=ziv0AG4hoWiurIExT9rHpIFIscH&username=${url}`)
    .then((res) => {
		if (res.data.error) resolve(res.data.error)
        const text = `User: ${res.data.Username}\nName: ${res.data.Name}\nBio: ${res.data.Biodata}\nFollowers: ${res.data.Jumlah_Followers}\nFollowing: ${res.data.Jumlah_Following}\nPost: ${res.data.Jumlah_Post}`
        resolve(text)
    })
    .catch((err) =>{
        reject(err)
    })
})

const stalkigpict = async (url) => new Promise((resolve, reject) => {
    axios.get(`${link}/api/stalk?username=${url}`)
    .then((res) => {
		if (res.data.error) resolve('https://c4.wallpaperflare.com/wallpaper/976/117/318/anime-girls-404-not-found-glowing-eyes-girls-frontline-wallpaper-preview.jpg')
        resolve(`${res.data.Profile_pic}`)
    })
    .catch((err) =>{
        reject(err)
    })
})

const quote = async () => new Promise((resolve, reject) => {
    axios.get(`https://api.zeks.me/api/quote?apikey=ziv0AG4hoWiurIExT9rHpIFIscH`)
    .then((res) => {
        const text = `Author: ${res.data.author}\n\nQuote: ${res.data.quotes}`
        resolve(text)
    })
    .catch((err) =>{
        reject(err)
    })
})

const daerah = async () => new Promise((resolve, reject) => {
    axios.get(`${link}/daerah`)
    .then((res) => {
        resolve(res.data.result)
    })
    .catch((err) =>{
        reject(err)
    })
})

const jadwaldaerah = async (url) => new Promise((resolve, reject) => {
    axios.get(`https://api.zeks.me/api/jadwalsholat?apikey=ziv0AG4hoWiurIExT9rHpIFIscH&daerah=${url}`)
    .then((res) => {
		if (res.data.error) resolve(res.data.error)
        const text = `Jadwal Sholat ${url}\n\nImsyak: ${res.data.Imsyak}\nSubuh: ${res.data.Subuh}\nDzuhur: ${res.data.Dzuhur}\nAshar: ${res.data.Ashar}\nMaghrib: ${res.data.Maghrib}\nIsya: ${res.data.Isya}`
        resolve(text)
    })
    .catch((err) =>{
        reject(err)
    })
})

const cuaca = async (url) => new Promise((resolve, reject) => {
    axios.get(`https://rest.farzain.com/api/cuaca.php?id=${url}&apikey=O8mUD3YrHIy9KM1fMRjamw8eg`)
    .then((res) => {
		if (res.data.respon.cuaca == null) resolve('Maaf daerah kamu tidak tersedia')
        const text = `Cuaca di: ${res.data.respon.tempat}\n\nCuaca: ${res.data.respon.cuaca}\nAngin: ${res.data.respon.angin}\nDesk: ${res.data.respon.deskripsi}\nKelembapan: ${res.data.respon.kelembapan}\nSuhu: ${res.data.respon.suhu}\nUdara: ${res.data.respon.udara}`
        resolve(text)
    })
    .catch((err) =>{
        reject(err)
    })
})

const chord = async (url) => new Promise((resolve, reject) => {
    axios.get(`${link}/api/chord?q=${url}`)
    .then((res) => {
		if (res.data.error) resolve(res.data.error)
        resolve(res.data.result)
    })
    .catch((err) =>{
        reject(err)
    })
})

const tulis = async (teks) => new Promise((resolve, reject) => {
    axios.get(`${link}/api/nulis?text=${encodeURIComponent(teks)}`)
    .then((res) => {
        resolve(`${res.data.result}`)
    })
    .catch((err) => {
        reject(err)
    })
})

const artinama = async (nama) => new Promise((resolve, reject) => {
	axios.get(`${link}/api/artinama?nama=${nama}`)
	.then((res) => {
		resolve(res.data.result)
	})
	.catch((err) => {
		reject(err)
	})
})

const cekjodoh = async (nama,pasangan) => new Promise((resolve, reject) => {
	axios.get(`https://api.zeks.me/api/primbonjodoh?apikey=ziv0AG4hoWiurIExT9rHpIFIscH&nama1=${nama}&nama2=${pasangan}`)
	.then((res) => {
		const textc = `Nama : ${res.data.nama}\nPasangan : ${res.data.pasangan}\nPositif: ${res.data.positif}\nNegatif : ${res.data.negatif}`
		resolve({link: res.data.gambar, text: textc})
	})
	.catch((err) => {
		reject(err)
	})
})

const covidindo = async () => new Promise((resolve, reject) => {
	axios.get(`${link}/api/coronaindo`)
	.then((res) => {
		const textv = `Info Covid-19 ${res.data.negara}\n\nKasus Baru: ${res.data.kasus_baru}\nTotal Kasus: ${res.data.kasus_total}\nSembuh: ${res.data.sembuh}\nPenanganan: ${res.data.penanganan}\nMeninggoy: ${res.data.meninggal}\n\nUpdate: ${res.data.terakhir}`
		resolve(textv)
	})
	.catch((err) => {
		reject(err)
	})
})

const bapakfont = async (kalimat) => new Promise((resolve, reject) => {
	axios.get(`${link}/api/bapakfont?kata=${kalimat}`)
	.then((res) => {
		resolve(res.data.result)
	})
	.catch((err) => {
		reject(err)
	})
})

const lirik = async (judul) => new Promise((resolve, reject) => {
	axios.get(`${link}/api/lirik?judul=${judul}`)
	.then((res) => {
		resolve(res.data.result)
	})
	.catch((err) => {
		reject(err)
	})
})

const movie = async (judul) => new Promise((resolve, reject) => {
	axios.get(`${link}/api/sdmovie?film=${encodeURIComponent(judul)}`)
	.then((res) => {
		if (res.data.error) return resolve({status: 'error', hasil: res.data.result})
		const teksmov = `Judul: ${res.data.result.title}\nRating: ${res.data.result.rating}\nSinopsis: ${res.data.result.sinopsis}\nLink: ${res.data.result.video}`
		resolve({status: 'success', hasil: teksmov, link: res.data.result.thumb})
	})
	.catch((err) => {
		reject(err)
	})
})

const hilihfont = async (kalimat) => new Promise((resolve, reject) => {
	axios.get(`http://enznoire.herokuapp.com/hilih?kata=${kalimat}`)
	.then((res) => {
		resolve(res.data.result)
	})
	.catch((err) => {
		reject(err)
	})
})

const qrcode = async (url, size) => new Promise((resolve, reject) => {
	axios.get(`http://api.qrserver.com/v1/create-qr-code/?data=${url}&size=${size}x${size}`)
		.then((res) => {
			resolve(`http://api.qrserver.com/v1/create-qr-code/?data=${url}&size=${size}x${size}`)
		})
		.catch((err) => {
            reject(err)
        })
})

const qrread = async (url) => new Promise((resolve, reject) => {
	axios.get(`http://api.qrserver.com/v1/read-qr-code/?fileurl=${url}`)
		.then((res) => {
			if (res.data[0].symbol[0].data == null) return resolve(`Link yang anda masukan salah`)
			const textqr = `Hasil : ${res.data[0].symbol[0].data}`
			resolve(textqr)
		})
		.catch((err) => {
            reject(err)
        })
})

const darkjokes = async () => new Promise((resolve, reject) => {
    axios.get(`http://api-zeks.harispoppy.com/api/darkjokes?apikey=benbenz`)
    .then((res) => {
        resolve(res.data.result)
    })
    .catch((err) =>{
        reject(err)
    })
})

const memeindo = async () => new Promise((resolve, reject) => {
    axios.get(`http://api-zeks.harispoppy.com/api/memeindo?apikey=benbenz`)
    .then((res) => {
        resolve(res.data.result)
    })
    .catch((err) =>{
        reject(err)
    })
})

const fml = async () => new Promise((resolve, reject) => {
    axios.get(`https://docs-jojo.herokuapp.com/api/fml`)
    .then((res) => {
        const fmlxxx = `*F MY LIFE:* ${res.data.result.fml}\n\nby : @dimaass.cc`
        resolve(fmlxxx)
    })
    .catch((err) =>{
        reject(err)
    })
})

const joox = (judul) => new Promise((resolve, reject) => {
    console.log(`Getting Joox music for ${judul}...`)
    axios.get(`https://api.zeks.me/api/joox?apikey=${apizeks}&q=${judul}`)
        .then((data) => resolve(data))
        .catch((err) => reject(err))
})

const tiktokwm = async (url) => new Promise((resolve, reject) => {
	axios.get(`https://server-api-rey.herokuapp.com/api/download/tiktok2?url=${url}&apikey=ditofficial`)
	.then((res) => {
		resolve(res.data.result)
	})
	.catch((err) => {
		reject(err)
	})
})

/**
 * Create shortlink.
 * @param {string} url
 * @returns {Promise<string>}
 */
const urlShortener = async (url) => new Promise((resolve, reject) => {
    fetchText(`https://tinyurl.com/api-create.php?url=${url}`)
        .then((text) => resolve(text))
        .catch((err) => reject(err))
})

/**
 * Search for Alkitab.
 * @param {string} query 
 * @returns {Promise<object>}
 */
 const alkitab = (query) => new Promise((resolve, reject) => {
    console.log('Searching for Alkitab info...')
    fetchJson(`https://docs-jojo.herokuapp.com/api/alkitabsearch?q=${query}`)
        .then((result) => resolve(result))
        .catch((err) => reject(err))
})

/**
 * Get Wikipedia result for Indonesian language from given query.
 * @param {string} query
 * @returns {Promise<object>}
 */
 const wiki = (query) => new Promise((resolve, reject) => {
    console.log(`Get result for ${query} in Wikipedia...`)
    fetchJson(`https://docs-jojo.herokuapp.com/api/wiki?q=${query}`)
        .then((result) => resolve(result))
        .catch((err) => reject(err))
})

/**
 * Get Wikipedia result for English language from given query.
 * @param {string} query
 * @returns {Promise<object>}
 */
const wikien = (query) => new Promise((resolve, reject) => {
    console.log(`Get result for ${query} in Wikipedia...`)
    fetchJson(`https://videfikri.com/api/wikieng?query=${query}`)
        .then((result) => resolve(result))
        .catch((err) => reject(err))
})

/**
 * Get Instagram account info from username.
 * @param {string} username
 * @returns {Promise<object>}
 */
const igStalk = (username) => new Promise((resolve, reject) => {
    console.log(`Searching account for ${username}`)
    fetchJson(`https://docs-jojo.herokuapp.com/api/stalk?username=${username}`)
        .then((result) => resolve(result))
        .catch((err) => reject(err))
})

/**
 * Get motivation text.
 * @returns {string}
 */
const motivation = () => new Promise((resolve, reject) => {
    fetchText('https://gist.githubusercontent.com/robatron/a66acc0eed3835119817/raw/0e216f8b6036b82de5fdd93526e1d496d8e1b412/quotes.txt')
        .then((result) => resolve(result))
        .catch((err) => reject(err))
})

/**
 * Get Twitter trending.
 * @returns {Promise<object>}
 */
const trendingTwt = () => new Promise((resolve, reject) => {
    console.log('Get Twitter trending...')
    fetchJson('https://docs-jojo.herokuapp.com/api/trendingtwitter')
        .then((result) => resolve(result))
        .catch((err) => reject(err))
})

/**
 * Search for Result Casses Corona.
 * @param {string} query 
 * @returns {Promise<object>}
 */
 const corona = (country) => new Promise((resolve, reject) => {
    console.log(`Search for country ${country}`)
    fetchJson(`https://coronavirus-19-api.herokuapp.com/countries/${country}/`)
        .then((result) => resolve(result))
        .catch((err) => reject(err))
})

module.exports = {
	corona,
	trendingTwt,
	motivation,
	wikien,
	alkitab,
    ytmp3,
    ytmp4,
	fb,
    stalkig,
    stalkigpict,
    quote,
    wiki,
    daerah,
    jadwaldaerah,
    cuaca,
    chord,
    tulis,
	artinama,
	cekjodoh,
	covidindo,
	bapakfont,
	lirik,
	movie,
	urlShortener,
	cerpen,
	cersex,
	puisi,
	cooltext,
	cekzodiak,
	dewabatch,
	hilihfont,
	qrcode,
	qrread,
	darkjokes,
	memeindo,
	fml,
	tiktok,
	joox,
	tiktokwm,
	igStalk
}
