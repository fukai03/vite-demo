<script setup>
import { ref } from 'vue'
import { debounce, throttle } from 'lodash-es'

defineProps({
  msg: String,
})

const count = ref(0)

const countFunc = throttle((e) => {
  console.log(e.target);
  count.value++;
},4000)

</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <button type="button" class="1" @click="countFunc">count is {{ count }}</button>
    <button type="button" class="2" @click="countFunc">count is {{ count*2 }}</button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR?
    </p>
  </div>

  <p>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
      >create-vue</a
    >, the official Vue + Vite starter
  </p>
  <p>
    Install
    <a href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a>
    in your IDE for a better DX
  </p>
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
button {
  margin: 10px;
}
</style>
