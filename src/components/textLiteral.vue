<template>
  <span class="">
     <span class="labelPlusText"  v-if="this.hasLabel==true">
         <label :for="name" :style="labelStyle">
            {{this.fieldLabel}}
         </label>
         <span>
         <span :style="fieldStyle">
            {{this.fieldValue}}
         </span>
         </span>
     </span>
     <span class="textOnly" v-if="this.hasLabel==false">
         <span :style="fieldStyle">
            {{this.fieldValue}}
         </span>
     </span>
  </span>
</template>

<script>
import utils from '../components/utils.vue';

export default {
  name: "textLiteral",
  props:{
    name:{
      type: String,
      required: true
    },
    cmdObject: {
      type: Object,
      required: false
    },
  },
  components: {},
  mixins: [utils],
  created(){
    debugger;
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
    console.log(this.name,' is mounted');
    this.$emit('cevt', ['setCmdHandler', this.handleCmd, this.name]);
  },
  beforeDestroy() {
    this.$emit('cevt', ['removeCmdHandler', this.handleCmd, this.name]);
  },
  data(){
    return {
      cmdHandlers:{},
      fieldValue:'',
      fieldLabel:'',
      fieldSize:15,
      fieldMaxLength:30,
      hasLabel:false,
      fieldStyle:'',
      labelStyle:'',
      leafComponent:true
    }
  },
  methods:{
//cmd handlers
    handleCmd(args){
      debugger;
      console.log(this.name, ' handleCmd', args);
      this.cmdHandler(args, this);
    },
    cmdHandler(args, self){
      if(args[2]==this.name || this.leafComponent==false){
        var cmdType ={
          'setValue': function(args, context){
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
                debugger;
                this.cmdHandlers[availableHandlers[a]]([args[0], args[1], args[2]]);
              }
            }
          }
        }
      }
    },
// put do cmds here
    doSetValue(args, context){
      console.log('textLiteral - in soSetValue', args, context);
    },
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



  }
}
</script>

<style scoped>
.labelPlusText {
  display:grid;
  margin-top: 3px;
  grid-template-columns: 20% 70%;
  font-family: Arial;
  font-size: medium;
  color: #0a3aff;
}
.textOnly {
  font-family: Arial;
  font-size: medium;
  color: #0a3aff;
}
</style>

