<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">

		  <el-form :inline="true" :model="filters">
              <el-form-item label="车商专员绩效：（查询口径：签单日期）">
                </el-form-item>
                <el-form-item label="起始日期：">
                <el-date-picker  v-model="filters.startdate" type="datetime" placeholder="选择日期" value-format="yyyy-MM-dd HH:mm:ss" ></el-date-picker>
                </el-form-item>

                 <el-form-item label="终止日期：">
                <el-date-picker  v-model="filters.enddate" type="datetime" placeholder="选择日期"  value-format="yyyy-MM-dd HH:mm:ss" ></el-date-picker>
                </el-form-item>

                <el-form-item>
					<el-button type="primary" @click="getdata">查询</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary"    @click="exportExcel"  >导出Excel</el-button>
				</el-form-item>
               


			</el-form>
		</el-col>
        
		<!--列表-->
		<el-table :data="dataspage"    v-loading="listLoading"  style="width: 100%"  height="700"  >
		

		</el-table>


		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="50" :total="total" style="float:right;">
			</el-pagination>
		</el-col>

	</section>
</template>

<script>

import FileSaver from 'file-saver'
import XLSX from 'xlsx'
	export default {
		data() {
			return {
				filters: {
                    startdate:'',
                    enddate: '',
				},
                dataspage:[],
                datasall:[],
                listLoading:false,
                show: false,
                page: 1,
                total: 0,  
                 }
		    },
		methods: {
			handleCurrentChange(val) {
				this.page = val;
				this.getdata();
            },

	    exportExcel(){
            var url = "http://56.145.32.32/etl/data/车商专员签单.xls"
            window.open(url);
    },
			//获取数据
			getdata() {
                if(this.checkdate()){

               
				let para = { 
                    page: this.page,
                    startdate:this.filters.startdate,
                    enddate:this.filters.enddate  
				};
                this.listLoading = true;
                // 56.145.32.54:8081
				// this.$http.post('http://56.145.32.63:8080/lipei/baoan',para,{ emulateJSON: true }).then((res) => {
                this.$http.post('http://56.145.32.32:8082/bangongshi/danzheng',para,{ emulateJSON: true }).then((res) => {
                    this.dataspage = res.data.data2;
                    this.datasall = res.data.data;
                    this.total = res.data.data3;
					this.listLoading = false;
                    this.$message({
                        message: '查询成功！',
                         type: 'success'
                     });					
                   }).catch((err)=>{
                    this.$message({
                        message: '查询失败！请控制日期范围在6个月内！',
                         type: 'error'
                     });
                     this.listLoading = false;
                   });
                 }
            },
            checkdate(){
                if(this.filters.startdate=='' || this.filters.enddate==''){
                    this.$alert('请输入日期！');
                    return false;
                } else{
                    return true;
                }   
            },


			//检查登陆状态
			isLogin: function(){		
				var isLogin = sessionStorage.getItem('isLogin');
			if (isLogin) {
				this.$store.commit('checklog');			
				}else{
					this.$alert('请登陆！');
					this.$router.push('/login');
				}
            },
        },

		mounted() {
			this.isLogin();


		}
	}

</script>

<style scoped>

</style>