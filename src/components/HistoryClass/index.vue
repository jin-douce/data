<template>
  <div class="history">
    <div class="title-wrapper">
        <div class="title">
          <span class="icon-1"></span>
          历史分类状态
        </div>
        <div :inline="true" class="time-wrapper">
          <el-date-picker
            type="datetime"
            placeholder="开始时间"
            id="picker3"
            v-model="start_time"
            >
          </el-date-picker>

          <span class="to">To</span>
          <el-date-picker
            type="datetime"
            placeholder="结束时间"
            id="picker4"
            v-model="end_time"
            >
          </el-date-picker>
          <el-button type="primary" @click="onClick">查询</el-button>
        </div>
    </div>
    <div id="history-chart" />
  </div>
</template>

<script>
  import * as Echarts from 'echarts'
  import { onMounted, ref } from 'vue'


  export default {
    name: 'historyClass',
    props: {
      data: Object
    },
    setup() {
      let start_time = ref("")
      let end_time = ref("")
      let chart
      // const defaultTime = new Date(2022, 6, 1, 12, 0, 0)
      let history_data = [], times = [], source_data = []
      // 初始值
      let _source = [
        ['time', 1656219635, 1656219695, 1656219755, 1656219815, 1656219875, 1656219935, 1656219995, 1656220055, 1656220115, 1656220175, 1656220235],
        ['设备1', 11.06, 10.26, 0, 22.09, 11.35, 20.43, 11.41, 11.67, 21.27, 11.35, 14.52],
        ['设备2', 0.91, 1, 0, 0, 0.91, 0.91, 0.97, 1.92, 1.01, 0, 0.97],
        ['设备3', 11.17, 8.73, 0, 19.33, 11.64, 8.91, 11.08, 11.37, 11.68, 9.13, 11.18],
        ['设备4', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ['设备5', 5.2, 4.53, 0, 3.46, 2.94, 1.92, 4.34, 3.1, 2.89, 3.88, 3.34],
        ['设备6', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ['设备7', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ['设备8', 1.11, 2.79, 0, 3.97, 1.19, 2.24, 1.19, 1.38, 1.19, 1.19, 1.19]
      ]

      // 点击查询后从localstorage获取数据
      const onClick = () => {
        history_data = []
        source_data = [
          ["设备1"],
          ["设备2"],
          ["设备3"],
          ["设备4"],
          ["设备5"],
          ["设备6"],
          ["设备7"],
          ["设备8"],
        ]
        times = []

        let start_key = Number(Date.parse(start_time.value).toString().slice(0, 10))
        const end_key = Number(Date.parse(end_time.value).toString().slice(0, 10))
        while(!localStorage.getItem(start_key.toString())){
          start_key++
        }
        for(let k = start_key; k <= end_key; k+=60){
          const data = JSON.parse(localStorage.getItem(k.toString()))
          if(data){
            times.push(k)
            history_data.push(data)
          }
        }
        history_data.map((item) => {
          const values = Object.values(item).filter(v => typeof v === "string")
          for(let i = 0; i < 8; i++){
            source_data[i].push(Number(values[i].split(" ")[0]))
          }
        })
        _source = [['time', ...times], ...source_data]
        console.log("source=========", _source);
        updateChart()
      }
      

      const updateChart = () => {
        function createOption() {
          return {
            legend: {
              icon: 'rect',
              textStyle: {
                fontSize: 22,
                color: '#fff'
              }
            },
            tooltip: {
              trigger: 'axis',
              showContent: false
            },
            color: [
                    '#dd6b66',
                    '#759aa0',
                    '#e69d87',
                    '#8dc1a9',
                    '#ea7e53',
                    '#eedd78',
                    '#73a373',
                    '#73b9bc',
                    '#7289ab',
                    '#91ca8c',
                    '#f49f42'
                  ],
            dataset: {
              source: _source
            },
            xAxis: {
              type: 'category',
              axisLabel: {
                color: 'white',
                fontSize: 22
              }
             },
            yAxis: {
              gridIndex: 0,
              axisLabel: {
                color: 'white',
                fontSize: 22
              }
            },
            grid: { top: '55%' },
            series: [
              {
                type: 'line',
                smooth: true,
                seriesLayoutBy: 'row',
                emphasis: { focus: 'series' }
              },
              {
                type: 'line',
                smooth: true,
                seriesLayoutBy: 'row',
                emphasis: { focus: 'series' }
              },
              {
                type: 'line',
                smooth: true,
                seriesLayoutBy: 'row',
                emphasis: { focus: 'series' }
              },
              {
                type: 'line',
                smooth: true,
                seriesLayoutBy: 'row',
                emphasis: { focus: 'series' }
              },
              {
                type: 'line',
                smooth: true,
                seriesLayoutBy: 'row',
                emphasis: { focus: 'series' }
              },
              {
                type: 'line',
                smooth: true,
                seriesLayoutBy: 'row',
                emphasis: { focus: 'series' }
              },
              {
                type: 'line',
                smooth: true,
                seriesLayoutBy: 'row',
                emphasis: { focus: 'series' }
              },
              {
                type: 'line',
                smooth: true,
                seriesLayoutBy: 'row',
                emphasis: { focus: 'series' }
              },
              {
                type: 'pie',
                id: 'pie',
                radius: '30%',
                center: ['50%', '25%'],
                emphasis: {
                  focus: 'self'
                },
                label: {
                  fontSize: 24,
                  color: '#fff'
                },
                encode: {
                  itemName: 'time',
                  value: '12',
                  tooltip: '12'
                }
              }
            ],
            roseType: 'radius'
          }
        }

        if (!chart) {
          chart = Echarts.init(document.getElementById('history-chart'))
        }
        chart.on('updateAxisPointer', function (event) {
        const xAxisInfo = event.axesInfo[0]
        if (xAxisInfo) {
          const dimension = xAxisInfo.value + 1
          chart.setOption({
            series: {
              id: 'pie',
              encode: {
                value: dimension,
                tooltip: dimension
              }
            }
          })
        }
      })
        chart.setOption(createOption())
      }
      onMounted(() => {
        updateChart()
      })
      return {
        start_time,
        end_time,
        onClick
      }
    }
  }
</script>

<style>

</style>
<style lang="scss" scoped>
  .history {
    width: 100%;
    height: 100%;
    padding: 40px 40px;
    box-sizing: border-box;
    border: 1px solid rgba(52, 204, 241, .4);

    .title-wrapper {
      display: flex;

      .title {
        font-size: 36px;
        font-weight: bold;
        color: rgb(168, 229, 248);
      }

      .time-wrapper {
        flex: 1;
        text-align: right;
        .to {
          font-size: 20px;
          margin: 0 10px;
        }
      }
    }

    #history-chart {
      width: 100%;
      height: 90%;
      margin-top: 20px;
      padding-top: 20px;
      background: rgb(14, 19, 51);
    }
  }
</style>
