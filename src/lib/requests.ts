const requests = {
    fetchTrending: `${process.env.MOVIES_BASE_URL}/trending/all/week?api_key=${process.env.MOVIES_API_KEY}&language=en-US`,
    fetchNetflixOriginals: `${process.env.MOVIES_BASE_URL}/discover/tv?api_key=${process.env.MOVIES_API_KEY}&with_networks=213`,
    fetchTopRated: `${process.env.MOVIES_BASE_URL}/movie/top_rated?api_key=${process.env.MOVIES_API_KEY}&language=en-US`,
    fetchActionMovies: `${process.env.MOVIES_BASE_URL}/discover/movie?api_key=${process.env.MOVIES_API_KEY}&with_genres=28`,
    fetchComedyMovies: `${process.env.MOVIES_BASE_URL}/discover/movie?api_key=${process.env.MOVIES_API_KEY}&with_genres=35`,
    fetchHorrorMovies: `${process.env.MOVIES_BASE_URL}/discover/movie?api_key=${process.env.MOVIES_API_KEY}&with_genres=27`,
    fetchRomanceMovies: `${process.env.MOVIES_BASE_URL}/discover/movie?api_key=${process.env.MOVIES_API_KEY}&with_genres=10749`,
    fetchDocumentaryMovies: `${process.env.MOVIES_BASE_URL}/discover/movie?api_key=${process.env.MOVIES_API_KEY}&with_genres=99`,
}

export default requests;