<template>
  <div class="container">
    <v-card>
      <v-snackbar
        v-model="snackbar"
        :color="color"
        :multi-line="mode === 'multi-line'"
        :timeout="timeout"
        :vertical="mode === 'vertical'">
        {{ text }}
        <v-btn dark flat @click="snackbar = false">
          Close
        </v-btn>
      </v-snackbar>
    </v-card>
    <v-layout row>
      <v-flex xs12 offset-sm1>
        <form @submit.prevent="addOrder()">
        <v-flex xs12>
          <label for="">Ingresa tu nombre porfavor</label> <br><br>
          <v-text-field v-model="nombreCliente"
            outline
            
            prepend-icon="person"
          ></v-text-field>
  
        </v-flex>
        <br>
        <v-card>
          <v-list two-line subheader>
            <v-subheader>Tu pedido</v-subheader>

              <v-list-tile avatar v-for="product in productsOrderComputed" :key="product.nombre">
                <v-list-tile-content>
                  <v-list-tile-title>{{product.nombre}}</v-list-tile-title>
                  <v-list-tile-sub-title>Precio por unidad: {{product.precio}} / Cantidad: {{product.cantidad}}</v-list-tile-sub-title>
                </v-list-tile-content>
                <v-list-tile-action>
                  <v-btn icon ripple  @click="deleteProduct(product.nombre)" :key="product.nombre">
                    <v-icon color="grey lighten-1">delete</v-icon>
                  </v-btn>
                </v-list-tile-action>
              </v-list-tile>

          </v-list>
          <v-divider></v-divider>
          <v-list
            subheader
            two-line
          >
            <v-subheader>Total: {{totalPrice}}</v-subheader>
          </v-list>
        </v-card>
        <div class="text-xs-center">
          <v-btn round block color="orange" dark type="submit">Enviar pedido</v-btn>
        </div>
      </form>

      </v-flex>
    </v-layout>
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
      snackbar: false,
      color: '',
      mode: '',
      timeout: 5000,
      text: 'Hello, I\'m a snackbar'
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
        this.text = 'Hemos recibido el pedido';
        this.color = 'info'
        this.snackbar = true;
        this.productsOrder = [];
        this.nombreCliente = '';
      } else {
        this.color = 'error'
        if(this.nombreCliente.trim().length === 0) {
          if(this.productsOrderComputed.length === 0) {
            this.text = 'Ingresa tu nombre y selecciona por lo menos un producto';
          } else {
            this.text = 'Ingresa tu nombre porfavor';
          }
        } else {
          if(this.productsOrderComputed.length === 0) {
            this.text = 'Selecciona algún producto porfavor'
          }
        }

        this.snackbar = true;
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
