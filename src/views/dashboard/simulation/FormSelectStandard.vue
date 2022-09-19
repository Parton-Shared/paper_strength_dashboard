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
        { value: null, text: 'Please select paper type' },
        { value: 'a', text: '5225816' },
        { value: 'b', text: '5225817' },
        { value: 'c', text: '5225818' },
      ],
    }
  },
}
</script>
