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
      v-if="onAir && onAir.results.length"
      :title="onAirTitle"
      :view-all-url="onAirUrl"
      :items="onAir" />

    <ListingCarousel
      v-if="airingToday && airingToday.results.length"
      :title="airingTodayTitle"
      :view-all-url="airingTodayUrl"
      :items="airingToday" />
  </main>
</template>

<script>
import { getTvShows, getTvShow } from '~/api';
import ListingCarousel from '~/components/global/ListingCarousel.vue';
import HeroShow from "~/components/global/HeroShow.vue";

export default {
  components: {
    HeroShow,
    ListingCarousel,
  },
  async asyncData({ error,app }) {
    try {
      const popular = await getTvShows('popular',1,app.i18n.locale);
      const topRated = await getTvShows('top_rated',1,app.i18n.locale);
      const onAir = await getTvShows('on_the_air',1,app.i18n.locale);
      const airingToday = await getTvShows('airing_today',1,app.i18n.locale);
      const featured = await getTvShow(popular.results[0].id,app.i18n.locale);

      return { popular, topRated, onAir, airingToday, featured };
    } catch {
      error({ statusCode: 504, message: 'Data not available' });
    }
  },
  head() {// set the HTML <head> element for a component.
    return {
      title: 'TV Shows',
      meta: [
        { hid: 'og:title', property: 'og:title', content: 'TV Shows' },
        { hid: 'og:url', property: 'og:url', content: `${process.env.FRONTEND_URL}${this.$route.path}` },
      ],
    };
  },

  computed: {
    popularTitle() {
      return this.$i18n.t('popularTVShows')
    },

    popularUrl() {
      return {  path: 'tv/category/popular'};
    },

    topRatedTitle() {
      return this.$i18n.t('topRatedTVShows')
    },

    topRatedUrl() {
      return {  path: 'tv/category/top_rated'};
    },

    onAirTitle() {
      return this.$i18n.t('currentlyAiringTVShows')
    },

    onAirUrl() {
      return {  path: 'tv/category/on_the_air'};
    },

    airingTodayTitle() {
      return this.$i18n.t('tvShowsAiringToday')
    },

    airingTodayUrl() {
      return {  path: 'tv/category/airing_today'};
    },
  },


};
</script>
