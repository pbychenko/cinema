import axios from "axios";

//только для работы
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

export const getTrendingData = async (pageNumber = 1) => {
    const res = await axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=6e5ea66aa145c5494dd12c5604e4f89a&page=${pageNumber}`)
    return res.data
}