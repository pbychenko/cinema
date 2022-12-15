import axios from "axios";

export const getTrendingData = async () => {
    const res = await axios.get('https://api.themoviedb.org/3/trending/all/day?api_key=6e5ea66aa145c5494dd12c5604e4f89a')
    return res.data

}