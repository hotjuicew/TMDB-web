<template>
  <div >
    <a
      :href="image.thumb"
      @click.prevent="handleGallery(index)">
      <div >
        <img
          v-lazyload="image.thumb"
          class="lazyload"
          alt="">
      </div>
    </a>
  </div>
</template>

<script>
export default {
  props: {
    image: {
      type: Object,
      required: true,
    },

    index: {
      type: Number,
      required: true,
    },

    type: {
      type: String,
      required: true,
    },
  },

  methods: {
    handleGallery (index) {
      this.$emit('openModal', index);
    },
  },
};
</script>

<style>
</style>