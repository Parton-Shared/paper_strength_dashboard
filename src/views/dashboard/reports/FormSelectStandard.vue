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
    on: {
      type: String,
      required: true,
      default: () => "",
    },
    data: {
      type: Array,
      required: true,
      default: () => [],
    }
  },
  watch: {
    data() {
      this.options = this.options.slice(0, 1);
      this.data.forEach(item => {this.options.push({value:item, text:item})})
      this.selected = this.$store.getters[`dashboard/getSelected${this.on}`];
    }
  },
  data() {
    return {
      selected: this.$store.getters[`dashboard/getSelected${this.on}`] 
        ? [this.$store.getters[`dashboard/getSelected${this.on}`]]
        : null,
      codeStandard,
      options: [
        { value: null, text: 'Please select production type', disabled:true},
      ],
    }
  },
}
</script>
