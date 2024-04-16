<template>
  <input-wrapper
    v-bind="inputWrapperProps"
  >
    <template #label>
      <slot name="label" />
    </template>
    <input :id="id?id:name" v-model="compVal" :readonly="readonly" 
           :type="nativeType" :autocomplete="autocomplete"
           :pattern="pattern"
           :style="inputStyle"
           :class="[theme.default.input, { '!ring-red-500 !ring-2 !border-transparent': hasError, '!cursor-not-allowed !bg-gray-200': disabled }]"
           :name="name" :accept="accept"
           :placeholder="placeholder" :min="min" :max="max" :maxlength="maxCharLimit"
           @change="onChange" @keydown.enter.prevent="onEnterPress"
    >

    <template #help>
      <slot name="help" />
    </template>

    <template
      v-if="maxCharLimit && showCharLimit"
      #bottom_after_help
    >
      <small :class="theme.default.help">
        {{ charCount }}/{{ maxCharLimit }}
      </small>
    </template>

    <template #error>
      <slot name="error" />
    </template>
  </input-wrapper>
</template>

<script>
import { inputProps, useFormInput } from './useFormInput.js'
import InputWrapper from './components/InputWrapper.vue'
import { useDevHelper } from '~/helper/useDevHelper.js'

export default {
  name: 'TextInput',
  components: { InputWrapper },

  props: {
    ...inputProps,
    nativeType: { type: Number, default: 'number' },
    accept: { type: Number, default: null },
    min: { type: Number, required: false, default: null },
    max: { type: Number, required: false, default: null },
    autocomplete: { default: null },
    maxCharLimit: { type: Number, required: false, default: null },
    showCharLimit: { type: Boolean, required: false, default: false },
    pattern: { type: String, default: null },
    fieldType: {type: String, default: null},
    prefillValue: {type: String, default: null}
  },

  setup (props, context) {

    // onMounted(() => {
    //   setTimeout(() => {
    //     useDevHelper('PriceInput -> mounted: ', props.prefillValue);
    //     context.emit('calculate-total', props.compVal);
    //   }, 5000); // Delay for 2000 milliseconds (2 seconds)
    // });

    const onChange = (event) => {
      if (props.nativeType !== 'file') return

      const file = event.target.files[0]
      // eslint-disable-next-line vue/no-mutating-props
      props.form[props.name] = file
    }

    const onEnterPress = (event) => {
      event.preventDefault()
      return false
    }

    return {
      ...useFormInput(props, context, props.nativeType === 'file' ? 'file-' : null),
      onEnterPress,
      onChange
    }
  },
  computed: {
    charCount () {
      return (this.compVal) ? this.compVal.length : 0
    }
  },
  mounted(){
    useDevHelper('PriceInput -> mounted: ', this.prefillValue);
    this.$emit('calculate-total', this.prefillValue)
  }
}
</script>
