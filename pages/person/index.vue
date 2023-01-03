<template>
  <main className="main">
    <HeroPerson :item="feature"/>
    <ListingCarousel
      v-if="popular && popular.results.length"
      :title="popularTitle"
      :view-all-url="popularUrl"
      :items="popular" />
  </main>
</template>

<script>
import { mapState } from "vuex";
import { getListItem, getPeoplePopular, getPerson } from "~/api";
import ListingCarousel from '~/components/global/ListingCarousel.vue';
import HeroPerson from "~/components/person/HeroPerson.vue";

export default {
  components: {
    HeroPerson,
    ListingCarousel,
  },
  async asyncData({ error }) {
    try {
      const popular = await getPeoplePopular();
      const featuredId=popular.results[0].id
      const feature=await getPerson(featuredId)
      console.log('feature',feature);
      return { popular,feature};
    } catch {
      error({ statusCode: 504, message: 'Data not available' });
    }
  },
  head() {// set the HTML <head> element for a component.
    return {
      title: 'People',
      meta: [
        { hid: 'og:title', property: 'og:title', content: 'People' },
        { hid: 'og:url', property: 'og:url', content: `${process.env.FRONTEND_URL}${this.$route.path}` },
      ],
    };
  },

  computed: {
    ...mapState({
      language: state => state.language
    }),
    popularTitle() {
      if (this.language==='zh') return getListItem('person', 'popular').title.zh
      else return getListItem('person', 'popular').title.us
    },

    popularUrl() {
      return { name: 'person-category-name', params: { name: 'popular' } };
    },
  },


};
</script>
