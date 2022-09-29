<template>
  <b-card v-if="data" class="text-center">
    <b-avatar
      class="mb-1"
      :variant="`light-${color}`"
      size="72"
    >
      <feather-icon
        size="32"
        :icon="icon"
      />
    </b-avatar>
    <div class="truncate">
      <h3 class="mb-25 font-weight-bolder">
        {{ data.name }}
      </h3>
      <h1 class="display-3">{{ data.value }}</h1>
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
    data: {
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
