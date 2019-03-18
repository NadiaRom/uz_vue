<template>
  <figure id="weekday">
    <h3>Кількість пасажирів на день тижня</h3>
    <p></p>
    <svg ref="svg"></svg>
  </figure>
</template>

<script>
import { mapGetters } from 'vuex';

const fs = parseFloat(window.getComputedStyle(document.body).getPropertyValue('font-size'));
export default {
  name: 'Weekday',
  data() {
    return {
      svgH: 0,
      svgW: 0,
      fs: fs,
      windowSize: [window.innerWidth, window.innerHeight],
    };
  },

  computed: {
    ...mapGetters([
      'currentStation',
      'maxWeekday',
    ]),

    scale: function() {
      let x = d3.scaleBand()
        .domain([1, 2, 3, 4, 5, 6, 7])
        .range([fs*2, this.svgW]);

      let arr = d3.scaleLinear()
        .domain([0, this.maxWeekday])
        .range([this.svgH / 2, this.fs]);

      let dep = d3.scaleLinear()
        .domain([0, this.maxDaily])
        .range([this.svgH / 2, this.svgH - this.fs]);

      return { x, arr, dep };
    },
  },

  mounted() {
    this.setSvgDims();
  },
  methods: {
    setSvgDims() {
      this.svgW = this.$refs.svg.clientWidth || this.$refs.svg.offsetWidth;
      this.svgH = this.$refs.svg.clientHeight || this.$refs.svg.offsetHeight;
    },
  },

  directives: {
    axis(el, binding, vnode) {
      const axis = binding.arg;
      const axisMethod = { x: 'axisBottom', arr: 'axisLeft', dep: 'axisLeft' }[axis];
      const methodArg = binding.value[axis];
      const g = d3.select(el);

      if (axis !== 'x') {
        g.call(
          d3[axisMethod](methodArg)
            .ticks(3)
        );

        g.selectAll('line')
          .attr('x1', vnode.context.svgW)
          .attr('stroke', null);

        g.selectAll('path')
          .remove();

      } else {
        g.call(
          d3[axisMethod](methodArg)
            .ticks(7)
            .tickFormat(vnode.context.timeFormat.fMonth)
        );

        g.selectAll('path')
          .remove();

        g.selectAll('text')
          .attr('y', null)
          .attr('dy', null)

        g.selectAll('line')
          .attr('y1', 3)
          .attr('y2', vnode.context.svgH - vnode.context.fs * 2 - 3)
      }

      
    },
  },


}
</script>

<style scoped lang="scss" scoped>
@import '@/assets/scss/weekday.scss';
</style>