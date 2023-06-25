<template>
  <span>
    <span v-if="this.hasLabel==true" :class="selectClass">
      <span   >
           <label :for="theSelect" :style="labelStyle" :class="labelClass">
              {{this.fieldLabel}}
           </label>
      </span>
      <select :size="this.selectSize" id="theSelect" :multiple="multiple" @change="itemSelected">
        <option v-if="this.selectSize==0">Please Select</option>
        <v-option v-for="(thisOption, index) in this.selectOptions"
                  :key="index"
                  :cmdObject = thisOption
                  :cmdObjectVersion = thisCmdObjectVersion
                  :name = thisOption.val
        ></v-option>
      </select>
    </span>
    <span v-if="this.hasLabel==false">
      <select :size="this.selectSize" :multiple="multiple" class="selectStyle">
        <option v-if="this.selectSize==0"  class="optionStyle">Please Select</option>
        <v-option v-for="(thisOption, index) in this.selectOptions"
                  :key="index"
                  :cmdObject = thisOption
                  :cmdObjectVersion = thisCmdObjectVersion
                  :name = thisOption.val
                  class="optionStyle"
        ></v-option>
      </select>
    </span>

  </span>
</template>

<script>
import utils from "@/components/utils";
import vOption from "../components/option2.vue";
export default {
  name: 'vSelect',
  components: {vOption},
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
  created(){
    let cType =  typeof this.cmdObject.hasLabel;
    if(cType != 'boolean'){
      this.hasLabel = false;
    }else if(this.cmdObject.hasLabel==false){
      this.hasLabel = false;
    }else{
      this.hasLabel = true;
      this.fieldLabel = this.cmdObject.fieldLabel;
    }
  },
  mounted(){
//    debugger;
    var o;
    this.selectOptions = this.cmdObject.options;

    if(typeof(this.cmdObject.fieldValue)!='undefined'){
      for(o =0; o<this.selectOptions.length; o++){
        this.selectOptions[o].existingData = this.cmdObject.fieldValue;
      }
      console.log('select sets - ',this.cmdObject.existingData);
      console.log(this.selectOptions);
    }


    if(typeof(this.cmdObject.style)!='undefined'){
      for(o =0; o<this.selectOptions.length; o++){
        this.selectOptions[o].style = this.cmdObject.style;
      }
//      console.log(this.selectOptions);
    }
    if(typeof(this.cmdObject.size)!='undefined'){
      this.selectSize = this.cmdObject.size;
    }else{
      this.selectSize = 0;
    }
    if(typeof(this.cmdObject.class)!='undefined'){
      this.selectClass= this.cmdObject.class;
    }else{
      this.selectClass="labelPlusInput";
    }
    if(typeof(this.cmdObject.multiple)!='undefined'){
      this.multiple = this.cmdObject.multiple;
    }
    if(typeof(this.cmdObject.labelStyle)!='undefined'){
      this.labelStyle =  this.cmdObject.labelStyle;
    }else{
      if(this.hasLabel==true){
        this.labelClass = this.defaultLabelClass;
      }
    }
    if(typeof(this.cmdObject.name)!='undefined'){
      this.itemName = this.cmdObject.name;
    }else{
      this.itemName = 'itemSelect';
    }
  },
  methods:{
    itemSelected(evt){
      console.log('itemSelected',evt.target.value);
      this.$emit('cevt',['fieldInput', this.itemName, evt.target.value]);
    }
  },
  data(){
    return {
      selectOptions:[],
      selectCurrentValue:'',
      thisCmdObjectVersion:0,
      selectSize:0,
      hasLabel:false,
      fieldLabel:'',
      multiple:false,
      labelStyle:{},
      labelClass:'',
      itemName:'',
      defaultLabelClass:'labelPlusInput'
    }
  }
}
</script>

<style scoped>
.labelPlusInput {
  display:grid;
  margin-top: 3px;
  grid-template-columns: 20% 30%;
  font-family: Arial;
  font-size: medium;
  color: #0a3aff;
}

.selectStyle {
  display: block;
  margin-left: auto;
  margin-right: auto;
  border-width: 2px;
  border-color: red;
  width: 98%;
  font-size: 10px;
}

.optionStyle{
  font-size: xx-large;

}
</style>
