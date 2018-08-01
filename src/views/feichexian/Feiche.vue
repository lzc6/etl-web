<template>
    <section>
        <!-- <el-input @change="refreshMessage"></el-input> -->
   <el-select v-model="value" placeholder="请选择"  @focus="refreshMessage">
    <el-option
      v-for="item in options"
      :key="item.name"
      :label="item.name"
      :value="item.name"  >
    </el-option>
  </el-select>       
    </section>
</template>


<script>
  export default {
    data() {
      return {
        options: [{
            
        }],
        value: ''
      }
    },
         methods:{
      refreshMessage() {
          console.log(1);
          this.$http.get('http://56.145.32.63:8080/test/ajax').then((response) =>{
                this.options=response.data.data;

                console.log(response.data.data)
                console.log(2);
          });
      }
      
    }
  }
  

  </script>
