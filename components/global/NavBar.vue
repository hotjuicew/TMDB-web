<template>
  <nav :class="$style.nav">
    <ul class="list">
      <li>
        <nuxt-link
          exact
          :to="{ name: `index-${this.$i18n.locale}`}"
        >
          <svg t="1670584035422" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
               p-id="2342" width="30" height="30">
            <path
              d="M149.333333 960a85.333333 85.333333 0 0 1-85.333333-85.333333V331.221333a85.333333 85.333333 0 0 1 48.64-77.056l362.666667-172.693333a85.333333 85.333333 0 0 1 73.386666 0l362.666667 172.693333A85.333333 85.333333 0 0 1 960 331.221333V874.666667a85.333333 85.333333 0 0 1-85.333333 85.333333H149.333333zM505.386667 138.24l-2.56 1.024-362.666667 172.693333a21.333333 21.333333 0 0 0-11.989333 16.554667L128 331.221333V874.666667a21.333333 21.333333 0 0 0 18.837333 21.184L149.333333 896h192V661.333333a85.333333 85.333333 0 0 1 85.333334-85.333333h170.666666a85.333333 85.333333 0 0 1 85.333334 85.333333v234.666667h192a21.333333 21.333333 0 0 0 21.184-18.837333L896 874.666667V331.221333a21.333333 21.333333 0 0 0-9.792-17.941333l-2.368-1.322667-362.666667-172.693333a21.333333 21.333333 0 0 0-15.786666-1.024zM597.333333 640h-170.666666a21.333333 21.333333 0 0 0-21.184 18.837333L405.333333 661.333333v234.666667h213.333334V661.333333a21.333333 21.333333 0 0 0-18.837334-21.184L597.333333 640z"
              fill="#fff" p-id="2343"></path>
          </svg>
        </nuxt-link>
      </li>
      <li>
        <nuxt-link
          :to="{ name: `movie-${this.$i18n.locale}` }"
        >
          <svg t="1670583104183" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
               p-id="2703" width="32" height="32">
            <path
              d="M512 42.667C771.2 42.667 981.333 252.8 981.333 512A467.84 467.84 0 0 1 845.27 842.453l-2.858 2.838-5.824 5.674a8.533 8.533 0 0 1-5.931 2.39h-85.973a4.267 4.267 0 0 1-2.39-7.787c2.198-1.493 4.054-2.816 5.611-3.904C850.496 768.107 917.334 647.851 917.334 512c0-223.85-181.483-405.333-405.334-405.333S106.667 288.149 106.667 512 288.149 917.333 512 917.333h418.133c4.694 0 8.534 3.84 8.534 8.534V972.8a8.533 8.533 0 0 1-8.534 8.533h-409.6l-0.81-0.064-7.723 0.064C252.8 981.333 42.667 771.2 42.667 512S252.8 42.667 512 42.667z m0 576A106.667 106.667 0 1 1 512 832a106.667 106.667 0 0 1 0-213.333z m0 64A42.667 42.667 0 1 0 512 768a42.667 42.667 0 0 0 0-85.333zM298.667 405.333a106.667 106.667 0 1 1 0 213.334 106.667 106.667 0 0 1 0-213.334z m426.666 0a106.667 106.667 0 1 1 0 213.334 106.667 106.667 0 0 1 0-213.334z m-426.666 64a42.667 42.667 0 1 0 0 85.334 42.667 42.667 0 0 0 0-85.334z m426.666 0a42.667 42.667 0 1 0 0 85.334 42.667 42.667 0 0 0 0-85.334zM512 192a106.667 106.667 0 1 1 0 213.333A106.667 106.667 0 0 1 512 192z m0 64a42.667 42.667 0 1 0 0 85.333A42.667 42.667 0 0 0 512 256z"
              p-id="2704" fill="#fff"></path>
          </svg>
        </nuxt-link>
      </li>
      <li>
        <nuxt-link
          :to="{ name: `tv-${this.$i18n.locale}` }"
        >
          <svg t="1670583161354" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
               p-id="2906" width="30" height="30">
            <path
              d="M66.133 153.6h797.988c38.789 0 70.279 31.531 70.279 70.364v539.77l23.467-23.467H159.879c-38.789 0-70.279-31.532-70.279-70.364v-539.77L66.133 153.6z m0-46.933H42.667v563.236c0 64.74 52.489 117.297 117.212 117.297H981.333V223.964c0-64.74-52.489-117.297-117.212-117.297H66.133z"
              fill="#fff" p-id="2907"></path>
            <path
              d="M408.297 766.223l-70.4 164.266c-5.105 11.913 0.413 25.708 12.326 30.814 11.912 5.105 25.708-0.413 30.813-12.326l70.4-164.266c5.105-11.913-0.413-25.708-12.325-30.814-11.913-5.105-25.708 0.413-30.814 12.326zM587.343 848.54l82.134 105.6c7.956 10.23 22.7 12.074 32.93 4.117s12.073-22.7 4.116-32.93l-82.133-105.6c-7.957-10.231-22.7-12.074-32.93-4.117s-12.074 22.7-4.117 32.93z"
              fill="#fff" p-id="2908"></path>
            <path
              d="M242.133 974.933h563.323c12.96 0 23.466-10.506 23.466-23.466S818.416 928 805.456 928H242.133c-12.96 0-23.466 10.506-23.466 23.467 0 12.96 10.506 23.466 23.466 23.466z"
              fill="#fff" p-id="2909"></path>
          </svg>
        </nuxt-link>
      </li>
      <li>
        <nuxt-link
          :to="{ name: `person-${this.$i18n.locale}` }"
        >
          <svg t="1670582795571" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
               p-id="3173" width="32" height="32">
            <path
              d="M703.012571 534.528c87.515429 0 158.829714-77.952 158.829715-172.8 0-93.769143-70.948571-168.045714-158.829715-168.045714-87.149714 0-158.848 75.373714-158.848 168.777143 0.365714 94.482286 71.698286 172.068571 158.848 172.068571z m-423.570285 8.082286c75.739429 0 137.874286-68.022857 137.874285-151.478857 0-81.627429-61.403429-147.437714-137.874285-147.437715-75.739429 0-138.24 66.925714-137.874286 148.169143 0.365714 83.108571 62.134857 150.747429 137.874286 150.747429z m423.570285-63.597715c-53.686857 0-99.657143-51.474286-99.657142-116.553142 0-64 45.238857-113.243429 99.657142-113.243429 54.784 0 99.638857 48.530286 99.638858 112.493714 0 65.097143-45.220571 117.302857-99.638858 117.302857z m-423.570285 8.813715c-44.854857 0-83.090286-43.008-83.090286-95.963429 0-51.84 37.851429-93.385143 83.090286-93.385143 46.317714 0 83.456 40.813714 83.456 92.653715 0 53.686857-38.235429 96.694857-83.456 96.694857zM75.008 879.780571h288.64c-17.664-9.929143-31.268571-32-28.690286-54.418285H65.828571c-7.350857 0-11.026286-2.925714-11.026285-9.929143 0-91.172571 104.045714-176.475429 224.292571-176.475429 46.317714 0 87.862857 11.026286 123.538286 31.981715a191.323429 191.323429 0 0 1 41.545143-38.966858c-47.433143-31.268571-104.411429-47.433143-165.083429-47.433142C125.019429 584.539429 0 696.301714 0 818.742857c0 40.813714 24.996571 61.037714 75.008 61.037714z m397.092571 0h461.824c61.019429 0 90.075429-18.377143 90.075429-58.825142 0-96.329143-121.709714-235.702857-320.987429-235.702858-199.661714 0-321.353143 139.373714-321.353142 235.702858 0 40.448 29.037714 58.825143 90.441142 58.825142z m-17.645714-55.515428c-9.563429 0-13.604571-2.56-13.604571-10.294857 0-60.306286 93.385143-173.165714 262.162285-173.165715 168.411429 0 261.778286 112.859429 261.778286 173.165715 0 7.716571-3.657143 10.294857-13.238857 10.294857z"
              p-id="3174" fill="#fff"></path>
          </svg>
        </nuxt-link>
      </li>
      <li>
        <button
          class="search-toggle"
          type="button"
          aria-label="Search"
          aria-haspopup="true"
          :aria-expanded="`${searchOpen}`"
          @click="toggleSearch">
          <!-- eslint-disable-next-line -->
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-miterlimit="10"><path d="M16.4 16.7l6.3 6.5"/><ellipse cx="10.5" cy="9.8" rx="9.2" ry="9.1"/></g></svg>
        </button>
      </li>
      <li>
        <select v-model="selectedLanguage" @change="changeLanguage" >
          <option value="zh">中文</option>
          <option value="en">English</option>
        </select>
      </li>
    </ul>
  </nav>
</template>
<script>
import {mapState} from 'vuex'
// eslint-disable-next-line import/named
export default {
  data() {
    return {
      selectedLanguage:  this.$i18n.locale,
    }

  },
  computed: {
    ...mapState("search", [
      "searchOpen"
    ]),
  },

  methods: {
    toggleSearch () {
      if (this.$route.name !== 'search') {
        console.log('点击');
        this.$store.commit('search/toggleSearch');
      }
    },
    changeLanguage(){
      this.$i18n.locale = this.selectedLanguage
      const path = this.$route.path
      console.log(path,'pate');
      console.log(path.replace(/^\/[^/]*/, ''));
      const query = this.$route.query
      this.$router.replace({ path: `/${this.selectedLanguage}${path.replace(/^\/[^/]*/, '')}`, query })
      this.$store.commit('SET_LOCALE', this.selectedLanguage)
      console.log(this.$store.state.locale);
    }
  },

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
  //background-color: #000;
  background-color: $base-bg;

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

      select{
        -moz-appearance: none;
        -webkit-appearance: none;
        appearance: none;
        background-image: none;
        @media (min-width: $breakpoint-large) {
          margin-left: 2px;
        }
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

  svg path{
    color: blue;
    fill: $primary-color;
  }
}
</style>
