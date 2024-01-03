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
import inputNumberField from "../components/inputNumberField";
import vRadioGroup from "../components/vRadioGroup.vue";
import vBackgroundPicker from "../components/vBackgroundPicker.vue";
import checkbox from "../components/checkbox.vue"
import tableWrapper from "../components/tableWrapper.vue";
import fontPicker from "@/components/fontPicker";
export default {
  name: "ccPage",
  props:{
    name:{
      type: String,
      required: true
    },
    config:{
      type: String,
      required: false
    }
  },
  components: {InputField, inputNumberField, vRadioGroup, vBackgroundPicker, checkbox, tableWrapper, fontPicker},
  mixins: [utils, componentLoaders, dialogDefinitions],
  mounted(){
//    debugger;
    this.componentLoaders = this.getComponentLoaders();
    this.dialogFields = this.getDialogDefinition(this.config.definition, this.componentLoaders);
    console.log('ccPage Fields-', this.dialogFields);
    this.dialogStyle = this.dialogFields[this.config.definition].dialogStyle;
    this.dialogComponents = this.dialogFields[this.config.definition].fields;
    console.log('ccPage components-',this.dialogComponents);
//    debugger;
    Object.keys(this.config.existingData).forEach(key => {
      console.log('existingData key-', key, this.config.existingData[key]);
      this.existingData[key] =  this.config.existingData[key];
    });
//    this.existingData =  this.config.existingData[this.config.definition];
    this.$emit('cevt',['setMenuTo', this.dialogFields[this.config.definition].menuName]);
    debugger;
    this.dialogDefaults = this.getDialogDefaults(this.config.definition);
    Object.keys(this.dialogComponents).forEach(key => {
      console.log('existingData dialogComponents key-', key, this.dialogComponents[key]);
      if(typeof(this.existingData[this.dialogComponents[key].name])!='undefined') {
        console.log('existingData1-', this.existingData[this.dialogComponents[key].name], this.existingData[this.dialogComponents[key].name]);
        this.dialogComponents[key].fieldValue = this.existingData[this.dialogComponents[key].name];
      }else{
        console.log('leafComponent-', this.dialogFields[this.config.definition].leafComponent);
        this.dialogComponents[key].leafComponent=this.dialogFields[this.config.definition].leafComponent;
        console.log('defaults 1-',this.dialogDefaults );
        this.dialogComponents[key].fieldValue = this.dialogDefaults[this.dialogComponents[key].name];
      }
    });
    console.log('dialogComponents after loading-', this.dialogComponents);



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
      existingData:{}
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

