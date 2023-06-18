<template>
  <span>
     <span class="labelPlusInput"  v-if="this.hasLabel==true">
         <label :for="name" :style="labelStyle" class="defaultLabelStyle">
            {{this.fieldLabel}}
         </label>
         <span>
            <input v-model="fieldValue"
                   true-value="yes"
                   false-value="no"
                   type="checkbox"
                   :id="name"
                   ref="input"
                   @change="fieldChanged" />
         </span>
     </span>
     <span class="inputOnly" v-if="this.hasLabel==false">
         <span>
            <input v-model="fieldValue"
                   true-value="yes"
                   false-value="no"
                   type="checkbox"
                   :id="name"
                   :style="fieldStyle"
                   ref="input"
                   @change="fieldChanged" />
         </span>
     </span>
  </span>
</template>

<script>
import utils from "@/components/utils";

export default {
name: "vCheckBox",
  extends: utils,
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
  created(){
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
    }else{
      this.fieldValue='no';
    }

  },
  data(){
    return {
      fieldValue: '',
      hasLabel:false,
      fieldStyle:'',
      labelStyle:'',

    }
  },
  methods: {
    fieldChanged(){
//      debugger;
      console.log('field changed', this.fieldValue);
      this.$emit('cevt', ['fieldInput', this.name, this.fieldValue]);

    }
  },
}
</script>

<style scoped>
.defaultLabelStyle {
  color: #0a3aff;
  font-family: Arial;
  font-size: medium;
  color: #0a3aff;
}
.labelPlusInput {
  display:grid;
  width:100%;
  margin-top: 3px;
  grid-template-columns: 20% 80%;
  font-family: Arial;
  font-size: medium;
  color: #0a3aff;
}

</style>
