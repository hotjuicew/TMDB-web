<template>
  <div>
    <div >
      <div >
        <div >
          <div > </div>
          <img
            v-if="backdrop"
            v-lazyload="backdrop"
            class="lazyload"
            
            :alt="name">
          <div > </div>
        </div>

      </div>

      <div >
        <transition
          appear
          name="hero">
          <div>
            <h1 >
              <nuxt-link :to="{ name: `person-id-zh`, params: { id: item.id } }">
                {{ name }}
              </nuxt-link>
            </h1>

            <div >

              <div >
                <span v-if="item.known_for_department">{{$t('PersonInfo.knownFor')}}:  {{ $t(`Job.${item.known_for_department}`) }}</span>
                <span v-if="item.birthday">{{$t('PersonInfo.born')}}: {{ formatBirthday(item.birthday) }}</span>
                <span v-if="item.place_of_birth"> {{$t('PersonInfo.placeOfBirth')}}: {{ item.place_of_birth }}</span>
              </div>
            </div>
            <div >
              {{ item.biography  }}
            </div>
          </div>
        </transition>
      </div>
    </div>


  </div>
</template>

<script>
import { name, stars, yearStart, cert, backdrop, trailer } from '~/mixins/Details';

export default {
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

  methods: {
    openModal () {
      this.modalVisible = true;
    },

    closeModal () {
      this.modalVisible = false;
    },
    formatBirthday(birthday){
      const dateArray = birthday.split('-');
      if (this.$i18n.locale==='en' ){
        const date = dateArray[2].substr(0, 1) === '0' ? dateArray[2].substr(1, 1) : dateArray[2];
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

        return `${date} ${months[dateArray[1] - 1]} ${dateArray[0]}`;
      }
      else {
        return `${dateArray[0]}年 ${dateArray[1]}月 ${dateArray[2]}日`;
      }
    },
  },
};
</script>

<style>
</style>