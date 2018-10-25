<template>
  <div class="container">
      <div id="navProducts">
        <v-app id="inspire">
          <v-card height="200px" flat>
            <div class="headline text-xs-center pa-5">
              <div v-if="bottomNav === 'desayuno'">
                <br><br><br>
                <br><br><br>
                <v-layout row>
                  <v-flex xs12>
                    <v-card>
                      <v-toolbar color="orange" dark>
                        <v-toolbar-title class="text-xs-center">Desayuno</v-toolbar-title>
                      </v-toolbar>
                      <v-list two-line subheader>
                        <v-subheader>Hasta las 11:00am</v-subheader>
                        <v-list-tile
                          v-for="(product, nombre) in breakfastProducts" :key="nombre"
                          avatar
                          @click=""
                        >
                          <v-list-tile-avatar>
                            <img :src="product.src">
                          </v-list-tile-avatar>
              
                          <v-list-tile-content>
                            <v-list-tile-title v-html="product.nombre"></v-list-tile-title>
                            <v-list-tile-sub-title>Precio: {{product.precio}}</v-list-tile-sub-title>
                          </v-list-tile-content>
              
                          <v-list-tile-action>
                            <button @click="passToOrder(product)"><v-icon color="blue">add_shopping_cart</v-icon></button>
                          </v-list-tile-action>
                        </v-list-tile>
                      </v-list>
                    </v-card>
                  </v-flex>
                </v-layout>
              </div>

              
              <div v-if="bottomNav === 'allday'">
                <br><br><br>
                <br><br><br>
                <v-layout row>
                  <v-flex xs12>
                    <v-card>
                      <v-toolbar color="orange" dark>
                        <v-toolbar-title class="text-xs-center">Resto del día</v-toolbar-title>
                      </v-toolbar>
                      <v-list two-line subheader>
                        <v-subheader>De 11:00am a 12:00pm</v-subheader>
                        <v-list-tile
                          v-for="(product, nombre) in allDayProducts" :key="nombre"
                          avatar
                          @click=""
                        >
                          <v-list-tile-avatar>
                            <img :src="product.src">
                          </v-list-tile-avatar>
              
                          <v-list-tile-content>
                            <v-list-tile-title v-html="product.nombre"></v-list-tile-title>
                            <v-list-tile-sub-title>Precio: {{product.precio}}</v-list-tile-sub-title>
                          </v-list-tile-content>
              
                          <v-list-tile-action>
                            <button @click="passToOrder(product)"><v-icon color="blue">add_shopping_cart</v-icon></button>
                          </v-list-tile-action>
                        </v-list-tile>
                      </v-list>
                    </v-card>
                  </v-flex>
                </v-layout>
                
              
              </div>
            </div>
            <v-bottom-nav
              :active.sync="bottomNav"
              :value="true"
              absolute
              color="transparent"
            >
              <v-btn
                color="blue"
                flat
                value="desayuno"
              >
                <span>Desayuno</span>
                <v-icon>local_cafe</v-icon>
              </v-btn>
              <v-btn
                color="blue"
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
