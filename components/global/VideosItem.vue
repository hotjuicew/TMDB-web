<template>
  <div >
    <a
      
      :href="video.url"
      @click.prevent="handleVideo(index)">

      <div >
        <img
          v-if="video.thumb"
          v-lazyload="video.thumb"
          class="lazyload"
          :alt="video.name">

        <div
          v-if="video.duration"
          >
          {{ formatDuration(video.duration) }}
        </div>

        <div >
          <!-- eslint-disable-next-line -->
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 55 55"><circle cx="27.5" cy="27.5" r="26.75" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/><path fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20.97 40.81L40.64 27.5 20.97 14.19v26.62z"/></svg>
        </div>
      </div>

      <h2 >
        {{ video.name }}
      </h2>

      <div >
        {{ video.type }}
      </div>
    </a>
  </div>
</template>

<script>
export default {
  props: {
    video: {
      type: Object,
      required: true,
    },

    index: {
      type: Number,
      required: true,
    },
  },

  methods: {
    handleVideo (index) {
      // send the event up to the parent
      this.$emit('openModal', index);
    },

    getSeconds (duration) {
      let a = duration.match(/\d+/g);

      if (duration.includes('M') && !duration.includes('H') && !duration.includes('S')) {
        a = [0, a[0], 0];
      }

      if (duration.includes('H') && !duration.includes('M')) {
        a = [a[0], 0, a[1]];
      }

      if (duration.includes('H') && !duration.includes('M') && !duration.includes('S')) {
        a = [a[0], 0, 0];
      }

      duration = 0;

      if (a.length === 3) {
        duration = duration + parseInt(a[0]) * 3600;
        duration = duration + parseInt(a[1]) * 60;
        duration = duration + parseInt(a[2]);
      }

      if (a.length === 2) {
        duration = duration + parseInt(a[0]) * 60;
        duration = duration + parseInt(a[1]);
      }

      if (a.length === 1) {
        duration = duration + parseInt(a[0]);
      }

      return duration;
    },

    formatDuration (duration) {
      const seconds = this.getSeconds(duration);
      let secondsLeft = seconds;

      // hours
      // const hours = Math.floor(secondsLeft / 3600);
      secondsLeft = secondsLeft % 3600;

      // mins
      const mins = Math.floor(secondsLeft / 60);
      secondsLeft = secondsLeft % 60;

      // prepend 0 if less than 10
      if (secondsLeft < 10) {
        secondsLeft = `0${secondsLeft}`;
      }

      return `${mins}:${secondsLeft}`;
    },
  },
};
</script>
<style>
</style>