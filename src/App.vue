<template>
  <div id="app">
    <div class="row container">
      <Productos class="col s6"/>
      <Pedido class="col s6"/>
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

<style>
</style>
