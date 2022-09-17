<template>
  <b-form-select
      v-model="selected"
      :options="options"
  />
</template>

<script>
import { BFormSelect } from 'bootstrap-vue'
import { codeStandard } from './code'

export default {
  components: {
    BFormSelect,
  },
  data() {
    return {
      selected: null,
      codeStandard,
      options: [
        { value: null, text: 'Please select production type' },
        { value: 'a', text: 'FL80' },
        { value: 'b', text: 'TL90' },
      ],
    }
  },
}
</script>
