<template>
<span>
    <section :style="dialogStyle" class="dialogLayout">
    <span class="dialogWrapperStyle">
      <component v-for="(thisField, index) in this.dialogComponents"
                 :is="thisField.type"
                 :key="index"
                 :cmdObject="thisField"
                 :cmdObjectVersion="cmdObjectVersion"
                 :name="thisField.name"
                 @cevt="handleEvt"
      ></component>
    </span>
    <Menu
        name="dialogMenu"
        @cevt="handleEvt"
    ></Menu>
  </section>
</span>
</template>
<script>


import menuDefinitions from "../components/menuDefinitions.vue";
import dialogDefinitions from "../components/dialogDefinitions.vue";
import Menu from "../components/menu.vue";
import InputField from "../components/inputField.vue";
import inputNumberField from "../components/inputNumberField";
import utils from '../components/utils.vue';
import inputPasswordField from "../components/inputPasswordField";
import vCheckBox from "../components/vCheckBox.vue";
import vSelect from "../components/vSelect.vue";
import vRadioGroup from "../components/vRadioGroup.vue";
import vBackgroundPicker from "../components/vBackgroundPicker.vue";
import vButton from "@/components/vbutton";


export default {
  name: "dialog2",
  components: {InputField, inputNumberField, inputPasswordField, vButton, vCheckBox, vSelect, vRadioGroup, vBackgroundPicker, Menu},
  mixins: [utils, menuDefinitions, dialogDefinitions],
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
  mounted(){
    debugger;
    console.log(this.name,' is mounted');
    this.$emit('cevt', ['setCmdHandler', this.handleCmd, this.name]);
    this.dialogFields = this.getDialogDefinition(this.config);
    console.log('dialogFields-', this.dialogFields['createPage']);
    this.dialogStyle = this.dialogFields[this.config].dialogStyle;
    this.dialogComponents = this.dialogFields[this.config].fields;
    this.cmdHandlers['dialogMenu'](['setMenu', this.dialogFields[this.config].menuName,'dialogMenu']);
  },
  beforeDestroy() {
    this.$emit('cevt', ['removeCmdHandler', this.handleCmd, this.name]);
  },
  data(){
    return {
      cmdHandlers:{},
      dialogStyle:'',
      cmdObject: {},
      cmdObjectVersion:0,
      dialogMenu: {},
      dialogMenuVersion:0,
      dialogMenuReset:0,
      dialogMenuName:'dialogMenu',
      dialogData:{},
      dialogFields:[],
      dialogComponents:[],
      menuVisible: false
    }
  },
  methods:{
//cmd handlers
    handleCmd(args){
      console.log(this.name, ' handleCmd', args);
      this.cmdHandler(args, this);
    },
    cmdHandler(args, self){
      if(args[2]==this.name){
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
//      debugger;
      var evtType = {
        'setCmdHandler': function(msg, context){
          console.log('dialog2 set cmdHandler', msg);
          context.doSetCmdHandler(msg, context);
        },
        'menuItemSelected': function(msg, context){
          context.doMenuItemSelected(msg, context);
        },
        'removeCmdHandler': function(msg, context){
          context.doRemoveCmdHandler(msg, context);
        },
        'fieldInput': function(msg, context){
//          debugger;
          context.doFieldInput(msg, context);
        },
        'default': function(msg, context){
          console.log('evtHandler in menu  - something else', msg, context);
        }
      }
      if(typeof(evtType)!='undefined'){
//        debugger;
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
    doFieldInput(msg, context){
      console.log('at doFieldInput-', msg, context);
      this.dialogData[msg[1]]=msg[2];
    },
    doMenuItemSelected(msg, context){
      console.log('doMenuItemSelected in dialog-', msg, context);
      var menuSelection = {
        'loginVerify': function(msg, context){
          context.doLoginVerify(msg, context);
        },
        'configurePage': function(msg, context){
          context.doConfigurePage(msg, context);
        },
      }
      if(typeof(menuSelection)!='undefined'){
//        debugger;
        try {
          (menuSelection[msg[1]](msg, context));
        } catch (e) {
          this.$emit('cevt', msg);
        }
      }
    },
    doLoginVerify(msg,context){
      console.log('in doLoginVerify', msg, context);
      var loginParams = ['loginVerify', this.dialogData, 'login'];
      this.$emit('cevt', loginParams);
    },
    doConfigurePage(msg,context){
      console.log('dialog doConfigurePage-', msg, context);
      var configurePageParams = ['configurePage', this.dialogData, 'configurePage'];
      this.$emit('cevt', configurePageParams);
    },
    setupDialog(dialogDef, target, action, existingData){
      //console.log('setupDialog-', dialogDef, target, existingData);
      let rData = this.getDialogDefinition(dialogDef);
      rData.action = action;
      rData.target = target;
      rData.existingData = existingData;
      return rData;
    },



  }
}
</script>

<style scoped>
.dialogLayout {
  display:grid;
  grid-template-rows: 85% 15%;
}
.dialogWrapperStyle {
  margin-left: 10%;
  margin-top: 5%;
  display: flex;
  flex-direction: column;
}
</style>
