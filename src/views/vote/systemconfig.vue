<template>
  <div class="parameter__box">
    <div class="parameter__box__addbtn">
       <el-button type="primary" size="mini" @click="addParameter()">添加</el-button>
    </div>
    <template>
    <el-table
      :data="parsmeterList"
      style="width: 100%">
      <el-table-column
        label="序号"
        width="80"
        align="center"
        label-class-name="table_title">
        <template slot-scope="scope">
           <span>{{ scope.row.confId }}</span>
        </template>
      </el-table-column>
       <el-table-column
        label="参数名称"
        width="180"
        align="center"
        label-class-name="table_title">
        <template slot-scope="scope">
           <span>{{ scope.row.configKey }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="参数值"
        width="180"
        align="center"
        label-class-name="table_title">
        <template slot-scope="scope">
           <span>{{ scope.row.configValue }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="描述"
        align="center"
        label-class-name="table_title">
        <template slot-scope="scope">
           <span>{{ scope.row.description }}</span>
        </template>
      </el-table-column>
      <el-table-column 
      label="操作" 
      align="center"
      label-class-name="table_title"
      fixed="right"
      width="80"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="systemEdit(scope.$index, parsmeterList)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </template>
   <el-dialog :visible.sync="dialogSystemFormVisible" width="60%" center :showClose="showClo" custom-class="system__dialog" :close-on-click-modal="closeModal">
        <el-form :model="systemForm" :rules="rules" ref="systemForm" label-position="left" size="mini" @submit.native.prevent>
            <el-form-item label="参数名称" label-width="80px" prop="configKey">
                <el-input v-model="systemForm.configKey" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="描述" label-width="80px" prop="description">
                <el-input v-model.number="systemForm.description" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="参数值" label-width="80px" prop="configValue">
                <el-input v-model.number="systemForm.configValue" auto-complete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="hideSystemForm('systemForm')">取消</el-button>
            <el-button type="primary" @click="submitSystemForm('systemForm',systemIndex)">保存</el-button>
        </div>
    </el-dialog>
    <el-pagination
        background
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pagesize"        
        layout="prev, pager, next"
        :total="totalElements"> 
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "Systemconfig",
  data(){
    return {
        parsmeterList:[],
        showClo: false,
        closeModal: false,
        totalElements:0,
        currentPage:1,
        pagesize:10,
        dialogSystemFormVisible: false,
        systemForm: {
          configKey:'',
          description: '',
          configValue: ''
        },
        rules: {
          configKey: [{ required: true, message: '请输入参数名称', trigger: 'blur' }],
          description: [{ required: true, trigger: 'blur', message: '请输入描述' }],
          configValue: [{ required: true, message: '请选择参数值', trigger: 'blur' }],
        },
        systemIndex: ''
    }
  },
  methods:{
      renderParameterList() {
        let url = "admin/systemConfig/list?pageidx="+this.currentPage;
        this.axios.get(url)
        .then(res=>{
          this.parsmeterList = res.data.data.content
          this.totalElements = res.data.data.totalElements;
        }).catch((err) => {
          console.log(err)
        })
      },
      addParameter() {
        this.dialogSystemFormVisible = true
        this.systemIndex = ''
        this.systemForm.configKey = ''
        this.systemForm.description = ''
        this.systemForm.configValue = ''
      },
      hideSystemForm(formName) {
        this.dialogSystemFormVisible = false
        this.$refs[formName].resetFields()
      },
      systemEdit(index,rows) {
        this.dialogSystemFormVisible = true
        this.systemIndex = index
        this.systemForm.configKey = rows[index].configKey
        this.systemForm.description = rows[index].description
        this.systemForm.configValue = rows[index].configValue
      },
      submitSystemForm(formName,index) {
         this.$refs[formName].validate((valid) => {
                if (valid) {
                    // 校验成功后,发送信息给后台
                    this.sendSystemAxios(formName,index);
                } else {
                    return false;
                }
            });
      },
      sendSystemAxios(formName,index) {
        var that = this
        var url =''
        var sendmsg = {}
        if(index==='') {
          url = 'admin/systemConfig/create'
          let configKey = that.systemForm.configKey
          let description = that.systemForm.description
          let configValue = that.systemForm.configValue
          let object = {
            configKey,
            description,
            configValue
          }
          sendmsg = object

        }else {
           url = 'admin/systemConfig/update'
           that.parsmeterList.map(function(item,i){
              if(index == i) {
                item.configKey = that.systemForm.configKey
                item.description = that.systemForm.description
                item.configValue = that.systemForm.configValue
                sendmsg = item
              }
           })
           that.systemIndex = ''
        }
        that.axios({
                url:url,
                method:'post',
                data: sendmsg
            }).then(()=>{
                that.dialogSystemFormVisible = false;
                that.renderParameterList();
            }).catch(()=>{
                console.log("提交失败")
            })
      },
      handleCurrentChange: function(currentPage){
        this.currentPage = currentPage;
        this.renderParameterList();
      }
  },
  created(){
    this.renderParameterList();
  },
}
</script>
<style lang="scss" scoped>
.parameter__box {
    .parameter__box__addbtn {
         width:100%;
         padding-bottom:10px;
         border-bottom:1px solid #ccc;
         position:relative;
    }
    .el-pagination {
        margin-right: 20px;
        margin-top: 10px;
        float:right;
    }
}
</style>