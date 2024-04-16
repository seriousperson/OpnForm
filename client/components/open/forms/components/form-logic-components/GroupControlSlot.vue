<template>
  <div class="flex flex-wrap px-4 py-1 -ml-1 -mt-1">
    <select-input ref="ruleSelect" v-model="selectedRule" class="flex-grow ml-1 mr-1 mt-1"
                  wrapper-class="relative" placeholder="Add condition on input field"
                  :options="filteredRules" margin-bottom="" :searchable="groupCtrl.rules.length > 5"
                  emit-key="identifier"
                  option-key="identifier"
                  name="group-control-slot-rule"
    />
    <v-button class="ml-1 mt-1" color="blue" size="small" :disabled="(selectedRule === '')?true:null" @click="addRule">
      Add Condition
    </v-button>
    <v-button class="ml-1 mt-1" color="outline-blue" size="small" @click="groupCtrl.newGroup">
      Add Group
    </v-button>
  </div>
</template>

<script>
import { useDevHelper } from '~/helper/useDevHelper'

export default {
  components: {},
  props: { groupCtrl: { type: Object, required: true } },
  data () {
    return {
      selectedRule: null
    }
  },
  computed: {
    // Filter rules array to exclude rules with types "price", "multi_price", and "select_price"
    filteredRules() {
      return this.groupCtrl.rules.filter(rule => !['price', 'multi_price', 'select_price'].includes(rule.type));
    }
  },
  methods: {
    addRule () {
      if (this.selectedRule) {
        this.groupCtrl.addRule(this.selectedRule)
        this.$refs.ruleSelect.content = null
        this.selectedRule = null
      }
    }
  },
  mounted(){
    useDevHelper('options', this.groupCtrl);
  }

}
</script>
