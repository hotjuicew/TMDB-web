<template>
  <main class="main">
    <TopNav
      :title="$t(metaTitle)"/>

    <Listing
      v-if="items && items.results.length"
      :title="$t(title)"
      :items="items"
      :loading="loading"
      @loadMore="loadMore" />
  </main>
</template>

<script>
import { getTrending, getTvShows, getListItem } from '~/api';
import TopNav from '~/components/global/TopNav';
import Listing from '~/components/global/Listing';

export default {
  components: {
    TopNav,
    // eslint-disable-next-line vue/no-reserved-component-names
    Listing,
  },

  data () {
    return {
      loading: false,
    };
  },

  head () {
    return {
      title: this.metaTitle,
      meta: [
        { hid: 'og:title', property: 'og:title', content: this.metaTitle },
        { hid: 'og:url', property: 'og:url', content: `${process.env.FRONTEND_URL}${this.$route.path}` },
      ],
      bodyAttrs: {
        class: 'topnav-active',
      },
    };
  },

  computed: {
    metaTitle () {
      return this.title;
    },

    title () {
      return getListItem('person', this.$route.params.name).title;
    },
  },

  async asyncData ({ params, error }) {
    try {
      const items = params.name === 'trending' ? await getTrending('person') : await getTvShows(params.name);
      return { items };
    } catch {
      error({ message: 'Page not found' });
    }
  },

  methods: {
    loadMore () {
      this.loading = true;

      if (this.$route.params.name === 'trending') {
        getTrending('tv', this.items.page + 1).then((response) => {
          this.items.results = this.items.results.concat(response.results);
          this.items.page = response.page;
          this.loading = false;
        }).catch(() => {
          this.loading = false;
        });
      } else {
        getTvShows(this.$route.params.name, this.items.page + 1).then((response) => {
          this.items.results = this.items.results.concat(response.results);
          this.items.page = response.page;
          this.loading = false;
        }).catch(() => {
          this.loading = false;
        });
      }
    },
  },
};
</script>
