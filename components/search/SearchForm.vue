<template>
  <div :class="$style.form">
    <form
      autocomplete="off"
      @submit.prevent>
      <label
        class="visuallyhidden"
        for="search">Search</label>

      <div :class="$style.field">
        <input
          id="search"
          ref="input"
          v-model.trim="query"
          name="search"
          type="text"
          :placeholder=content
          @keyup.enter="goToRoute"
          @blur="unFocus">

        <button
          v-if="showButton"
          type="button"
          aria-label="Close"
          @click="goBack">
          <!-- eslint-disable-next-line -->
          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15">
            <g fill="none" stroke="#fff" stroke-linecap="round" stroke-miterlimit="10" stroke-width="1.5">
              <path d="M.75.75l13.5 13.5M14.25.75L.75 14.25" />
            </g>
          </svg>
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      query: this.$route.query.q ? this.$route.query.q : ""
    };
  },
  computed: {
    showButton() {
      return this.$route.name === "search";
    },

    ...mapState("search", [
      "fromPage", "placeholders"
    ]),
    content() {
      switch (this.$route.name) {
        case "index-zh":
        case "search-zh":
          return this.placeholders.zh.index;
        case "index-en":
        case "index-search-en":
          return this.placeholders.en.index;
        case "tv-zh":
        case "tv-search-zh":
          return this.placeholders.zh.tv;
        case "tv-en":
        case "tv-search-en":
          return this.placeholders.en.tv;
        case "movie-zh":
        case "movie-search-zh":
          return this.placeholders.zh.movie;
        case "movie-en":
        case "movie-search-en":
          return this.placeholders.en.movie;
        case "person-zh":
        case "person-search-zh":
          return this.placeholders.person;
        case "person-en":
        case "person-search-en":
          return this.placeholders.zh.person;
        default :
          return this.placeholders.en.index;
      }
    }
  },

  mounted() {
    this.$refs.input.focus();
    this.$store.commit("search/setSearchType", this.$route.name);// 标定当前页面
  },

  methods: {
    goToRoute() {
      if (this.query) {
        if (this.$route.path.toString().endsWith("search")) {
          this.$nextTick(() => {
            this.$router.push({
              query: { q: this.query }
            });
          })

          console.log(this.query);
        } else if (this.$route.path === "/") {
          this.$router.push({
            name: "search",
            query: { q: this.query }
          });
        } else {
          this.$router.push({
            path: this.$route.path + "/search",
            query: { q: this.query }
          });
        }


      } else {
        this.$router.push({
          path: this.$route.path
        });
      }
    },

    goBack() {
      this.query = "";
      this.$router.push({
        path: this.fromPage
      });
    },

    unFocus(e) {
      console.log(this.$route.name, "hasuhoahsdus");
      if (this.$route.name !== "search-zh" && this.$route.name !== "search-en") {
        const target = e.relatedTarget;

        if (!target || !target.classList.contains("search-toggle")) {
          console.log('close');
          this.query = "";
          this.$store.commit("search/closeSearch");
        }
      }
    }
  }
};
</script>

<style lang="scss" module>
@import '/assets/css/utilities/_variables.scss';

.form {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 10;

  @media (min-width: $breakpoint-large) {
    left: 10rem;
  }

  input[type='text'] {
    flex: 1;
    height: 6rem;
    padding: 2.1rem 1.5rem;
    font-size: 1.6rem;
    color: #fff;
    background: none;
    border: 0;
    outline: 0;

    @media (min-width: $breakpoint-large) {
      height: 8rem;
      padding: 3.1rem 5rem;
    }
  }

  button {
    display: flex;
    align-items: center;
    padding: 0 1.5rem;
    background: none;

    @media (min-width: $breakpoint-large) {
      padding: 0 5rem;
    }
  }
}

.field {
  display: flex;
  background-color: $secondary-color;
}
</style>
