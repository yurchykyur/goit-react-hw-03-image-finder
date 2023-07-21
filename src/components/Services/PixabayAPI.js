import axios from 'axios';

export default class servicePixabayAPI {
  constructor() {
    this.page = 1;
    this.searchQuery = '';
    this.totalHits = 0;
    this.hitsPerPage = 12;
  }

  async getImages() {
    const API_KEY = '36923827-7e58aafe5e36d67095a3a9316';

    const config = {
      method: 'get',
      baseURL: 'https://pixabay.com/api/',
      params: {
        key: API_KEY,
        q: this.searchQuery,
        page: this.page,
        per_page: this.hitsPerPage,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
      },
    };

    const response = await axios.get('', config);
    this.increasePage();
    return response.data;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }

  get hits() {
    return this.totalHits;
  }

  set hits(newTotalHits) {
    this.totalHits = newTotalHits;
  }

  increasePage() {
    this.page += 1;
  }

  resetPage = () => {
    this.page = 1;
  };
}
