<template>
  <v-container fluid>
    <v-row no-gutters>
      <v-col>
        <v-card>
          <v-breadcrumbs :items="breadcrumbs.items"></v-breadcrumbs>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <Form ref="mainForm" />
        <v-row>
          <v-col>
            <v-btn @click="mainButtonSave()" color="primary"> Save </v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  middleware: ['auth'],
  components: {
    Form: () => import('~/components/booking/Form'),
  },
  data() {
    return {
      breadcrumbs: {
        items: [
          {
            exact: true,
            text: 'Booking',
            to: {
              name: 'booking',
            },
          },
          {
            text: 'Create',
          },
        ],
      },
    }
  },
  methods: {
    mainButtonSave() {
      this.$refs.mainForm.submit()
    },
  },
}
</script>