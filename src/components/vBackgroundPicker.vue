<template>
  <div :style="componentStyle">
    <div :style="cmdObject.labelStyle">
            {{cmdObject.fieldLabel}}
    </div>
    <div>
      <v-radio-group :cmdObject="cmdObject.styles.backGroundRadioGroupStyle"
                     name="backgroundType"
                     :cmdObjectVersion="cmdVersion"
                     @cevt="handleEvt"
      ></v-radio-group>
      <input type="color"  :value = "colorValue" v-if="this.backgroundType==this.BACKGROUND_COLOR" @change="colorSelect"/>
      <input type="file" id="file" ref="file" v-if="this.backgroundType==this.BACKGROUND_IMAGE" v-on:change="handleFileUpload()"/>
    </div>
  </div>
</template>

<script>
import utils from "@/components/utils";
import vRadioGroup from "@/components/vRadioGroup";
export default {
  name: "vBackgroundPicker",
  components: { vRadioGroup },
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
    name: {
      type: String,
      required: false
    }
  },
  mounted(){
//    debugger;
    this.backgroundCmdObject = this.cmdObject;
    if(typeof(this.cmdObject.hasLabel)!='undefined'){
      this.hasLabel = this.cmdObject.hasLabel;
    }
    if(this.hasLabel==true){
      if(typeof(this.cmdObject.labelStyle)!='undefined'){
        this.labelStyle =  this.cmdObject.labelStyle;
      }else{
        this.labelClass = this.defaultLabelClass;
      }
    }

    if(typeof(this.cmdObject.fieldLabel)!='undefined'){
      this.fieldLabel = this.cmdObject.fieldLabel;
    }else{
      if(this.hasLabel==true){
        this.fieldLabel = this.defaultLabel;
      }
    }
    if(typeof(this.cmdObject.styles.componentStyle)!='undefined'){
      this.componentStyle = this.cmdObject.styles.componentStyle;
    }else{
      this.componentStyle = this.defaultcomponentStyle;
    }
    let r;
    if(typeof(this.cmdObject.styles.backGroundRadioGroupStyle)!='undefined'){
//      debugger;
      this.backGroundRadioGroupStyle = this.cmdObject.styles.backGroundRadioGroupStyle;
      if(typeof(this.cmdObject.existingData)!='undefined'){
        for (r=0; r<this.backGroundRadioGroupStyle.radioButtons.length; r++){
          this.backGroundRadioGroupStyle.radioButtons[r].existingData=this.cmdObject.existingData.backgroundType;
        }
        this.setBackgroundType(this.cmdObject.existingData.backgroundType);
        if(typeof(this.cmdObject.existingData.colorSelect)!='undefined'){
          this.colorValue = this.cmdObject.existingData.colorSelect;
        }else{
          this.colorValue = "#ffffff";
        }
        this.backGroundRadioGroupStyle.existingData=this.cmdObject.existingData.backgroundType;
      }else{
        for (r=0; r<this.backGroundRadioGroupStyle.radioButtons.length; r++){
          this.backGroundRadioGroupStyle.radioButtons[r].existingData='color';
        }
        this.backgroundType=this.BACKGROUND_COLOR;
        this.colorValue = "#ffffff";
      }





    }else{
      this.backGroundRadioGroupStyle = this.backGroundDefaultRadioGroupStyle;
    }
    this.$emit('cevt', ['fieldInput', this.cmdObject.name, this.cmdObject.existingData, this.name]);
    console.log('backgroundPicker sets  -', this.cmdObject.existingData);
    this.cmdVersion+=1;

  },
  methods:{
    colorSelect(evt){
      console.log('colorSelect-', evt.target.value);
      let backgroundPickerValue = {
        colorSelect: evt.target.value,
        backgroundType: 'color'
      }
      this.$emit('cevt',['fieldInput', this.name, backgroundPickerValue]);
    },
    setBackgroundType(backgroundType){
      switch(backgroundType){
        case 'color':{
          this.backgroundType=this.BACKGROUND_COLOR;
          break;
        }
        case 'image':{
          this.backgroundType=this.BACKGROUND_IMAGE;
          break;
        }
        case 'transparent':{
          this.backgroundType=this.BACKGROUND_TRANSPARENT;
          break;
        }
      }
    },
    evtOpt(msg){
      console.log('cevt in backgroundPicker-', msg);
//      debugger;
      switch(msg[0]){
        case 'fieldInput':{
          switch(msg[1]){
            case 'backgroundType':{
              switch(msg[2]){
                case 'color':{
                  this.backgroundType=this.BACKGROUND_COLOR;
                  this.$emit('cevt',['fieldInput', this.name, 'color']);
                  break;
                }
                case 'image':{
                  this.backgroundType=this.BACKGROUND_IMAGE;
                  this.$emit('cevt',['fieldInput', this.name, 'image']);
                  break;
                }
                case 'transparent':{
                  this.backgroundType=this.BACKGROUND_TRANSPARENT;
                  this.$emit('cevt', ['fieldInput', this.name, 'transparent']);
                  break;
                }
              }
              break;
            }
          }
          break;
        }
      }
    }
  },
  data(){
    return {
      backgroundType:0,
      BACKGROUND_TYPE_NOT_CHOSEN:0,
      BACKGROUND_COLOR:3,
      BACKGROUND_IMAGE:1,
      BACKGROUND_TRANSPARENT:2,
      radioCmdObjectVersion:0,
      hasLabel:"false",
      labelClass:'',
      fieldLabel:'',
      componentStyle:'',
      colorValue:"",
      defaultComponentStyle:{
        display: "grid",
        gridTemplateColumns: "20% 70%"
      },
      defaultLabelClass:'labelPlusInput',
      defaultLabel:'Background:',
      cmdVersion:0,
      backgroundCmdObject:{},
      backGroundRadioGroupStyle:{},
      backGroundDefaultRadioGroupStyle:{
        type: "vRadioGroup",
        hasLabel: "false",
        orient: "horozontal",
        groupName: "permissions",
        labelStyle:{
          color:"blue",
          fontFamily: "Candara",
          fontSize: "12px",
          display: "grid",
          gridTemplateColumns: "20% 50% 30%"
        },
        buttonLabelStyle:{
          color:"blue",
          fontFamily: "Candara",
          fontSize: "12px",
        },
        radioButtons: [
          {
            fieldLabel:"Color",
            val: "color",
          },
          {
            fieldLabel: "Image",
            val: "image",
          },
          {
            fieldLabel: "Transparent",
            val: "transparent",
          },
        ]
      },

    }
  }
}
</script>

<style scoped>

.flexBoxWrapper {
  display: flex;
  flex-direction: row;
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
