<template>
<span>
    <section :style="dialogStyle" class="dialogLayout">
    <span class="dialogWrapperStyle">
      <component v-for="(thisField, index) in this.dialogComponents"
                 :is="thisField.type"
                 :key="index"
                 :cmdObject="thisField"
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
import Menu from "../components/menuNew.vue";
import InputField from "../components/inputField.vue";
import inputNumberField from "../components/inputNumberField";
import utils from '../components/utils.vue';
import inputPasswordField from "../components/inputPasswordField";
import vCheckBox from "../components/vCheckBox.vue";
import vSelect from "../components/vSelect.vue";
import vRadioGroup from "../components/vRadioGroup.vue";
import vBackgroundPicker from "../components/vBackgroundPicker.vue";
import textLiteral from "../components/textLiteral.vue";
import vButton from "@/components/vbutton";
import mySpaces from "../components/mySpacesPaged.vue";
import checkbox from "../components/checkbox.vue"
import cbxSelectColor from "@/components/cbxSelectColor";
import fontPicker from "@/components/fontPicker";
import componentLoaders from "@/components/componentLoaders";

export default {
  name: "dialog2",
  components: {InputField, inputNumberField, inputPasswordField, vButton, vCheckBox, vSelect, vRadioGroup, vBackgroundPicker, textLiteral, Menu, mySpaces, checkbox, cbxSelectColor, fontPicker},
  mixins: [utils, menuDefinitions, dialogDefinitions, componentLoaders],
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
    console.log('dialog config-', this.config);
    if(typeof(this.config.existingData)!='undefined'){
      this.targetCard = {
        newCard: false,
        cardName: this.config.existingData.cardName
      }
    }else{
      this.targetCard = {
        newCard: true,
      }
    }
    this.$emit('cevt', ['setCmdHandler', this.handleCmd, this.name]);
    this.componentLoaders = this.getComponentLoaders();
    this.dialogFields = this.getDialogDefinition(this.config.definition, this.componentLoaders);
    console.log('dialogFields-', this.dialogFields);
    this.dialogStyle = this.dialogFields[this.config.definition].dialogStyle;
    this.dialogComponents = this.dialogFields[this.config.definition].fields;
    console.log('dialog2 components-', this.dialogComponents);
//  If there is some existing data, check for a loader
    if(typeof(this.config.existingData)!='undefined'){
      this.existingData =  this.config.existingData;
      if(typeof(this.dialogFields[this.config.definition].loader)!='undefined'){
        this.dialogFields[this.config.definition].loader(this.existingData, this.dialogComponents);
      }
      console.log('in dialog2 existing data-', this.existingData);
    }else{
      this.dialogDefaults = this.getDialogDefaults(this.config.definition);
      console.log('dialogDefaults-', this.dialogDefaults);
      if(typeof( this.dialogFields[this.config.definition].leafComponent)!= 'undefined'){
        this.leafComponent=this.dialogFields[this.config.definition].leafComponent;
      }
      if(typeof(this.dialogDefaults)!='undefined'){
//      debugger;
        var d;
        for(d=0; d<this.dialogComponents.length;d++){
          console.log('fieldfIdentifier-',this.dialogDefaults[this.dialogComponents[d].fieldIdentifier], this.dialogComponents[d].fieldIdentifier);
          if(typeof(this.dialogDefaults[this.dialogComponents[d].fieldIdentifier])!='undefined'){
            this.dialogComponents[d].fieldValue = this.dialogDefaults[this.dialogComponents[d].fieldIdentifier];
          }
        }
      }else{
        if(typeof(this.dialogFields[this.config.definition].loader)!='undefined'){
          this.dialogFields[this.config.definition].loader(this.existingData, this.dialogComponents);
        }
      }

    }
    debugger;
    try {
      console.log('this.config.existingData.cardStyles-', this.config.existingData.cardStyles);
      console.log('this.config.existingData.cardSubStyles-', this.config.existingData.cardSubStyles);
    } catch (e) {
      console.log('error');
    }
/*
    if(typeof(this.config.existingData)!='undefined'){
      for(d = 0; d<this.dialogComponents.length; d++){
        if(typeof(this.dialogComponents[d].loader)!='undefined'){
          var loadedVal = this.dialogComponents[d].loader(this.config.existingData.cardStyles);
          this.dialogComponents[d].fieldValue = loadedVal
          if(typeof(this.config.existingData.cardSubStyles)!='undefined'){
            loadedVal = this.dialogComponents[d].loader(this.config.existingData.cardSubStyles);
            this.dialogComponents[d].subElementValue = loadedVal;
          }
          console.log('existingValue is', loadedVal);
        }
      }
    }
*/



/*
    try {
      var loadedBgVal = this.dialogComponents[0].loader(this.config.existingData.cardStyles);
      console.log('loadedBgVal-', loadedBgVal);
    } catch (e) {
      console.log('error-', e);
    }
 */
    if(typeof(this.config.menuOverride)!='undefined'){
      this.cmdHandlers['dialogMenu'](['setMenu', this.config.menuOverride,'dialogMenu']);
    }else{
      this.cmdHandlers['dialogMenu'](['setMenu', this.dialogFields[this.config.definition].menuName,'dialogMenu']);
    }

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
      dialogDefaults:{},
      dialogComponents:[],
      menuVisible: false,
      leafComponent:false,
      existingData:{},
      targetCard :{},
      componentLoaders:{}
    }
  },
  methods:{
//cmd handlers
    handleCmd(args){
      console.log(this.name, ' handleCmd', args);
      this.cmdHandler(args, this);
    },
    cmdHandler(args, self){
//      debugger;
      if(args[2]==this.name || this.leafComponent==false){
        var cmdType ={
          'default': function(args, context){
            console.log('cmdHandler in dummy - something else', args, context);
          },
          'getScreenConfig': function(args, context){
            context.doGetScreenConfig(args, context);
          }


        }
        if(typeof(cmdType)!='undefined'){
          try {
            (cmdType[args[0]](args, self));
          } catch (e) {
//            debugger;
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
    doGetScreenConfig(args, context){
      console.log('dialog2 doGetScreenConfigs-', args, context);
      var pageConfig = ['pageConfig', this.dialogData, 'pageConfig'];
      this.$emit('cevt', pageConfig);
    },
//event handler
    evtOpt(msg){
      console.log('evtOpt in menu', msg);
      this.evtHandler(msg, this);
    },
    evtHandler(msg, self){
      console.log('evtHandler in dialog-', msg, self);
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
          debugger;
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
//      debugger;
      console.log('doMenuItemSelected in dialog-', msg, context);
      var menuSelection = {
        'loginVerify': function(msg, context){
          context.doLoginVerify(msg, context);
        },
        'configurePage': function(msg, context){
          context.doConfigurePage(msg, context);
        },
        'createCard': function(msg, context){
          context.doCreateCard(msg, context);
        },
        'createNewCard': function(msg, context){
          context.doCreateNewCard(msg, context);
        },
        'dismissDialog': function(msg, context){
          context.doDismissDialog(msg, context);
        },
        'saveScreenEntry': function(msg, context){
          context.doSaveScreenEntry(msg, context);
        },
        'updateScreenEntry': function(msg, context){
          context.doUpdateScreenEntry(msg, context);
        },
        'saveCardConfigurationEntry': function(msg, context){
          context.doSaveCardConfigurationEntry(msg, context);
        },
        'createCardAndConfiguration': function(msg, context){
          context.doCreateCardAndConfiguration(msg, context);
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
    doCreateCard(msg,context){
      console.log('createCard in dialog-', msg, context);
      var createCardParams = ['createCard', this.dialogData, 'createCard'];
      this.$emit('cevt', createCardParams);
    },
    doCreateNewCard(msg,context){
      console.log('createCard in dialog-', msg, context);
      var createCardParams = ['createNewCard', this.dialogData, 'createNewCard'];
      this.$emit('cevt', createCardParams);
    },
    setupDialog(dialogDef, target, action, existingData){
      //console.log('setupDialog-', dialogDef, target, existingData);
      let rData = this.getDialogDefinition(dialogDef);
      rData.action = action;
      rData.target = target;
      rData.existingData = existingData;
      return rData;
    },
    doDismissDialog(msg, context){
      console.log('doDismissDialog', msg, context);
      this.$emit('cevt', ['dismissDialog']);
    },
    doSaveScreenEntry(msg, context){
      console.log('in dialog doSaveScreenEntry', msg, context, this.dialogData);
      this.$emit('cevt', ['saveScreenEntry', this.dialogData]);
    },
    doUpdateScreenEntry(msg, context){
      console.log('in dialog doUpdateScreenEntry', msg, context, this.dialogData);
      this.$emit('cevt', ['updateScreenEntry', this.dialogData]);
    },
    doSaveCardConfigurationEntry(msg, context){
      console.log('in dialog doSaveCardConfigurationEntry', msg, context, this.dialogData, this.targetCard);
      this.$emit('cevt', ['saveCardConfigurationEntry', this.dialogData, this.targetCard]);
    },
    doCreateCardAndConfiguration(msg, context){
      console.log('in dialog doCreateCardAndConfiguration', msg, context)
      this.$emit('cevt', ['createCardAndConfiguration', this.dialogData, 'createCardAndConfiguration']);
    }
  }
}
</script>

<style scoped>
.dialogLayout {
  display:grid;
  grid-template-rows: 85% 15%;
  border-style: solid;
  border-color: red;
  border-width: 2px;
}
.dialogWrapperStyle {
  margin-left: 5%;
  margin-right: 5%;
  margin-top: 5%;
  display: flex;
  flex-direction: column;
  overflow-y:scroll;
  -webkit-overflow-scrolling: touch;

}
</style>
