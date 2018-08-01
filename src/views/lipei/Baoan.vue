<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">

		  <el-form :inline="true" :model="filters">
              <el-form-item label="报案清单：（查询口径：报案日期）">
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
               


				<!-- <el-form-item>
					<el-button type="primary" @click="handleAdd">新增</el-button>
				</el-form-item> -->
			</el-form>
		</el-col>
        
		<!--列表-->
		<el-table :data="dataspage"    v-loading="listLoading"  style="width: 100%"  height="700"  >
			<el-table-column prop="makecom" label="业务机构" width="215" ></el-table-column>	
            <el-table-column prop="licenseno" label="车牌" width="215" ></el-table-column>			
			<el-table-column prop="policyno" label="保单号" width="215" ></el-table-column>
 			<el-table-column prop="registno" label="报案号" width="220" ></el-table-column>			          			
			<el-table-column prop="reportdate" label="报案日期" width="215" ></el-table-column>			
			<el-table-column prop="reportorname" label="报案人" width="215" ></el-table-column>			
			<el-table-column prop="reportornumber" label="报案电话" width="215" ></el-table-column>			
			<el-table-column prop="damagedate" label="出险日期" width="215" ></el-table-column>			
			<el-table-column prop="damagehour" label="出险时间" width="215" ></el-table-column>			
			<el-table-column prop="damageaddress" label="出险地址" width="215" ></el-table-column>			
			<el-table-column prop="damagename" label="出险原因" width="215" ></el-table-column>				
        	<el-table-column prop="lflag" label="自/通赔标识" width="215" ></el-table-column>			
			<el-table-column prop="checker1" label="查勘员" width="215" ></el-table-column>	
            <el-table-column prop="sumestimatefee" label="估损金额" width="215" ></el-table-column>	
            <el-table-column prop="firstsiteflag" label="是否第一现场" width="215" ></el-table-column>					
			<el-table-column prop="handlercode" label="经办人代码" width="215" ></el-table-column>			
			<el-table-column prop="handlername" label="经办人" width="215" ></el-table-column>			
			<el-table-column prop="handler1code" label="归属人代码" width="215" ></el-table-column>			
			<el-table-column prop="handler1name" label="归属人" width="215" ></el-table-column>			

		</el-table>

        <!-- 隐藏列表-->
		<!-- <el-table :data="datasall"  v-show="show"     v-loading="listLoading"  style="width: 100%"  height="800" id="table" >
			<el-table-column prop="makecom" label="业务机构" width="215" ></el-table-column>	
            <el-table-column prop="licenseno" label="车牌" width="215" ></el-table-column>			
			<el-table-column prop="policyno" label="保单号" width="215" ></el-table-column>
 			<el-table-column prop="registno" label="报案号" width="220" ></el-table-column>			          			
			<el-table-column prop="reportdate" label="报案日期" width="215" ></el-table-column>			
			<el-table-column prop="reportorname" label="报案人" width="215" ></el-table-column>			
			<el-table-column prop="reportornumber" label="报案电话" width="215" ></el-table-column>			
			<el-table-column prop="damagedate" label="出险日期" width="215" ></el-table-column>			
			<el-table-column prop="damagehour" label="出险时间" width="215" ></el-table-column>			
			<el-table-column prop="damageaddress" label="出险地址" width="215" show-overflow-tooltip="true" ></el-table-column>			
			<el-table-column prop="damagename" label="出险原因" width="215" ></el-table-column>				
        	<el-table-column prop="lflag" label="自/通赔标识" width="215" ></el-table-column>			
			<el-table-column prop="checker1" label="查勘员" width="215" ></el-table-column>	
            <el-table-column prop="sumestimatefee" label="估损金额" width="215" ></el-table-column>	
            <el-table-column prop="firstsiteflag" label="是否第一现场" width="215" ></el-table-column>					
			<el-table-column prop="handlercode" label="经办人代码" width="215" ></el-table-column>			
			<el-table-column prop="handlername" label="经办人" width="215" ></el-table-column>			
			<el-table-column prop="handler1code" label="归属人代码" width="215" ></el-table-column>			
			<el-table-column prop="handler1name" label="归属人" width="215" ></el-table-column>			

		</el-table> -->

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
            // changestartdate(time) {
            //     this.filters.startdate = time;
            //     },
            //  changeenddate(time) {
            //     this.filters.enddate = time;
            //     },


		//导出excle
	// 	 exportExcel () {
    //      /* generate workbook object from table */
	// 	 var wb = XLSX.utils.table_to_book(document.getElementById('table'))
    //      /* get binary string as output */
    //      var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
    //      try {
    //          FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), '报案清单.xlsx')
    //      } catch (e) { if (typeof console !== 'undefined') console.log(e, wbout) }
    //      return wbout
	//    },
	    exportExcel(){
            var url = "http://56.145.32.32/etl/data/报案清单.xls"
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
                this.$http.post('http://56.145.32.32:8082/lipei/baoan',para,{ emulateJSON: true }).then((res) => {
                    this.dataspage = res.data.data2;
                    // this.datasall = res.data.data;
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
        // formatdate(date){
        //     return FormData.FormData(date,'yyyy-MM-dd')
        // },
		mounted() {
			this.isLogin();
			// this.getdata();
			// this.exportExcel();

		}
	}

</script>

<style scoped>

</style>