<template>
  <div class="spacing">
    <div >
      <select
        v-if="seasons.length > 1&&this.$i18n.locale==='en'"
        v-model="activeSeason"
        @change="getEpisodes">
        <option
          v-for="season in seasons"
          :key="`season-${season.season}`"
          :value="season.season">
          Season {{  season.season }}
        </option>
      </select>
      <select
        v-if="seasons.length > 1&&this.$i18n.locale==='zh'"
        v-model="activeSeason"
        @change="getEpisodes">
        <option
          v-for="season in seasons"
          :key="`season-${season.season}`"
          :value="season.season">
          第 {{  season.season }} 季
        </option>
      </select>

      <strong
        v-if="activeEpisodes"
        >
        {{ episodeCount }}
      </strong>
    </div>

    <div
      v-if="activeEpisodes"
      >
      <EpisodesItem
        v-for="episode in activeEpisodes"
        :key="`episode-${episode.id}`"
        :episode="episode" />
    </div>
  </div>
</template>

<script>
import { getTvShowEpisodes } from '~/api';
import EpisodesItem from '~/components/tv/EpisodesItem';

export default {
  components: {
    EpisodesItem,
  },

  props: {
    numberOfSeasons: {
      type: Number,
      required: true,
    },
  },

  data () {
    return {
      activeSeason: this.numberOfSeasons,
      activeEpisodes: null,
    };
  },

  computed: {
    episodeCount () {
      return `${this.activeEpisodes.length} ${this.activeEpisodes.length > 1 ? this.$i18n.t('Episode.episodes') : this.$i18n.t('Episode.episode')}`
    },

    seasons () {
      const seasons = [];

      for (let index = 0; index < this.numberOfSeasons; index++) {
        seasons.push({
          season: index + 1,
          episodes: null,
        });
      }

      seasons.sort((a, b) => a.season > b.season ? -1 : 1);

      return seasons;
    },

  },

  mounted () {
    this.getEpisodes();
  },

  methods: {
    getEpisodes () {
      const season = this.seasons.find(season => season.season === this.activeSeason);

      // if we already have the episodes, just show them
      // else do api call
      if (season.episodes) {
        this.activeEpisodes = season.episodes;
      } else {
        // get episodes for a certain season
        getTvShowEpisodes(this.$route.params.id, this.activeSeason,this.$i18n.locale).then((response) => {
          season.episodes = response.episodes;
          this.activeEpisodes = season.episodes;
        });
      }
    },
  },
};
</script>

<style>
</style>