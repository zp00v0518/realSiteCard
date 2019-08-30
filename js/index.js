const Popup = Vue.component('app-popup', {
  name: 'Popup',
  props: {
    info: { type: Object, default: () => {} },
    isTouch: { type: Boolean, default: false }
  },
  template: `<section class="popup__wrap" :style="styles">
  <h4 class="popup__header">{{info.header}}</h4>
  <div class="popup__tex">
    <span class="popup__tex--title">Texнологии:</span>
    <span class="popup__tex--list">{{info.tex}}</span>
  </div>
  <div class="popup__tex features">
    <span class="popup__tex--title">Особенности:</span>
    <ul class="popup__tex--list features">
      <li v-for="(value, index) in info.features" :key="index">{{value}}</li>
    </ul>
  </div>
  </section>`,
  data() {
    return {
      styles: {}
    };
  },
  methods: {
    getStyles() {
      const parentEl = this.$parent.$el;
      const parentStyles = parentEl.getBoundingClientRect();
      if (this.isTouch) {
        const div = document.querySelector('.info');
        const divStyles = div.getBoundingClientRect();
        const styles = {
          left: '50%',
          top: divStyles.top + 'px',
          maxHeight: divStyles.top - 20 + 'px',
          transform: 'translateX(-50%) translateY(-100%)'
        };
        this.styles = styles;
        return styles;
      }
      const styles = {
        left: parentStyles.left + parentStyles.width / 2 + 'px',
        top: parentStyles.top + 'px'
      };
      this.styles = styles;
      return styles;
    }
  },
  mounted() {
    this.$nextTick(() => {
      const el = this.$root.$el;
      el.appendChild(this.$el);
      this.getStyles();
    });
  }
});

const liItem = Vue.component('app-li', {
  name: 'liItem',
  components: { Popup },
  props: {
    item: { type: Object, default: () => {} },
    id: { type: String, default: '' }
  },
  template: `<li 
                class="projects__item" 
                @mouseenter="showPopup" 
                @mouseleave="closePopup"
                @touchstart="handlerTouch">
              <a
                :href="item.href"
                target="blank"
                :class="['icon', id]"
              ></a>
              <app-popup v-if="isShowPopup" :info="item.info" :isTouch="isTouch"/>
            </li>`,
  data() {
    return {
      isShowPopup: false,
      isTouch: false,
      mouseevent: null
    };
  },
  methods: {
    showPopup(e) {
      this.isShowPopup = true;
    },
    closePopup(e) {
      this.isShowPopup = false;
      this.isTouch = false;
    },
    handlerTouch(event) {
      if (!this.isTouch) {
        this.isTouch = true;
        this.showPopup();
        event.preventDefault();
        document.addEventListener('click', this.closePopup);
        return;
      }
      this.isTouch = false;
      this.closePopup();
      document.removeEventListener('click', this.closePopup);
    }
  },
});

new Vue({
  el: '#bodyWrap',
  components: { liItem },
  data() {
    return {
      appData
    };
  }
});
