<template>
  <div class="chart-container" ref="chartDiv" :style="`width:100%;height:${defaultHeight}`">
  </div>
</template>
<script>
import { ref, watch, onMounted } from "vue";
import * as echarts from "echarts";
let defaultOption = {
  tooltip: { type: "item" },
  grid: { top: "10px", right: "0px", bottom: "25px" },
  xAxis: { type: 'category', axisLabel: { interval: false }, axisTick: { show: false }, axisLine: { show: false }, label: { itemStyle: { color: "#67676a" } } },
  yAxis: { type: 'value', splitLine: { show: true, lineStyle: { type: 'dotted' } } },
  series: []
}
let color = ["#3bb89f", "#ff9800", "#f44336", "#0a00d4", "#00bcd4", "#ff6600", "#cb5380"]
export default {
  props: {
    type: { type: String, default: null },
    height: { type: Number }
  },
  setup(props) {
    const chartDiv = ref(null);
    const curveType = ref("line");
    const defaultHeight = ref(props.height?(props.height+"px"):"300px")
    watch(() => props.type, (val) => {
      curveType.value = val;
    }, { immediate: true })
    function refresh(data) {
      let series = [];
      if (curveType.value == "line") setLineSeries(series, data)
      if (curveType.value == "pie") setPieSeries(series, data)
      let option = Object.assign({}, defaultOption);
      option.series = series;
      buildOption(option)
    }
    function setPieSeries(series, data) {
      let curve = {
        data: JSON.parse(JSON.stringify(data)),
        type: 'pie',
        color: color,
        center: ["50%", "50%"],
        radius: ['50%', '88%'],
        labelLine: {
          show: false
        },
        label: {
          show: false,
          position: 'center'
        },
      }
      series.push(curve)
      return series
    }
    function setLineSeries(series, data) {
      data.forEach((item, i) => {
        let curve = {
          data: JSON.parse(JSON.stringify(item)),
          type: 'line',
          itemStyle: {
            color: color[i]
          },
          lineStyle: {
            shadowBlur: 12,
            shadowColor: color[i],
            shadowOffsetY: 16
          }
        }
        series.push(curve)
      })
      return series
    }
    function buildOption(option) {
      let chart = getChartObj()
      if (!chart) return
      chart.clear()
      chart.setOption(option)
    }
    function getChartObj() {
      let dom = chartDiv.value;
      if (!dom) return;
      let chart = echarts.getInstanceByDom(dom);
      if (chart == null) chart = echarts.init(dom);
      window.addEventListener("resize", function () {
        chart.resize();
      })
      return chart;
    }
    onMounted(() => {
      getChartObj();
    })
    return {
      defaultHeight,
      chartDiv,
      refresh
    }
  }
}
</script>