<template>
  <div class="container">
    <button v-on:click="desayuno = !desayuno, allday = !allday">Desayuno o Allday</button>
      <div v-if="desayuno" v-for="(product, nombre) in breakfastProducts" :key="nombre">
        <div class="col s12 m6">
          <div class="card">
            <div class="card-image">
              <img width="100px" :src="product.src">
              <span class="card-title black-text">{{product.nombre}}</span>
            </div>
            <div class="card-content">
              <p>Precio: S./{{product.precio}}</p>
            </div>
            <div class="card-action">
              <button @click="passToOrder(product)">Agregar al carrito</button>
            </div>
          </div>
        </div>
      </div>
      <div v-if="allday" v-for="(product, nombre) in allDayProducts" :key="nombre">
        <div class="col s12 m6">
          <div class="card">
            <div class="card-image">
              <img width="100px" :src="product.src">
              <span class="card-title black-text">{{product.nombre}}</span>
            </div>
            <div class="card-content">
              <p>Precio: S./{{product.precio}}</p>
            </div>
            <div class="card-action">
              <button @click="passToOrder(product)">Agregar al carrito</button>
            </div>
          </div>
        </div>
      </div>
      <div v-else>

      </div>
  </div>
</template>

<script>
import { db } from '../main'
import { bus } from '../main'
export default {
  name: 'Productos',
  data () {
    return {
      products: [],
      desayuno: true,
      allday: false
    }
  },
  firestore () {
    return {
      products: db.collection('products').orderBy('precio')
    }
  },
  computed: {
    breakfastProducts: function() {
      let result = [];
      this.products.forEach((element) => {
        if(element.tipo === 'desayuno') {
          result.push(element);
        }
      })
      return result;
    },
    allDayProducts: function() {
      let result = [];
      this.products.forEach((element) => {
        if(element.tipo === 'allday') {
          result.push(element);
        }
      })
      return result;
    }
  },
  methods: {
    passToOrder: function(element) {
      console.log(element);
      bus.$emit('orderProducts', element);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
