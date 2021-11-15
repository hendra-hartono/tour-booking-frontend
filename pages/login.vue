<template>
  <v-container class="fill-height">
    <v-row align="center" justify="center">
      <v-col cols="12" md="4" sm="8">
        <v-card class="elevation-12">
          <v-card-title class="justify-center">
            Login to Dashboard
          </v-card-title>
          <v-card-text>
            <v-form @submit.prevent="submit()">
              <v-text-field
                :error="form.field.email.error"
                :error-messages="form.field.email.errorMessages"
                v-model="form.field.email.value"
                clearable
                dense
                outlined
              >
                <template v-slot:label>Email *</template>
              </v-text-field>
              <v-text-field
                v-model="form.field.password.value"
                @click:append="
                  form.field.password.typePassword =
                    !form.field.password.typePassword
                "
                :append-icon="
                  form.field.password.typePassword ? 'mdi-eye-off' : 'mdi-eye'
                "
                :error="form.field.password.error"
                :error-messages="form.field.password.errorMessages"
                :type="form.field.password.typePassword ? 'password' : 'text'"
                clearable
                dense
                outlined
              >
                <template v-slot:label> Password * </template>
              </v-text-field>
              <v-btn block color="primary" type="submit"> LOGIN </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mdiEyeOutline, mdiEyeOffOutline } from '@mdi/js'
import { mapMutations } from 'vuex'

export default {
  layout: 'blank',
  middleware: ['guest'],
  data() {
    return {
      form: {
        field: {
          email: {
            error: false,
            errorMessages: [],
            value: 'henordra@gmail.com',
          },
          password: {
            error: false,
            errorMessages: [],
            typePassword: true,
            value: 'password',
          },
        },
      },
    }
  },
  methods: {
    ...mapMutations('global', [
      'SET_ERROR_MESSAGE',
      'SET_SUCCESS_MESSAGE',
      'SET_LOADING',
    ]),
    submit() {
      this.SET_LOADING(true)
      this.errorReset()

      const data = {
        email: this.form.field.email.value,
        password: this.form.field.password.value,
      }

      this.$store
        .dispatch('auth/login', data)
        .then((r) => {
          this.$router.push({ name: 'booking' })
          this.SET_SUCCESS_MESSAGE('Successfully Logged In')
        })
        .catch((e) => {
          if (e.response.data.errors !== undefined) {
            e.response.data.errors.forEach((error) => {
              if (error.field !== undefined) {
                this.form.field[error.field].error = true
                this.form.field[error.field].errorMessages = error.message
              }
            })
            this.SET_ERROR_MESSAGE(
              e.response.data.errors.map((e) => e.message).join('<br />')
            )
          }
        })
        .finally(() => {
          this.SET_LOADING(false)
        })
    },
    errorReset() {
      Object.keys(this.form.field).forEach((f) => {
        this.form.field[f].error = false
        this.form.field[f].errorMessages = []
      })
    },
    reset() {
      Object.keys(this.form.field).forEach((f) => {
        this.form.field[f].value = this.form.field[f].default
      })
    },
  },
}
</script>