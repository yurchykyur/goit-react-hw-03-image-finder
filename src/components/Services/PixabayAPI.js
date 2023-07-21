import axios from 'axios';

export default async function servicePixabayAPI(
  searchQuery,
  page,
  hitsPerPage
) {
  const API_KEY = '36923827-7e58aafe5e36d67095a3a9316';

  const config = {
    method: 'get',
    baseURL: 'https://pixabay.com/api/',
    params: {
      key: API_KEY,
      q: searchQuery,
      page: page,
      per_page: hitsPerPage,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
    },
  };

  const response = await axios.get('', config);
  return response.data;
}
