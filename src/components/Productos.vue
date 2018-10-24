<template>
  <div class="container">
      <div id="navProducts">
        <v-app id="inspire">
          <v-card height="200px" flat>
            <div class="headline text-xs-center pa-5">
              <div v-if="bottomNav === 'desayuno'">
                <br><br><br>
                <br><br><br>
                <h2>desayuno</h2>
                <div v-for="(product, nombre) in breakfastProducts" :key="nombre">
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
              </div>
              <div v-if="bottomNav === 'allday'">
                <br><br><br>
                <br><br><br>
                <h1>resto del dia</h1>
                <div v-for="(product, nombre) in allDayProducts" :key="nombre">
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
              
              </div>
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
                value="desayuno"
              >
                <span>Desayuno</span>
                <v-icon>local_cafe</v-icon>
              </v-btn>
              <v-btn
                color="teal"
                flat
                value="allday"
              >
                <span>Resto del día</span>
                <v-icon>fastfood</v-icon>
              </v-btn>
            </v-bottom-nav>
          </v-card>
        </v-app>
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
      allday: false,
      bottomNav: 'desayuno'
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
