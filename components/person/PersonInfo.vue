<template>
  <div class="spacing" >
    <div >
      <div >
        <img
          v-if="avatar"
          v-lazyload="avatar"
          class="lazyload"
          :alt="person.name">

        <span v-else>
          <!-- eslint-disable-next-line -->
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill-rule="evenodd" clip-rule="evenodd" fill="#999"><path d="M24 22h-24v-20h24v20zm-1-19h-22v18h22v-18zm-1 16h-19l4-7.492 3 3.048 5.013-7.556 6.987 12zm-11.848-2.865l-2.91-2.956-2.574 4.821h15.593l-5.303-9.108-4.806 7.243zm-4.652-11.135c1.38 0 2.5 1.12 2.5 2.5s-1.12 2.5-2.5 2.5-2.5-1.12-2.5-2.5 1.12-2.5 2.5-2.5zm0 1c.828 0 1.5.672 1.5 1.5s-.672 1.5-1.5 1.5-1.5-.672-1.5-1.5.672-1.5 1.5-1.5z"/></svg>
        </span>
      </div>
    </div>

    <div >
      <div >
        <h2 >
          {{ person.name }}
        </h2>

        <div v-if="person.biography">
          <img
            v-if="avatar"
            :src="avatar"
            :alt="person.name">

          <div v-html="formatContent(person.biography)" />
        </div>
      </div>

      <div >
        <ul class="nolist">
          <li v-if="person.known_for_department">
            <div >
              {{$t('PersonInfo.knownFor')}}
            </div>

            <div >
              {{ $t(`Job.${person.known_for_department}`) }}
            </div>
          </li>
          <li v-if="person.birthday">
            <div >
              {{$t('PersonInfo.born')}}
            </div>

            <div >
              {{ formatBirthday(person.birthday) }}
              <span v-if="!person.deathday">( {{$t('age')}} {{ age }} )</span>
            </div>
          </li>
          <li v-if="person.place_of_birth">
            <div >
              {{$t('PersonInfo.placeOfBirth')}}
            </div>

            <div >
              {{ person.place_of_birth }}
            </div>
          </li>
          <li v-if="person.deathday">
            <div >
              Died
            </div>

            <div >
              {{ person.deathday | fullDate }}
              <span v-if="person.birthday">( {{$t('aged')}} {{ age }} )</span>
            </div>
          </li>
        </ul>
      </div>

      <div >
      </div>
    </div>
  </div>
</template>

<script>
import { apiImgUrl } from '~/api';

export default {


  props: {
    person: {
      type: Object,
      required: true,
    },
  },

  computed: {
    avatar () {
      if (this.person.profile_path) {
        return `${apiImgUrl}/w370_and_h556_bestv2${this.person.profile_path}`;
      } else {
        return null;
      }
    },

    age () {
      const born = this.person.birthday;
      const died = this.person.deathday;

      if (born && !died) {
        return this.getAge(born);
      } else if (born && died) {
        return this.getAge(born, died);
      } else {
        return false;
      }
    },
  },

  created () {
    if (this.person.homepage) {
      // eslint-disable-next-line vue/no-mutating-props
      this.person.external_ids.homepage = this.person.homepage;
    }
  },

  methods: {
    formatContent (string) {
      return string.split('\n').filter(section => section !== '').map(section => `<p>${section}</p>`).join('');
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
    getAge (born, died) {
      const startDate = new Date(born);
      let endDate;
      let age;

      if (!died) {
        endDate = new Date();
      } else {
        endDate = new Date(died);
      }

      const month = endDate.getMonth() - startDate.getMonth();
      age = endDate.getFullYear() - startDate.getFullYear();

      if (month < 0 || (month === 0 && endDate.getDate() < startDate.getDate())) {
        age--;
      }

      return age;
    },
  },
};
</script>

<style>
</style>