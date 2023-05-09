<template>
  <span>
     <span class="labelPlusInput" v-if="this.hasLabel==true">
         <span :style="labelStyle">
            {{this.fieldLabel}}
         </span>
         <span>
            <input v-model="fieldValue"
                   type="password"
                   :size="fieldSize"
                   :maxlength="fieldMaxLength"
                   ref="input"
                   @change="fieldChanged" />
         </span>
     </span>
     <span class="inputOnly" v-if="this.hasLabel==false">
         <span>
            <input v-model="fieldValue"
                   type="password"
                   :size="fieldSize"
                   :style="fieldStyle"
                   :maxlength="fieldMaxLength"
                   ref="input"
                   @change="fieldChanged" />
         </span>
     </span>
  </span>
</template>

<script>
import utils from './utils.vue';
export default {
  name: "inputNumberField",
//extends: utils,
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
  data(){
    return {
      fieldValue:'',
      fieldLabel:'',
      fieldSize:15,
      fieldMaxLength:30,
      hasLabel:false,
      fieldStyle:'',
      labelStyle:''
    }
  },
  methods: {
    fieldChanged(){
//      debugger;
      console.log('field changed', this.fieldValue);
      this.$emit('cevt', ['fieldInput', this.cmdObject.name, this.fieldValue, this.name]);

    }
  },
  created(){
//    debugger;
    var cType =  typeof this.cmdObject.hasLabel;
    if(cType != 'boolean'){
      this.hasLabel = false;
    }else if(this.cmdObject.hasLabel==false){
      this.hasLabel = false;
    }else{
      this.hasLabel = true;
      this.fieldLabel = this.cmdObject.fieldLabel;
    }
    cType = typeof this.cmdObject.fieldValue;
    if(cType !='undefined'){
      this.fieldValue = this.cmdObject.fieldValue;
    }
    cType = typeof this.cmdObject.fieldSize;
    if(cType!='undefined'){
      this.fieldSize = this.cmdObject.fieldSize;
    }
    cType = typeof this.cmdObject.fieldMaxLength;
    if(cType !='undefined'){
      this.fieldMaxLength = this.cmdObject.fieldMaxLength;
    }
    cType = typeof this.cmdObject.fieldStyle;
    if(cType!='undefined'){
      this.fieldStyle = this.cmdObject.fieldStyle;
    }
    cType = typeof this.cmdObject.labelStyle;
    if(cType!='undefined'){
      this.labelStyle = this.cmdObject.labelStyle;
    }
  },
  mounted(){
    var cType = typeof this.cmdObject.autoFocus;
    if(cType != 'boolean'){
      this.autoFocus = false;
    }else if(this.cmdObject.autoFocus==false){
      this.autoFocus = false
    }else{
      console.log('focus called')
      this.$refs.input.focus();
    }
    if(typeof(this.cmdObject.existingData)!='undefined'){
      this.fieldValue=this.cmdObject.existingData;
      this.$emit('cevt', ['fieldInput', this.cmdObject.name, this.fieldValue]);
    }
  }


}
</script>

<style scoped>
.labelPlusInput {
  display:grid;
  margin-top: 3px;
  grid-template-columns: 20% 70%;
  font-family: Arial;
  font-size: medium;
  color: #0a3aff;
}
.inputOnly {
  font-family: Arial;
  font-size: medium;
  color: #0a3aff;
}
</style>
