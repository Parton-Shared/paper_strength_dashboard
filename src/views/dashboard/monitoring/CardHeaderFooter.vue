<template>
  <!-- card 1 -->
  <b-card
      class="bg-gradient-secondary"
  >
    <b-card-title class="text-white">
      <h2 class="text-white mt-2 mb-2">Data ready for you</h2>
    </b-card-title>
    <b-card-text>
      With supporting text below as a natural lead-in to additional content natural lead-in to additional content.
    </b-card-text>
    <b-button
        v-ripple.400="'rgba(113, 102, 240, 0.15)'"
        variant="success"
        :to="{ path: 'simulation' }"
    >
      Go Simulate
    </b-button>

    <div class="text-white mt-4 text-bold">
      <feather-icon
          icon="InfoIcon"
          size="24"
      />
      About the paramters
    </div>
    <b-card-text
    class="text-white mt-2">
      With supporting text below as a natural lead-in to additional content natural lead-in to additional content.
    </b-card-text>
  </b-card>
</template>

<script>
import {
  BCard, BRow, BCol, BCardText, BButton, BCardTitle,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'

export default {
  components: {
    BCard, BRow, BCol, BCardText, BButton, BCardTitle,
  },
  directives: {
    Ripple,
  },
}
</script>
