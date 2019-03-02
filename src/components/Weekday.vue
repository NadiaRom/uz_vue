<template>
  <div class="weekday">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  name: 'Weekday',
  props: {
    msg: String
  }
}
</script>