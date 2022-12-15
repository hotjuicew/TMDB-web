<template>
   <div :class="$style.nav"></div>
</template>
<script>

export default {
  data() {
    return {};
  },
  computed: {},
  methods: {}
};
</script>

<style lang="scss" module>
@import "assets/css/utilities/_variables.scss";
.nav{
  left: 0;
  right: 0;
  top: 0;
  z-index: 20;
  height: $head-nav;
  background-color: #000000;
}
</style>
