<template>
	<el-row class="container">
		<el-col :span="24" class="header">
							<a >(注：1.右上角点击姓名可修改登陆密码！2.导出Excel先按条件查询再按导出！导出数据量较大时需等待30秒!3.提取日期跨度尽量控制在6个月内！)</a>

			<el-col :span="10" class="logo" :class="collapsed?'logo-collapse-width':'logo-width'">
				{{collapsed?'':sysName}}
			</el-col>
			<!-- <el-col :span="10">
				<div class="tools" @click.prevent="collapse">
					<i class="fa fa-align-justify"></i>
				</div>
			</el-col> -->
			<el-col :span="4" class="userinfo">
				<!-- <a>（修改密码在这里）→</a> -->
				<el-dropdown trigger="hover">
					<span class="el-dropdown-link userinfo-inner"> {{name}}/{{gh}}</span>
					<el-dropdown-menu slot="dropdown">
						<!-- <el-dropdown-item>我的消息</el-dropdown-item> -->
						<el-dropdown-item  @click.native="handleAlter">修改密码</el-dropdown-item>
						<el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</el-col>
		</el-col>
		<el-col :span="24" class="main">
			<aside :class="collapsed?'menu-collapsed':'menu-expanded'">
				<!--导航菜单-->
				<el-menu :default-active="$route.path" class="el-menu-vertical-demo" @open="handleopen" @close="handleclose" router >
					<el-submenu v-show="showA"  index="1">
						<template  slot="title" ><i class="el-icon-menu" ></i>理赔</template>
       				 		<el-menu-item index="/lipei/baoan" ><i class="el-icon-arrow-right"  ></i>报案清单</el-menu-item>
							<el-menu-item index="/lipei/hesun"><i class="el-icon-arrow-right" ></i>核损清单</el-menu-item>			
							<el-menu-item index="/lipei/songxiu"><i class="el-icon-arrow-right" ></i>送修清单</el-menu-item>
							<el-menu-item index="/lipei/jiean"><i class="el-icon-arrow-right" ></i>结案清单</el-menu-item>							
					</el-submenu>

					<el-submenu v-show="showB"  index="2">
						<template  slot="title" ><i class="el-icon-menu" ></i>销管</template>
       				 		<el-menu-item index="/xiaoguan/cheshang" ><i class="el-icon-arrow-right"  ></i>车商口径</el-menu-item>
       				 		<el-menu-item index="/xiaoguan/chexianqibao" ><i class="el-icon-arrow-right"  ></i>车险起保</el-menu-item>
							<el-menu-item index="/xiaoguan/chexianqiandan" ><i class="el-icon-arrow-right"  ></i>车险签单</el-menu-item>
							<el-menu-item index="/xiaoguan/chexianjiaochaxiaoshou" ><i class="el-icon-arrow-right"  ></i>车险交叉销售</el-menu-item>
							<el-menu-item index="/xiaoguan/feicheqibao" ><i class="el-icon-arrow-right"  ></i>非车起保</el-menu-item>
							<el-menu-item index="/xiaoguan/feicheqiandan" ><i class="el-icon-arrow-right"  ></i>非车签单</el-menu-item>
							<el-menu-item index="/xiaoguan/feichejiaochaxiaoshou" ><i class="el-icon-arrow-right"  ></i>非车交叉销售</el-menu-item>
					</el-submenu>


					<el-submenu v-show="showC"  index="3">
						<template  slot="title" ><i class="el-icon-menu" ></i>办公室</template>
       				 		<el-menu-item index="/bangongshi/danzheng" ><i class="el-icon-arrow-right"  ></i>单证</el-menu-item>
       				 		<el-menu-item index="/bangongshi/fanxiqian" ><i class="el-icon-arrow-right"  ></i>反洗钱</el-menu-item>								
					</el-submenu>

					<el-submenu v-show="showD"  index="4">
						<template  slot="title" ><i class="el-icon-menu" ></i>车险部</template>
       				 		<el-menu-item index="/chexian/cheshang1" ><i class="el-icon-arrow-right"  ></i>车商专员签单</el-menu-item>
       				 		<el-menu-item index="/chexian/cheshang2" ><i class="el-icon-arrow-right"  ></i>车商专员起保</el-menu-item>
								
					</el-submenu>

					<el-submenu v-show="showE"  index="5">
						<template  slot="title" ><i class="el-icon-menu" ></i>非车险部</template>
       				 		<el-menu-item index="/feichexian/feiche" ><i class="el-icon-arrow-right"  ></i>非车</el-menu-item>

								
					</el-submenu>


      			</el-menu>				  
				

			</aside>
		

			<section class="content-container">
				<div class="grid-content bg-purple-light">

					<el-col :span="24" class="content-wrapper">
						<transition name="fade" mode="out-in">
							<router-view></router-view>
						</transition>
					</el-col>
				</div>
			<!--修改密码界面-->
		<el-dialog title="修改密码(注：只能是6位纯数字)" :visible.sync="AlterFormVisible" :close-on-click-modal="false">
			<el-form :model="AlterForm" label-width="80px" :rules="AlterFormRules" ref="AlterForm">
			 	<el-form-item label="姓名" prop="name">
					<el-input v-model="AlterForm.name" auto-complete="off" readonly="readonly"></el-input>
				</el-form-item>

				<el-form-item label="工号" prop="gh">
					<el-input v-model="AlterForm.gh" auto-complete="off" readonly="readonly"></el-input>
				</el-form-item>

				<el-form-item label="新密码" prop="password">
					<el-input v-model="AlterForm.password" auto-complete="off"></el-input>
				</el-form-item>
				
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="addFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="AlterSubmit" :loading="AlterLoading">提交</el-button>
			</div>
		</el-dialog>




			</section>
		</el-col>
	</el-row>
