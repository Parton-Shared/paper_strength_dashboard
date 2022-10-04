<template>
  <b-card v-if="data" no-body>
    <b-card-body class="d-flex justify-content-between align-items-center">
      <div class="truncate">
        <span>Mx Jumbo ID</span>
        <h1 class="mb-25 font-weight-bolder">
          {{ data.mx_jumbo_id }}
        </h1>
      </div>
      <b-avatar
        :variant="`success`"
        size="45"
      >
        <feather-icon
          size="21"
          :icon="icon"
        />
      </b-avatar>
    </b-card-body>
  </b-card>
</template>

<script>
import { BCard, BCardBody, BAvatar } from 'bootstrap-vue'

export default {
  components: {
    BCard,
    BCardBody,
    BAvatar,
  },
  props: {
    icon: {
      type: String,
      required: true,
    },
    data: {
      type: Object,
      required: true,
      default: () => {},
    },
    color: {
      type: String,
      default: 'primary',
    },
  },
}
</script>
