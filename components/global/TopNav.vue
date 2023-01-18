<template>
  <nav >
    <button
      type="button"
      aria-label="Go Back"
      
      @click="$router.go(-1)">
      <!-- eslint-disable-next-line -->
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="M16.5 20.5l-9-8.5 9-8.5"/></svg>
    </button>

    <p
      >
      {{ title }}
    </p>
  </nav>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
  },
};
</script>


<style>
</style>