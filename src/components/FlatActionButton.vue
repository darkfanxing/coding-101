<template>
  <v-speed-dial
      fixed
      v-model="fab"
      top
      right
      direction="bottom"
      transition="slide-y-reverse-transition"
      class="text-right"
    >
      <template v-slot:activator>
        <v-btn
          v-model="fab"
          color="blue darken-2"
          dark
          fab
          class="v-btn--example"
        >
          <v-icon v-if="fab">mdi-close</v-icon>
          <v-icon v-else>mdi-swap-horizontal</v-icon>
        </v-btn>
      </template>

      <v-btn
        fab
        dark
        small
        color="teal lighten-2"
        @click="changePage('data')"
      >
        <v-icon>mdi-feature-search-outline</v-icon>
      </v-btn>
      <v-btn
        fab
        dark
        small
        :color="btn.color"
        v-for="(btn, index) in btns"
        :key="`btn-${index}`"
        @click.once="changePage(btn.name)"
      >
        {{ btn.name }}
      </v-btn>
    </v-speed-dial>
</template>

<script>
import EventBus from '@/plugins/event-bus'

export default {
  data: () => ({
    fab: false,
    fling: false,
    tabs: null,
    btns: [
      {
        name: "AGV1",
        color: "blue darken-1"
      },
      {
        name: "AGV2",
        color: "red darken-1"
      },
      {
        name: "AGV3",
        color: "indigo darken-1"
      },
      {
        name: "AGV4",
        color: "green darken-1"
      },
    ]
  }),
  methods: {
    changePage(page) {
      EventBus.$emit("changePage", page.toLowerCase())
    }
  }
}
</script>
