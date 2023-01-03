const apiKey = process.env.API_KEY;
// const apiKey = '6e5ea66aa145c5494dd12c5604e4f89a'
// console.log('in routes', process.env.API_KEY)
// console.log('in routes2', apiKey)
const apiHost = 'https://api.themoviedb.org/3';
const baseImagePath = 'https://image.tmdb.org/t/p';
const baseVideoPath = 'https://youtu.be';

const routes = {
  getImagePath: (width, link) => `${baseImagePath}/w${width}/${link}`,
  getVideoLinkPath: (link) => `${baseVideoPath}/${link}`,
  getVideosPath: (mediaType, id) => `${apiHost}/${mediaType}/${id}/videos?api_key=${apiKey}`,
  getActorsPath: (mediaType, id) => `${apiHost}/${mediaType}/${id}/credits?api_key=${apiKey}`,
  getTrendingPath: (pageNumber) => `${apiHost}/trending/all/day?api_key=${apiKey}&page=${pageNumber}`,
  getSearchResultsPath: (mediaType, query, pageNumber) => `${apiHost}/search/${mediaType}?api_key=${apiKey}&query=${query}&page=${pageNumber}`,
  getDiscoverByGenresPath: (mediaType, with_genres, pageNumber) => `${apiHost}/discover/${mediaType}?api_key=${apiKey}&with_genres=${with_genres}&page=${pageNumber}`,
  getGenresPath: (mediaType) => `${apiHost}/genre/${mediaType}/list?api_key=${apiKey}`,
};

export default routes;