<template>
  <div >
    <div >
      <img
        v-if="poster"
        v-lazyload="poster"
        class="lazyload"
        :alt="episode.name">

      <span v-else>
        <!-- eslint-disable-next-line -->
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill-rule="evenodd" clip-rule="evenodd" fill="#999"><path d="M24 22h-24v-20h24v20zm-1-19h-22v18h22v-18zm-1 16h-19l4-7.492 3 3.048 5.013-7.556 6.987 12zm-11.848-2.865l-2.91-2.956-2.574 4.821h15.593l-5.303-9.108-4.806 7.243zm-4.652-11.135c1.38 0 2.5 1.12 2.5 2.5s-1.12 2.5-2.5 2.5-2.5-1.12-2.5-2.5 1.12-2.5 2.5-2.5zm0 1c.828 0 1.5.672 1.5 1.5s-.672 1.5-1.5 1.5-1.5-.672-1.5-1.5.672-1.5 1.5-1.5z"/></svg>
      </span>
    </div>

    <h2 >
      <strong>{{episodeNumber}}</strong> {{ episode.name }}
    </h2>

    <div >
      {{ episode.overview | truncate(300) }}
    </div>

    <div
      v-if="episode.air_date"
      >
      {{episodeAirDate}}
    </div>
  </div>
</template>

<script>
import { apiImgUrl } from '~/api';

export default {
  props: {
    episode: {
      type: Object,
      required: true,
    },
  },

  computed: {
    poster () {
      if (this.episode.still_path) {
        return `${apiImgUrl}/w400${this.episode.still_path}`;
      } else {
        return null;
      }
    },
    episodeNumber(){
      if (this.$i18n.locale==='zh' )return `第${this.episode.episode_number}集`
      else return `E${this.episode.episode_number}`
    },
    episodeAirDate(){
      const dateArray = this.episode.air_date.split('-');
      if (this.$i18n.locale==='en' ){
        const date = dateArray[2].substr(0, 1) === '0' ? dateArray[2].substr(1, 1) : dateArray[2];
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

        return `${date} ${months[dateArray[1] - 1]} ${dateArray[0]}`;
      }
      else {
        return `${dateArray[0]}年 ${dateArray[1]}月 ${dateArray[2]}日`;
      }
    }
  },
};
</script>

<style>
</style>