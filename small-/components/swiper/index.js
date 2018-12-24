import { VantComponent } from '../vant/common/component'
import { transition } from '../vant/mixins/transition'
VantComponent({
  mixins: [transition(true)],
  props: {
    list: {
      type: Array,
      value: []
    },
    indicatorDots: {
      type: Boolean,
      value: true
    },
    indicatorActiveColor: {
      type: String,
      value: '#f60'
    },
    indicatorColor: {
      type: String,
      value: '#fff'
    },
    autoplay: {
      type: Boolean,
      value: true
    },
    interval: {
      type: Number,
      value: 3800
    },
    duration: {
      type: Number,
      value: 1000
    },
    circular: {
      type: Boolean,
      value: true
    },
    height: {
      type: Number,
      value: 350
    }
  },
  data: {
    imgheights: []
  },
  methods: {
    imageLoad (e) {
      // const imgwidth = e.detail.width
      // const imgheight = e.detail.height
      // const ratio = imgwidth / imgheight
      // const imgheights = this.data.imgheights

      // imgheights[e.target.dataset.id] = 750 / ratio
      // this.setData({
      //   imgheights: imgheights
      // })
    },
    onSwiperTap (e) {
      this.$emit('swiperTap', { id: e.target.dataset.id })
    },
    bindchange (e) {
      this.$emit('swiperChange', { id: e.target.dataset.id })
    }
  }
})
