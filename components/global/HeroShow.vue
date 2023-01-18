<template>
  <div>
    <div >
      <div >
        <div>
          <button
            v-if="trailer"
            
            type="button"
            aria-label="Play Trailer"
            @click="openModal">
            <!-- eslint-disable-next-line -->
            <svg xmlns="http://www.w3.org/2000/svg" width="55" height="55" viewBox="0 0 55 55"><circle cx="27.5" cy="27.5" r="26.75" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/><path fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20.97 40.81L40.64 27.5 20.97 14.19v26.62z"/></svg>
          </button>

          <img
            v-if="backdrop"
            v-lazyload="backdrop"
            class="lazyload"
            
            :alt="name">
        </div>
      </div>

      <div >
        <transition
          appear
          name="hero">
          <div>
            <h1 >
              <template v-if="isSingle">
                {{ name }}
              </template>

              <template v-else>
                <nuxt-link :to="{ name: `${type}-id-${this.$i18n.locale}`, params: { id: item.id } }">
                  {{ name }}
                </nuxt-link>
              </template>
            </h1>

            <div >
              <div
                v-if="stars || item.vote_count"
                >
                <div
                  v-if="stars"
                  >
                  <div :style="{ width: `${stars}%` }" />
                </div>

                <div v-if="item.vote_count > 0&&this.$i18n.locale==='en'">
                  {{ item.vote_count | numberWithCommas }} Reviews
                </div>
                <div v-if="item.vote_count > 0&&this.$i18n.locale==='zh'">
                  {{ item.vote_count | numberWithCommas }} 人评价
                </div>
              </div>

              <div >
                <span v-if="item.number_of_seasons&&this.$i18n.locale==='en'">Season {{ item.number_of_seasons }}</span>
                <span v-if="item.number_of_seasons&&this.$i18n.locale==='zh'"> 第 {{ item.number_of_seasons }} 季</span>
                <span v-if="yearStart">{{ yearStart }}</span>
                <span v-if="item.runtime">{{ runtimeFormat(item.runtime)}}</span>
                <span v-if="cert">Cert. {{ cert }}</span>
              </div>
            </div>

            <div >
              {{ item.overview | truncate(200) }}
            </div>

            <button
              v-if="trailer"
              class="button button--icon"
              
              type="button"
              @click="openModal">
              <!-- eslint-disable-next-line -->
              <span class="icon"><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="#fff"><path d="M3 22v-20l18 10-18 10z"/></svg></span>
              <span class="txt">Watch Trailer</span>
            </button>
          </div>
        </transition>
      </div>
    </div>

    <Modal
      v-if="modalVisible"
      :data="trailer"
      type="iframe"
      @close="closeModal" />
    <div ></div>
  </div>
</template>

<script>
import { name, stars, yearStart, cert, backdrop, trailer } from '~/mixins/Details';
import Modal from '~/components/global/Modal';

export default {
  components: {
    Modal,
  },

  mixins: [
    name,
    stars,
    yearStart,
    cert,
    backdrop,
    trailer,
  ],

  props: {
    item: {
      type: Object,
      required: true,
    },
  },

  data () {
    return {
      isSingle: this.item.id === this.$route.params.id,
      modalVisible: false,
    };
  },

  computed: {
    type () {
      return this.item.title ? 'movie' : 'tv';
    },

  },

  methods: {
    openModal () {
      this.modalVisible = true;
    },

    closeModal () {
      this.modalVisible = false;
    },
    runtimeFormat(minutes){
      // seconds
      const seconds = minutes * 60;
      let secondsLeft = seconds;

      // hours
      const hours = Math.floor(secondsLeft / 3600);
      secondsLeft = secondsLeft % 3600;

      // mins
      const mins = Math.floor(secondsLeft / 60);
      secondsLeft = secondsLeft % 60;

      if (this.$i18n.locale==='en')return `${hours ? hours + 'h' : ''} ${mins}min`;
      if (this.$i18n.locale==='zh')return `${hours ? hours + '小时' : ''} ${mins}分钟`;
    },
  },
};
</script>


<style>

</style>
