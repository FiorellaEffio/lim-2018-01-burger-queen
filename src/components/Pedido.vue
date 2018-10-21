<template>
  <div class="container">
    Hola {{nombreCliente}}
    <input type="text" v-model="nombreCliente">
    <ul class="collection">
      <li v-for="product in productsOrderComputed" class="collection-item">
        {{product.nombre}} + {{product.precio}} / Cantidad: {{product.cantidad}}<button @click="deleteProduct(product.nombre)" :key="product.nombre">X</button>
      </li>
    </ul>
    Pedido total: {{totalPrice}}
    <button>Enviar pedido</button>
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
    productsCountComputed: function(){
      // agregamos cantidad de 1 a cada elemento
      let productsCount = [];
      this.productsOrder.forEach((element) => {
        element.cantidad = 0;
        productsCount.push(element);
      })
      return productsCount;
    },
    productsOrderComputed: function(){
      let uniqueProducts = (this.productsCountComputed.filter((item, index, array) => {
        return array.indexOf(item) === index;
      }));
      uniqueProducts.forEach(element => {
        this.productsCountComputed.forEach(product => {
          if(product.nombre == element.nombre) {
            element.cantidad++;
          }
        })
      })
      return uniqueProducts;
    },
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
  },
  methods: {
    deleteProduct: function(product) {
      console.log(product);
      for(let i = 0; i<this.productsOrder.length; i++){
        if(this.productsOrder[i].nombre === product){
          this.productsOrder.splice(i, 1);
          i--;
        }
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
