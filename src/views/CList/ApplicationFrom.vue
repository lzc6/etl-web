<template>
	<section>
     <center><h1>中国人民财产保险股份有限公司员工请假申请表</h1></center>
     <hr>

        <el-form :model="editForm" label-width="200px"  ref="editForm">
                <el-col :span="6">
				<el-form-item label="姓名：" >
					<el-input v-model="editForm.name"  ></el-input>
				</el-form-item>
                </el-col>

                 <el-col :span="6">
				<el-form-item label="部门：">
					<el-input v-model="editForm.dep"></el-input>
				</el-form-item>
                </el-col>

                <el-col :span="6">
				<el-form-item label="参加工作时间：">
					<el-input v-model="editForm.cjtime" ></el-input>
				</el-form-item>
                </el-col>
                <br><br><br><br>
                <hr>
                <center><h1>请假部分</h1></center>
                <hr>

				<el-form-item label="假期类别：" >
				</el-form-item>

                <el-col :span="4">
                <el-form-item label="事假：">
                      <el-input-number v-model="num1" controls-position="right" size="mini"  :min="0" :max="20"></el-input-number>
				</el-form-item>
                </el-col>

                
                <el-col :span="4">
                <el-form-item label="病假：">
                      <el-input-number v-model="num2" controls-position="right" size="mini"  :min="0" :max="20"></el-input-number>
				</el-form-item>
            	</el-col>

                <el-col :span="4">
                <el-form-item label="探亲假：">
                      <el-input-number v-model="num3" controls-position="right" size="mini"  :min="0" :max="20"></el-input-number>
				</el-form-item>
            	</el-col>

                <el-col :span="4">
                <el-form-item label="婚假：">
                      <el-input-number v-model="num4" controls-position="right" size="mini"  :min="0" :max="20"></el-input-number>
				</el-form-item>
            	</el-col>


                <el-col :span="4">
                <el-form-item label="丧假：">
                      <el-input-number v-model="num5" controls-position="right" size="mini"  :min="0" :max="20"></el-input-number>
				</el-form-item>
            	</el-col>                
<br><br><br><br>
                <el-col :span="4">
                <el-form-item label="产假：">
                      <el-input-number v-model="num6" controls-position="right" size="mini"  :min="0" :max="20"></el-input-number>
				</el-form-item>
            	</el-col>

                <el-col :span="4">
                <el-form-item label="年休假：">
                      <el-input-number v-model="num7" controls-position="right" size="mini"  :min="0" :max="20"></el-input-number>
				</el-form-item>
            	</el-col>   

                <el-col :span="4">
                <el-form-item label="哺乳假：">
                      <el-input-number v-model="num8" controls-position="right" size="mini"  :min="0" :max="20"></el-input-number>
				</el-form-item>
            	</el-col>    

                <el-col :span="4">
                <el-form-item label="其他：">
                      <el-input-number v-model="num9" controls-position="right" size="mini"  :min="0" :max="20"></el-input-number>
				</el-form-item>
            	</el-col>    
<br><br><br><br>
             <hr> 
            
                <el-form-item label="请假理由或休假地点：">
					<el-input type="textarea" v-model="editForm.reason"  ></el-input>
				</el-form-item>
              


           
                <el-form-item label="申请休假时限：">
			</el-form-item>
            


             
            <el-form-item label="起始日期：">
                <el-date-picker  v-model="startdate" type="datetime" placeholder="起始日期：" value-format="yyyy-MM-dd" ></el-date-picker>
            </el-form-item>
           
            
            

      
            <el-form-item label="终止日期：">
                <el-date-picker  v-model="enddate" type="datetime" placeholder="终止日期："  value-format="yyyy-MM-dd" ></el-date-picker>
            </el-form-item>   
           
				</el-form>

<br>


                <!-- <el-button type="primary" style="float:right">提交</el-button> -->
	</section>
</template>

<script>

	export default {
		data() {
			 return {
        editForm: {
					name: '',
                    dep:'',
                    cjtime:'',
                    reason:''
                },
                num1:'',
                num2:'',
                num3:'',
                num4:'',
                num5:'',
                num6:'',
                num7:'',
                num8:'',
                num9:'',
                startdate:'',
                enddate:''
            
      }
    },
    methods:{
        console(){
            console.log(this.date)
        }
    }
}
</script>
<style scoped>

</style>