<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">

		  <el-form :inline="true" :model="filters">
              <el-form-item label="核损清单：（查询口径：最后定损日期）">
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
                <el-table-column prop="sumlossfee" label="核损合计金额" width="215" ></el-table-column> 
                <el-table-column prop="sumverilossfee" label="修理项目金额" width="215" ></el-table-column>
                <el-table-column prop="cetainlosstype" label="定损方式" width="215" ></el-table-column>
                <el-table-column prop="repairfactorytype" label="修理厂类型" width="215" ></el-table-column>
                <el-table-column prop="repairfactorytypename" label="修理厂类型名称" width="215" ></el-table-column>
                <el-table-column prop="registno" label="报案号" width="215" ></el-table-column>
                <el-table-column prop="lflag" label="保单类型" width="215" ></el-table-column>
                <el-table-column prop="policyno" label="保单号" width="215" ></el-table-column>
                <el-table-column prop="inputtime" label="输入日期" width="215" :formatter="dateFormat"></el-table-column>
                <el-table-column prop="enddeflossdate" label="最后定损日期" width="215" :formatter="dateFormat"></el-table-column>
                <el-table-column prop="finalhandlername" label="定损输入人员" width="215" ></el-table-column>
                <el-table-column prop="underwritecode" label="核损人员代码" width="215" ></el-table-column>
                <el-table-column prop="underwritename" label="核损人员" width="215" ></el-table-column>
                <el-table-column prop="underwriteenddate" label="核损通过日期" width="215" :formatter="dateFormat"></el-table-column>
                <el-table-column prop="sumverichgcompfee" label="换件项目金额" width="215" ></el-table-column>
                <el-table-column prop="sumverirepairfee" label="维修换件项目金额" width="215" ></el-table-column>
                <el-table-column prop="flag1" label="是否核损" width="215" ></el-table-column>
                <el-table-column prop="examfactorycode" label="拆检厂代码" width="215" ></el-table-column>
                <el-table-column prop="examfactoryname" label="拆检厂名称" width="215" ></el-table-column>
                <el-table-column prop="repairfactorycode" label="修理厂代码" width="215" ></el-table-column>
                <el-table-column prop="repairfactoryname" label="修理厂名称" width="234" ></el-table-column>
                <el-table-column prop="prplthirdpartid" label="对应车辆损失项表Id " width="215" ></el-table-column>
                <el-table-column prop="reclaim" label="是否生成旧件回收任务" width="215"  ></el-table-column>
                <el-table-column prop="reclaimcode" label="是否生成旧件回收任务码" width="215" ></el-table-column>
                <el-table-column prop="reclaimname" label="回收任务处理人" width="215" ></el-table-column>
                <el-table-column prop="reclaiminputtime" label="回收任务开始时间" width="215" :formatter="dateFormat"></el-table-column>
                <el-table-column prop="reclaimoutputtime" label="回收任务完成时间" width="215" :formatter="dateFormat"></el-table-column>
                <el-table-column prop="reclaimid" label="回收任务id" width="215" ></el-table-column>
                <el-table-column prop="lossmainid" label="定损单主表Id " width="215" ></el-table-column>
                <el-table-column prop="lossmainid" label="内部流水号" width="215" ></el-table-column>
                <el-table-column prop="count1" label="换件项目数1" width="215" ></el-table-column>
                <el-table-column prop="count2" label="换件项目数2" width="215" ></el-table-column>
                <el-table-column prop="brandname" label="车型名称" width="215" ></el-table-column>
                <el-table-column prop="flag3" label="案件状态" width="215" ></el-table-column>
                <el-table-column prop="flag4" label="是否人伤" width="215" ></el-table-column>
                <el-table-column prop="flag5" label="事故类型" width="215" ></el-table-column>
                <el-table-column prop="opname1" label="理算经办人" width="215" ></el-table-column>
                <el-table-column prop="opname2" label="核赔人员" width="215" ></el-table-column>
                <el-table-column prop="opname2" label="单证收集人员" width="215" ></el-table-column>
                <el-table-column prop="opname3" label="内部流水号" width="215" ></el-table-column>
                <el-table-column prop="opname4" label="调度人员" width="215" ></el-table-column>
                <el-table-column prop="outdate1" label="调度流出时间" width="215" ></el-table-column>
                <el-table-column prop="outdate2" label="理算流出时间" width="215" ></el-table-column>
                <el-table-column prop="endcasedate" label="结案日期" width="215" ></el-table-column>
                <el-table-column prop="agentcode" label="业务渠道" width="215" ></el-table-column>
                <el-table-column prop="comcode" label="归属机构" width="215" ></el-table-column>
                <el-table-column prop="handler1code" label="业务员代码" width="215" ></el-table-column>
                <el-table-column prop="insuredcode" label="被保人代码" width="215" ></el-table-column>
                <el-table-column prop="insuredname" label="被保人姓名" width="215" ></el-table-column>
                <el-table-column prop="brandname1" label="车型名称1" width="215" ></el-table-column>
                <el-table-column prop="startdate" label="起保日期" width="215" ></el-table-column>
                <el-table-column prop="enddate" label="终保日期" width="215" ></el-table-column>
                <el-table-column prop="damagedate" label="出险日期" width="215" ></el-table-column>
                <el-table-column prop="reportdate" label="报案日期" width="215" ></el-table-column>
                <el-table-column prop="reportornumber" label="报案电话" width="215" ></el-table-column>
                <el-table-column prop="monopolycode" label="推修码" width="215" ></el-table-column>
                <el-table-column prop="monopolyname" label="推修厂" width="215" ></el-table-column>
                <el-table-column prop="checknature" label="是否现场查勘" width="215" ></el-table-column>
                <el-table-column prop="checker1" label="查勘员1" width="215" ></el-table-column>
                <el-table-column prop="checker2" label="查勘员2" width="215" ></el-table-column>
                <el-table-column prop="licenseno0" label="车牌号" width="215" ></el-table-column>
                <el-table-column prop="brandname0" label="车型名称0" width="215" ></el-table-column>
                <el-table-column prop="useyears0" label="使用年限" width="215" ></el-table-column>

		</el-table>

        <!-- 隐藏列表-->
		<!-- <el-table :data="datasall"  v-show="show"     v-loading="listLoading"  style="width: 100%"  height="800" id="table" >
                <el-table-column prop="sumlossfee" label="核损合计金额" width="215" ></el-table-column> 
                <el-table-column prop="sumverilossfee" label="修理项目金额" width="215" ></el-table-column>
                <el-table-column prop="cetainlosstype" label="定损方式" width="215" ></el-table-column>
                <el-table-column prop="repairfactorytype" label="修理厂类型" width="215" ></el-table-column>
                <el-table-column prop="repairfactorytypename" label="修理厂类型名称" width="215" ></el-table-column>
                <el-table-column prop="registno" label="报案号" width="215" ></el-table-column>
                <el-table-column prop="lflag" label="保单类型" width="215" ></el-table-column>
                <el-table-column prop="policyno" label="保单号" width="215" ></el-table-column>
                <el-table-column prop="inputtime" label="输入日期" width="215" :formatter="dateFormat"></el-table-column>
                <el-table-column prop="enddeflossdate" label="最后定损日期" width="215" :formatter="dateFormat"></el-table-column>
                <el-table-column prop="finalhandlername" label="定损输入人员" width="215" ></el-table-column>
                <el-table-column prop="underwritecode" label="核损人员代码" width="215" ></el-table-column>
                <el-table-column prop="underwritename" label="核损人员" width="215" ></el-table-column>
                <el-table-column prop="underwriteenddate" label="核损通过日期" width="215" :formatter="dateFormat"></el-table-column>
                <el-table-column prop="sumverichgcompfee" label="换件项目金额" width="215" ></el-table-column>
                <el-table-column prop="sumverirepairfee" label="维修换件项目金额" width="215" ></el-table-column>
                <el-table-column prop="flag1" label="是否核损" width="215" ></el-table-column>
                <el-table-column prop="examfactorycode" label="拆检厂代码" width="215" ></el-table-column>
                <el-table-column prop="examfactoryname" label="拆检厂名称" width="215" ></el-table-column>
                <el-table-column prop="repairfactorycode" label="修理厂代码" width="215" ></el-table-column>
                <el-table-column prop="repairfactoryname" label="修理厂名称" width="234" ></el-table-column>
                <el-table-column prop="prplthirdpartid" label="对应车辆损失项表Id " width="215" ></el-table-column>
                <el-table-column prop="reclaim" label="是否生成旧件回收任务" width="215"  ></el-table-column>
                <el-table-column prop="reclaimcode" label="是否生成旧件回收任务码" width="215" ></el-table-column>
                <el-table-column prop="reclaimname" label="回收任务处理人" width="215" ></el-table-column>
                <el-table-column prop="reclaiminputtime" label="回收任务开始时间" width="215" :formatter="dateFormat"></el-table-column>
                <el-table-column prop="reclaimoutputtime" label="回收任务完成时间" width="215" :formatter="dateFormat"></el-table-column>
                <el-table-column prop="reclaimid" label="回收任务id" width="215" ></el-table-column>
                <el-table-column prop="lossmainid" label="定损单主表Id " width="215" ></el-table-column>
                <el-table-column prop="lossmainid" label="内部流水号" width="215" ></el-table-column>
                <el-table-column prop="count1" label="换件项目数1" width="215" ></el-table-column>
                <el-table-column prop="count2" label="换件项目数2" width="215" ></el-table-column>
                <el-table-column prop="brandname" label="车型名称" width="215" ></el-table-column>
                <el-table-column prop="flag3" label="案件状态" width="215" ></el-table-column>
                <el-table-column prop="flag4" label="是否人伤" width="215" ></el-table-column>
                <el-table-column prop="flag5" label="事故类型" width="215" ></el-table-column>
                <el-table-column prop="opname1" label="理算经办人" width="215" ></el-table-column>
                <el-table-column prop="opname2" label="核赔人员" width="215" ></el-table-column>
                <el-table-column prop="opname2" label="单证收集人员" width="215" ></el-table-column>
                <el-table-column prop="opname3" label="内部流水号" width="215" ></el-table-column>
                <el-table-column prop="opname4" label="调度人员" width="215" ></el-table-column>
                <el-table-column prop="outdate1" label="调度流出时间" width="215" ></el-table-column>
                <el-table-column prop="outdate2" label="理算流出时间" width="215" ></el-table-column>
                <el-table-column prop="endcasedate" label="结案日期" width="215" ></el-table-column>
                <el-table-column prop="agentcode" label="业务渠道" width="215" ></el-table-column>
                <el-table-column prop="comcode" label="归属机构" width="215" ></el-table-column>
                <el-table-column prop="handler1code" label="业务员代码" width="215" ></el-table-column>
                <el-table-column prop="insuredcode" label="被保人代码" width="215" ></el-table-column>
                <el-table-column prop="insuredname" label="被保人姓名" width="215" ></el-table-column>
                <el-table-column prop="brandname1" label="车型名称1" width="215" ></el-table-column>
                <el-table-column prop="startdate" label="起保日期" width="215" ></el-table-column>
                <el-table-column prop="enddate" label="终保日期" width="215" ></el-table-column>
                <el-table-column prop="damagedate" label="出险日期" width="215" ></el-table-column>
                <el-table-column prop="reportdate" label="报案日期" width="215" ></el-table-column>
                <el-table-column prop="reportornumber" label="报案电话" width="215" ></el-table-column>
                <el-table-column prop="monopolycode" label="推修码" width="215" ></el-table-column>
                <el-table-column prop="monopolyname" label="推修厂" width="215" ></el-table-column>
                <el-table-column prop="checknature" label="是否现场查勘" width="215" ></el-table-column>
                <el-table-column prop="checker1" label="查勘员1" width="215" ></el-table-column>
                <el-table-column prop="checker2" label="查勘员2" width="215" ></el-table-column>
                <el-table-column prop="licenseno0" label="车牌号" width="215" ></el-table-column>
                <el-table-column prop="brandname0" label="车型名称0" width="215" ></el-table-column>
                <el-table-column prop="useyears0" label="使用年限" width="215" ></el-table-column>

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
            //页数显示
			handleCurrentChange(val) {
				this.page = val;
				this.getdata();
            },
            //时间格式化
         dateFormat:function(row, column) {  
               var date = row[column.property];  
          if (date == undefined) {  
             return "";  
          }  
          return moment(date).format("YYYY-MM-DD HH:mm:ss");  
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
    //          FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), '核损清单.xlsx')
    //      } catch (e) { if (typeof console !== 'undefined') console.log(e, wbout) }
    //      return wbout
    //    },
        exportExcel(){
            var url = "http://56.145.32.32/etl/data/核损清单.xls"
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
				// this.$http.post('http://56.145.32.63:8080/lipei/hesun',para,{ emulateJSON: true }).then((res) => {
                this.$http.post('http://56.145.32.32:8082/lipei/hesun',para,{ emulateJSON: true }).then((res) => {
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

		mounted() {
			this.isLogin();


		}
	}

</script>

<style scoped>

</style>