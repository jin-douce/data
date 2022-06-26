<template>
  <div class="list-wrapper">
    <div class="list" v-for="(item, index) in headerData" :key="index">
      <div class="item">
        <div class="left">
          <span :class="{'icon-apps': index, 'icon-eqp': !index}"></span>
        </div>
        <div class="right">
          <div class="title">{{item.title}}</div>
          <div class="sub-title">{{item.subTitle}}</div>
        </div>
        <div class="num">{{item.num}}</div>
      </div>
      <div class="scroll-list-wrapper">
        <auto-scroll-table
          :config="config[index]"
          style="width:100%;height:540px;"
        />
      </div>
    </div>
  </div>
</template>

<script>
  import { ref, watch } from 'vue'
  import AutoScrollTable from '../AutoScrollTable/index'

  export default {
    name: 'eqpList',
    components: {
      AutoScrollTable
    },
    props: {
      data: Array
    },
    setup(props) {
      const headerData = ref([])
      const config = ref([])
      watch(() => props.data, () => {
        headerData.value = [{
          title: '设备数量',
          subTitle: 'Equipment',
          img: 'eqp',
          num: 9
        }, {
          title: '应用数量',
          subTitle: 'Application',
          img: 'apps',
          num: 9
        }]

        const eqpDatas = [
          ['设备1', 'XiaomiAIspeaker'],
          ['设备2', 'Intelligentcamera'],
          ['设备3', 'miphone'],
          ['设备4', 'Airpurifier'],
          ['设备5', 'Intelligenthumidifier'],
          ['设备6', 'Smartswitch'],
          ['设备7', 'Desklamp'],
          ['设备8', 'Sweepingrobot'],
          ['设备9', 'Doorandwindowsensor']
        ]
        const appData = [
          ['app1', 'P2P'],
          ['app2', 'Music'],
          ['app3', 'Github'],
          ['app4', 'HTTP'],
          ['app5', 'TLS'],
          ['app6', 'Chat'],
          ['app7', 'IMAPS'],
          ['app8', 'Vedio'],
          ['app9', 'Email']
        ]
        const data = []
        const data2 = []
        const align = []
        for (let i = 0; i < eqpDatas.length; i++) {
          data[i] = []
          data2[i] = []
          align[i] = 'center'
          for (let j = 0; j < 2; j++) {
            data[i].push(`<div>${eqpDatas[i][j]}</div>`)
            data2[i].push(`<div>${appData[i][j]}</div>`)
          }
        }

        config.value = [
          {
            header: ['序号', '名称'],
            data,
            align,
            rowNum: 4
          },
          {
            header: ['序号', '名称'],
            data: data2,
            align,
            rowNum: 4
          }
        ]
      })
      return {
        headerData,
        config
      }
    }
  }
</script>

<style lang="scss" scoped>
  .list-wrapper {
      display: flex;
      width: 100%;
      height: 100%;
      padding: 10px 10px;
      box-sizing: border-box;
      border: 1px solid rgba(52, 204, 241, .4);

      .list {
        flex: 0 0 48%;
        margin: 20px 10px;
        box-sizing: border-box;

        .item {
          display: flex;
          align-items: center;
          padding: 10px 10px;
          background: rgb(14, 19, 51);

          .left {
              display: flex;
              align-items: center;
              justify-content: center;
              width: 110px;
              height: 110px;
              background-repeat: no-repeat;
              background-size: 100% 100%;
              background-color: rgb(72, 116, 167);
              border-radius: 50%;
          }
          .right {
            margin-left: 40px;
            .title {
              font-size: 36px;
            }
            .sub-title {
              margin-top: 5px;
              font-size: 24px;
              // color: grey;
            }
          }
          .num {
            margin-left: 40px;
              font-size: 84px;
            }
        }

        .scroll-list-wrapper {
          margin-top: 20px;
        }
    }
  }
</style>
