<template>
  <div v-if="user">
    {{ user.email }}
  </div>
</template>

<script>
export default {
  name: 'ProfileContainer',
  props: {
    user: {
      type: Object,
      default: null
    }
  }
}
</script>

<style></style>
