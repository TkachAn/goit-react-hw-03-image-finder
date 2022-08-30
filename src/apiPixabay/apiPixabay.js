import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const API_KEY = '28325573-e3f151920507aabfaddea723c';
export const apiPixabay = async (query, page) => {
  const { data } = await axios.get('', {
    params: {
      key: API_KEY,
      image_type: 'photo',
      orientation: 'horizontal',
      per_page: 12,
      q: query,
      page: page,
    },
  });
  return data.hits;
};
export const apiPixabayId = async id => {
  const { data } = await axios.get('', {
    params: {
      key: API_KEY,
      id: id,
    },
  });
  // console.log(data.hits);
  return data.hits;
};
