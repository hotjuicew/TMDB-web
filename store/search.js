export const state = () => ({
  searchOpen: false,
  fromPage: '/',
  placeholders:{
    index:'Search for a movie, tv show or person...',
    tv:'Search for a tv show...',
    movie:'Search for a movie...',
    person:'Search for a person...',
  }
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
};

