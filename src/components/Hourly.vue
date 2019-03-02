<template>
  <figure id="hourly">
    <h1>{{ msg }}</h1>
  </figure>
</template>

<script>
export default {
  name: 'Hourly',
  props: {
    msg: String
  }
}
</script>