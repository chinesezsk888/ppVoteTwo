<template>
  <div class="copywrite__box">
   <div class="guest__box__add">
       <el-button type="primary" size="mini" @click="addlist()">添加</el-button>
       <el-button type="danger" class="resetbtn" @click="centerDialogVisible = true">重置按钮</el-button>
    </div>
    <el-dialog
      title="重置投票状态&记录"
      :visible.sync="centerDialogVisible"
      width="20%"
      custom-class="tab__dialog"
      center
      >
      <span class="dialog__aticle">重置功能仅用于排练，正式开始后，请勿操作！！！重置后投票的状态恢复到第一轮未开始状态，所有投票记录请零</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="hideDialog()">取 消</el-button>
        <el-button type="danger" @click="resetTabs()">确定重置</el-button>
      </span>
    </el-dialog>
    <el-table
      :data="programList"
      style="width: 100%"
      >
      <el-table-column
        label="顺序"
        align="center"
        label-class-name="table_title"
        >
        <template slot-scope="scope">
          <span>{{ scope.row.rank }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="分组"
        align="center"
        label-class-name="table_title"
        >
        <template slot-scope="scope">
          <span>{{ scope.row.groupNum }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="队名"
        align="center"
        label-class-name="table_title"
        >
      <template slot-scope="scope">
          <span>{{ scope.row.teamName }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="歌名"
        align="center"
        label-class-name="table_title"
        >
      <template slot-scope="scope">
          <span>{{ scope.row.songName }}</span>
        </template>
      </el-table-column>
      <el-table-column 
      label="操作" 
      align="center"
      label-class-name="table_title">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="handleEdit(scope.$index, programList)">编辑</el-button>
          <el-button
              size="mini"
              type="danger"
              @click="handleDel(scope.$index, programList)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :visible.sync="dialogprogram.dialogprogramVisible" width="400px" center :showClose="dialogprogram.showClo" custom-class="program__dialog" :close-on-click-modal="dialogprogram.closeModal">
        <el-form :model="programFrom" :rules="rules" ref="programFrom" label-position="left" size="mini" @submit.native.prevent>
            <el-form-item label="顺序" 
            label-width="80px" 
            :rules="[
                { required: true, message: '必填'},
                { type: 'number', message: '顺序必须为数字值'}
              ]"
            >
                <el-col :span="20">
                   <el-input v-model.number="programFrom.rank" auto-complete="off" placeholder="请输入顺序"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="分组" 
            label-width="80px"
            :rules="[
                { required: true, message: '必填'},
                { type: 'number', message: '分组必须为数字值'}
            ]"
            >
                <el-col :span="20">
                   <el-input v-model.number="programFrom.groupNum" auto-complete="off" placeholder="请输入分组"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="队名" label-width="80px" prop="teamName">
               <el-col :span="20">
                <el-input v-model="programFrom.teamName" auto-complete="off" placeholder="请输入队名(长度不超过10)"></el-input>
               </el-col>
            </el-form-item>
            <el-form-item label="歌名" label-width="80px" prop="songName">
                <el-col :span="20">
                  <el-input v-model="programFrom.songName" auto-complete="off" placeholder="请输入歌名"></el-input>
                </el-col>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="hideProgramForm('programFrom')">取消</el-button>
            <el-button type="primary" @click="submitProgramForm('programFrom',programId)">保存</el-button>
        </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name:"Program",
    props:{tableInfo:Array},
    data() {
      var trueTeamName = (rule, value, callback) => {
        var num = value.length;
        console.log(num);
        if (value === '') {
          callback(new Error('请输入队名'));
        }else if(num > 10) {
          callback(new Error('最多10个字'));
        }else{
            callback();
        }
      }
      return {
        programList:[],
        centerDialogVisible:false,
        dialogprogram:{
           dialogprogramVisible:false,
           showClo: false,
           closeModal: false,
        },
        programFrom:{
          rank: '',
          songName: '',
          teamName:'',
          groupNum:'',
        },
        rules: {
          songName:[{required: true, message: '请输入歌名', trigger: 'blur'}],
          teamName:[{required: true, trigger: 'blur',validator:trueTeamName}]
        },
        programId:'',
      }
    },
   
    methods: {
      handleDel(index, rows) {
        let programId = rows[index].programId;
        this.$confirm('确认删除该节目？').then(() => {
          let url = "admin/program/delete";
          this.axios({
            method: 'post',
            url: url,
            params: {
              programId
            }
          })
          .then(() =>{
             this.renderList();
          }).catch(() => {
              
          })
        })
      },
      hideDialog() {
          this.centerDialogVisible = false
      },
      resetTabs(){
          var url = "admin/program/resetVote";
          this.centerDialogVisible = false;
          this.axios.get(url)
          .then(()=> {
            this.renderList();
          })
          .catch(() => {
             
          })
      },
      renderList() {
        var url = "admin/program/list";
        this.axios.get(url)
        .then(res=>{
          console.log(res)
          this.programList = res.data.data.content;
        }).catch(() => {
             
        })
      },
      addlist() {
        this.dialogprogram.dialogprogramVisible = true
        this.programId = ''
        this.programFrom.rank = ''
        this.programFrom.songName = ''
        this.programFrom.teamName = ''
        this.programFrom.groupNum = ''
      },
      submitProgramForm(formName,id) {
          this.$refs[formName].validate((valid) => {
              if (valid) {
                  var url ='';
                  if(id) {
                    url = 'admin/program/update'
                  }else {
                    url = 'admin/program/create'
                  }
                  // 校验成功后,
                  var info = this.sendFromInfo();
                  this.axios({
                    method: 'post',
                    url: url,
                    data: info
                  }).then(()=>{
                    this.dialogprogram.dialogprogramVisible = false;
                    this.programId = '';
                    this.renderList();
                  }).catch((err) => {
                      console.log(err)
                  }) 
                  
              } else {
                  console.log("校验m没成功");
                  return false;
              }
          });
      },
      sendFromInfo() {
          let rank = this.programFrom.rank;
          let songName = this.programFrom.songName;
          let teamName = this.programFrom.teamName;
          let groupNum = this.programFrom.groupNum;
          let programId = this.programId
          let object = {
                    rank,
                    songName,
                    teamName,
                    groupNum,
                    programId
                }
         return object
      },
      hideProgramForm(formName) {
        this.dialogprogram.dialogprogramVisible= false;
        this.$refs[formName].resetFields();
        this.programId = '';
      },
      handleEdit(index, rows) {
          this.dialogprogram.dialogprogramVisible= true;
           //前端完成数据回显
           this.programFrom.rank = rows[index].rank;
           this.programFrom.songName = rows[index].songName;
           this.programFrom.teamName = rows[index].teamName;
           this.programFrom.groupNum = rows[index].groupNum;
           this.programId = rows[index].programId;
      },
      
    },
    created() {
      this.renderList();
    },
    computed: {
    },
  }
</script>
<style> 
    .el-table th>.cell.table_title {
      color: black;
    }
     .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .el-dialog__header {
    display:none;
  }
  .el-dialog__body {
    padding-bottom: 0;
  }
  
</style>

<style lang="scss" scoped>
.copywrite__box {

    .guest__box__add {
        width:100%;
        padding-bottom:10px;
        border-bottom:1px solid #ccc;
        position:relative;
        .resetbtn {
            position:absolute;
            right: 50px;
            top: -10px;
        }
    }
    .upload-demo {
      position:absolute;
      right: 48px;
      top: 0px;
    }
    
    .groupImg__box {
      width: 212px;
      height: 142px;
      border: 1px solid #ccc;
      box-sizing: border-box;
      margin-top:10px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .team__name__lenght {
      position: absolute;
      right: 10px;
      top:0px
    }
}

</style>
