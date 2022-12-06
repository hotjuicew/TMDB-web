<template>
  <main>
    <h1>主页</h1>
    <HeroShow></HeroShow>
    <ListLine></ListLine>
  </main>
</template>
<script>
import HeroShow from "~/components/global/HeroShow.vue";
import ListLine from "~/components/global/ListLine.vue";

export default {
  components: {
    ListLine,
    HeroShow
  },
  data() {
    return {

    }
  },
  computed: {

  },
  methods: {

  }
}
</script>

<style scoped>
</style>
