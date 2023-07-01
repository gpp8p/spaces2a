<template>
    <option class="optStyle" :value="this.val" :selected="this.isSelected==true" :disabled="this.isDisabled==true">{{this.label}}</option>
</template>

<script>
export default {
name: "vOption",
  props: {
    cmdObject: {
      type: Object,
      required: false
    },
    cmdObjectVersion: {
      type: Number,
      required: false
    },
    name:{
      type: String,
      required: false
    }
  },
  created() {
    this.setupOption();
  },
  methods: {
    setupOption() {
  //    debugger;
      console.log('options setup-', this.cmdObject);
      if (typeof (this.cmdObject.style) != 'undefined') {
        this.optionStyle=this.cmdObject.style;
      }else{
        this.optionStyle="normal";
      }
      if (typeof (this.cmdObject.existingData) != 'undefined') {
        this.currentValue = this.cmdObject.existingData;
        this.currentValueDefined=true;
      }else{
        this.currentValueDefined=false;
      }
      if (typeof (this.cmdObject.val) != 'undefined') {
        this.valDefined = true;
        this.val = this.cmdObject.val;
      }
      if (typeof (this.cmdObject.isDisabled) != 'undefined') {
        this.isDisabled = this.cmdObject.isDisabled;
      } else {
        this.isDisabled = false;
      }
      if (typeof (this.cmdObject.val) == 'undefined') {
        this.label = 'Error no value';
      }else{
        this.val = this.cmdObject.val;
      }
      if (typeof (this.cmdObject.label) == 'undefined') {
        this.label = "Error - no label";
      }else{
        this.label = this.cmdObject.label;
      }
      if (this.isDisabled == true) {
        this.pOptions = this.NOT_SELECTED_DISABLED;
      } else {
        if (this.valDefined == true) {
          if (this.currentValueDefined == true) {
            if (this.val == this.currentValue) {
              this.isSelected=true;
              this.pOptions = this.SELECTED_NOT_DISABLED;
            } else {
              this.isSelected=false;
              this.pOptions = this.NOT_SELECTED
            }
          } else {
            this.pOptions = this.NOT_SELECTED;
          }
        } else {
          this.pOptions = this.NOT_SELECTED_DISABLED;
        }
      }
    },
  },
  data() {
    return {
      val: '',
      valDefined: false,
      label: '',
      currentValue: '',
      currentValueDefined: false,
      isDisabled: false,
      isSelected:false,
      optionStyle:'',
      pOptions: 0,
      SELECTED_NOT_DISABLED: 1,
      SELECTED_DISABLED: 2,
      NOT_SELECTED_DISABLED: 3,
      NOT_SELECTED: 4
    }
  }
}
</script>

<style scoped>

.optStyle {
  background-color: bisque;
}
.optStyle:hover {
  background-color: red;
}

.small {
  font-size: 10px;
}
.normal {
  font-size: 12px;
}
.big {
  font-size: 20px;
}
</style>
