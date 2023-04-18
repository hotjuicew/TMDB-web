<template>
  <div>
    <transition name="fade">
      <SearchForm v-if="searchOpen"/>
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
      'searchOpen'
    ]),

  },

};
</script>


