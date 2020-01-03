<template>
  <div class="guest__box">
    <div class="guest__box__add">
       <el-button type="primary" size="mini" @click="addMenu()">添加</el-button>
       <el-upload
         class="upload-file"
         ref="upload"
         :show-file-list="unshow"
         :on-change="fileSuccess"
         :action="judgeFile"
         >
           <el-button size="mini" type="primary">导入</el-button>
        </el-upload>
    
    </div>
    <div class="search__box">
        <el-col :span="16">
          <el-input size="medium" v-model="searchMobile" placeholder="请输入要搜索的手机号" auto-complete="no"></el-input>
        </el-col>
        <el-button type="primary" round icon="el-icon-search"  size="small" @click="searchList()">搜索</el-button>
    </div>
   
    <template>
        <el-table
        :data="tableData" 
        style="width: 100%">
        <el-table-column
            prop="name"
            label="姓名"
            label-class-name="table_title"
            >
        </el-table-column>
        <el-table-column
            prop="mobile"
            label="手机号"
            label-class-name="table_title"
            >
        </el-table-column>
        <el-table-column
            prop="type"
            label="类型"
            label-class-name="table_title"
           
            >
            <template slot-scope="scope"><span :class="{redword:scope.row.type=='1'}">{{changeType(scope.row)}}</span></template>
        </el-table-column>
        <el-table-column 
            label="操作" 
            label-class-name="table_title">
            <template slot-scope="scope"> 
                <el-button
                size="mini"
                type="primary"
                @click="guestMenuEdit(scope.$index, tableData)">编辑</el-button>
                <el-button
                size="mini"
                type="danger"
                @click="guestMenuDel(scope.$index, tableData)">删除</el-button>
            </template>
        </el-table-column>
        </el-table>
    </template>
    <el-pagination
        background
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pagesize"        
        layout="prev, pager, next"
        :total="totalElements"> 
    </el-pagination>
    <el-dialog :visible.sync="dialogFormVisible" width="350px" center :showClose="showClo" custom-class="guest__dialog" :close-on-click-modal="closeModal">
        <el-form :model="form" :rules="rules" ref="form" label-position="left" size="mini" @submit.native.prevent>
            <el-form-item label="姓名" label-width="80px" prop="name">
                <el-input v-model="form.name" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="手机号" label-width="80px" prop="tel">
                <el-input v-model.number="form.tel" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="活动区域" label-width="80px" prop="type">
                <el-select v-model="form.type" placeholder="请选择人员类型">
                    <el-option label="普通" value="普通"></el-option>
                    <el-option label="特邀" value="特邀"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="hideForm('form')">取消</el-button>
            <el-button type="primary" @click="submitForm('form',userIndex)">保存</el-button>
        </div>
    </el-dialog>
  </div>
</template>

