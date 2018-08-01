<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">

		  <el-form :inline="true" :model="filters">
              <el-form-item label="车险起保清单：（查询口径：起保日期）">
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
                        <el-table-column prop="proposalno" label="投保单" width="215" ></el-table-column>
                        <el-table-column prop="policyno" label="保单" width="215" ></el-table-column>
                        <el-table-column prop="riskcode" label="险种" width="215" ></el-table-column>
                        <el-table-column prop="operatedate" label="签单日期" width="215" :formatter="dateFormat"></el-table-column>
                        <el-table-column prop="startdate" label="起保日期" width="215" ></el-table-column>
                        <el-table-column prop="enddate" label="终保日期" width="215" ></el-table-column>
                        <el-table-column prop="sumamount" label="保额" width="215" ></el-table-column>
                        <el-table-column prop="sumpremium" label="保费" width="215" ></el-table-column>
                        <el-table-column prop="sumnetpremium" label="净保费" width="215" ></el-table-column>
                        <el-table-column prop="handlercode" label="经办人" width="215" ></el-table-column>
                        <el-table-column prop="comcode" label="归属机构" width="215" ></el-table-column>
                        <el-table-column prop="handler1code" label="归属人" width="215" ></el-table-column>
                        <el-table-column prop="agentcode" label="渠道码" width="215" ></el-table-column>
                        <el-table-column prop="clausetype" label="条款" width="215" ></el-table-column>
                        <el-table-column prop="licenseno" label="车牌" width="215" ></el-table-column>
                        <el-table-column prop="frameno" label="车架码" width="215" ></el-table-column>
                        <el-table-column prop="xinxuzhuan" label="新续转" width="215" ></el-table-column>

		</el-table>

        <!-- 隐藏列表
		<el-table :data="datasall"  v-show="show"     v-loading="listLoading"  style="width: 100%"  height="800" id="table" >
                        <el-table-column prop="proposalno" label="投保单" width="215" ></el-table-column>
                        <el-table-column prop="policyno" label="保单" width="215" ></el-table-column>
                        <el-table-column prop="riskcode" label="险种" width="215" ></el-table-column>
                        <el-table-column prop="operatedate" label="签单日期" width="215" :formatter="dateFormat"></el-table-column>
                        <el-table-column prop="startdate" label="起保日期" width="215" ></el-table-column>
                        <el-table-column prop="enddate" label="终保日期" width="215" ></el-table-column>
                        <el-table-column prop="sumamount" label="保额" width="215" ></el-table-column>
                        <el-table-column prop="sumpremium" label="保费" width="215" ></el-table-column>
                        <el-table-column prop="sumnetpremium" label="净保费" width="215" ></el-table-column>
                        <el-table-column prop="handlercode" label="经办人" width="215" ></el-table-column>
                        <el-table-column prop="comcode" label="归属机构" width="215" ></el-table-column>
                        <el-table-column prop="handler1code" label="归属人" width="215" ></el-table-column>
                        <el-table-column prop="agentcode" label="渠道码" width="215" ></el-table-column>
                        <el-table-column prop="clausetype" label="条款" width="215" ></el-table-column>
                        <el-table-column prop="licenseno" label="车牌" width="215" ></el-table-column>
                        <el-table-column prop="frameno" label="车架码" width="215" ></el-table-column>
                        <el-table-column prop="xinxuzhuan" label="新续转" mid-width="215" ></el-table-column>			

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
import moment from "moment"

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
		 exportExcel () {
        //  /* generate workbook object from table */
		//  var wb = XLSX.utils.table_to_book(document.getElementById('table'))
        //  /* get binary string as output */
        //  var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
        //  try {
        //      FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), '车险起保清单.xlsx')
        //  } catch (e) { if (typeof console !== 'undefined') console.log(e, wbout) }
        //  return wbout
            var url = "http://56.145.32.32/etl/data/车险起保清单.xls"
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
				// this.$http.post('http://56.145.32.63:8080/xiaoguan/chexianqibao',para,{ emulateJSON: true }).then((res) => {
                this.$http.post('http://56.145.32.32:8082/xiaoguan/chexianqibao',para,{ emulateJSON: true }).then((res) => {
                    this.dataspage = res.data.data2;
                    // this.datasall = res.data.data;
                    this.total = res.data.data3;
                    console.log(this.total)
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
            //时间格式化
         dateFormat:function(row, column) {  
               var date = row[column.property];  
          if (date == undefined) {  
             return "";  
          }  
          return moment(date).format("YYYY-MM-DD HH:mm:ss");  
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