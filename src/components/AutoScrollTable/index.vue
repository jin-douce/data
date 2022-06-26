<template>
  <div class="dv-scroll-board" :ref="ref">
    <div class="header" v-if="header.length" :style="`background-color: ${defaultConfig.headerBGC};`">
      <div class="header-item" v-for="(headerItem, i) in header" :key="headerItem + i"
        :style="`
          height: ${defaultConfig.headerHeight}px;
          line-height: ${defaultConfig.headerHeight}px;
          width: ${widths[i]}px;
          font-size: ${defaultConfig.headerFontSize}px;
        `"
        align="center"
        v-html="headerItem"
      />
    </div>

    <div v-if="config" class="rows"
      :style="{ height: `${height - (header.length ? defaultConfig.headerHeight : 0)}px`}"
    >
      <div class="row-item" v-for="(row, ri) in rows" :key="row.toString() + row.scroll"
        :style="`
          height: ${heights[ri]}px;
          line-height: ${heights[ri]}px;
          background-color: ${defaultConfig[row.rowIndex % 2 === 0 ? 'evenRowBGC' : 'oddRowBGC']};
          fontSize: ${defaultConfig.columnFontSize}px;
        `"
      > 
        <div class="ceil" v-for="(ceil, ci) in row.ceils" :key="ceil + ri + ci"
          :style="{ width: `${widths[ci]}px` }"
          align="center"
          v-html="ceil"
        />
      </div>
    </div>
  </div>
</template>

<script>
  import autoResize from '../Container/autoResize'

  export default {
    name: 'AutoScrollTable',
    mixins: [autoResize],
    props: {
      config: {
        type: Object,
        default: () => ({})
      }
    },
    data() {
      return {
        ref: 'scroll-board',
        // 默认配置
        defaultConfig: {
          header: [],
          data: [],
          rowNum: 5,
          headerBGC: 'rgba(70, 130, 180, .6)',
          headerFontSize: 24,
          columnFontSize: 14,
          oddRowBGC: 'rgba(70, 130, 180, .4)', // 奇数行背景色
          evenRowBGC: 'rgba(70, 130, 180, .2)', // 偶数行背景色
          waitTime: 2000,
          headerHeight: 55,
          columnWidth: [],
          autoPlay: true
        },
        header: [],
        rowsData: [], // 所有的行
        rows: [], // 当前展示的行
        widths: [],
        heights: [],
        avgHeight: 0,
        animationIndex: 0, // 当前滚动的行index
        animationHandler: '',
        updater: 0
      }
    },
    watch: {
      // 当config变化时执行
      config() {
        this.stopAnimation()
        this.calcData()
      }
    },
    methods: {
      onResize() {
        if (!this.defaultConfig) return
        this.calcWidths()
        this.calcHeights()
      },
      calcData() {
        this.calcHeaderData()
        this.calcRowsData()
        this.calcWidths()
        this.calcHeights()
        this.animation(true)
      },
      calcHeaderData() {
        const { header } = this.config
        if (!header.length) {
          return
        }
        this.header = header
      },
      calcRowsData() {
        let { data, rowNum } = this.config
        data = data.map((ceils, i) => ({ ceils, rowIndex: i }))
        const rowLength = data.length
        if (rowLength > rowNum && rowLength < 2 * rowNum) {
          data = [...data, ...data]
        }
        data = data.map((d, i) => ({ ...d, scroll: i }))
        this.rowsData = data
        this.rows = data
      },
      calcWidths() {
        const { columnWidth, header } = this.defaultConfig
        const usedWidth = columnWidth.reduce((all, w) => all + w, 0)
        let columnNum = 0
        if (this.rowsData[0]) {
          columnNum = this.rowsData[0].ceils.length
        } else if (header.length) {
          columnNum = header.length
        }
        const avgWidth = (this.width - usedWidth) / (columnNum - columnWidth.length)
        const widths = new Array(columnNum).fill(avgWidth)
        this.widths = widths
      },
      calcHeights(onresize = false) {
        const { headerHeight } = this.defaultConfig
        const { rowNum, data } = this.config
        let allHeight = this.height
        if (this.header.length) allHeight -= headerHeight

        const avgHeight = allHeight / rowNum
        this.avgHeight = avgHeight
        if (!onresize) this.heights = new Array(data.length).fill(avgHeight)
      },

      async animation() {
        let { avgHeight, animationIndex, defaultConfig, rowsData, animation, updater } = this
        const { waitTime } = defaultConfig
        const { rowNum } = this.config
        const rowLength = rowsData.length
        if (rowNum >= rowLength) return
        const animationNum = 1
        const rows = rowsData.slice(animationIndex)
        rows.push(...rowsData.slice(0, animationIndex))
        this.rows = rows
        this.heights = new Array(rowLength).fill(avgHeight)
        await new Promise(resolve => setTimeout(resolve, 300))
        if (updater !== this.updater) return

        // 最上面移出的行高度设为0
        this.heights.splice(0, animationNum, ...new Array(animationNum).fill(0))
        animationIndex += animationNum
        const back = animationIndex - rowLength
        if (back >= 0) animationIndex = back
        this.animationIndex = animationIndex
        this.animationHandler = setTimeout(animation, waitTime - 300)
      },
      stopAnimation() {
        const { animationHandler, updater } = this
        this.updater = (updater + 1) % 999999
        if (!animationHandler) return
        clearTimeout(animationHandler)
      }
    },
    unmounted() {
      const { stopAnimation } = this
      stopAnimation()
    }
  }
</script>

<style lang="less">
  .dv-scroll-board {
    position: relative;
    width: 100%;
    height: 100%;
    color: #fff;

    .text {
      padding: 0 10px;
      box-sizing: border-box;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .header {
      display: flex;
      flex-direction: row;
      font-size: 15px;

      .header-item {
        .text;
        transition: all 0.3s;
      }
    }

    .rows {
      overflow: hidden;

      .row-item {
        display: flex;
        font-size: 24px;
        transition: all 0.3s;
      }

      .ceil {
        .text;
      }

      .index {
        border-radius: 3px;
        padding: 0 3px;
      }
    }
  }
</style>
