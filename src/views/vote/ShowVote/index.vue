<template>
  <div class="app-container">
    <el-tabs v-model="activeName">
      <el-tab-pane label="第一轮" name="first">
        <vote-table :list="groundOneList" @tableUpdataHandle="tableUpdataHandle"/>
      </el-tab-pane>
      <el-tab-pane label="第二轮" name="second">
        <vote-table :list="groundTwoList" @tableUpdataHandle="tableUpdataHandle"/>
      </el-tab-pane>
      <el-tab-pane label="第三轮" name="third">
        <vote-table :list="groundThreeList" @tableUpdataHandle="tableUpdataHandle"/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import VoteTable from './VoteTable'
export default {
  name: 'ShowVotes',
  data () {
    return {
      activeName: "first",
      groundOneList: [],
      groundTwoList: [],
      groundThreeList: []
    }
  },
  components: {
    VoteTable
  },
  created() {
    this.fetchData()
  },
  methods: {
    tableUpdataHandle () {
      this.fetchData()
    },
    fetchData() {
      let url = 'admin/program/listAll';
      this.axios({
          url:url,
          method:'get',
        }).then(response => {
        let list1 = response.data.roundData[0]
        let list2 = response.data.roundData[1]
        let list3 = response.data.roundData[2]
        list1.forEach(item => {
          item["show"] = false
        });
        list2.forEach(item => {
          item["show"] = false
        });
        list3.forEach(item => {
          item["show"] = false
        });
        this.groundOneList = list1
        this.groundTwoList = list2
        this.groundThreeList = list3
      }) 
    },
  }
}
</script>
