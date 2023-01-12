<template>
  <div>
    <div :class="$style.hero">
      <div :class="$style.backdrop">
        <div :class="$style.imgCon">
          <div :class="$style.shadeLeft"> </div>
          <img
            v-if="backdrop"
            v-lazyload="backdrop"
            class="lazyload"
            :class="$style.image"
            :alt="name">
          <div :class="$style.shadeRight"> </div>
        </div>

      </div>

      <div :class="$style.pane">
        <transition
          appear
          name="hero">
          <div>
            <h1 :class="$style.name">
              <nuxt-link :to="{ name: `person-id-zh`, params: { id: item.id } }">
                {{ name }}
              </nuxt-link>
            </h1>

            <div :class="$style.meta">

              <div :class="$style.info">
                <span v-if="item.known_for_department">known for: {{ item.known_for_department }}</span>
                <span v-if="item.birthday">Born: {{ item.birthday }}</span>
                <span v-if="item.place_of_birth">Place of Birth: {{ item.place_of_birth }}</span>
              </div>
            </div>
            <div :class="$style.desc">
              {{ item.biography | truncate(200) }}
            </div>
          </div>
        </transition>
      </div>
    </div>


  </div>
</template>

<script>
import { name, stars, yearStart, cert, backdrop, trailer } from '~/mixins/Details';

export default {
  mixins: [
    name,
    stars,
    yearStart,
    cert,
    backdrop,
    trailer,
  ],

  props: {
    item: {
      type: Object,
      required: true,
    },
  },

  data () {
    return {
      isSingle: this.item.id === this.$route.params.id,
      modalVisible: false,
    };
  },

  methods: {
    openModal () {
      this.modalVisible = true;
    },

    closeModal () {
      this.modalVisible = false;
    },
  },
};
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

.backdrop {
  position: relative;
  display: flex;
  flex: 1 1 auto;
  min-height: 0;
  //min-height: 0;
  //padding-left: 10vw;
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
    background-image: linear-gradient(to top, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.1) 30%, rgba(0, 0, 0, 0.1) 100%);

  }

  > div {
    width: 100%;

    @media (min-width: $breakpoint-medium) {
      display: inline;
    }
  }
}

.image {
  display: inline-block;
  max-width: none;
  height: 100%;

  @media (max-width: $breakpoint-medium - 1) {
    width: 100%;
    object-fit: cover;
  }
}
@media (min-width: $breakpoint-large){
  .imgCon{
    text-align: center;
    position: relative;
    top: -50%;
    left:5vw
  }
  .shadeLeft{
    display: inline-block;
    position: relative;
    top: 50%;
    left: 20vw;
    height: 100%;
    width: 20vw;
    background-image: linear-gradient(to right , #000 0, transparent 50%, transparent 100%);
  }
  .shadeRight{
    display: inline-block;
    position: relative;
    left: -20vw;
    top: 50%;
    height: 100%;
    width: 20vw;
    background-image: linear-gradient(to left , #000 0, transparent 50%, transparent 100%);
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

.name {
  margin: 0 0 1.4rem;
  font-size: 2.8rem;
  line-height: 1.1;
  color: #fff;
  letter-spacing: $letter-spacing;

  @media (min-width: $breakpoint-small) {
    margin-bottom: 1.8rem;
  }

  @media (min-width: $breakpoint-large) {
    font-size: 2.4vw;
  }
}

.meta {
  font-size: 1.4rem;

  @media (min-width: $breakpoint-small) {
    display: flex;
  }

  @media (min-width: 1650px) {
    font-size: 0.9vw;
  }
}



.info {
  display: flex;
  flex-direction: column;
  align-items: self-start;

  span {
    margin-right: 0.9rem;
  }
}

.desc {
  display: block;
  margin-top: 2.5rem;
  font-size: 1.5rem;
  color: #fff;

  @media (max-width: $breakpoint-small - 1) {
    display: none;
  }

  @media (min-width: 1650px) {
    font-size: 0.9vw;
  }
}

</style>

<style lang="scss">
.hero-enter-active,
.hero-leave-active {
  transition: transform .75s cubic-bezier(.4, .25, .3, 1), opacity .3s cubic-bezier(.4, .25, .3, 1);
}

.hero-enter,
.hero-leave-to {
  opacity: 0;
  transform: translate3d(0, 2rem, 0);
}

.hero-enter-to,
.hero-leave {
  opacity: 1;
  transform: translateZ(0);
}
</style>
