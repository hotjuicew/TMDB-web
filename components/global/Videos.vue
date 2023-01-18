<template>
  <div class="spacing">
    <div >
      <select
        v-if="videoTypes.length > 1"
        v-model="activeType"
        @change="filterVideos">
        <option value="all">
          All
        </option>
        <option
          v-for="type in videoTypes"
          :key="`video-type-${type}`"
          :value="type">
          {{ type }}
        </option>
      </select>

      <strong >
        {{ videoCount }}
      </strong>
    </div>

    <div >
      <VideosItem
        v-for="(video, index) in activeVideos"
        :key="`video-${video.id}`"
        :video="video"
        :index="index"
        @openModal="openModal" />
    </div>
    <Modal
      v-if="modalVisible"
      :data="videos"
      type="iframe"
      nav
      :start-at="modalStartAt"
      @close="closeModal" />

  </div>
</template>

<script>
import { getYouTubeVideo } from '~/api';
import VideosItem from '~/components/global/VideosItem';
import Modal from '~/components/global/Modal';

export default {
  components: {
    VideosItem,Modal,
  },

  props: {
    videos: {
      type: Array,
      required: true,
    },
  },

  data () {
    return {
      activeType: 'all',
      activeVideos: this.videos,
      modalVisible: false,
      modalStartAt: 0,
    };
  },

  computed: {
    videoCount () {
      return `${this.activeVideos.length} ${this.activeVideos.length > 1 ? this.$t('videos'): this.$t('video')}`;
    },

    videoTypes () {
      return this.videos.map(video => video.type).filter((video, index, self) => self.indexOf(video) === index);
    },
  },

  created () {
    this.handleData();
  },

  methods: {
    handleData () {
      const ids = this.videos.map(video => video.key).join(',');

      // video params
      this.videos.forEach((video) => {
        this.$set(video, 'thumb', `https://img.youtube.com/vi/${video.key}/mqdefault.jpg`);
        this.$set(video, 'src', `https://www.youtube.com/embed/${video.key}?rel=0&showinfo=0&autoplay=1`);
        this.$set(video, 'url', `https://youtube.com/watch?v=${video.key}`);
      });

      // get video duration from YouTube api
      getYouTubeVideo(ids).then((response) => {
        for (let index = 0; index < this.videos.length; index++) {
          if (response.items[index]) {
            this.$set(this.videos[index], 'duration', response.items[index].contentDetails.duration);
          }
        }
      });
    },

    filterVideos () {
      this.activeVideos = this.videos.filter(video => this.activeType === 'all' ? true : video.type === this.activeType);
    },
    openModal (index) {
      this.modalStartAt = index;
      this.modalVisible = true;
    },

    closeModal () {
      this.modalVisible = false;
      this.modalStartAt = 0;
    },

  },
};
</script>

<style>
</style>