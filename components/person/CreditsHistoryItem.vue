<template>
  <tr >
    <td >
      {{ year ? year : '—' }}
    </td>
    <td>
      <nuxt-link :to="{ name: `${media}-id-${this.$i18n.locale}`, params: { id: credit.id } }">
        <strong>{{ name }}</strong>

        <span
          v-if="episodes"
          >
          {{ episodes }}
        </span>

        <span
          v-if="role"
          >
          {{ role }}
        </span>
      </nuxt-link>
    </td>
  </tr>
</template>

<script>
export default {
  props: {
    year: {
      type: String,
      required: true,
    },

    credit: {
      type: Object,
      required: true,
    },
  },

  computed: {
    media () {
      if (this.credit.media_type) {
        return this.credit.media_type;
      } else if (this.credit.name) {
        return 'tv';
      } else {
        return 'movie';
      }
    },

    name () {
      return this.credit.title ? this.credit.title : this.credit.name;
    },

    role () {
      const character = this.credit.character;
      const job = this.credit.job;

      if (character) {
        return this.$i18n.t('CreditsHistory.as')+` ${character}`;
      } else if (job) {
        return this.$i18n.t('CreditsHistory.dr')+this.$i18n.t(`CreditsHistory.${job}`);
      } else {
        return false;
      }
    },

    episodes () {
      const episodes = this.credit.episode_count;

      if (episodes) {
        if (episodes > 1) {
          return `(${episodes} episodes)`;
        } else {
          return `(${episodes} episode)`;
        }
      } else {
        return false;
      }
    },
  },
};
</script>

<style>
</style>