</template>

<script>
	export default {
		data() {
			return {
				sysName:'PICC肇庆提数系统',
				collapsed:false,
				sysUserAvatar: '',
				AlterFormVisible: false,//修改界面是否显示
				AlterLoading: false,
				AlterForm:{
					 name:'',
					 gh:'',
					 password:''
				},
				AlterFormRules: {
					name: [
						{ required: true, message: '', trigger: 'blur' },
					],
					gh: [
						{ required: true, message: '', trigger: 'blur' },
					],
				},
				depflag:'',
				showA: false,
				showB: false,
				showC: false,
				showD: false,
				showE: false,
			}
		},
		computed: {
    		name(){
        return this.$store.state.name
    	},
    		gh(){
        return this.$store.state.gh
    	}
 		 },
		methods: {
			onSubmit() {
				// console.log('submit!');
			},
			handleopen() {
				//console.log('handleopen');
			},
			handleclose() {
				//console.log('handleclose');
			},
			handleselect: function (a, b) {
			},
			//退出登录
			logout: function () {
				var _this = this;
				this.$confirm('确认退出吗?', '提示', {
					type: 'warning'
				}).then(() => {
					sessionStorage.clear();
					_this.$router.push('/login');
				}).catch(() => {

				});
			},
			//检查登陆状态
			isLogin: function(){		
				var isLogin = sessionStorage.getItem('isLogin');
			if (isLogin) {
				this.$store.commit('checklog');
				var depflag = this.$store.state.depflag;

				
				if(depflag=='A'){
				  this.showA = true ;
				  }	
				if(depflag=='B'){
				  this.showB = true ;
				  }
				if(depflag=='C'){
				  this.showC = true ;
				  }
				if(depflag=='D'){
				  this.showD = true ;
				  }
				if(depflag=='E'){
				  this.showE = true ;
				  }				  


				if(depflag=='X'){
				  this.showA = true ;
				  this.showB = true ;
				  this.showC = true ;
				  this.showD = true ;
				  this.showE = true ;
				  }				  	
                


				}else{
					this.$alert('请登陆！');
					this.$router.push('/login');
				}
			},
			handleAlter: function () {

				this.AlterFormVisible = true;
				
				this.AlterForm = {
					name:this.name,
					gh: this.gh,
					password:''
				};
			},
			checkpassword(password){
			   var reg = /^\d+$/;
			   if(reg.test(password)==true && password.length==6){
				   return true;
			   }else{
				   return false;
			   }
			},
			AlterSubmit(){
				this.$refs.AlterForm.validate((valid) => {
					if (valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							this.addLoading = true;
							//NProgress.start();

							let para = Object.assign({}, this.AlterForm);


							if(this.checkpassword(this.AlterForm.password)){
								// this.$http.post('http://56.145.32.63:8080/login/alterpassword',para,{ emulateJSON: true }).then((res) => {
								this.$http.post('http://56.145.32.32:8082/login/alterpassword',para,{ emulateJSON: true }).then((res) => {
								this.addLoading = false;
								this.code = res.data.code;
								if(this.code==1){
								this.$message({
									message: '修改成功！',
									type: 'success'
									});
									this.AlterFormVisible = false;

								}else{
									this.$message({
									message: '修改失败！',
									type: 'error'
									});
								}
								});
							}else{
								this.$message({
									message: '密码不符合格式！请重新输入!',
									type: 'error'
								});
							}
						});
					}
				});
			}
		},
		mounted() {
			this.isLogin();
		}
	}

