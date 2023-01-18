<template>
  <div class="spacing" >
    <div >
      <div >
        <img
          v-if="poster"
          v-lazyload="poster"
          class="lazyload"
          :alt="name">

        <span v-else>
          <!-- eslint-disable-next-line -->
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill-rule="evenodd" clip-rule="evenodd" fill="#999"><path d="M24 22h-24v-20h24v20zm-1-19h-22v18h22v-18zm-1 16h-19l4-7.492 3 3.048 5.013-7.556 6.987 12zm-11.848-2.865l-2.91-2.956-2.574 4.821h15.593l-5.303-9.108-4.806 7.243zm-4.652-11.135c1.38 0 2.5 1.12 2.5 2.5s-1.12 2.5-2.5 2.5-2.5-1.12-2.5-2.5 1.12-2.5 2.5-2.5zm0 1c.828 0 1.5.672 1.5 1.5s-.672 1.5-1.5 1.5-1.5-.672-1.5-1.5.672-1.5 1.5-1.5z"/></svg>
        </span>
      </div>
    </div>

    <div >
      <div
        v-if="item.overview"
        >
        <h2 >
          {{$t('storyline')}}
        </h2>

        <div v-html="item.overview" />
      </div>

      <div >
        <ul class="nolist">
          <li v-if="item.first_air_date">
            <div >
              {{$t('firstAired')}}
            </div>

            <div >
              {{ item.first_air_date | fullDate }}
            </div>
          </li>
          <li v-if="item.episode_run_time && item.episode_run_time.length">
            <div >
              {{$t('runtime')}}
            </div>

            <div >
              {{ formatRunTime(item.episode_run_time) }}
            </div>
          </li>
          <li v-if="creators">
            <div >
              {{$t('creator')}}
            </div>

            <div
              
              v-html="creators" />
          </li>
          <li v-if="item.genres && item.genres.length">
            <div >
              {{$t('genre')}}
            </div>

            <div
              
              v-html="formatGenres(item.genres)" />
          </li>
          <li v-if="item.number_of_seasons">
            <div >
              Seasons
            </div>

            <div >
              {{ item.number_of_seasons }}
            </div>
          </li>
          <li v-if="item.number_of_episodes">
            <div >
              {{$t('episodes')}}
            </div>

            <div >
              {{ item.number_of_episodes }}
            </div>
          </li>
          <li v-if="item.status">
            <div >
              {{$t('status')}}
            </div>

            <div >
              {{ item.status }}
            </div>
          </li>
          <li v-if="item.original_language">
            <div >
              {{$t('language')}}
            </div>

            <div >
              {{ item.original_language | fullLang }}
            </div>
          </li>
          <li v-if="item.networks && item.networks.length">
            <div >
              {{$t('network')}}
            </div>

            <div >
              {{ item.networks | arrayToList }}
            </div>
          </li>
        </ul>
      </div>

      <div >
<!--        <ExternalLinks-->
<!--          :links="item.external_ids" />-->
      </div>
    </div>
  </div>
</template>

<script>
import { apiImgUrl } from '~/api';
import { name, creators } from '~/mixins/Details';
// import ExternalLinks from '~/components/ExternalLinks';

export default {
  components: {
    // ExternalLinks,
  },

  mixins: [
    name,
    creators,
  ],

  props: {
    item: {
      type: Object,
      required: true,
    },
  },

  computed: {
    poster () {
      if (this.item.poster_path) {
        return `${apiImgUrl}/w370_and_h556_bestv2${this.item.poster_path}`;
      } else {
        return false;
      }
    },
  },

  created () {
    if (this.item.homepage) {
      // eslint-disable-next-line vue/no-mutating-props
      this.item.external_ids.homepage = this.item.homepage;
    }
  },

  methods: {
    formatGenres (genres) {
      return genres.map(genre => `<a href="/genre/${genre.id}/tv">${genre.name}</a>`).join(', ');
    },

    formatRunTime (times) {
      return times.map(time => `${time}m`).join(', ');
    },
  },
};
</script>

<style>
</style>