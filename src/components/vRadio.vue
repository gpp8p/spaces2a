<template>
  <span>

      <input type="radio"
             :name="groupName"
             :checked="isSelected"
             id="theRadio"
             :value="cmdObject.val"
             @change="buttonChanged"

      >
      <span>
           <label :for="theRadio" :style="this.cmdObject.labelStyle">
              {{this.fieldLabel}}
           </label>
      </span>
      <span v-if="this.cmdObject.orient=='vertical'">
        <br/>
      </span>
  </span>

</template>

<script>
import utils from "@/components/utils";
export default {
name: "vRadio",
  mixins:[utils],
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
  mounted(){
    this.fieldLabel = this.cmdObject.fieldLabel;
    this.labelStyle = this.cmdObject.buttonLabelStyle;
    this.groupName = this.name;


  },
  data(){
    return {
      isSelected:false,
      fieldLabel:'',
      groupName:'',
      labelStyle:''
    }
  },
  methods:{
    buttonChanged(){
//      debugger;
      this.$emit('cevt', ['fieldInput', this.name, this.cmdObject.val]);
    }
  },
  watch:{
    cmdObjectVersion: function () {
//      debugger;
      if(typeof(this.cmdObject.existingData)!='undefined'){
        if(this.cmdObject.val==this.cmdObject.existingData){
          this.isSelected=true;
        }else{
          this.isSelected=false;
        }
      }
    }
  }
}
</script>

<style scoped>
.radioLabel {
  font-family: Candara;
  font-size: 18px;
}


</style>
