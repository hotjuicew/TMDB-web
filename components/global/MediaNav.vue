<template>
  <div >
    <button
      v-for="(item, index) in menu"
      :key="`tab-${index}`"
      
      type="button"
      @click="clicked(index, item)">
      {{ $t(`${item}`) }}
    </button>
  </div>
</template>

<script>
export default {
  props: {
    menu: {
      type: Array,
      required: true,
    },
  },
  beforeRouteLeave() {
    this.active=0
  },
  created() {
    console.log(this.active,'this.active');
  },
  data () {
    return {
      active: 0,
    };
  },

  methods: {
    clicked (index, item) {
      this.active = index;
      this.$emit('clicked', item.replace(/\s+/g, '-').toLowerCase());
    },
  },
};
</script>

<style>
</style>