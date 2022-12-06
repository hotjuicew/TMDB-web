<template>
  <nav :class="$style.nav">
    <ul class="list">
      <li>
        <nuxt-link
          :to="{ name: 'index' }"
        >
          <svg t="1670315172278" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8862" width="30" height="30"><path d="M512 64 0 576l96 96 96-96 64 384 192 0 0-192 128 0 0 192 192 0 64-384 96 96 96-96L512 64zM512 474.496c-49.984 0-90.528-40.512-90.528-90.496s40.512-90.496 90.528-90.496c49.984 0 90.496 40.512 90.496 90.496C602.496 433.984 561.984 474.496 512 474.496z" p-id="8863" fill="#fff"></path></svg>
        </nuxt-link>
      </li>
      <li>
        <nuxt-link
          :to="{ name: 'movie' }"
        >
          <svg t="1670315737260" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9315" width="24" height="24"><path d="M895.264 256l-126.368 0L896 128.512 770.368 0l-178.112 0 127.616 127.488L589.12 256l-151.136 0 129.888-127.488L439.488 0 258.496 0l127.488 127.488L255.264 256 127.008 256l129.984-127.488L128.512 0 0 0l0 1024 1024 0L1024 0l-125.504 0L1024 128 895.264 256zM896 896 128 896l0-128 768 0L896 896zM896 640 128 640l0-128 768 0L896 640z" p-id="9316" fill="#fff"></path></svg>
        </nuxt-link>
      </li>
      <li>
        <nuxt-link
          :to="{ name: 'tv' }"
        >
          <svg t="1670315868693" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9768" width="30" height="30"><path d="M981.184 288.096c-88.8-12.768-183.392-22.016-282.08-27.232L864 96l-64-64L575.456 256.544C554.432 256.192 533.28 256 512 256l0 0L256 0 192 64l194.208 194.208c-120.928 4.256-236.352 14.528-343.392 29.92C15.264 395.84 0 514.848 0 640s15.264 244.16 42.816 351.904C186.432 1012.544 345.152 1024 512 1024c166.848 0 325.536-11.456 469.184-32.096C1008.736 884.16 1024 765.152 1024 640S1008.736 395.84 981.184 288.096zM863.904 874.592C756.16 888.352 637.152 896 512 896c-125.152 0-244.16-7.648-351.904-21.408C139.456 802.784 128 723.424 128 640c0-83.424 11.456-162.784 32.096-234.592C267.84 391.648 386.848 384 512 384c125.12 0 244.16 7.648 351.872 21.408C884.544 477.216 896 556.576 896 640 896 723.424 884.544 802.784 863.904 874.592z" p-id="9769" fill="#fff"></path></svg>
        </nuxt-link>
      </li>
      <li>
       <button>
         <svg t="1670317053272" class="icon" viewBox="0 0 1025 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="10088" width="32" height="32"><path d="M981.886772 862.28582 741.861562 658.137728c-24.825827-22.324245-51.361595-32.583897-72.799203-31.602264C725.743774 560.196043 759.974282 474.09729 759.974282 379.987141 759.974282 170.139242 589.83504 0 379.987141 0 170.139242 0 0 170.139242 0 379.987141c0 209.847899 170.139242 379.987141 379.987141 379.987141 94.110149 0 180.208902-34.230508 246.579989-90.880258-0.981633 21.437608 9.246354 47.973377 31.602264 72.799203l204.148092 240.025211c34.958817 38.82202 92.051885 42.115241 126.88404 7.283087S1020.740458 897.244637 981.886772 862.28582zM379.987141 633.311902c-139.898599 0-253.324761-113.426162-253.324761-253.324761S240.088542 126.66238 379.987141 126.66238s253.324761 113.426162 253.324761 253.324761S519.88574 633.311902 379.987141 633.311902z" p-id="10089" fill="#fff"></path></svg>
       </button>
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

<style lang="scss" module>
@import '/assets/css/utilities/_variables.scss';

.nav {
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 5;
  height: 4.5rem;
  background-color: #000;

  @media (min-width: $breakpoint-large) {
    top: 0;
    right: auto;
    width: 10rem;
    height: 100%;
    border-right: 1px solid $secondary-color;
  }

  ul {
    display: flex;
    height: 100%;

    @media (min-width: $breakpoint-large) {
      flex-direction: column;
    }

    li {
      flex: 1 1 auto;
      height: 100%;

      @media (min-width: $breakpoint-large) {
        flex: 0 1 auto;
        height: 10rem;
      }
    }
  }

  button {
    padding: 0;
    margin: 0;
    background: none;
  }

  a,
  button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    outline: 0;
    transition: all 0.2s;

    &:hover,
    &:focus {
      opacity: 0.8;
    }
  }
}
</style>

<style lang="scss" scoped>
@import '/assets/css/utilities/_variables.scss';

a.nuxt-link-active {
  &:hover,
  &:focus {
    opacity: 1;
  }

  svg{
    fill: $primary-color;
  }
}
</style>
