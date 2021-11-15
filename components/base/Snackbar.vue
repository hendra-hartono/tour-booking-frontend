<template>
  <v-snackbar v-model="message.value">
    <span v-html="message.text"></span>
    <template v-slot:action="{ attrs }">
      <v-btn
        @click="message.value = false"
        :color="message.button.color"
        v-bind="attrs"
        text
      >
        <v-icon v-if="message.button.color === 'success'">mdi-check</v-icon>
        <v-icon v-else>mdi-close</v-icon>
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      message: (state) => state.global.message,
    }),
  },
}
</script>
