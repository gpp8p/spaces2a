<template>
  <span class="">
      <component v-for="(thisField, index) in this.dialogComponents"
                 :is="thisField.type"
                 :key="index"
                 :cmdObject="thisField"
                 :name="thisField.name"
                 @cevt="handleEvt"
      ></component>
  </span>
</template>

<script>
import utils from '../components/utils.vue';
import componentLoaders from "@/components/componentLoaders";
import dialogDefinitions from "../components/dialogDefinitions.vue";
import InputField from "../components/inputField.vue";
import vRadioGroup from "../components/vRadioGroup.vue";
export default {
  name: "copyPage",
  props:{
    name:{
      type: String,
      required: true
    }
  },
  components: {InputField, vRadioGroup},
  mixins: [utils, componentLoaders, dialogDefinitions],
  mounted(){
    debugger;

    this.$emit('cevt', ['setCmdHandler', this.handleCmd, this.name]);
    var componentLoaders = this.getComponentLoaders();
    this.dialogFields = this.getDialogDefinition('copyPage', componentLoaders);
    console.log('copyPage fields-', this.dialogFields);
    this.dialogStyle = this.dialogFields['copyPage'].dialogStyle;
    this.dialogComponents = this.dialogFields['copyPage'].fields;
    console.log(this.name,' is mounted');

  },
  beforeDestroy() {
    this.$emit('cevt', ['removeCmdHandler', this.handleCmd, this.name]);
  },
  data(){
    return {
      cmdHandlers:{},
      leafComponent: false,
      componentLoaders:{},
      dialogFields:[],
      dialogStyle:'',
      dialogComponents:[],
      dialogData:{},
    }
  },
  methods:{
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
      console.log('evtOpt in menu', msg);
      this.evtHandler(msg, this);
    },
    evtHandler(msg, self){
      console.log('evtHandler in- (set this)', msg, self);
//      debugger;
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
        },
        'fieldInput': function(msg, context){
//          debugger;
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
    doFieldInput(msg, context){
      console.log('at doFieldInput-', msg, context);
//      this.dialogData[msg[1]]=msg[2];
      this.$emit('cevt', msg);
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

</style>
