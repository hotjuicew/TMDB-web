<template>
  <div>
    <transition name="slidedown">
      <SearchForm v-if="searchOpen" :placeholder='content'/>
    </transition>
   <NavBar></NavBar>
   <nuxt/>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import SearchForm from '~/components/search/SearchForm';
import NavBar from '~/components/global/NavBar';


export default {
  components: {
    SearchForm,
    NavBar,
  },

  computed: {
    ...mapState('search', [
      'searchOpen','placeholders'
    ]),
    content(){
      switch (this.$route.name){
        case 'index': return this.placeholders.index
        case 'tv': return this.placeholders.tv
        case 'movie': return this.placeholders.movie
        case 'person': return this.placeholders.person
        default :return this.placeholders.index
      }
    }
  },
};
</script>


