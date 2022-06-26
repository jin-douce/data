<template>
  <div class="prediction">
    <div class="title-wrapper">
        <div class="title">
          <span class="icon-1"></span>
          流量预测
        </div>
    </div>
    <div id="predict1" />
    <div id="predict" />
  </div>
</template>

<script>
  import * as Echarts from 'echarts'
  import { watch } from 'vue'

  export default {
    name: 'trafficPredict',
    props: {
      data: Object
    },
    setup(props) {
      let chart, chart1
      watch(() => props.data, () => {
        function createOption() {
          const option = {
            color: ['#80FFA5', '#00DDFF', '#37A2FF', '#FF0087', '#FFBF00'],
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'cross',
                label: {
                  backgroundColor: '#6a7985'
                }
              }
            },
            legend: {
              data: ['Line 1', 'Line 2', 'Line 3', 'Line 4', 'Line 5'],
              icon: 'rect',
              textStyle: {
                fontSize: 22,
                color: '#fff'
              }
            },
            grid: {
              left: '3%',
              right: '4%',
              bottom: '10%',
              containLabel: true
            },
            xAxis: [
              {
                type: 'category',
                boundaryGap: false,
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                axisLabel: {
                  color: 'white',
                  fontSize: 22,
                  margin: 20
                }
              }
            ],
            yAxis: [
              {
                type: 'value',
                axisLabel: {
                  color: 'white',
                  fontSize: 22
                }
              }
            ],
            series: [
              {
                name: 'Line 1',
                type: 'line',
                stack: 'Total',
                smooth: true,
                lineStyle: {
                  width: 0
                },
                showSymbol: false,
                areaStyle: {
                  opacity: 0.8,
                  color: new Echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                      offset: 0,
                      color: 'rgb(128, 255, 165)'
                    },
                    {
                      offset: 1,
                      color: 'rgb(1, 191, 236)'
                    }
                  ])
                },
                emphasis: {
                  focus: 'series'
                },
                data: [140, 232, 101, 264, 90, 340, 250]
              },
              {
                name: 'Line 2',
                type: 'line',
                stack: 'Total',
                smooth: true,
                lineStyle: {
                  width: 0
                },
                showSymbol: false,
                areaStyle: {
                  opacity: 0.8,
                  color: new Echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                      offset: 0,
                      color: 'rgb(0, 221, 255)'
                    },
                    {
                      offset: 1,
                      color: 'rgb(77, 119, 255)'
                    }
                  ])
                },
                emphasis: {
                  focus: 'series'
                },
                data: [120, 282, 111, 234, 220, 340, 310]
              },
              {
                name: 'Line 3',
                type: 'line',
                stack: 'Total',
                smooth: true,
                lineStyle: {
                  width: 0
                },
                showSymbol: false,
                areaStyle: {
                  opacity: 0.8,
                  color: new Echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                      offset: 0,
                      color: 'rgb(55, 162, 255)'
                    },
                    {
                      offset: 1,
                      color: 'rgb(116, 21, 219)'
                    }
                  ])
                },
                emphasis: {
                  focus: 'series'
                },
                data: [320, 132, 201, 334, 190, 130, 220]
              },
              {
                name: 'Line 4',
                type: 'line',
                stack: 'Total',
                smooth: true,
                lineStyle: {
                  width: 0
                },
                showSymbol: false,
                areaStyle: {
                  opacity: 0.8,
                  color: new Echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                      offset: 0,
                      color: 'rgb(255, 0, 135)'
                    },
                    {
                      offset: 1,
                      color: 'rgb(135, 0, 157)'
                    }
                  ])
                },
                emphasis: {
                  focus: 'series'
                },
                data: [220, 402, 231, 134, 190, 230, 120]
              },
              {
                name: 'Line 5',
                type: 'line',
                stack: 'Total',
                smooth: true,
                lineStyle: {
                  width: 0
                },
                showSymbol: false,
                label: {
                  show: true,
                  position: 'top'
                },
                areaStyle: {
                  opacity: 0.8,
                  color: new Echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                      offset: 0,
                      color: 'rgb(255, 191, 0)'
                    },
                    {
                      offset: 1,
                      color: 'rgb(224, 62, 76)'
                    }
                  ])
                },
                emphasis: {
                  focus: 'series'
                },
                data: [220, 302, 181, 234, 210, 290, 150]
              }
            ]
          }
          return option
        }
        if(!chart){
          chart = Echarts.init(document.getElementById('predict'))
          chart1 = Echarts.init(document.getElementById('predict1'))
        }
        chart.setOption(createOption())
        chart1.setOption({
          tooltip: {
            trigger: 'item'
          },
          legend: {
            top: '5%',
            orient: 'vertical',
            left: 'left',
            textStyle: {
                fontSize: 22,
                color: '#fff'
              }
          },
          series: [
            {
              name: 'Access From',
              type: 'pie',
              radius: ['40%', '70%'],
              left: '20%',
              avoidLabelOverlap: false,
              itemStyle: {
                borderRadius: 10,
                borderColor: '#fff',
                borderWidth: 2
              },
              label: {
                show: true,
                position: 'outside',
                fontSize: 22,
                color: '#fff'
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: '40',
                  fontWeight: 'bold'
                }
              },
              labelLine: {
                show: false
              },
              data: [
                { value: 1048, name: 'Search Engine' },
                { value: 735, name: 'Direct' },
                { value: 580, name: 'Email' },
                { value: 484, name: 'Union Ads' },
                { value: 300, name: 'Video Ads' }
              ]
            }
          ]
        })
      })
    }
  }
</script>

<style lang="scss" scoped>
  .prediction {
    // display: flex;
    width: 100%;
    height: 100%;
    background: rgb(14, 19, 51);
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

    }

    #predict1 {
      width: 100%;
      height: 35%;
      margin-top: 40px;
    }

    #predict {
      width: 100%;
      height: 45%;
      margin-top: 80px;
    }
  }
</style>
