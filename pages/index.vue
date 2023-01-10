<template>
  <main>
    <HeroShow :item="featured"></HeroShow>
    <ListingCarousel
      v-if="trendingMovies && trendingMovies.results.length"
      :title="trendingMoviesTitle"
      :view-all-url="trendingMoviesUrl"
      :items="trendingMovies"
    />
    <ListingCarousel
      v-if="trendingTv && trendingTv.results.length"
      :title="trendingTvTitle"
      :view-all-url="trendingTvUrl"
      :items="trendingTv" />
    <ListingCarousel
      v-if="trendingPerson && trendingPerson.results.length"
      :title="trendingPersonTitle"
      :view-all-url="trendingPersonUrl"
      :items="trendingPerson" />
  </main>
</template>
<script>
import HeroShow from "~/components/global/HeroShow.vue";
import ListingCarousel from "~/components/global/ListingCarousel.vue";
import { getTrending, getMovie, getTvShow} from '~/api';

export default {
  components: {
    ListingCarousel,
    HeroShow
  },

  async asyncData ({ error }) {
    try {
      const trendingMovies = await getTrending('movie');
      const trendingTv = await getTrending('tv');
      // eslint-disable-next-line no-unused-vars
      const trendingPerson = await getTrending('person');
      let featured;

      // feature a random item from movies or tv
      const items = [...trendingMovies.results, ...trendingTv.results];
      const randomItem = items[Math.floor(Math.random() * items.length)];
      const media = randomItem.title ? 'movie' : 'tv';

      if (media === 'movie') {
        featured = await getMovie(randomItem.id);
      } else {
        featured = await getTvShow(randomItem.id);
      }
      return { trendingMovies, trendingTv, trendingPerson,featured };
    } catch {
      error({ statusCode: 504, message: 'Data not available' });
    }
  },
  computed: {
    trendingMoviesTitle () {
      return this.$i18n.t('trendingMovies')
    },

    trendingMoviesUrl () {
      return { path: this.$i18n.locale+'/movie/category/trending' };
    },

    trendingTvTitle () {
      return this.$i18n.t('trendingTVShows')
    },

    trendingTvUrl () {
      return { path: this.$i18n.locale+'/tv/category/trending' };

    },
    trendingPersonTitle () {
      return this.$i18n.t('trendingPeople')
    },
    trendingPersonUrl () {
      return { path: this.$i18n.locale+'/person/category/trending' };
    },
  },


}
</script>
