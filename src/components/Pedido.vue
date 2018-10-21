<template>
  <div class="container">
    Hola {{nombreCliente}}
    <input type="text" v-model="nombreCliente">
    <ul class="collection">
      <li v-for="product in productsOrder" class="collection-item">
        {{product.nombre}} + {{product.precio}}
      </li>
    </ul>
    Pedido total: {{totalPrice}}
  </div>
</template>

<script>
import { bus } from '../main'

export default {
  name: 'Pedido',
  data () {
    return {
      productsOrder: [],
      nombreCliente: '',
    }
  },
  computed: {
    // productsOrderComputed: {
    //
    // },
    totalPrice: function() {
      let result = 0;
      this.productsOrder.forEach((element) => {
        result += element.precio;
      })
      return result;
    }
  },
  created(){
    bus.$on('orderProducts',(data) => {
      this.productsOrder.push(data);
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
