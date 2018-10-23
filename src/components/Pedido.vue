<template>
  <div class="container">

    <form @submit.prevent="addOrder()">
      Hola {{nombreCliente}}
      <input type="text" v-model="nombreCliente">
      <ul class="collection">
        <li v-for="product in productsOrderComputed" class="collection-item">
          {{product.nombre}} + {{product.precio}} / Cantidad: {{product.cantidad}}<button @click="deleteProduct(product.nombre)" :key="product.nombre">X</button>
        </li>
      </ul>
      Pedido total: {{totalPrice}}
      <button type="submit">Enviar pedido</button>
    </form>
    <template>
  <v-card height="200px" flat>
    <div class="headline text-xs-center pa-5">
      Active: {{ bottomNav }}
    </div>
    <v-bottom-nav
      :active.sync="bottomNav"
      :value="true"
      absolute
      color="transparent"
    >
      <v-btn
        color="teal"
        flat
        value="recent"
      >
        <span>Recent</span>
        <v-icon>history</v-icon>
      </v-btn>

      <v-btn
        color="teal"
        flat
        value="favorites"
      >
        <span>Favorites</span>
        <v-icon>favorite</v-icon>
      </v-btn>

      <v-btn
        color="teal"
        flat
        value="nearby"
      >
        <span>Nearby</span>
        <v-icon>place</v-icon>
      </v-btn>
    </v-bottom-nav>
  </v-card>
</template>
  </div>
</template>

<script>
import { bus } from '../main'
import { db } from '../main'
export default {
  name: 'Pedido',
  data () {
    return {
      productsOrder: [],
      nombreCliente: '',
      bottomNav: 'recent'
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
    },
    addOrder: function() {
      db.collection('pedidos').add({ productos: this.productsOrderComputed, cliente: this.nombreCliente })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
