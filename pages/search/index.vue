<template>
  <main class="main">
    <MediaNav
      :menu="menu"
      @clicked="navClicked" />
    <template v-if="activeMenu === 'movies'">
      <SearchResults
        v-if="movieItems"
        :items="movieItems"
        :loading="loading"
        @loadMore="loadMoreMovie" />
    </template>
    <template v-if="activeMenu === 'tvs'">
      <SearchResults
        v-if="tvItems"
        :items="tvItems"
        :loading="loading"
        @loadMore="loadMoreTv" />
    </template>
    <template v-if="activeMenu === 'people'">
      <SearchResults
        v-if="personItems"
        :items="personItems"
        :loading="loading"
        @loadMore="loadMorePerson" />
    </template>
  </main>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { searchMulti, searchTv, searchMovie, searchPerson } from "~/api";
import SearchResults from '~/components/search/SearchResults.vue';

const fromPage = '/';

export default {
  components: {
    SearchResults,
  },
  beforeRouteUpdate(to, from, next) {
    next();
    this.getResults();
  },

  beforeRouteLeave(to, from, next) {
    const search = document.getElementById('search');

    next();

    if (search && search.value.length) {
      this.$store.commit('search/closeSearch');
    }
  },
  async asyncData({ query, error, redirect,app }) {
    try {
      if (query.q) {
        const movieItems = await searchMovie(query.q, 1,app.i18n.locale);
        const tvItems = await searchTv(query.q, 1,app.i18n.locale);
        const personItems = await searchPerson(query.q, 1,app.i18n.locale);
        return { movieItems,tvItems,personItems };
      } else {
        redirect('/');
      }
    } catch {
      error({ message: 'Page not found' });
    }
  },
  data() {
    return {
      loading: false,
      activeMenu: 'movies',
      menu:[]
    };
  },

  head() {
    return {
      title: 'search',
      meta: [
        { hid: 'og:title', property: 'og:title', content: 'search' },
        { hid: 'og:url', property: 'og:url', content: `${process.env.FRONTEND_URL}${this.$route.path}` },
      ],
      bodyAttrs: {
        class: 'page page-search',
      },
    };
  },
  computed: {
    query() {
      return this.$route.query.q ? this.$route.query.q : '';
    },

  },


  created() {
    this.createMenu();
  },
  mounted() {
    this.$store.commit('search/openSearch');
    this.$store.commit('search/setFromPage', fromPage);
  },



  methods: {
    navClicked (label) {
      this.activeMenu = label;
      console.log(label,'lab');
    },
    createMenu () {
      const menu = [];
      if (this.movieItems) menu.push('Movies');

      if (this.tvItems) menu.push('TVs');

      if (this.personItems) menu.push('People');

      this.menu = menu;
    },
    async getResults() {
      // if no search query
      if (!this.query.length) {
        this.items = null;
        return;
      }

      // trigger ajax call;
      const movieData = await searchMulti(this.query,1,this.$i18n.locale);

      // if no results, do nothing
      if (!movieData.total_results) {
        this.items = null;
        return;
      }

      // update the items
      this.items = movieData;
    },

    loadMoreMovie() {
      this.loading = true;
      searchMovie(this.query, this.items.page + 1,this.$i18n.locale).then((response) => {
        this.items.results = this.items.results.concat(response.results);
        this.items.page = response.page;
        this.loading = false;
      }).catch(() => {
        this.loading = false;
      });
    },
    loadMoreTv() {
      this.loading = true;
      searchTv(this.query, this.items.page + 1,this.$i18n.locale).then((response) => {
        this.items.results = this.items.results.concat(response.results);
        this.items.page = response.page;
        this.loading = false;
      }).catch(() => {
        this.loading = false;
      });
    },
    loadMorePerson() {
      this.loading = true;
      searchPerson(this.query, this.items.page + 1,this.$i18n.locale).then((response) => {
        this.items.results = this.items.results.concat(response.results);
        this.items.page = response.page;
        this.loading = false;
      }).catch(() => {
        this.loading = false;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/css/utilities/variables';

.main {
  padding-top: 6rem;

  @media (min-width: $breakpoint-large) {
    padding-top: 8rem;
  }
}
</style>
