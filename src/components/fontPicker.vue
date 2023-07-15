<template>
  <span class="fpRows">
    <fontPickerRow :cmdObject = "this.fpTitleRow" name="titleStyles" @cevt = "handleEvt"></fontPickerRow>
    <fontPickerRow :cmdObject = "this.fpSubRow" name="subElementStyles" @cevt = "handleEvt"></fontPickerRow>
  </span>
</template>

<script>
import utils from '../components/utils.vue';
//import vOption from "../components/option2.vue";
import fontPickerRow from "../components/fontPickerRow.vue";
//import selectv2 from "@/components/selectv2";
export default {
  name: "fontPicker",
  props:{
    name:{
      type: String,
      required: true
    },
    cmdObject:{
      type: Object,
      required: false
    }
  },
  components: {fontPickerRow},
  mixins: [utils],
  created(){
    console.log('subElementValue-', this.cmdObject.subElementValue);
    this.family =  this.cmdObject.pickers.fontFamily;
//    this.familyVal=this.cmdObject.fieldValue.fontFamily;
    if(typeof(this.cmdObject.fieldValue.fontFamily)!='undefined'){
//      this.family.fontFamily=this.cmdObject.fieldValue.fontFamily;
      this.family.fieldValue=this.cmdObject.fieldValue.fontFamily;
    }
    this.family = this.updateValues(this.family, this.family.fieldValue);
    this.family.selectVal = this.family.fieldValue;
    this.family.eventKey = 'family';
    this.family.selectStyle = this.cmdObject.selectStyle;
    this.family.labelValue = 'Font';
    this.family.labelLocation=this.LABEL_VERTICAL;

    this.subFamily = Object.assign({}, this.family);
    this.subFamily.labelLocation = this.LABEL_NOT;
    if(typeof(this.cmdObject.subElementValue.fontFamily)!='undefined'){
      this.subFamily.fieldValue=this.cmdObject.subElementValue.fontFamily ;
      this.subFamily = this.updateValues(this.subFamily, this.subFamily.fieldValue);
    }else{
      this.subFamily.fieldValue='' ;
      this.subFamily = this.updateValues(this.subFamily, '');
    }
    this.fpTitleRow.family = this.family;
    this.fpSubRow.family = this.subFamily;


    this.size =  this.cmdObject.pickers.size;
//    this.sizeVal = this.cmdObject.fieldValue.fontSize;
    if(typeof(this.cmdObject.fieldValue.fontSize)!='undefined'){
      this.size.fieldValue=this.cmdObject.fieldValue.fontSize;
    }
    this.size = this.updateValues(this.size, this.size.fieldValue);
    this.size.selectVal = this.size.fieldValue;
    this.size.eventKey = 'size';
    this.size.selectStyle = this.cmdObject.selectStyle;
    this.size.labelValue = 'Size';
    this.size.labelLocation=this.LABEL_VERTICAL;

    this.subSize = Object.assign({}, this.size);
    this.subSize.labelLocation = this.LABEL_NOT;
    if(typeof(this.cmdObject.subElementValue.fontSize)!='undefined'){
      this.subSize.fieldValue=this.cmdObject.subElementValue.fontSize ;
      this.subSize = this.updateValues(this.subSize, this.subSize.fieldValue);
    }else{
      this.subSize.fieldValue='' ;
      this.subSize = this.updateValues(this.subSize, '');
    }
    this.fpTitleRow.size = this.size;
    this.fpSubRow.size = this.subSize;



    this.weight =  this.cmdObject.pickers.weight;
//    this.weightVal = this.cmdObject.fieldValue.fontWeight;
    if(typeof(this.cmdObject.fieldValue.fontWeight)!='undefined'){
      this.weight.fieldValue=this.cmdObject.fieldValue.fontWeight;
    }
    this.weight = this.updateValues(this.weight, this.weight.fieldValue);
    this.weight.selectVal = this.weight.fieldValue;
    this.weight.eventKey = 'weight';
    this.weight.selectStyle = this.cmdObject.selectStyle;
    this.weight.labelValue = 'Weight';
    this.weight.labelLocation=this.LABEL_VERTICAL;

    this.subWeight = Object.assign({}, this.weight);
    this.subWeight.labelLocation = this.LABEL_NOT;
    if(typeof(this.cmdObject.subElementValue.fontWeight)!='undefined'){
      this.subWeight.fieldValue=this.cmdObject.subElementValue.fontWeight ;
      this.subWeight = this.updateValues(this.subWeight, this.subWeight.fieldValue);
    }else{
      this.subWeight.fieldValue='' ;
      this.subWeight = this.updateValues(this.subWeight, '');
    }

    this.fpTitleRow.weight = this.weight;
    this.fpSubRow.weight = this.subWeight;


    this.fontStyle =  this.cmdObject.pickers.style;
//    this.styleVal = this.cmdObject.fieldValue.fontStyle;
    if(typeof(this.cmdObject.fieldValue.fontStyle)!='undefined'){
      this.fontStyle.fieldValue=this.cmdObject.fieldValue.fontStyle;
    }
    this.fontStyle = this.updateValues(this.fontStyle, this.fontStyle.fieldValue);
    this.fontStyle.selectVal = this.fontStyle.fieldValue;
    this.fontStyle.eventKey = 'fontStyle';
    this.fontStyle.selectStyle = this.cmdObject.selectStyle;
    this.fontStyle.labelValue = 'Style';
    this.fontStyle.labelLocation=this.LABEL_VERTICAL;

    this.subFontStyle = Object.assign({}, this.fontStyle);
    this.subFontStyle.labelLocation = this.LABEL_NOT;
    if(typeof(this.cmdObject.subElementValue.fontStyle)!='undefined'){
      this.subFontStyle.fieldValue=this.cmdObject.subElementValue.fontStyle ;
      this.subFontStyle = this.updateValues(this.subFontStyle, this.subFontStyle.fieldValue);
    }else{
      this.subFontStyle.fieldValue='' ;
      this.subFontStyle = this.updateValues(this.subFontStyle, '');
    }

    this.fpTitleRow.fontStyle = this.fontStyle;
    this.fpSubRow.fontStyle = this.subFontStyle;


    this.alignment =  this.cmdObject.pickers.alignment;
//    this.alignmentVal = this.cmdObject.fieldValue.alignment;
    if(typeof(this.cmdObject.fieldValue.alignment)!='undefined'){
      this.alignment.fieldValue=this.cmdObject.fieldValue.alignment;
    }
    this.alignment = this.updateValues(this.alignment, this.alignment.fieldValue);
    this.alignment.selectVal = this.alignment.fieldValue;
    this.alignment.eventKey = 'alignment';
    this.alignment.selectStyle = this.cmdObject.selectStyle;
    this.alignment.labelValue = 'Alignment';
    this.alignment.labelLocation=this.LABEL_VERTICAL;

    this.subAlignment = Object.assign({}, this.alignment);
    this.subAlignment.labelLocation = this.LABEL_NOT;
    if(typeof(this.cmdObject.subElementValue.alignment)!='undefined'){
      this.subAlignment.fieldValue=this.cmdObject.subElementValue.alignment ;
      this.subAlignment = this.updateValues(this.subAlignment, this.subAlignment.fieldValue);
    }else{
      this.subAlignment.fieldValue='left' ;
      this.subAlignment = this.updateValues(this.subAlignment, '');
    }
    this.fpTitleRow.alignment = this.alignment;
    this.fpTitleRow.colorVal =  this.colorVal;
    this.fpTitleRow.fieldLabel = "Title";
    this.fpSubRow.alignment = this.subAlignment;
    this.fpSubRow.fieldLabel = 'Links';



  },
  mounted(){
    console.log(this.name,' is mounted');
//    debugger;
    this.colorVal = this.cmdObject.fieldValue.color;

//    console.log('fontpicker this.family-', this.family);
    this.reload+=1;
    this.c1+=1;
//    console.log('fontPicker mounted is finished');
//    console.log('fontPicker cmdHandlers-', this.cmdHandlers);
    this.$emit('cevt', ['setCmdHandler', this.handleCmd, this.name]);
  },
  beforeDestroy() {
    this.$emit('cevt', ['removeCmdHandler', this.handleCmd, this.name]);
  },
  data(){
    return {
      cmdHandlers:{},
      leafComponent: false,
      family:{},
      size:{},
      weight:{},
      fontStyle:{},
      alignment:{},
      color:{},
      selectSize:0,
      subFamily:{},
      subSize:{},
      subWeight:{},
      subFontStyle:{},
      subAlignment:{},
      colorVal:'',
      reload:0,
      LABEL_NOT:0,
      LABEL_VERTICAL:1,
      LABEL_HOROZONTAL:2,
      c1:0,
      fpTitleRow:{},
      fpSubRow:{}
    }
  },
  methods:{
    updateValues(selectObject, existingData){
      console.log('updateValues-', selectObject);
//      debugger;
      for(var o=0; o<selectObject.options.length; o++){
        selectObject.options[o].existingData=existingData;
      }
      console.log('updateValues 2-', selectObject);
      return selectObject;
    },
    colorSelect($event){
      console.log('colorSelect-', $event, this.colorVal);
    },
//cmd handlers
    handleCmd(args){
      console.log(this.name, ' handleCmd', args);
      this.cmdHandler(args, this);
    },
    cmdHandler(args, self){
      if(args[2]==this.name || this.leafComponent==false){
        var cmdType ={
          'default': function(context, args){
            console.log('cmdHandler in dummy - something else', args, context);
          }
          /*  example
                    'setCardMode':function(args, context){
                      self.doSetCardMode(args, context);
                    }
          */
        }
        if(typeof(cmdType)!='undefined'){
          try {
            (cmdType[args[0]](args, self));
          } catch (e) {
            console.log('unknown cmd -',args, this.name);
            var availableHandlers = Object.keys(this.cmdHandlers);
            console.log('available cmd handlers-',availableHandlers);

            if(availableHandlers.length>0){
              for(var a=0;a<availableHandlers.length;a++){
                //                       debugger;
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
      console.log('evtOpt in fontPicker', msg);
      this.evtHandler(msg, this);
    },
    evtHandler(msg, self){
      console.log('evtHandler in- (set this)', msg, self);
//      debugger;
      var evtType = {
        'setCmdHandler': function(msg, context){
          context.doSetCmdHandler(msg, context);
        },
        'removeCmdHandler': function(msg, context){
          context.doRemoveCmdHandler(msg, context);
        },
        'default': function(msg, context){
          console.log('evtHandler in fontPicker  - something else', msg, context);
        },
        'fieldInput': function(msg, context){
          context.doFieldInput(msg, context);
        },
      }
      if(typeof(evtType)!='undefined'){
        try {
          (evtType[msg[0]](msg, self));
        } catch (e) {
          this.$emit('cevt', msg);
        }
      }
    },
    doSetCmdHandler(msg, context){
//      debugger;
      console.log('doSetCmdHandler-',msg, context);
      this.cmdHandlers[msg[2]]=msg[1];
    },
    doRemoveCmdHandler(msg, context){
      console.log('doRemoveCmdHandler-',msg, context);
      delete(this.cmdHandlers[msg[2]]);
    },
    doFieldInput(msg, context) {
      console.log('doFieldInput in fontPicker-', msg, context);
      this.$emit('cevt', ['fieldInput', msg[1], msg[2], msg[1]]);
    }



  }
}
</script>

<style scoped>
.fpick {
  display: grid;
  font-size: 12px;
  grid-template-columns: 15% 15% 15% 15% 15% 15%;
}
.vAlign {
  display:block;
  margin-top: auto;
  margin-bottom: auto;
}
.colorSelect {
  display: grid;
  grid-template-rows: 40% 60%;
}
.labelPlusInput {
  display:grid;
  width:100%;
  margin-top: 3px;
  grid-template-columns: 20% 80%;
  font-family: Arial;
  font-size: small;
  color: #0a3aff;
}
.selectStyle {
  background: powderblue;
  color:blue;
  font-weight: bold;
  font-size: 12px;
  margin-bottom: 3px;
  width: 100%;
  margin-right: 15%;
  margin-top:5px;
}
.fpRows {
  display: grid;
  grid-template-rows: 50% 50%;
}
input[type='color'] {
  vertical-align: middle;
}
</style>

