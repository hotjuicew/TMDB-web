<template>
  <div class="credits-item">
    <nuxt-link
      class="credits-item__link"
      :to="{ name: `person-id-${this.$i18n.locale}`, params: { id: person.id } }">
      <div class="credits-item__img">
        <img
          v-if="poster"
          v-lazyload="poster"
          class="lazyload"
          :alt="person.name">

        <span v-else>
          <!-- eslint-disable-next-line -->
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill-rule="evenodd" clip-rule="evenodd" fill="#999"><path d="M24 22h-24v-20h24v20zm-1-19h-22v18h22v-18zm-1 16h-19l4-7.492 3 3.048 5.013-7.556 6.987 12zm-11.848-2.865l-2.91-2.956-2.574 4.821h15.593l-5.303-9.108-4.806 7.243zm-4.652-11.135c1.38 0 2.5 1.12 2.5 2.5s-1.12 2.5-2.5 2.5-2.5-1.12-2.5-2.5 1.12-2.5 2.5-2.5zm0 1c.828 0 1.5.672 1.5 1.5s-.672 1.5-1.5 1.5-1.5-.672-1.5-1.5.672-1.5 1.5-1.5z"/></svg>
        </span>
      </div>

      <h2 class="credits-item__name">
        {{ person.name }}
      </h2>

      <div class="credits-item__character">
        {{ person.character }}
      </div>
    </nuxt-link>
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
    poster () {
      if (this.person.profile_path) {
        return `${apiImgUrl}/w370_and_h556_bestv2${this.person.profile_path}`;
      } else {
        return null;
      }
    },
  },
};
</script>

<style>

</style>
