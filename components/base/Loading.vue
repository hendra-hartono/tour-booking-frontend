<template>
  <v-dialog v-model="loading" persistent width="300">
    <v-card color="primary" dark>
      <v-card-text class="pt-3">
        Please wait
        <v-progress-linear
          indeterminate
          color="white"
          class="mb-0"
        ></v-progress-linear>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      loading: (state) => state.global.loading,
    }),
  },
}
</script>
