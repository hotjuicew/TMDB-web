<template>
  <transition name="modal" appear>
    <div
      ref="modal"
      class="modal"
      tabindex="-1"
      aria-hidden="false"
      :aria-label="label"
      role="dialog"
      
      @click="close">
      <div class="modal__wrap">
        <div
          class="modal__body"
          @click.stop>
          <button
            class="modal__close"
            aria-label="Close"
            type="button"
            @click.stop="close">
            <!-- eslint-disable-next-line -->
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15"><g fill="none" stroke="#fff" stroke-linecap="round" stroke-miterlimit="10" stroke-width="1.5"><path d="M.75.75l13.5 13.5M14.25.75L.75 14.25"/></g></svg>
          </button>

          <div >
            <iframe
              v-if="type === 'iframe' && activeItem"
              :src="activeItem.src"
              frameborder="0"
              allow="autoplay; encrypted-media"
              allowfullscreen />

            <img
              v-if="type === 'image' && activeItem"
              v-lazyload="activeItem.src"
              class="lazyload"
              alt="">
          </div>

          <div
            v-if="showNav"
            class="modal__nav">
            <button
              class="modal__arrow modal__arrow--prev"
              aria-label="Previous"
              type="button"
              @click.stop="previous">
              <!-- eslint-disable-next-line -->
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="none" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="M17.9 23.2L6.1 12 17.9.8"></path></svg>
            </button>

            <div class="modal__count">
              {{ selected + 1 }} / {{ data.length }}
            </div>

            <button
              class="modal__arrow modal__arrow--next"
              aria-label="Next"
              type="button"
              title="Next"
              @click.stop="next">
              <!-- eslint-disable-next-line -->
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="none" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="M6.1 23.2L17.9 12 6.1.8"></path></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { debounce } from '~/mixins/Functions';

let focusedElBeforeOpen;
let focusableEls;
let firstFocusableEl;
let lastFocusableEl;

export default {
  props: {
    data: {
      type: Array,
      required: false,
      default: function () {
        return [];
      },
    },

    type: {
      type: String,
      required: false,
      default: 'image',
    },

    modifier: {
      type: String,
      required: false,
      default: '',
    },

    nav: {
      type: Boolean,
      required: false,
      default: false,
    },

    startAt: {
      type: Number,
      required: false,
      default: 0,
    },

    ariaLabel: {
      type: String,
      required: false,
      default: '',
    },
  },

  head () {
    return {
      bodyAttrs: {
        class: 'modal-open',
      },
    };
  },

  data () {
    return {
      selected: null,
      activeItem: null,
    };
  },

  computed: {
    modalClass () {
      return {
        'modal--nav': this.showNav,
        [`modal--${this.type}`]: true,
        [this.modifier]: true,
      };
    },

    showNav () {
      return this.nav && this.data.length > 1;
    },

    label () {
      if (this.ariaLabel) {
        return this.ariaLabel;
      } else if (this.activeItem && this.activeItem.name) {
        return this.activeItem.name;
      } else {
        return null;
      }
    },
  },

  watch: {
    selected () {
      this.activeItem = this.data[this.selected];
    },
  },

  created () {
    this.selected = this.startAt;
  },

  beforeMount () {
    window.addEventListener('keydown', this.handleKeyDown);
    focusedElBeforeOpen = document.activeElement;
  },

  mounted () {
    focusableEls = this.$refs.modal.querySelectorAll('a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex="0"]');
    focusableEls = Array.prototype.slice.call(focusableEls);

    firstFocusableEl = focusableEls[0];
    lastFocusableEl = focusableEls[focusableEls.length - 1];

    // focus on the first element
    firstFocusableEl.focus();

    // calculate iframe size for responsive sizing on resize
    if (this.type === 'iframe') {
      this.handleIframeSize();
      window.addEventListener('resize', this.resizeIframeSize);
    }
  },

  beforeDestroy () {
    window.removeEventListener('keydown', this.handleKeyDown);

    if (this.type === 'iframe') {
      window.removeEventListener('resize', this.resizeIframeSize);
    }

    if (focusedElBeforeOpen) {
      focusedElBeforeOpen.focus();
    }
  },

  methods: {
    previous () {
      this.selected = ((this.selected - 1) + this.data.length) % this.data.length;
    },

    next () {
      this.selected = (this.selected + 1) % this.data.length;
    },

    close () {
      this.$emit('close');
    },

    handleKeyDown (e) {
      if (e.keyCode === 27) { // esc key
        this.close();
      } else if (this.nav && e.keyCode === 39) { // right arrow
        this.next();
      } else if (this.nav && e.keyCode === 37) { // left arrow
        this.previous();
      } else if (e.keyCode === 9) { // tab
        if (focusableEls.length === 1) {
          e.preventDefault();
          return;
        }

        if (e.shiftKey) {
          this.handleBackwardTab(e);
        } else {
          this.handleForwardTab(e);
        }
      }
    },

    handleForwardTab (e) {
      if (document.activeElement === lastFocusableEl) {
        e.preventDefault();
        firstFocusableEl.focus();
      }
    },

    handleBackwardTab (e) {
      if (document.activeElement === firstFocusableEl) {
        e.preventDefault();
        lastFocusableEl.focus();
      }
    },

    handleIframeSize () {
      const aspectRatio = 16 / 9;
      const styles = getComputedStyle(this.$refs.modal);
      let maxWidth = this.$refs.modal.offsetWidth;
      let maxHeight = this.$refs.modal.offsetHeight;
      let width;
      let height;

      maxWidth -= parseFloat(styles.paddingRight) + parseFloat(styles.paddingLeft);
      maxHeight -= parseFloat(styles.paddingTop) + parseFloat(styles.paddingBottom);

      width = maxWidth;
      height = maxHeight;

      if (maxHeight > maxWidth / aspectRatio) {
        height = maxWidth / aspectRatio;
      } else if (maxWidth > maxHeight * aspectRatio) {
        width = maxHeight * aspectRatio;
      }

      this.$refs.modal.querySelector('.modal__iframe').style.width = `${width}px`;
      this.$refs.modal.querySelector('.modal__iframe').style.height = `${height}px`;
    },

    resizeIframeSize: debounce(function () {
      this.handleIframeSize();
    }, 600),
  },
};
</script>

<style>
</style>