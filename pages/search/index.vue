<template>
  <main class="main">
    <MediaNav
      :menu="menu"
      @clicked="navClicked" />
    <template v-if="activeMenu === 'movies'">
      <SearchResults
        :key="movieItems.total_results"
        v-if="movieItems"
        :items="movieItems"
        :loading="loading"
        @loadMore="loadMoreMovie" />
    </template>
    <template v-if="activeMenu === 'tvs'">
      <SearchResults
        :key="tvItems.total_results"
        v-if="tvItems"
        :items="tvItems"
        :loading="loading"
        @loadMore="loadMoreTv" />
    </template>
    <template v-if="activeMenu === 'people'">
      <SearchResults
        :key="personItems.total_results"
        v-if="personItems"
        :items="personItems"
        :loading="loading"
        @loadMore="loadMorePerson" />
    </template>
  </main>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import {searchTv, searchMovie, searchPerson } from "~/api";
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

    if (search && search.value.length ) {
      console.log(this.$route.name,'hhhahhaha');
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
      menu:[],
      movieItems: null,
      tvItems: null,
      personItems: null,
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
    console.log('index created');
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
      this.movieItems = this.$data.movieItems;
      this.tvItems = this.$data.tvItems;
      this.personItems=this.$data.personItems;
      this.personItems = this.$data.personItems;
      this.menu=[]
      if (this.movieItems.total_results) this.menu.push('movies');
      if (this.tvItems.total_results) this.menu.push('tvs');
      if (this.personItems.total_results) this.menu.push('people');
    },
    async getResults() {
      if (!this.query.length) {
        this.items = null;
        return;
      }
      const movieData = await searchMovie(this.query,1,this.$i18n.locale);
      const tvData = await searchTv(this.query,1,this.$i18n.locale);
      const personData = await searchPerson(this.query,1,this.$i18n.locale);
      this.movieItems=movieData
      this.tvItems=tvData
      this.personItems=personData

      this.menu=[]
      if (this.movieItems.total_results) this.menu.push('movies');
      if (this.tvItems.total_results) this.menu.push('tvs');
      if (this.personItems.total_results) this.menu.push('people');
      this.activeMenu=this.menu[0]

    },

    loadMoreMovie() {
      this.loading = true;
      searchMovie(this.query, this.movieItems.page + 1,this.$i18n.locale).then((response) => {
        this.movieItems.results = this.movieItems.results.concat(response.results);
        this.movieItems.page = response.page;
        this.loading = false;
      }).catch(() => {
        this.loading = false;
      });
    },
    loadMoreTv() {
      this.loading = true;
      searchTv(this.query, this.tvItems.page + 1,this.$i18n.locale).then((response) => {
        this.tvItems.results = this.tvItems.results.concat(response.results);
        this.tvItems.page = response.page;
        this.loading = false;
      }).catch(() => {
        this.loading = false;
      });
    },
    loadMorePerson() {
      this.loading = true;
      console.log(this.personItems.page + 1,'this.personItems.page + 1');
      searchPerson(this.query, this.personItems.page + 1,this.$i18n.locale).then((response) => {
        this.personItems.results = this.personItems.results.concat(response.results);
        this.personItems.page = response.page;
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
