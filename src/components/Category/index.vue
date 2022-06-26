<template>
  <div class="category">
    <div
      class="item"
      v-for="(item, index) in data" :key="item"
      @click="click(index)"
      @mouseenter="mouseIn(index)"
      @mouseleave="mouseOut(index)"
    >
      <div
        class="selected"
        v-if="index === selected"
      >
        {{item}}
      </div>
      <div
        class="hovered"
        v-else-if="index === hover"
      >
        {{item}}
      </div>
      <div v-else>{{item}}</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'categoryList',
    props: {
      data: Array
    },
    data() {
      return {
        selected: 0,
        hover: -1
      }
    },
    methods: {
      click(index) {
        this.selected = index
      },
      mouseIn(index) {
        this.hover = index
      },
      mouseOut() {
        this.hover = -1
      }
    },
    mounted() {
      setInterval(() => {
        if (this.selected + 1 > this.data.length - 1) {
          this.selected = 0
        } else {
          this.selected++
        }
      }, 2000)
    }
  }
</script>

<style lang="scss" scoped>
  .category {
    display: flex;
    width: 100%;
    height: 100%;

    .item {
      flex: 1;
      background: rgb(53, 57, 65);
      font-size: 30px;
      color: rgb(133, 157, 177);

      .hovered {
        background: rgb(68, 73, 83);
      }

      .selected {
        background: rgb(157, 183, 204);
        color: #fff;
      }

      div {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
      }
    }
  }
</style>
