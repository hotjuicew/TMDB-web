import Vue from 'vue';

/**
 * 加载图像时调用
 */
const imageLoaded = function (e) {
  e.target.parentElement.classList.remove('lazyerror', 'lazyloading');
  e.target.parentElement.classList.add('lazyloaded');
};

/**
 * 发生error时调用
 */
const imageError = function (e) {
  e.target.parentElement.classList.remove('lazyloaded', 'lazyloading');
  e.target.parentElement.classList.add('lazyerror');
};

/**
 * 加载图像
 */
const loadImage = function (el, path) {
  // setup loading state
  el.parentElement.classList.remove('lazyerror', 'lazyloaded');
  el.parentElement.classList.add('lazyloading');

  // 加载成功
  el.addEventListener('load', imageLoaded);

  // 加载失败
  el.addEventListener('error', imageError);

  // 将元素的src设置为path
  el.src = path;
};

/**
 * 自定义指令：图片懒加载
 */
Vue.directive('lazyload', {
  inserted (el, binding) {
    function handleIntersect (entries, observer) {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          /* eslint-disable-next-line */
          return;
        } else {
          loadImage(el, binding.value);
          observer.unobserve(el);
        }
      });
    }

    // 检测元素是否在视口中
    function createObserver () {
      const options = {// options 的对象，该对象用于配置 IntersectionObserver
        root: null, // 如果未指定或为 null，则默认为浏览器视口
        threshold: '0', // 当目标元素完全出现在视口中时，回调函数将被调用。
      };

      const observer = new IntersectionObserver(handleIntersect, options);// IntersectionObserver：浏览器 API，它可以检测元素是否出现在视口中
      observer.observe(el); // target element to watch
    }

    // If IntersectionObserver is not supported, fallback and just load the images
    if (!window.IntersectionObserver) {
      loadImage(el, binding.value);
    } else {
      createObserver();
    }
  },

  update (el, binding) {
    // only run if the value is different
    if (binding.value !== el.src) {
      loadImage(el, binding.value);
    }
  },
});
