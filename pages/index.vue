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
import { mapState } from "vuex";
import HeroShow from "~/components/global/HeroShow.vue";
import ListingCarousel from "~/components/global/ListingCarousel.vue";
import { getTrending, getMovie, getTvShow, getListItem } from '~/api';


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
    ...mapState({
      language: state => state.language
    }),
    trendingMoviesTitle () {
      console.log(this.language);
      if (this.language==='zh'){
        return getListItem('movie', 'trending').title.zh
      }else return getListItem('movie', 'trending').title.us

    },

    trendingMoviesUrl () {
      return { name: 'movie-category-name', params: { name: 'trending' } };
    },

    trendingTvTitle () {
      if (this.language==='zh'){
        return getListItem('tv', 'trending').title.zh
      }else return getListItem('tv', 'trending').title.us
    },

    trendingTvUrl () {
      return { name: 'tv-category-name', params: { name: 'trending' } };
    },
    trendingPersonTitle () {
      if (this.language==='zh'){
        return getListItem('person', 'trending').title.zh
      }else return getListItem('person', 'trending').title.us
    },
    trendingPersonUrl () {
      return { name: 'person-category-name', params: { name: 'trending' } };
    },
  },


}
</script>
