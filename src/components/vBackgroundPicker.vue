<template>
  <div :style="componentStyle">
    <div :style="cmdObject.labelStyle">
            {{cmdObject.fieldLabel}}
    </div>
    <div class="vAlign">
      <v-radio-group :cmdObject="cmdObject.styles.backGroundRadioGroupStyle"
                     name="backgroundType"
                     :cmdObjectVersion="cmdVersion"
                     @cevt="handleEvt"
      ></v-radio-group>

      <span>
        <file-upload :config="uploadConfig" name="fileUpload" v-if="this.backgroundType==this.BACKGROUND_IMAGE" @cevt="handleEvt"></file-upload>
      </span>
      <span v-if="this.backgroundType==this.BACKGROUND_COLOR">
        <input type="color"  :value = "colorValue"  @change="colorSelect"/>
      </span>

    </div>
  </div>
</template>

<script>
import utils from "@/components/utils";
import vRadioGroup from "@/components/vRadioGroup";
import fileUpload from "../components/fileUpload.vue";
export default {
  name: "vBackgroundPicker",
  components: { vRadioGroup, fileUpload },
  mixins: [utils],
  props: {
    cmdObject: {
      type: Object,
      required: false
    },
    name: {
      type: String,
      required: false
    }
  },
  mounted(){
//    debugger;
    console.log('vBackgroundPicker mounted cmdObject-', this.cmdObject);
    this.$emit('cevt', ['setCmdHandler', this.handleCmd, this.name]);
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
      if(typeof(this.cmdObject.fieldValue)!='undefined'){
        for (r=0; r<this.backGroundRadioGroupStyle.radioButtons.length; r++){
          this.backGroundRadioGroupStyle.radioButtons[r].existingData=this.cmdObject.fieldValue.backgroundType;
        }
        this.setBackgroundType(this.cmdObject.fieldValue.backgroundType);
        if(typeof(this.cmdObject.fieldValue.colorSelect)!='undefined'){
          this.colorValue = this.cmdObject.fieldValue.colorSelect;
        }else{
          this.colorValue = "#ffffff";
        }
//        debugger;
//        this.backGroundRadioGroupStyle.existingData=this.cmdObject.existingData.backgroundType;
        this.$emit('cevt', ['fieldInput', this.cmdObject.name, this.cmdObject.fieldValue]);
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
//    this.$emit('cevt', ['fieldInput', this.cmdObject.name, this.cmdObject.existingData, this.name]);
    console.log('backgroundPicker sets  -', this.cmdObject.existingData);
    console.log('fieldValue-', this.cmdObject.fieldValue);
    this.uploadConfig.imageUrl = this.cmdObject.fieldValue.url;
    this.cmdVersion+=1;

  },
  beforeDestroy() {
    this.$emit('cevt', ['removeCmdHandler', this.handleCmd, this.name]);
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
//      debugger;
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
    handleCmd(args){
      console.log(this.name, ' handleCmd', args);
      this.cmdHandler(args, this);
    },
    cmdHandler(args, self){
      if(args[2]==this.name || this.leafComponent==false){
        var cmdType ={
          'default': function(context, args){
            console.log('cmdHandler in dummy - something else', args, context);
          },
          'setValue':function(args, context){
            context.doSetValue(args, context);
          },
        }
        if(typeof(cmdType)!='undefined'){
          try {
            (cmdType[args[0]](args, self));
          } catch (e) {
            console.log('unknown cmd -',args, this.name);
            console.log('unknown cmd -',args, this.name);
            var availableHandlers = Object.keys(this.cmdHandlers);
            console.log('available cmd handlers-',availableHandlers);

            if(availableHandlers.length>0){
              for(var a=0;a<availableHandlers.length;a++){
//                debugger;
                this.cmdHandlers[availableHandlers[a]]([args[0], args[1], args[2]]);
              }
            }
          }
        }
      }
    },
// put do cmds here

//event handler
    evtOpt(msg){
      console.log('evtOpt in menu', msg);
      this.evtHandler(msg, this);
    },
    evtHandler(msg, self){
      console.log('evtHandler in backgroundPicker-', msg, self);
//      debugger;
      var evtType = {
        'setCmdHandler': function(msg, context){
          //console.log('evtHandler - a menu event', msg);
          context.doSetCmdHandler(msg, context);
        },
        'removeCmdHandler': function(msg, context){
          context.doRemoveCmdHandler(msg, context);
        },
        'fieldInput': function(msg, context){
          context.doFieldInput(msg, context);
        },
        'default': function(msg, context){
          console.log('evtHandler in menu  - something else', msg, context);
        }
      }
      if(typeof(evtType)!='undefined'){
        try {
          (evtType[msg[0]](msg, self));
        } catch (e) {
          this.$emit('cevt', msg);
        }
      }
    },
    doFieldInput(msg, context){
      console.log('at doFieldInput-', msg, context);
      console.log('this.backgroundType-', this.backgroundType);
//      debugger;
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
      console.log('this.backgroundType (2)-', this.backgroundType);
    },
    doSetCmdHandler(msg, context){
 //     debugger;
      console.log('doSetCmdHandler-',msg, context);
      this.cmdHandlers[msg[2]]=msg[1];
    },
    doRemoveCmdHandler(msg, context){
      console.log('doRemoveCmdHandler-',msg, context);
      delete(this.cmdHandlers[msg[2]]);
    },
    doSetValue(msg, context){
      console.log('vBackgroundPicker setValue - ', msg, context);
    }



/*
    evtOpt(msg){
      console.log('cevt in backgroundPicker-', msg);
      debugger;
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
*/


  },
  data(){
    return {
      cmdHandlers:{},
      leafComponent: false,
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
      uploadConfig:{},
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
  grid-template-columns: 30% 70%;
  font-family: Arial;
  font-size: medium;
  color: #0a3aff;
}
.vAlign {
  display:block;
  margin-top: auto;
  margin-bottom: auto;
}
input[type='color'] {
  vertical-align: middle;
}
input[type='file'] {
  vertical-align: middle;
}


</style>
