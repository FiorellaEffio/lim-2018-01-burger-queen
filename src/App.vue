<template>
  <div id="app">
    <div  
      class="hide-overflow"
      style="position: relative;"
    >
      <v-toolbar 
        absolute
        color="blue"
        dark
        scroll-off-screen
        scroll-target="#scrolling-techniques"
      >

        <v-toolbar-title class="align-center">
          <img src="http://subirimagen.me/uploads/20181025183622.png" width="40%">
        </v-toolbar-title>
  
  
        
      </v-toolbar>
      
        <v-container style="height: 700px;">
          <div class="row container">
            <Productos class="col s6 arr"/>
            <Pedido class="col s6 arriba"/>
          </div>
        </v-container>
      </div>

    
  </div>
</template>

<script>
import Productos from './components/Productos'
import Pedido from './components/Pedido'
export default {
  name: 'App',
  components: {
    Productos,
    Pedido
  }
}
</script>

<style scoped>
.arriba{
  margin-top: 5.2% !important;
}
.arr{
  margin-top: -8% !important;
}
.align-center {
  align-self: center;
  margin-left: 36%;
  margin-top:1.5%;
}
</style>
