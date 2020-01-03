<template>
  <el-table
      :data="list"
      stripe
      border
      style="width: 932px"
      highlight-current-row
    >
    <el-table-column label="组数" width="110" align="center">
      <template slot-scope="scope">
        {{ scope.row.groupNum }}
      </template>
    </el-table-column>
    <el-table-column label="队名" width="300" align="center">
      <template slot-scope="scope">
        <span>{{ scope.row.teamName }}</span>
      </template>
    </el-table-column>
    <el-table-column label="歌名" width="300" align="center">
      <template slot-scope="scope">
        {{ scope.row.songName }}
      </template>
    </el-table-column>
    <el-table-column label="得票数" width="110" align="center">
      <template slot-scope="scope">
        <el-input v-show="scope.row.show" v-model="scope.row.voteCount"></el-input>
        <span v-show="!scope.row.show">{{scope.row.voteCount}}</span>
      </template>
    </el-table-column>
    <el-table-column
        label="操作"
        width="110" 
        align="center"
        >
        <template slot-scope="scope">
          <el-button @click="scope.row.show=!scope.row.show" type="text" size="small">编辑</el-button>
          <el-button @click="handleClick(scope.row)" type="text" size="small">修改</el-button>
        </template>
    </el-table-column>
  </el-table>
</template>
<script>
export default {
  name: 'VoteTable',
  props: {
    list:Array
  },
  methods: {
    handleClick (item) {
      this.$confirm('确认修改该节目的投票数量吗？').then(() => {
        let url = "admin/program/updateVoteCount";
        this.axios({
          method: 'post',
          url: url,
          data: {
            programId:item.programId,
            voteCount:item.voteCount
          }
        })
        .then(() =>{
          this.$emit('tableUpdataHandle')
        })
      })
    }
  }
}
</script>
