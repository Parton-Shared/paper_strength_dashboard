<template>
  <b-form-select
      v-model="selected"
      :options="options"
      @input="(value) => $emit('switch', value)"
      @change="(value) => $emit('switch', value)"
  />
</template>

<script>
import { BFormSelect } from 'bootstrap-vue'
import { codeStandard } from './code'

export default {
  components: {
    BFormSelect,
  },
  props: {
    data: {
      required: true,
      type: Array,
      default: () => []
    }
  },
  watch: {
    data() {
      this.data.forEach(item => {this.options.push({value:item, text:item})})
      this.selected = this.$store.getters["dashboard/getSelectedGradeName"];
    }
  },
  data() {
    return {
      selected: this.$store.getters["dashboard/getSelectedGradeName"] 
        ? [this.$store.getters["dashboard/getSelectedGradeName"]]
        : null,
      codeStandard,
      options: [
        { value: null, text: 'Please select paper type', disabled:true},
      ],
    }
  },

}
</script>
