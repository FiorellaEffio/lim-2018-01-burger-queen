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
    //spinner
      <div class="wrap">
        <div class="spinner spinner-1"></div>
      </div>
    //spinner
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

      if((this.nombreCliente).trim().length !== 0 && this.productsOrderComputed.length !== 0) {
        db.collection('pedidos').add({ productos: this.productsOrderComputed, cliente: this.nombreCliente })
        alert('Hemos recibido el pedido');
      } else {
        if(this.nombreCliente.trim().length === 0) {
          alert('Ingresa tu nombre porfavor');
        }
        if(this.productsOrderComputed.length === 0) {
          alert('No has seleccionado ningún producto')
        }
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .spinner {
    width: 100px;
    height: 100px;
    background: #eee;
    border-radius: 50%;
    position: relative;
    margin: 50px;
    display: inline-block;
  }
  .spinner:after, .spinner:before {
    content: '';
    display: block;
    width: 100px;
    height:100px;
    border-radius: 50%;
  }
  .spinner:after {
    position:absolute;
    top: 0px;
    left: 0px;
    border: 4px solid transparent;
    border-top-color: orangered;
    border-bottom-color: orangered;
    animation: spinny 2s linear infinite;
  }
  @keyframes spinny {
    0%   {transform: rotate(0deg) scale(1);}
    50%  {transform: rotate(180deg) scale(1.5)}
    100% {transform: rotate(360deg) scale(1);}
  }
</style>
