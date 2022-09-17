<template>
  <b-card class="text-center">
    <b-avatar
      class="mb-1"
      :variant="`light-${color}`"
      size="48"
    >
      <feather-icon
        size="24"
        :icon="icon"
      />
    </b-avatar>
    <div class="truncate">
      <h3 class="mb-25 font-weight-bolder">
        {{ statistic }}
      </h3>
      <h3 class="display-4">{{ statisticTitle }}</h3>
    </div>
  </b-card>
</template>

<script>
import { BCard, BAvatar } from 'bootstrap-vue'

export default {
  components: {
    BCard,
    BAvatar,
  },
  props: {
    icon: {
      type: String,
      required: true,
    },
    statistic: {
      type: [Number, String],
      required: true,
    },
    statisticTitle: {
      type: String,
      default: '',
    },
    color: {
      type: String,
      default: 'primary',
    },
  },
}
</script>
