<template>
  <main class="main">
    <TopNav
      :title="metaTitle" />

    <Listing
      v-if="items && items.results.length"
      :title="title"
      :items="items"
      :loading="loading"
      @loadMore="loadMore" />
  </main>
</template>

<script>
import { getMediaByGenre, getGenreList } from '~/api';
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
      if (this.genre) {
        return `TV Genre: ${this.genre.name}`;
      } else {
        return `TV Genre`;
      }
    },
  },

  async asyncData ({ params, error,app }) {
    try {
      const items = await getMediaByGenre('tv', params.id,1,app.i18n.locale);
      const genres = await getGenreList('tv',app.i18n.locale);
      const genre = genres.find(genre => genre.id === parseInt(params.id));

      if (genre) {
        return { items, genre };
      } else {
        error({ message: 'Page not found' });
      }
    } catch {
      error({ statusCode: 504, message: 'Data not available' });
    }
  },

  methods: {
    loadMore () {
      this.loading = true;

      getMediaByGenre('tv', this.$route.params.id, this.items.page + 1,this.$i18n.locale).then((response) => {
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