<script>
import { apiUrl } from '../config'
export default {
    
  components:{},
  props:{},
  data(){
    var validateTel = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入手机号'));
        }else if(!this.isTel(value)) {
          callback(new Error('请输入正确的手机号'));
        }else{
            callback();
        }
    }
    return {
        showClo: false,
        unshow: false,
        closeModal: false,
        centerDialogVisible:false,
        tableData: [],
        totalElements:0,
        currentPage:1,
        pagesize:10,
        dialogFormVisible: false,
        form: {
          name: '',
          type: '',
          tel:''
        },
        rules: {
          name: [
            { required: true, message: '请输入姓名', trigger: 'blur' },
          ],
          tel:[{required: true,trigger: 'blur', validator: validateTel}],
          type:[{required: true,message: '请选择类型',trigger: 'blur'}],
        },
        userIndex: '',
        guestMenuIndex:'',
        searchMobile: '',
        mobilePage: false,
      };
  },
  watch:{},
  computed:{
    judgeFile() {
       return apiUrl+"person/import"
     }
  },
  methods:{
        isTel(val) {
            if (!/^1(3|4|5|6|7|8)\d{9}$/.test(val)) {
                return false;
                } else {
                    return true;
                    }
                },
        // 转化type的值
        changeType(row){
           return row.type=='0'?'普通':'特邀'
        },
        addMenu() {
            this.dialogFormVisible = true;
            this.mobilePage = false;
            this.userIndex = '';
            this.form.name = '';
            this.form.tel = '';
            this.form.type = '';
        },
        
        hideForm(formName) {
            this.dialogFormVisible = false;
            this.$refs[formName].resetFields();
        },
        submitForm(formName,index) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    // 校验成功后,发送信息给后台
                    this.sendAxios(formName,index);
                } else {
                    return false;
                }
            });
        },
        sendAxios(fromname,index) {
            var that = this;
            var url ='';
            var sendmsg = {};
            if(index==='') {
                url= 'admin/person/create';
                // 要将表单的值赋值给一个变量，不能直接用表单的
                let name = that.form.name;
                let tel = that.form.tel.toString();
                let type = '';
                if(that.form.type=='普通') {
                    type = '0'
                }else if(that.form.type=='特邀') {
                    type = '1'
                }
                let object = {
                    name,
                    mobile:tel,
                    type
                }
                sendmsg = object;
                this.currentPage = 1;
                 // 前端视图完成添加
                // that.tableData.unshift(object);
            }else {
                url = 'admin/person/update';
                that.tableData.map(function(item,i) {
                    if(index == i) {
                       item.name = that.form.name;
                       item.mobile = that.form.tel.toString();
                        if(that.form.type=='普通') {
                            item.type = '0'
                        }else if(that.form.type=='特邀') {
                            item.type = '1'
                        }
                        sendmsg = item;
                    }
                })
                this.userIndex = '';
            }
               // 模拟提交/修改成功
            this.axios({
                url:url,
                method:'post',
                data: sendmsg
            }).then(()=>{
                this.dialogFormVisible = false;
                this.render();
            }).catch(()=>{
                console.log("提交失败")
            })
        },

        guestMenuEdit(index, rows) {
            this.dialogFormVisible = true;
            this.userIndex = index;
            //前端完成数据回显
            this.form.name = rows[this.userIndex].name;
            this.form.tel = rows[this.userIndex].mobile;
            // 类型解析
            this.regexpType(rows[this.userIndex].type);
        },
        guestMenuDel(index, rows) {
           this.$confirm('确认删除？')
           .then(()=> {
                // eslint-disable-next-line no-undef
                this.userIndex = index;
                // 将删除的信息传递给后台
                var personId = rows[this.userIndex].personId;
                this.delAxios(personId);
                // 前端视图完成删除
                rows.splice(index, 1);
           })
           .catch(() => {
           });
        },
        // 判断类型是数字还是字符串
        regexpType(str) {
            var pattern = new RegExp("[0-9]+");
            if(pattern.test(str)){
               this.form.type = str=='0'?'普通':'特邀';
            }else {
               this.form.type = str;
            }
        },
        render() {
            var url ='';
            if(!this.mobilePage) {
                url = 'admin/person/list?pageidx='+this.currentPage;
            }else {
                url = 'admin/person/getByMobile?mobile='+this.searchMobile+'&pageidx='+this.currentPage;
            }
            this.axios.get(url)
            .then(res => {
                console.log(res)
                this.tableData = res.data.data.content;
                this.totalElements = res.data.data.totalElements;
            })
            .catch(() => {
                console.log('请稍后重试')
            })
        },
        delAxios(id) {
            var url = 'admin/person/delete?personId='+id;
            this.axios.get(url)
            .then(()=>{
               this.dialogFormVisible = false;
               this.render();
            }).catch((err) => {
              console.log(err);
            })
        },
        handleCurrentChange: function(currentPage){
            this.currentPage = currentPage;
           
            this.render();
        },
        searchList() {
            var sendmsg = this.searchMobile.trim();
            this.mobilePage = true;
            this.currentPage = 1;
            var url = "admin/person/getByMobile?mobile="+sendmsg+"&pageidx="+this.currentPage;
            if(sendmsg == '') {
                this.$confirm('请输入要搜索的内容', '温馨提示', {
                   type: 'warning'
                })
            }else{
               this.axios.get(url)
               .then(res=>{
                    console.log(res)
                    var info = res.data.data.content;
                    this.totalElements = res.data.data.totalElements;
                    console.log(info)
                    if(!info) {
                        this.$confirm('搜索内容为空', '温馨提示', {
                          type: 'warning'
                        })
                    }else{
                        this.tableData = info;
                    }
                   
                }).catch(()=>{
                    console.log("搜索失败")
                })
            }
        },
        fileSuccess() {
          this.mobilePage = false;
          this.render();
        }
  },
    created() {
        this.render();
    },
}
</script>
<style lang="scss" scoped>
.guest__box {
    position:relative;
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
    .el-pagination {
        margin-right: 20px;
        margin-top: 10px;
        float:right;
    }
    .redword {
        color:red;
    }
    .search__box {
        display:flex;
        width: 300px;
        align-items: center;
        justify-content: space-around;
        position: absolute;
        top: -8px;
        right: 0;
    }
}

</style>
<style lang="scss">
.guest__box {
 .guest__dialog {
    .el-dialog__header {
        display:none;
    }
    .el-dialog__body {
        padding-bottom: 0;
    }
 }
 .guest__box__add {
        display: flex;
        align-items: center;
        .upload-file {
          margin-left: 20px;
        }
    }
}
</style>
