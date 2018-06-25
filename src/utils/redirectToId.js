const RESULT_URL_PREFIX = 'https://www.imdb.com/title/'
// id: an imdb title id
export default id => window.location.href = RESULT_URL_PREFIX + id
