<template>
  <nav >
    <ul class="list">
      <li>
        <nuxt-link
          :to="{ name: 'index' }"
        >
          主页
        </nuxt-link>
      </li>
      <li>
        <nuxt-link
          :to="{ name: 'movie' }"
        >
          电影
        </nuxt-link>
      </li>
      <li>
        <nuxt-link
          :to="{ name: 'tv' }"
        >
          电视
        </nuxt-link>
      </li>
      <li>
       <button>搜索</button>
      </li>
    </ul>
  </nav>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {},

};
</script>

<style lang="scss"  scoped>
@import '/assets/css/utilities/_variables.scss';
.list {
  padding: 0;
  margin: 0;
  list-style: none;
}
</style>