</script>

<style scoped lang="scss">
	@import '~scss_vars';
	
	.container {
		position: absolute;
		top: 0px;
		bottom: 0px;
		width: 100%;
		.header {
			height: 60px;
			line-height: 60px;
			background: $color-primary;
			color:#fff;
			.userinfo {
				text-align: right;
				padding-right: 35px;
				float: right;
				.userinfo-inner {
					cursor: pointer;
					color:#fff;
					img {
						width: 40px;
						height: 40px;
						border-radius: 20px;
						margin: 10px 0px 10px 10px;
						float: right;
					}
				}
			}
			.logo {
				//width:230px;
				height:60px;
				font-size: 22px;
				padding-left:20px;
				padding-right:20px;
				border-color: rgba(238,241,146,0.3);
				border-right-width: 1px;
				border-right-style: solid;
				img {
					width: 40px;
					float: left;
					margin: 10px 10px 10px 18px;
				}
				.txt {
					color:#fff;
				}
			}
			.logo-width{
				width:230px;
			}
			.logo-collapse-width{
				width:60px
			}
			.tools{
				padding: 0px 23px;
				width:14px;
				height: 60px;
				line-height: 60px;
				cursor: pointer;
			}
		}
		.main {
			display: flex;
			// background: #324057;
			position: absolute;
			top: 60px;
			bottom: 0px;
			overflow: hidden;
			aside {
				flex:0 0 230px;
				width: 230px;
				// position: absolute;
				// top: 0px;
				// bottom: 0px;
				.el-menu{
					height: 100%;
				}
				.collapsed{
					width:60px;
					.item{
						position: relative;
					}
					.submenu{
						position:absolute;
						top:0px;
						left:60px;
						z-index:99999;
						height:auto;
						display:none;
					}

				}
			}
			.menu-collapsed{
				flex:0 0 60px;
				width: 60px;
			}
			.menu-expanded{
				flex:0 0 230px;
				width: 230px;
			}
			.content-container {
				// background: #f1f2f7;
				flex:1;
				// position: absolute;
				// right: 0px;
				// top: 0px;
				// bottom: 0px;
				// left: 230px;
				overflow-y: scroll;
				padding: 20px;
				.breadcrumb-container {
					//margin-bottom: 15px;
					.title {
						width: 200px;
						float: left;
						color: #475669;
					}
					.breadcrumb-inner {
						float: right;
					}
				}
				.content-wrapper {
					background-color: #fff;
					box-sizing: border-box;
				}
			}
		}
	}
</style>