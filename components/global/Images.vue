<template>
  <div class="spacing">
    <div >
      <h2 >
        {{ $t(title) }}
      </h2>

      <strong >
        {{ imagesCount }}
      </strong>
    </div>

    <div >
      <ImagesItem
        v-for="(image, index) in images"
        :key="`image-${index}`"
        :image="image"
        :index="index"
        :type="type"
       />
    </div>

  </div>
</template>

<script>
import { apiImgUrl } from '~/api';
import ImagesItem from '~/components/global/ImagesItem';

export default {
  components: {
    ImagesItem,
  },

  props: {
    title: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      required: true,
    },

    images: {
      type: Array,
      required: true,
    },
  },

  computed: {
    imagesCount () {
      return `${this.images.length} ${this.images.length > 1 ? 'Images' : 'Image'}`;
    },
  },

  created () {
    this.handleData();
  },

  methods: {
    handleData () {
      let thumb;

      if (this.type === 'poster') {
        thumb = `${apiImgUrl}/w370_and_h556_bestv2`;
      } else {
        thumb = `${apiImgUrl}/w533_and_h300_bestv2`;
      }

      // eslint-disable-next-line array-callback-return
      this.images.map((image) => {
        image.thumb = `${thumb}${image.file_path}`;
        image.src = `${apiImgUrl}/original${image.file_path}`;
      });
    },
  },
};
</script>

<style>

</style>