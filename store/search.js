export const state = () => ({
  searchOpen: false,
  fromPage: '/',
  placeholders:{
   en:{
     index:'Search for a movie, tv show or person...',
     tv:'Search for a tv show...',
     movie:'Search for a movie...',
     person:'Search for a person...',
   },
    zh:{
      index:'搜索电影、电视剧、影人...',
      tv:'搜索电视剧...',
      movie:'搜索电影...',
      person:'搜索影人...',
    }
  },
  searchType:'index',
});

export const mutations = {
  toggleSearch (state) {
    state.searchOpen = !state.searchOpen;
  },

  openSearch (state) {
    state.searchOpen = true;
  },

  closeSearch (state) {
    state.searchOpen = false;
  },

  setFromPage (state, page) {
    state.fromPage = page;
  },
  setSearchType(state,searchType){
    state.searchType=searchType
  }
};

