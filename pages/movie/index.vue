<template>
  <main className="main">
    <HeroShow
      :item="featured" />

    <ListingCarousel
      v-if="popular && popular.results.length"
      :title="popularTitle"
      :view-all-url="popularUrl"
      :items="popular" />

    <ListingCarousel
      v-if="topRated && topRated.results.length"
      :title="topRatedTitle"
      :view-all-url="topRatedUrl"
      :items="topRated" />

    <ListingCarousel
      v-if="upcoming && upcoming.results.length"
      :title="upcomingTitle"
      :view-all-url="upcomingUrl"
      :items="upcoming" />

    <ListingCarousel
      v-if="nowPlaying && nowPlaying.results.length"
      :title="nowPlayingTitle"
      :view-all-url="nowPlayingUrl"
      :items="nowPlaying" />
  </main>
</template>

<script>
import { getMovies, getMovie } from '~/api';
import ListingCarousel from '~/components/global/ListingCarousel';
import HeroShow from "~/components/global/HeroShow.vue";

export default {
  components: {
    HeroShow,
    ListingCarousel,
  },
  async asyncData({ error,app }) {
    try {
      const popular = await getMovies('popular',1,app.i18n.locale);
      const topRated = await getMovies('top_rated',1,app.i18n.locale);
      const upcoming = await getMovies('upcoming',1,app.i18n.locale);
      const nowPlaying = await getMovies('now_playing',1,app.i18n.locale);
      const featured = await getMovie(upcoming.results[0].id,app.i18n.locale);

      return { popular, topRated, upcoming, nowPlaying, featured };
    } catch {
      error({ statusCode: 504, message: 'Data not available' });
    }
  },
  head() {
    return {
      title: 'Movies',
      meta: [
        { hid: 'og:title', property: 'og:title', content: 'Movies' },
        { hid: 'og:url', property: 'og:url', content: `${process.env.FRONTEND_URL}${this.$route.path}` },
      ],
    };
  },

  computed: {
    popularTitle() {
      return this.$i18n.t('popularMovies')
    },

    popularUrl() {
      return { name: `movie-category-name-${this.$i18n.locale}`, params: { name: 'popular' } };
    },

    topRatedTitle() {
      return this.$i18n.t('topRatedMovies')
    },

    topRatedUrl() {
      return { name: `movie-category-name-${this.$i18n.locale}`, params: { name: 'top_rated' } };
    },

    upcomingTitle() {
      return this.$i18n.t('upcomingMovies')
    },

    upcomingUrl() {
      return { name: `movie-category-name-${this.$i18n.locale}`, params: { name: 'upcoming' } };
    },

    nowPlayingTitle() {
      return this.$i18n.t('nowPlayingMovies')
    },

    nowPlayingUrl() {
      return { name: `movie-category-name-${this.$i18n.locale}`, params: { name: 'now_playing' } };
    },
  },


};
</script>
