<template>
  <span>
     <span class="labelPlusInput" v-if="this.hasLabel==true">
         <span :style="labelStyle">
            {{this.fieldLabel}}
         </span>
         <span>
            <input v-model="fieldValue"
                   type="number"
                   :size="fieldSize"
                   :maxlength="fieldMaxLength"
                   ref="input"
                   @change="fieldChanged" />
         </span>
     </span>
     <span class="inputOnly" v-if="this.hasLabel==false">
         <span>
            <input v-model="fieldValue"
                   type="number"
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
      labelStyle:'',
      cmdHandlers:{},
      leafComponent: false
    }
  },
  methods: {
    fieldChanged(){
//      debugger;
      console.log('field changed', this.fieldValue);
      this.$emit('cevt', ['fieldInput', this.cmdObject.name, this.fieldValue, this.name]);

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
          }
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
                debugger;
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
      console.log('evtHandler in menu-', msg, self);
      debugger;
      var evtType = {
        'setCmdHandler': function(msg, context){
          //console.log('evtHandler - a menu event', msg);
          context.doSetCmdHandler(msg, context);
        },
        'removeCmdHandler': function(msg, context){
          context.doRemoveCmdHandler(msg, context);
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
    doSetCmdHandler(msg, context){
      debugger;
      console.log('doSetCmdHandler-',msg, context);
      this.cmdHandlers[msg[2]]=msg[1];
    },
    doRemoveCmdHandler(msg, context){
      console.log('doRemoveCmdHandler-',msg, context);
      delete(this.cmdHandlers[msg[2]]);
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
    cType = typeof this.cmdObject.leafComponent;
    if(cType!='undefined'){
      this.leafComponent = this.cmdObject.leafComponent;
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
    this.$emit('cevt', ['setCmdHandler', this.handleCmd, this.name]);
  },
  beforeDestroy() {
    this.$emit('cevt', ['removeCmdHandler', this.handleCmd, this.name]);
  },


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
