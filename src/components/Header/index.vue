<template>
  <div class="top-header">
    <img class="logo" src="../../assets/logo.svg">
    <div class="logo-text">
      <div class="cn-text">流量态势感知系统</div>
    </div>
    <div class="right-text">
      <div class="date">{{date}}</div>
      <div class="time">{{time}}</div>
    </div>
  </div>
</template>

<script>
  import { clock as useClock } from '../../utils/clock'

  export default {
    name: 'topHeader',
    setup () {
      const { date, time } = useClock()

      return {
        date,
        time
      }
    }
  }
</script>

<style lang="scss" scoped>
  .top-header {
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    background: black;
    border: 1px rgba(52, 204, 241, .8);
    border-style: none none solid none;
    padding: 0 64px;
    box-sizing: border-box;
    justify-content: space-between;

    .logo {
      // flex: 1;
      width: 600px;
      height: 165px;
    }

    .logo-text {
      // flex: 1;
      // margin-left: 40px;

      .cn-text {
        color: rgb(255, 255, 255);
        font-weight: bold;
        font-size: 80px;
        letter-spacing: 2px;
      }

      .en-text {
        color: rgb(255, 255, 255);
        font-size: 35px;
        letter-spacing: 1px;
      }
    }

    .right-text {
      // flex: 1;
      display: flex;
      align-items: center;
      justify-content: flex-end;

      .date {
        width: 330px;
        text-align: right;
        font-size: 52px;
        color: rgb(190, 222, 248);
        font-family: DIN;
        font-weight: 500;
      }

      .time {
        width: 220px;
        font-size: 52px;
        color: rgb(190, 222, 248);
        font-family: DIN;
        font-weight: 500;
        margin-left: 30px;
      }
    }
  }
</style>
