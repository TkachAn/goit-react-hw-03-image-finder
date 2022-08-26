import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const KEY = '28325573-e3f151920507aabfaddea723c';

const apiPixabay = async (query, page) => {
  const { data } = await axios.get('', {
    params: {
      key: KEY,
      image_type: 'photo',
      orientation: 'horizontal',
      per_page: 12,
      q: query,
      page: page,
    },
  });
  return data.hits;
};
export const apiIdPixabay = async id => {
  const { data } = await axios.get('', {
    params: {
      key: KEY,
      id: id,
    },
  });
  return data.hits.userImageURL;
};
export default apiPixabay;
