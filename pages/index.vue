<template>
  <v-row>
    <v-col cols="12" md="4">
      <v-card>
        <v-card-title>Dashboard</v-card-title>
      </v-card>
    </v-col>

    <v-col cols="12" md="8">
      <v-card>
        <v-card-title>Dashboard</v-card-title>
      </v-card>
    </v-col>

    <v-col cols="12" sm="6" md="4">
      <v-card>
        <v-card-title>Dashboard</v-card-title>
      </v-card>
    </v-col>

    <v-col cols="12" md="4" sm="6">
      <v-card>
        <v-card-title>Dashboard</v-card-title>
      </v-card>
    </v-col>

    <v-col cols="12" md="4">
      <v-card>
        <v-card-title>Dashboard</v-card-title>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  middleware: ['auth'],
}
</script>