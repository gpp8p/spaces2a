<template>
  <span>
      <span  :style="this.componentStyle" >
        <span :style="this.labelStyle" v-if="this.hasLabel==true">
             <label>
                {{this.groupLabel}}
             </label>
        </span>
        <span >
          <vRadio v-for="(thisRadio, index) in this.radioButtons"
                  :key="index"
                  :cmdObject = thisRadio
                  :cmdObjectVersion = cmdObjectVersion
                  :name = groupName
                  @cevt="handleEvt"
          ></vRadio>
        </span>
    </span>

  </span>
</template>

<script>
import utils from "@/components/utils";
import vRadio from "@/components/vRadio.vue";
export default {
name: "vRadioGroup",
  components: {vRadio},
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
  data(){
    return {
      radioButtons:[],
      buttonOrientation:'',
      defaultOrientation:'horozontal',
      hasLabel:false,
      groupLabel:'',
      groupName:'',
      groupLabelClass:'',
      labelStyle: '',
      componentStyle:{},
      defaultGroupLabelClass:'labelPlusInput',
      defaultButtonLabelClass: 'radioLabel',
      thisCmdObjectVersion:0
    }
  },
  created(){
//    debugger;
    this.radioButtons = this.cmdObject.radioButtons;
    this.buttonOrientation = this.cmdObject.orient;
    if(typeof(this.cmdObject.componentStyle)!='undefined'){
      this.componentStyle = this.cmdObject.componentStyle;
    }
    if(typeof(this.cmdObject.groupLabel)!='undefined'){
      this.groupLabel = this.cmdObject.groupLabel;
      this.hasLabel = true;
    }
    if(typeof(this.cmdObject.labelStyle)!='undefined'){
      this.labelStyle =  this.cmdObject.labelStyle;
    }else{
      if(this.hasLabel==true){
        this.groupLabelClass = this.defaultGroupLabelClass;
      }
    }
    this.groupName = this.cmdObject.groupName;
  },
  mounted(){
//  debugger;
    var o;
    if(typeof(this.cmdObject.buttonLabelStyle)!='undefined'){
      for(o =0; o<this.radioButtons.length; o++){
        this.radioButtons[o].labelStyle = this.cmdObject.buttonLabelStyle;
      }
    }else{
      for(o =0; o<this.radioButtons.length; o++){
        this.radioButtons[o].labelClass = this.defaultButtonLabelClass;
      }

    }
    for(o =0; o<this.radioButtons.length; o++){
      if(typeof(this.cmdObject.orient)!='undefined'){
        this.radioButtons[o].orient = this.cmdObject.orient;
      }else{
        this.radioButtons[o].orient = this.defaultOrientation;
      }
    }
//    debugger;
    for(o =0; o<this.radioButtons.length; o++){
      this.radioButtons[o].existingData = this.cmdObject.existingData;
    }
    this.cmdObjectVersion+=1;
  },
}
</script>

<style scoped>
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
