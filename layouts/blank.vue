<template>
  <v-app>
    <v-main>
      <Nuxt />
      <Loading />
      <Snackbar />
    </v-main>
  </v-app>
</template>

<script>
export default {
  components: {
    Snackbar: () => import('~/components/base/Snackbar'),
    Loading: () => import('~/components/base/Loading'),
  },
}
</script>
