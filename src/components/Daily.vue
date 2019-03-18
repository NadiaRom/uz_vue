<template>
  <figure id="daily">
    <h3>Кількість пасажирів на добу в 2014 році</h3>
    <p class="axis_lab"><span class="arr">приїхали</span> <span class="dep">поїхали</span></p>
    <svg ref="svg">
      
      <g class="y_axis ax_dep"
        v-axis:dep="scale">
      </g>
      <g class="y_axis ax_arr"
        v-axis:arr="scale">
      </g>

      <g class="x_axis"
        v-axis:x="scale"
        :transform="`translate(0, ${fs})`">
      </g>

      <path v-bind:d="arrPath"
        class="arr"/>

      <path v-bind:d="depPath"
        class="dep"/>
    </svg>
  </figure>
</template>

<script>
import { mapGetters } from 'vuex';
// import * as d3 from 'd3';

const fs = parseFloat(window.getComputedStyle(document.body).getPropertyValue('font-size'));

export default {
  name: 'Daily',
  data() {
    return {
      svgH: 0,
      svgW: 0,
      fs: fs,
      windowSize: [window.innerWidth, window.innerHeight],
      arrD: d3.area()
        .x(d => d.x)
        .y0(d => d.aY0)
        .y1(d => d.aY1)
        .curve(d3.curveStep),
      depD: d3.area()
        .x(d => d.x)
        .y0(d => d.dY0)
        .y1(d => d.dY1)
        .curve(d3.curveStep),
    }
  },

  computed: {
    ...mapGetters([
      'currentStation',
      'maxDaily',
    ]),

    scale: function() {
      let x = d3.scaleTime()
        .domain([new Date('2014-01-01'), new Date('2014-12-31')])
        .range([0, this.svgW]);

      let arr = d3.scaleLinear()
        .domain([0, this.maxDaily])
        .range([this.svgH / 2, this.fs]);

      let dep = d3.scaleLinear()
        .domain([0, this.maxDaily])
        .range([this.svgH / 2, this.svgH - this.fs]);

      return { x, arr, dep };
    },

    timeFormat: function() {
      const locale = d3.timeFormatLocale({
        "decimal": ",",
        "thousands": "\u00A0",
        "grouping": [3],
        "currency": ["", " грн"],
        "dateTime": "%A, %e %B %Y р. %X",
        "date": "%d.%m.%Y",
        "time": "%H:%M:%S",
        "periods": ["AM", "PM"],
        "days": ["неділя", "понеділок", "вівторок", "середа", "четвер", "п'ятниця", "субота"],
        "shortDays": ["нд", "пн", "вт", "ср", "чт", "пт", "сб"],
        "months": ["січень", "лютий", "березень", "квітень", "травень", "червень", "липень", "серпень", "вересень", "жовтень", "листопад", "грудень"],
        "shortMonths": ["січ", "лют", "бер", "кві", "тра", "чер", "лип", "сер", "вер", "жов", "лис", "гру"]
      });

      const fMonth = locale.format("%b");

      return { fMonth };
    },

    stationScaled: function() {
      const that = this;
      return this.currentStation.daily
        .map(d => {
          return {
            x: that.scale.x(new Date(d.date)),
            aY0: that.scale.arr(0),
            dY0: that.scale.dep(0),
            aY1: that.scale.arr(d.arrival),
            dY1: that.scale.dep(d.departure),
          };
        })
        .sort((a, b) => (a.x < b.x) ? -1 : 1);
    },

    arrPath: function() {
      return this.arrD(this.stationScaled);
    },

    depPath: function() {
      return this.depD(this.stationScaled);
    },
  },

  watch: {
    windowSize: function() {
      this.setSvgDims();
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
            .ticks(d3.timeMonth)
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" scoped>
@import '@/assets/scss/daily.scss';
</style>
