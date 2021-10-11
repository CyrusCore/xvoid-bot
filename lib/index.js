const wiki = require('./wiki')
exports.nsfw = require('./nsfw')
exports.weeaboo = require('./weeaboo')
exports.downloader = require('./downloader')
exports.fun = require('./fun')
exports.misc = require('./misc')
exports.toxic = require('./toxic')

const movie = async (params) => {
    const API_KEY = 'e03a86fd';
    const APIURL = `http://www.omdbapi.com/?apikey=${API_KEY}&t=${params}`;
    const { data } = await axios.get(APIURL);
    const response = data.Response === 'True';
    if (!response) return undefined;
    const moviePicture = data.Poster;
    const movieCaption = `_*Judul* : ${data.Title}_\n_*Tahun* : ${data.Year}_\n_*Rating* : ${data.Rated}_\n_*Rilis* : ${data.Released}_\n_*Durasi* : ${data.Runtime}_\n_*Genre* : ${data.Genre}_\n_*Sutradara* : ${data.Director}_\n_*Penulis* : ${data.Writer}_\n_*Aktor* : ${data.Actors}_\n_*Bahasa/Negara* : ${data.Language}/${data.Country}_\n_*Penghargaan* : ${data.Awards}_\n_*Website* : ${data.Website}_\n`;
    return { moviePicture, movieCaption };
  };

module.exports = {
    wiki,
    movie
}