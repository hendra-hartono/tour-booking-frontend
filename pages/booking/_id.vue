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
        <Form ref="mainForm" v-model="main.form.value" />
        <v-row>
          <v-col>
            <v-btn @click="mainButtonSave()" color="primary"> Edit </v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'

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
            text: 'Edit',
          },
        ],
      },
      id: this.$route.params.id,
      main: {
        form: {
          value: null,
        },
      },
    }
  },
  mounted() {
    this.mainFormFetched()
  },
  methods: {
    mainFormFetched() {
      this.SET_LOADING(true)

      this.getBookingById(this.id)
        .then((r) => {
          this.main.form.value = r
        })
        .finally(() => {
          //this.SET_LOADING(false)
        })
    },
    mainButtonSave() {
      this.$refs.mainForm.submit()
    },
    ...mapActions('booking/form', ['getBookingById']),
    ...mapMutations('global', ['SET_LOADING']),
  },
}
</script>
