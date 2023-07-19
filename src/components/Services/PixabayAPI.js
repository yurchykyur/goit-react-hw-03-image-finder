import axios from 'axios';

// const API_KEY = '36923827-7e58aafe5e36d67095a3a9316';

// const config = {
//   method: 'get',
//   baseURL: 'https://pixabay.com/api/',
//   params: {
//     key: API_KEY,
//     q: searchQuery,
//     page: 1,
//     per_page: 12,
//     image_type: 'photo',
//     orientation: 'horizontal',
//     safesearch: true,
//   },
// };

// const instance = axios.create(config);

// export default function servicePixabayAPI() {
//   return instance.get('', config);
// }

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

    try {
      const response = await axios.get('', config);
      this.increasePage();
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  get query() {
    return this.state.searchQuery;
  }

  set query(newQuery) {
    console.log('newQuery', newQuery);
    this.searchQuery = newQuery;
  }

  // get page() {
  //   return this.page;
  // }

  // set page(nextPage) {
  //   console.log('nextPage', nextPage);
  //   this.page = nextPage;
  // }

  get hits() {
    console.log('getTotalHits', this.totalHits);
    return this.totalHits;
  }

  set hits(newTotalHits) {
    console.log('newTotalHits', newTotalHits);
    this.totalHits = newTotalHits;
    console.log('setState-TotalHits', this.totalHits);
  }

  increasePage() {
    this.page += 1;
  }

  resetPage = () => {
    this.page = 1;
  };
}

// import axios from 'axios'

// export class ApiPixabay {
//   constructor() {
//     this.page = 1;
//     this.searchQuery = '';
//     this.totalHits = 0;
//     this.hitsPerPage = 0;
//   }

//   async getImages() {
//     const mainUrlApi = 'https://pixabay.com/api/';
//     const API_KEY = '36923827-7e58aafe5e36d67095a3a9316';
//     const options = {
//       image_type: 'photo',
//       orientation: 'horizontal',
//       safesearch: true,
//       per_page: 40,
//     };
//     this.hitsPerPage = options.per_page;
//     const URL = `${mainUrlApi}?key=${API_KEY}&q=${this.searchQuery}&image_type=${options.image_type}&orientation=${options.orientation}&safesearch=${options.safesearch}&page=${this.page}&per_page=${options.per_page}`;

//     const response = await axios.get(URL);
//     return response;
//   }

//   get query() {
//     return this.searchQuery;
//   }

//   set query(newQuery) {
//     this.searchQuery = newQuery;
//   }

//   increasePage() {
//     this.page += 1;
//   }
//   resetPage() {
//     this.page = 1;
//   }
// }
