<template>
  <v-app>
    <v-navigation-drawer
      :clipped="$vuetify.breakpoint.lgAndUp"
      v-model="navigationDrawer.value"
      app
      dark
      width="auto"
    >
      <v-list dense rounded>
        <template v-for="list in navigationDrawer.lists">
          <v-list-item-group :key="j" v-for="(item, j) in list.items">
            <template v-if="item.items.length === 0">
              <v-list-item :key="j" :to="item.to" exact link>
                <v-list-item-icon>
                  <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>
                    {{ item.text }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </template>
            <template v-else>
              <template>
                <v-list-group :key="j" active-class="white--text" no-action>
                  <template v-slot:activator>
                    <v-list-item-icon>
                      <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title>{{ item.text }}</v-list-item-title>
                    </v-list-item-content>
                  </template>
                  <template v-for="(child, k) in item.items">
                    <v-list-item
                      :key="k"
                      :to="child.to"
                      v-if="[$config.nodeEnv, 'production'].includes(child.env)"
                      active-class="white--text"
                      exact
                    >
                      <v-list-item-title>
                        {{ child.text }}
                      </v-list-item-title>
                    </v-list-item>
                  </template>
                </v-list-group>
              </template>
            </template>
          </v-list-item-group>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="$vuetify.breakpoint.lgAndUp" app dark>
      <v-app-bar-nav-icon
        @click.stop="navigationDrawer.value = !navigationDrawer.value"
      >
      </v-app-bar-nav-icon>
    </v-app-bar>
    <v-main>
      <Nuxt />
      <Loading />
      <Snackbar />
      <v-footer>
        <v-col class="text-center"> Tour Booking © 2021 </v-col>
      </v-footer>
    </v-main>
  </v-app>
</template>

<script>
export default {
  components: {
    Snackbar: () => import('~/components/base/Snackbar'),
    Loading: () => import('~/components/base/Loading'),
  },
  data() {
    return {
      navigationDrawer: {
        lists: [
          {
            items: [
              {
                env: 'production',
                icon: 'mdi-home',
                text: 'Tour',
                to: '/tour',
                items: [],
              },
              {
                env: 'production',
                icon: 'mdi-account',
                text: 'Booking',
                to: '/booking',
                items: [],
              },
            ],
          },
        ],
        value: true,
      },
    }
  },
}
</script>
