<template>
  <span class="labelPlusInput">
    <span>
       {{cmdObject.fieldLabel}}
    </span>
    <span class="fpick">
      <span class="fselect">
        <span>
          Font
        </span>
        <span>
         <select :size="this.selectSize" :multiple="multiple" @change="onChange($event, 'family')" v-model="familyVal" class="selectStyle" >
                  <option v-if="this.selectSize==0"  class="optionStyle">Please Select</option>
                  <v-option v-for="(thisOption, index) in this.family.options"
                            :key="index"
                            :cmdObject = thisOption
                            :cmdObjectVersion = thisCmdObjectVersion
                            :name = thisOption.val
                            class="optionStyle"
                  ></v-option>

            </select>
        </span>
      </span>
      <span class="fselect">
        <span>
          Size
        </span>
        <span>
         <select :size="this.selectSize" :multiple="multiple" @change="onChange($event, 'size')" v-model="sizeVal" class="selectStyle" >
                  <option v-if="this.selectSize==0"  class="optionStyle">Please Select</option>
                  <v-option v-for="(thisOption, index) in this.size.options"
                            :key="index"
                            :cmdObject = thisOption
                            :cmdObjectVersion = thisCmdObjectVersion
                            :name = thisOption.val
                            class="optionStyle"
                  ></v-option>

            </select>
        </span>
      </span>
      <span class="fselect">
        <span>
          Style
        </span>
        <span>
         <select :size="this.selectSize" :multiple="multiple" @change="onChange($event, 'style')" v-model="styleVal" class="selectStyle" >
                  <option v-if="this.selectSize==0"  class="optionStyle">Please Select</option>
                  <v-option v-for="(thisOption, index) in this.fontStyle.options"
                            :key="index"
                            :cmdObject = thisOption
                            :cmdObjectVersion = thisCmdObjectVersion
                            :name = thisOption.val
                            class="optionStyle"
                  ></v-option>

            </select>
        </span>
      </span>
      <span class="fselect">
        <span>
          Weight
        </span>
        <span>
         <select :size="this.selectSize" :multiple="multiple" @change="onChange($event, 'weight')" v-model="weightVal" class="selectStyle" >
                  <option v-if="this.selectSize==0"  class="optionStyle">Please Select</option>
                  <v-option v-for="(thisOption, index) in this.weight.options"
                            :key="index"
                            :cmdObject = thisOption
                            :cmdObjectVersion = thisCmdObjectVersion
                            :name = thisOption.val
                            class="optionStyle"
                  ></v-option>

            </select>
        </span>
      </span>
      <span class="fselect">
        <span>
          Alignment
        </span>
        <span>
         <select :size="this.selectSize" :multiple="multiple" @change="onChange($event, 'weight')" v-model="alignmentVal" class="selectStyle" >
                  <option v-if="this.selectSize==0"  class="optionStyle">Please Select</option>
                  <v-option v-for="(thisOption, index) in this.alignment.options"
                            :key="index"
                            :cmdObject = thisOption
                            :cmdObjectVersion = thisCmdObjectVersion
                            :name = thisOption.val
                            class="optionStyle"
                  ></v-option>

            </select>
        </span>
      </span>
      <span class="fselect">
        <span>
          Color
        </span>
        <span>
          <input type="color"  v-model = "colorVal"   @change="colorSelect"/>
        </span>
      </span>
    </span>
  </span>
</template>

<script>
import utils from '../components/utils.vue';
import vSelect from "@/components/vSelect";
import vOption from "../components/option2.vue";
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
  components: {vSelect, vOption},
  mixins: [utils],
  mounted(){
    console.log(this.name,' is mounted');
//    debugger;
    this.family =  this.cmdObject.pickers.fontFamily;
    this.familyVal=this.cmdObject.fieldValue.fontFamily;
    if(typeof(this.cmdObject.fieldValue.fontFamily)!='undefined'){
//      this.family.fontFamily=this.cmdObject.fieldValue.fontFamily;
      this.family.fieldValue=this.cmdObject.fieldValue.fontFamily;
    }
    this.family = this.updateValues(this.family, this.family.fieldValue);

    this.size =  this.cmdObject.pickers.size;
    this.sizeVal = this.cmdObject.fieldValue.fontSize;
    if(typeof(this.cmdObject.fieldValue.fontSize)!='undefined'){
      this.size.fieldValue=this.cmdObject.fieldValue.fontSize;
    }
    this.size = this.updateValues(this.size, this.size.fieldValue);

    this.weight =  this.cmdObject.pickers.weight;
    this.weightVal = this.cmdObject.fieldValue.fontWeight;
    if(typeof(this.cmdObject.fieldValue.fontWeight)!='undefined'){
      this.weight.fieldValue=this.cmdObject.fieldValue.fontWeight;
    }
    this.weight = this.updateValues(this.weight, this.weight.fieldValue);

    this.fontStyle =  this.cmdObject.pickers.style;
    this.styleVal = this.cmdObject.fieldValue.fontStyle;
    if(typeof(this.cmdObject.fieldValue.fontStyle)!='undefined'){
      this.fontStyle.fieldValue=this.cmdObject.fieldValue.fontStyle;
    }
    this.fontStyle = this.updateValues(this.fontStyle, this.fontStyle.fieldValue);

    this.alignment =  this.cmdObject.pickers.alignment;
    this.alignmentVal = this.cmdObject.fieldValue.alignment;
    if(typeof(this.cmdObject.fieldValue.fontStyle)!='undefined'){
      this.alignment.fieldValue=this.cmdObject.fieldValue.alignment;
    }
    this.alignment = this.updateValues(this.alignment, this.alignment.fieldValue);
    debugger;
    this.colorVal = this.cmdObject.fieldValue.color;

    console.log('fontpicker this.family-', this.family);
    this.reload+=1;

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
      sval:'',
      familyVal:'',
      sizeVal:'',
      weightVal:'',
      styleVal:'',
      alignmentVal:'',
      colorVal:'',
      reload:0
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
    onChange(evt, selectSource){
      console.log('select changed-', evt, selectSource, this.sval);
      switch(selectSource){
        case 'family': {
          this.family.fieldValue=this.familyVal;
          break;
        }
        case 'size':{
          this.size.fieldValue=this.sizeVal;
          break;
        }
        case 'weight':{
          this.weight.fieldValue=this.weightVal;
          break;
        }
        case 'style':{
          this.fontStyle.fieldValue=this.styleVal;
          break;
        }


      }
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
    doSetCmdHandler(msg, context){
//      debugger;
      console.log('doSetCmdHandler-',msg, context);
      this.cmdHandlers[msg[2]]=msg[1];
    },
    doRemoveCmdHandler(msg, context){
      console.log('doRemoveCmdHandler-',msg, context);
      delete(this.cmdHandlers[msg[2]]);
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
.fselect {
  display: grid;
  grid-template-rows: 50% 50%;
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
input[type='color'] {
  vertical-align: middle;
}
</style>

