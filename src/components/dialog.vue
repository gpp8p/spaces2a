<template>
  <span>
    <section :style="dialogStyle" class="dialogLayout">
    <span class="dialogWrapperStyle">
      <component v-for="(thisField, index) in this.dialogFields"
                 :is="thisField.type"
                 :key="index"
                 :cmdObject="thisField"
                 :cmdObjectVersion="cmdObjectVersion"
                 :name="thisField.name"
                 @cevt="handleEvt"
      ></component>
    </span>

    <Menu
          :cmdObject="this.dialogMenu"
          :cmdObjectVersion="this.dialogMenuVersion"
          :key="this.dialogMenuReset"
          :name="dialogMenuName"
          @cevt="handleEvt"
    ></Menu>
  </section>
  </span>

</template>

<script>
import utils from './utils.vue';

//import CreatePage from "@/components/CreatePage";

import menuDefinitions from "../components/menuDefinitions.vue";
import Menu from "../components/menu.vue";

//import cmdObjectFactory from "../components/cmdObjectFactory.vue";
export default {
  name: "dialog",
  components: {InputField, inputNumberField, inputPasswordField, vButton, vCheckBox, vSelect, vRadioGroup, vBackgroundPicker, Menu},
//  extends: utils,
//  mixins: [utils, cmdObjectFactory],
  mixins: [utils, menuDefinitions],
  mounted(){
    console.log('dialog mounted');
//    debugger;
/*
    var cmdObjectKeys = Object.keys(this.cmdObject[this.name]);
    var newStyle = '';
    for(var d = 0; d< cmdObjectKeys.length; d++){
      newStyle = newStyle + cmdObjectKeys[d]+': '+ this.cmdObject[this.name][cmdObjectKeys[d]]+';';
    }
    this.dialogStyle = newStyle;
*/
//    debugger;

    switch(this.cmdObject.systemDialog.action){
      case 'createPage':{
        this.doCreatePage();
        this.menuVisible=true;
        break;
      }
      case 'headlineCard':{
        this.doHeadlineCard();
        this.menuVisible=true;
        break;
      }

      case 'mySpaces':{
//        debugger;
        this.doMySpaces();
        break;
      }


      case 'showLogin':{
        console.log('showLogin -',this.cmdObject);
        this.dialogFields = this.cmdObject.systemDialog.fields;
        this.dialogStyle = this.cmdObject.systemDialog.dialogStyle;
        this.setMenu(this.cmdObject.systemDialog.menuName);
        this.menuVisible=true;
        break;
      }
      case 'pageDefaultSelect':{
        this.dialogFields = this.cmdObject.systemDialog.pageDefaultSelect.fields;
        this.dialogStyle = this.cmdObject.systemDialog.pageDefaultSelect.dialogStyle;
        this.setMenu(this.cmdObject.systemDialog.pageDefaultSelect.menuName);
        this.menuVisible=true;
        break;
      }
      case 'newCardSelect':{
        this.dialogFields = this.cmdObject.systemDialog.newCardSelect.fields;
        this.dialogStyle = this.cmdObject.systemDialog.newCardSelect.dialogStyle;
        this.menuVisible=true;
        break;
      }
    }


  },
  created(){
//    this.setMenu('dialogSubMenu1');
  },
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
      dialogStyle:'',
      cmdObject: {},
      cmdObjectVersion:0,
      dialogMenu: {},
      dialogMenuVersion:0,
      dialogMenuReset:0,
      dialogMenuName:'dialogMenu',
      dialogData:{},
      dialogFields:[],
      menuVisible: false

    }
  },
  methods:{

    setupDialog(dialogDef, target, action, existingData){
      //console.log('setupDialog-', dialogDef, target, existingData);
      let rData = this.getDialogDefinition(dialogDef);
      rData.action = action;
      rData.target = target;
      rData.existingData = existingData;
      return rData;
    },

    doMySpaces(){
      this.dialogMenu = {
        action: 'setMenu',
        target: 'dialogMenu',
        currentMenuOpts:this.getMenuOpts('mySpacesMenu')
      }
//        this.setMenu(this.cmdObject.systemDialog.mySpacesSpecification.menuName);
      this.dialogMenuVersion+=1;
      this.dialogMenuReset+=1;
      this.dialogFields = this.cmdObject.systemDialog.mySpacesSpecification.fields;
      this.dialogStyle = this.cmdObject.systemDialog.mySpacesSpecification.dialogStyle;
//      debugger;
      this.menuVisible=true;
    },
    doCreatePage(){
//        debugger;
      console.log('doCreatePage-',this.cmdObject);
      this.dialogFields = this.cmdObject.systemDialog.createPage.fields;
      for(var f = 0; f<this.dialogFields.length;f++){
        this.dialogFields[f]['existingData']=this.cmdObject.systemDialog.existingData[this.dialogFields[f].name];
        this.dialogFields[f]['allData']= this.cmdObject.systemDialog.existingData;
        console.log(this.dialogFields[f].name, '-', this.cmdObject.systemDialog.existingData[this.dialogFields[f].name]);

      }
      this.dialogStyle = this.cmdObject.systemDialog.createPage.dialogStyle;
      console.log('dialogStyle',this.dialogStyle);
      console.log('cmdObj-', this.cmdObject);
      this.dialogData.pageType = this.cmdObject.systemDialog.existingData['pageType'];
      this.setMenu(this.cmdObject.systemDialog.createPage.menuName);
    },
    doHeadlineCard(){
      console.log('headlineCard dialog-', this.cmdObject);
//        debugger;
      this.dialogFields = this.cmdObject.systemDialog.newCardSpecifications.fields;
      for(var f = 0; f<this.dialogFields.length;f++){
        this.dialogFields[f]['existingData']=this.cmdObject.systemDialog.existingData[this.dialogFields[f].name];
        this.dialogFields[f]['allData']= this.cmdObject.systemDialog.existingData;
        console.log(this.dialogFields[f].name, '-', this.cmdObject.systemDialog.existingData[this.dialogFields[f].name]);

      }
      this.dialogStyle = this.cmdObject.systemDialog.newCardSpecifications.dialogStyle;
      this.setMenu(this.cmdObject.systemDialog.newCardSpecifications.menuName);
    },
    evtOpt(msg){
 //     debugger;
      console.log('evtOpt in dialog-', msg);
      switch(msg[0]){
        case 'loginVerify':{
//          debugger;
          console.log('verifyLogin in dialog');
          this.$emit('cevt', ['loginVerify', this.dialogData]);
          break
        }
        case 'saveScreenEntry':{
          this.$emit('cevt', ['saveScreenEntry', this.dialogData]);
          break;
        }
        case 'createCard':{
          debugger;
          this.dialogData.card_component = this.cmdObject.systemDialog.existingData.card_component;
          this.$emit('cevt', ['createCard', this.dialogData]);
          break;
        }
        case 'fieldInput':{
//          debugger;
          console.log('in dialog-', msg);
          switch(msg[1]){
            case 'pageType':{
//              this.$emit('cevt', msg);
              this.$emit('cevt', [msg[1], msg[2]]);
              break;
            }
            case 'card_component':{
//              this.$emit('cevt', msg);
              this.$emit('cevt', [msg[1], msg[2]]);
              break;
            }
            default:{
//              debugger;
              console.log('fieldInput',msg);
              this.dialogData[msg[1]]= msg[2];
              break;
            }
          }
          break;
        }
        default :{
          this.$emit('cevt', msg);
        }
      }
    },
    setMenu(menuName){
//      debugger;
      let newMenu = {};
      newMenu['action'] = 'setMenu';
      newMenu['target'] = this.dialogMenuName;
      newMenu['currentMenuOpts']=this.getMenuOpts(menuName);
      console.log('new menu', newMenu);
//      this.dialogMenu[this.dialogMenuName]=newMenu;
      this.dialogMenu=newMenu;
      this.dialogMenuVersion+=1;

    },
  },
  watch: {

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
