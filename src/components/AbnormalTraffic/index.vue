<template>
  <div class="abnormal-traffic">
    <div class="title-wrapper">
      <div class="title">
          <span class="icon-1"></span>
          异常流量检测
      </div>
      <div :inline="true" class="time-wrapper">
          <el-date-picker
            type="datetime"
            placeholder="开始时间"
            id="picker1"
            v-model="start_time"
            >
          </el-date-picker>

          <span class="to">To</span>

          <el-date-picker
            type="datetime"
            placeholder="结束时间"
            id="picker2"
            v-model="end_time"
            >
          </el-date-picker>
          <el-button type="primary">查询</el-button>
      </div>
    </div>
    <div class="list">
      <auto-scroll-table
        :config="config"
      />
    </div>
    <div class="chart">
      <div class="left">
        <div class="item" v-for="(item, index) in numData" :key="index">
          <div class="icon">
            <span class="icon-2"></span>
          </div>
          <div class="num">
            <div class="tiny-title">
            {{item.title}}
            </div>
            <div class="total">
              <count-to
                :start-val="startNum[index]"
                :end-val="endNum[index]"
                :duration="1000"
                separator=","
                autoplay
              />
            </div>
          </div>
        </div>
      </div>
      <div class="right">
        <div id="predict-chart" />
      </div>
    </div>
  </div>
</template>
 
<script>
  import * as Echarts from 'echarts'
  import { ref, watch } from 'vue'
  import AutoScrollTable from '../AutoScrollTable/index'
  import CountTo from '../VueCountTo/vue-countTo.vue'

  export default {
    name: 'abnormalTraffic',
    components: { AutoScrollTable, CountTo },
    props: { 
      data: Array 
    },
    setup(props) {
      let chart
      let start_time = ref(""), end_time = ref("")
      const numData = ref([])
      const config = ref(null)
      const endNum = ref([0, 0])
      const startNum = ref([0, 0])

      numData.value = [{
          title: '今日异常流量',
          num: 1096,
          isNormal: true
        }, {
          title: '今日正常流量',
          num: 21837,
          isNormal: false
        }]
      // 大数据量柱图
      const updateChart = () => {
        function generateData(count) {
          let baseValue = Math.random() * 1000
          let time = +new Date(2022, 0, 1)
          let smallBaseValue
          function next(idx) {
            smallBaseValue =
              idx % 30 === 0
                ? Math.random() * 700
                : smallBaseValue + Math.random() * 500 - 250
            baseValue += Math.random() * 20 - 10
            return Math.max(0, Math.round(baseValue + smallBaseValue) + 3000)
          }
          const categoryData = []
          const valueData = []
          for (let i = 0; i < count; i++) {
            categoryData.push(
              Echarts.format.formatTime('yyyy-MM-dd\nhh:mm:ss', time, false)
            )
            valueData.push(next(i).toFixed(2))
            time += 1000
          }
          return {
            categoryData: categoryData,
            valueData: valueData
          }
        }
        function createOption() {
          const dataCount = 1000
          const data = generateData(dataCount)
          return {
            color: 'rgba(137, 104, 205, .8)',
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'shadow'
              }
            },
            grid: {
              bottom: 100
            },
            dataZoom: [
              {
                type: 'inside'
              },
              {
                type: 'slider',
                backgroundColor: 'rgba(248, 248, 255, .1)'
              }
            ],
            xAxis: {
              data: data.categoryData,
              silent: false,
              splitLine: {
                show: false
              },
              splitArea: {
                show: false
              },
              axisLabel: {
                color: 'white',
                fontSize: 22
              }
            },
            yAxis: {
              splitArea: {
                show: false
              },
              axisLabel: {
                color: 'white',
                fontSize: 22
              }
            },
            series: [
              {
                type: 'bar',
                data: data.valueData,
                // Set `large` for large data amount
                large: true
              }
            ]
          }
        }
        if (!chart) {
          chart = Echarts.init(document.getElementById('predict-chart'))
        }
        chart.setOption(createOption())
      }
      watch(() => props.data, () => {
        const trafficData = props.data
        const data = []
        const align = []
        for (let i = 0; i < trafficData.length; i++) {
          data[i] = []
          align[i] = 'center'
          for (let j = 0; j < 5; j++) {
              data[i].push(`<div>${trafficData[i][j]}</div>`)
          }
        }
        config.value = {
          header: ['Time', 'Src IP Addr', 'Src Port', 'Dst IP Addr', 'Dst Port'],
          data, // 表格数据
          align, // 表格排序
          rowNum: 10 // 显示行数
        }
        startNum.value = endNum.value
        endNum.value[0] = startNum.value[0] + 2
        endNum.value[1] = startNum.value[1] + 10
        console.log("hduishg", startNum.value , endNum.value);
        updateChart()
      })
      return {
        config,
        numData,
        startNum,
        endNum,
        start_time,
        end_time
      }
    }
  }
</script>

<style lang="scss" scoped>
  .abnormal-traffic {
    width: 100%;
    height: 100%;
    border: 1px solid rgba(52, 204, 241, .4);
    padding: 40px 40px;
    box-sizing: border-box;

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

    .list {
      width: 100%;
      height: 880px;
      margin-top: 30px;
      box-sizing: border-box;
    }

    .chart {
        height: 45%;
        display: flex;
        margin: 20px 0;
        background: rgb(14, 19, 51);

        .left {
          flex: 0 0 320px;
          display: flex;
          flex-direction: column;
          justify-content: center;

          .item {
            display: flex;
            width: 380px;
            height: 200px;
            padding-left: 40px;
            margin: 40px 40px 0 0;
            box-sizing: border-box;
            // background-color: rgb(19, 23, 44);

            .icon {
              width: 100px;
              height: 100px;
              margin-right: 30px;
              .icon-2 {
                font-size: 100px;
                color: rgb(71, 146, 245);
              }
            }
            .num {
              flex: 1;
              .total {
                font-family: DIN;
                font-size: 68px;
                font-weight: bolder;
                letter-spacing: 2px;
                padding: 10px 0;
              }

              .tiny-title {
                font-size: 32px;
                color: #fff;
                line-height: 36px;
              }
            }
          }
        }

        .right {
          flex: 1;

          #predict-chart {
            // width: 100%;
            height: 90%;
          }
        }
    }
  }
</style>
