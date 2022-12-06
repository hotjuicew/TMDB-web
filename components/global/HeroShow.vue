<template>
  <div :class="$style.hero">
    <div :class="$style.backPic">pic</div>
    <div :class="$style.pane">
      <transition
        appear
        name="hero">
        <div>
          <h1 :class="$style.name">

          </h1>

          <div :class="$style.meta">
            <div>
            </div>

            <div :class="$style.info">

            </div>
          </div>

          <div :class="$style.desc">
          </div>

          <button>
            <!-- eslint-disable-next-line -->
            <span class="icon"><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="#fff"><path d="M3 22v-20l18 10-18 10z"/></svg></span>
            <span class="txt">Watch Trailer</span>
          </button>
        </div>
      </transition>

    </div>
  </div>
</template>
<script>
export default {
  components: {

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

<style lang="scss" module>
@import '/assets/css/utilities/_variables.scss';

.hero {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 35rem;
  color: #999;
  background-color: #000;

  @media (min-width: $breakpoint-xsmall) {
    height: 50rem;
  }

  @media (min-width: $breakpoint-medium) {
    position: relative;
    display: block;
    height: 0;
    padding-bottom: 40%;
  }


}
.backPic {
  position: relative;
  display: flex;
  flex: 1 1 auto;
  min-height: 0;

  @media (min-width: $breakpoint-medium) {
    position: absolute;
    top: 0;
    right: 0;
    display: block;
    width: 71.1%;
    height: 100%;
  }

  &::after {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: block;
    content: '';
    background-image: linear-gradient(to top, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.1) 50%, rgba(0, 0, 0, 0.1) 100%);

    @media (min-width: $breakpoint-medium) {
      background-image: linear-gradient(to right, #000 0, transparent 50%, transparent 100%);
    }
  }

  > div {
    width: 100%;

    @media (min-width: $breakpoint-medium) {
      display: inline;
    }
  }
}
.pane {
  padding: 0 1.5rem 1.5rem;

  @media (min-width: $breakpoint-small) {
    padding: 0 4rem 4rem;
  }

  @media (min-width: $breakpoint-medium) {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 1;
    display: flex;
    align-items: center;
    width: 55%;
    height: 100%;
    padding: 5rem 4rem;
  }

  @media (min-width: $breakpoint-large) {
    padding-right: 5rem;
    padding-left: 5rem;
  }

  @media (min-width: $breakpoint-xlarge) {
    width: 43%;
  }
}
</style>
