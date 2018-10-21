<template>
  <div class="container">
    <ul class="collapsible popout">
      <li>
        <div class="collapsible-header"><i class="material-icons">filter_drama</i>First</div>
        <div class="collapsible-body"><span>
          <div class="" v-for="(product, nombre) in allDayProducts" :key="nombre">
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
                  <a href="#">This is a link</a>
                </div>
              </div>
            </div>
          </div>
        </span>
        </div>
      </li>
      <li>
        <div class="collapsible-header"><i class="material-icons">place</i>Second</div>
        <div class="collapsible-body"><span>Resto del día.</span></div>
      </li>
    </ul>

      <div class="" v-for="(product, nombre) in allDayProducts" :key="nombre">
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
              <a href="#">This is a link</a>
            </div>
          </div>
        </div>
      </div>

  </div>
</template>

<script>
import { db } from '../main'
export default {
  name: 'Productos',
  data () {
    return {
      products: []
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
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
