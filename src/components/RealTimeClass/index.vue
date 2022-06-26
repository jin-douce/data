<template>
  <div class="real-time">
    <div class="title-wrapper">
      <div class="title">
        <span class="icon-1"></span>
        实时分类状态
      </div>
      <div class="right">
        <div class="sub-title">最后更新时间：{{date}} {{time}}</div>
      </div>
    </div>
    <div class="chart">
      <div id="chart1" />
      <div id="chart2" />
    </div>
  </div>
</template>

<script>
  import * as Echarts from 'echarts'
  import { onMounted, watch } from 'vue'
  import { clock as useClock } from '../../utils/clock'

  export default {
    name: 'realTimeClass',
    props: {
      data: Object
    },
    setup(props) {
      const { time, date } = useClock()
      let chart1, chart2
      
      // let currentChart = 0
      const update = () => {
        let keys = Object.keys(props.data)
        let xData = []
        let yData = []
  
        for (let i = 1; i < keys.length; i++) {
          xData.push(keys[i])
          yData.push(props.data[keys[i]].split(' ')[0])
        }

        function createOption() {
          return {
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'shadow'
              }
            },
            color: ['rgb(66,166,241)', 'rgba(65,65,65,.5)'],
            grid: {
              left: 40,
              right: 0,
              bottom: 40,
              top: 80
            },
            // dataset: {
            //   source
            // },
            title: {
              text: '设备流量',
              textStyle: {
                color: 'rgb(190, 222, 248)',
                fontSize: '28'
              }
            },
            yAxis: {
              type: 'value',
              splitLine: {
                lineStyle: {
                  type: 'dotted',
                  width: 2,
                  opacity: 0.5
                }
              },
              axisLine: {
                onZero: false,
                lineStyle: {
                  color: 'rgb(124,136,146)'
                }
              },
              axisLabel: {
                color: 'white',
                fontSize: 22
              },
              axisTick: { show: false }
            },
            xAxis: {
              data: ['设备1', '设备2', '设备3', '设备4', '设备5', '设备6', '设备7', '设备8'],
              type: 'category',
              splitLine: { show: false },
              axisTick: { show: false },
              axisLabel: {
                color: 'white',
                fontSize: 24,
                margin: 18
              },
              axisLine: {
                onZero: false,
                lineStyle: {
                  color: 'rgb(124,136,146)'
                }
              }
            },
            series: [
              {
                data: yData,
                type: 'bar',
                stack: 'total',
                barWidth: 40
              },
              {
                type: 'bar',
                stack: 'total'
              }
            ]
          }
        }
        if (!chart1) {
          chart1 = Echarts.init(document.getElementById('chart1'))
          chart2 = Echarts.init(document.getElementById('chart2'))
        }
        const opt = createOption()
        chart1.setOption(opt)
        opt.color = ['rgb(144,5,248)', 'rgba(65,65,65,.5)']
        opt.title.text = '应用流量'
        opt.xAxis.data = ['app1', 'app2', 'app3', 'app4', 'app5', 'app6', 'app7', 'app8']
        chart2.setOption(opt)
        // currentChart === 0 ? currentChart = 1 : currentChart = 0
      }



      watch(() => props.data, () => {
        update()
      })
      return {
        time,
        date
      }
    }
  }
</script>

<style lang="scss" scoped>
  .real-time {
    width: 100%;
    height: 100%;
    padding: 20px 20px;
    box-sizing: border-box;
    border: 1px solid rgba(52, 204, 241, .8);

    .title-wrapper {
      display: flex;
      margin-top: 20px;

      .right {
        flex: 1;
        text-align: right;
      }

      .title {
        font-size: 36px;
        font-weight: bold;
        color: rgb(168, 229, 248);
      }

      .sub-title {
        font-size: 28px;
        margin-top: 10px;
        color: rgb(190, 222, 248);

      }
    }

    .chart {
      height: 800px;
      background: rgb(14, 19, 51);
      padding: 10px 20px;
      margin-top: 20px;

      #chart1 {
        height: 350px;
        margin-top: 20px;
      }
      #chart2 {
        height: 350px;
        margin-top: 50px;
      }
    }
  }
</style>
