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
import { mapState } from "vuex";
import { getTvShows, getTvShow, getListItem } from '~/api';
import ListingCarousel from '~/components/global/ListingCarousel.vue';
import HeroShow from "~/components/global/HeroShow.vue";

export default {
  components: {
    HeroShow,
    ListingCarousel,
  },
  async asyncData({ error }) {
    try {
      const popular = await getTvShows('popular');
      const topRated = await getTvShows('top_rated');
      const onAir = await getTvShows('on_the_air');
      const airingToday = await getTvShows('airing_today');
      const featured = await getTvShow(popular.results[0].id);

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
    ...mapState({
      language: state => state.language
    }),
    popularTitle() {
      if (this.language==='zh') return getListItem('tv', 'popular').title.zh
      else return getListItem('tv', 'popular').title.us
    },

    popularUrl() {
      return { name: 'tv-category-name', params: { name: 'popular' } };
    },

    topRatedTitle() {
      if (this.language==='zh')return getListItem('tv', 'top_rated').title.zh
      else return getListItem('tv', 'top_rated').title.us
    },

    topRatedUrl() {
      return { name: 'tv-category-name', params: { name: 'top_rated' } };
    },

    onAirTitle() {
      if (this.language==='zh') return getListItem('tv', 'on_the_air').title.zh
      else return getListItem('tv', 'on_the_air').title.us
    },

    onAirUrl() {
      return { name: 'tv-category-name', params: { name: 'on_the_air' } };
    },

    airingTodayTitle() {
      if (this.language==='zh') return getListItem('tv', 'airing_today').title.zh
      else return getListItem('tv', 'airing_today').title.us
    },

    airingTodayUrl() {
      return { name: 'tv-category-name', params: { name: 'airing_today' } };
    },
  },


};
</script>
