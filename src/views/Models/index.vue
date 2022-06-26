<template>
  <div class="container">
    <container :options="{width: 3840, height: 2160}">
      <div class="header">
        <top-header/>
      </div>
      <div class="main">
        <div class="center">
          <div class="center1">
            <!-- <category
              :data="['态势感知结果', '流量分类算法']"
            /> -->
              <router-link to="/screen" style="marginRight: 20px">态势感知结果</router-link>
              <span> | </span>
              <router-link to="/model" style="marginLeft: 20px">流量分类算法</router-link>
          </div>
          <div class="center2">
            <el-tabs v-model="activeName" type="card" class="tabs" @click="handleClick">
                <el-tab-pane label="LeNet" name="first">
                  <el-table :data="lenet">
                    <el-table-column prop="Layer" label="Layer" />
                    <el-table-column prop="OutputShape" label="OutputShape" />
                    <el-table-column prop="Param" label="Param" />
                  </el-table>
                </el-tab-pane>
                <el-tab-pane label="AlexNet" name="second">
                  <el-table :data="alexnet">
                    <el-table-column prop="Layer" label="Layer" />
                    <el-table-column prop="OutputShape" label="OutputShape" />
                    <el-table-column prop="Param" label="Param" />
                  </el-table>
                </el-tab-pane>
                <el-tab-pane label="VGG-11" name="third">VGG-11</el-tab-pane>
                <el-tab-pane label="ResNet-18" name="fourth">ResNet-18</el-tab-pane>
                <el-tab-pane label="Compare" name="fifth">
                  <el-table :data="compare">
                    <el-table-column prop="model" label="model" />
                    <el-table-column prop="accuracy" label="accuracy" />
                    <el-table-column prop="Total_Params" label="Total_Params" />
                  </el-table>
                </el-tab-pane>
            </el-tabs>
          </div>
        </div>
      </div>
    </container>
  </div>
</template>

<script>
import TopHeader from '../../components/Header/index'
import {ref} from "vue"
export default {
  components: {
    TopHeader
  },
  setup(){
      const activeName = ref("first")
      const handleClick = (tab, event) => {
          console.log("===================", tab);
      }
      const lenet = [
          {
             Layer: "conv2d",
             OutputShape: "(256, 224, 224, 6)",
             Param: 156
          },
          {
             Layer: "average_pooling2d",
             OutputShape: "(256, 56, 56, 6)",
             Param: 0
          },
          {
             Layer: "conv2d_1",
             OutputShape: "(256, 52, 52, 16)",
             Param: 2416
          },
          {
             Layer: "average_pooling2d_1",
             OutputShape: "(256, 13, 13, 16)",
             Param: 0
          },
          {
             Layer: "flatten",
             OutputShape: "(256, 2704)",
             Param: 0
          },
           {
             Layer: "dense",
             OutputShape: "(256, 120)",
             Param: 324600
          },
           {
             Layer: "dense_1",
             OutputShape: "(256, 84)",
             Param: 10164
          },
           {
             Layer: "dense_2",
             OutputShape: "(256, 7)",
             Param: 595
          },
          
          
          
      ]
      const alexnet = [
          {
             Layer: "conv2d",
             OutputShape: "(256, 54, 54, 96)",
             Param: 11712
          },
          {
             Layer: "max_pooling2d",
             OutputShape: "(256, 26, 26, 96)",
             Param: 0
          },
          {
             Layer: "conv2d_1",
             OutputShape: "(256, 26, 26, 256)",
             Param: 614656
          },
          {
             Layer: "max_pooling2d_1",
             OutputShape: "(256, 12, 12, 256)",
             Param: 0
          },
          {
             Layer: "conv2d_2",
             OutputShape: "(256, 12, 12, 384)",
             Param: 885120
          },
          {
             Layer: "conv2d_3",
             OutputShape: "(256, 12, 12, 384)",
             Param: 1327488
          },
          {
             Layer: "max_pooling2d_1",
             OutputShape: "(256, 5, 5, 384)",
             Param: 0
          },
          {
             Layer: "flatten",
             OutputShape: "(256, 9600)",
             Param: 0
          },
           {
             Layer: "dense",
             OutputShape: "(256, 4096)",
             Param: 39325696
          },
          {
             Layer: "dropout",
             OutputShape: "(256, 4096)",
             Param: 39325696
          },
           {
             Layer: "dense_1",
             OutputShape: "(256, 4096)",
             Param: 16781312
          },
          {
             Layer: "dropout_1",
             OutputShape: "(256, 4096)",
             Param: 0
          },
           {
             Layer: "dense_2",
             OutputShape: "(256, 7)",
             Param: 28679
          },
          
          
          
      ]
      const compare = [
        {
          model: "LeNet",
          accuracy: 0.5142,
          Total_Params: "337,931"
        },
        {
          model: "AlexNet",
          accuracy: 0.6781,
          Total_Params: "58,974,663"
        },
        {
          model: "VGG-11",
          accuracy: 0.7002,
          Total_Params: "128,793,863"
        },
        {
          model: "ResNet-18",
          accuracy: 0.8815,
          Total_Params: "11,184,647"
        },
      ]
      return {
          lenet,
          alexnet,
          compare,
          activeName,
          handleClick
      }
  }
}
</script>

<style lang="less" scoped>
  .router-link-active {
    color: rgb(168, 229, 248);
  }
  a {
    color: #fff;
  }

  ::v-deep .el-tabs__item {
    color: #fff;
    font-size: 32px;
    font-weight: 600;
  }
  ::v-deep .el-tabs__item.is-active {
    color: rgb(168, 229, 248);
  }
  ::v-deep .el-table {
    font-size: 32px;
  }
  .container {
    width: 100%;
    height: 100%;
    background: rgb(11, 7, 22);
    color: #fff;
    font-size: 48px;

    #screen-container {
      display: flex;
      flex-direction: column;

      .header {
        height: 160px;
      }


      .main {
        flex: 1;
        display: flex;


        .center {
          flex: 1;
          display: flex;
          flex-direction: column;
          width: 1720px;

          .center1 {
            box-sizing: border-box;
            padding: 20px 10px 0 10px;
            height: 100px;
            display: flex;
            justify-content: center;
          }
          
          .center2 {
            box-sizing: border-box;
            padding: 20px 10px;
            height: 1900px;
            .tabs {
                padding: 32px;
                color: #fff;
                font-size: 32px;
                font-weight: 600;
            }
          }

        }
      }
    }
  }
</style>
