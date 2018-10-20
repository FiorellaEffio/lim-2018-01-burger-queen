<template>
  <div class="hello">
    {{products}}
  </div>
</template>

<script>
import { db } from '../main'
export default {
  name: 'HelloWorld',
  data () {
    return {
      products: []
    }
  },
  firestore () {
    return {
      products: db.collection('products').orderBy('precio')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
