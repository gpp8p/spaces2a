<template>
  <span class="optionText">
    <option :value = "this.val"  v-if="this.pOptions==this.NOT_SELECTED">{{this.label}}</option>
    <option :value = "this.val"  v-if="this.pOptions==SELECTED_NOT_DISABLED" selected>{{this.label}}</option>
    <option :value = "this.val"  v-if="this.pOptions==NOT_SELECTED_DISABLED" disabled>{{this.label}}</option>
  </span>

</template>

<script>
import utils from '../components/utils.vue';
export default {
  name: "vOption",
  mixins: [utils],
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
  mounted() {
    debugger;
    this.setupOption();
  },
  methods:{
    setupOption() {
      debugger;
      if (typeof (this.cmdObject.existingData) != 'undefined') {
        this.currentValue = this.cmdObject.existingData;
        this.currentValueDefined=true;
      }else{
        this.currentValueDefined=false;
      }
      if (typeof (this.cmdObject.val) != 'undefined'){
        this.valDefined=true;
        this.val=this.cmdObject.val;
      }
      if (typeof (this.cmdObject.isDisabled) != 'undefined') {
        this.isDisabled = this.cmdObject.isDisabled;
      }else{
        this.isDisabled = false;
      }
      if (typeof (this.cmdObject.val) != 'undefined') {
        this.label = 'Error no value';
      }
      if (typeof (this.cmdObject.val) != 'undefined'){
        this.label = "Error no label";
      }
      if(this.isDisabled==true){
        if(this.valDefined==true){
          this.pOptions = this.NOT_SELECTED_DISABLED;
        }else{
          this.pOptions = this.NOT_SELECTED_DISABLED;
        }
      }else{
        debugger;
        if(this.valDefined==true){
          if(this.currentValueDefined==true){
            if(this.val==this.currentValue){
              this.pOptions = this.SELECTED_NOT_DISABLED;
            }else{
              this.pOptions = this.NOT_SELECTED
            }
          }else{
            this.pOptions = this.NOT_SELECTED;
          }
        }else{
          this.pOptions = this.NOT_SELECTED_DISABLED;
        }
      }
    },
    handleCmd(cmdObject){
      console.log('cmdObjectVersion has changed in option', cmdObject);
      this.setupOption();
    }
  },
  data(){
    return {
      val: '',
      valDefined:false,
      label: '',
      currentValue: '',
      currentValueDefined:false,
      isDisabled: false,
      pOptions:0,
      SELECTED_NOT_DISABLED:1,
      SELECTED_DISABLED:2,
      NOT_SELECTED_DISABLED:3,
      NOT_SELECTED:4
    }
  }
}
</script>

<style scoped>


</style>
