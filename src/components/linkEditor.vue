<template>
  <section :style="dialogStyle" class="dialogLayout">
  <span class="promptClass">{{this.prompt}}</span>
  <span class="linkTable" v-if="this.mode == this.MODE_SHOW_LINKS || this.mode==this.MODE_SHOW_AVAILABLE_PAGES">
    <tableWrapper
        :config = "configObject"
        :key = "reloadKey"
        @cevt="handleEvt"
    ></tableWrapper>
  </span>

  <Menu
      name="linkEditorMenu"
      @cevt="handleEvt"
  ></Menu>
  </section>
</template>

<script>
import utils from '../components/utils.vue';
import axios from "axios";
import tableWrapper from '../components/tableWrapper.vue';
import Menu from "../components/menuNew.vue";
import menuDefinitions from "../components/menuDefinitionsNew.vue";
import dialogDefinitions from "../components/dialogDefinitions.vue";
import componentLoaders from "@/components/componentLoaders";


export default {
  name: "linkEditor",
  props:{
    name:{
      type: String,
      required: true
    },
    config:{
      type: Object,
      required: false
    }
  },
  components: {axios, tableWrapper, Menu},
  mixins: [utils, menuDefinitions, dialogDefinitions, componentLoaders],
  mounted(){
    console.log(this.name,' is mounted');
    debugger;
    this.$emit('cevt', ['setCmdHandler', this.handleCmd, this.name]);
    this.componentLoaders = this.getComponentLoaders();
    this.dialogFields = this.getDialogDefinition(this.config.definition, this.componentLoaders);
    this.dialogStyle = this.dialogFields.linkEditor.dialogStyle;
    this.cmdHandlers['linkEditorMenu'](['setMenu', this.dialogFields.linkEditor.menuName,'linkEditorMenu']);
    this.configObject.columns = this.existingDataColumns;
    this.configObject.data = this.config.existingData.card_parameters.content.availableLinks;
    this.availableLinks = this.config.existingData.card_parameters.content.availableLinks;
    console.log('windowSize-', window.innerHeight);
    this.configObject.perPage = this.getTableHeight(window.innerHeight);
    this.prompt='Existing Links - Click on one to select';
//    this.configObject.perPage = this.perPage;
    this.mode = this.MODE_SHOW_LINKS;
    this.reloadKey+=1;
  },
  beforeDestroy() {
    this.$emit('cevt', ['removeCmdHandler', this.handleCmd, this.name]);
  },
  data(){
    return {
      cmdHandlers:{},
      leafComponent: false,
      mode:0,
      dialogStyle:{},
      configObject:{},
      reloadKey:0,
      MODE_SHOW_LINKS:0,
      MODE_CREATE_PAGE:1,
      MODE_COPY_PAGE:2,
      MODE_ADD_LINK:3,
      MODE_EXTERNAL_LINK:4,
      MODE_EDIT_HEADLINE:5,
      MODE_SHOW_AVAILABLE_PAGES:6,
      dialogData:{},
      dialogFields:[],
      perPage:this.getTableHeight(window.innerHeight),
      selectedPageLink:0,
      selectedPageDescription:'',
      selectedPageIsExternal:0,
      selectedPageType:'',
      existingDataColumns: [
      {
        field: 'id',
        label: 'ID',
        numeric: true,
        visible: false
      },
      {
        field: 'description',
        label: 'Link To'
      },
      {
        field: 'isExternal',
        label: 'External ?',
        numeric: true,
      },
      {
        field:  'link_url',
        label:  'Target'
      },
      {
        field: 'layout_link_to',
        label: '',
        numeric: true,
        visible: false
      }

    ],
    loadedDataColumns:[
      {
        field: 'id',
        label: 'ID',
        numeric: true,
        visible: false
      },
      {
         field: 'menu_label',
         label: 'Label'
      },
      {
        field: 'description',
        label: 'Link To'
      },
    ],
    prompt:'',
    availableLinks:[]

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
      console.log('evtHandler in- linkEditor', msg, self);
//      debugger;
      var evtType = {
        'setCmdHandler': function(msg, context){
          //console.log('evtHandler - a menu event', msg);
          context.doSetCmdHandler(msg, context);
        },
        'removeCmdHandler': function(msg, context){
          context.doRemoveCmdHandler(msg, context);
        },
        'menuItemSelected': function(msg, context){
          context.doMenuItemSelected(msg, context);
        },
        'pageSelected': function(msg, context){
          context.doPageSelected(msg, context);
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
//      debugger;
      console.log('doSetCmdHandler-',msg, context);
      this.cmdHandlers[msg[2]]=msg[1];
    },
    doRemoveCmdHandler(msg, context){
      console.log('doRemoveCmdHandler-',msg, context);
      delete(this.cmdHandlers[msg[2]]);
    },
    doMenuItemSelected(msg, context){
      console.log('doMenuItemSelected in dialog-', msg, context);
      var menuSelection = {
        'createPageAndLink': function(msg, context){
          context.doCreatePageAndLink(msg, context);
        },
        'copyThisPage': function(msg, context){
          context.doCopyThisPage(msg, context);
        },
        'addLink': function(msg, context){
          context.doAddLink(msg, context);
        },
        'addExternalLink': function(msg, context){
          context.doAddExternalLink(msg, context);
        },
        'editHeadline': function(msg, context){
          context.doEditHeadline(msg, context);
        },
        'saveLinks': function(msg, context){
          context.doSaveLinks(msg, context);
        },
        'dismissLinkEditor':function(msg, context){
          context.doDismissLinkEditor(msg, context);
        },
        'returnToLinkEditorMain':function(msg, context){
          context.doReturnToLinkEditorMain(msg, context);
        },
        'changeLink':function(msg, context){
          context.doChangeLink(msg, context);
        }
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
    doCopyThisPage(msg, context){
      console.log('in CopyThisPage', msg, context);
    },
    doAddLink(msg, context){
      console.log('in addLink', msg, context);
    },
    doCreatePageAndLink(msg, context){
      console.log('in CreatePageAndLink', msg, context);
    },
    doAddExternalLink(msg, context){
      console.log('in AddExternalLink', msg, context);
    },
    doEditHeadline(msg, context){
      console.log('in EditHeadline', msg, context);
    },
    doSaveLinks(msg, context){
      console.log('in SaveLinks', msg, context);
    },
    doDismissLinkEditor(msg, context){
      console.log('in doDismissLinkEditor', msg, context);
      this.$emit('cevt', ['dismissDialog']);
    },
    doPageSelected(msg, context){
      debugger;
      console.log('in doPageSelected', msg, context);
      if(this.mode==this.MODE_SHOW_LINKS){
        this.selectedPageLink = msg[2];
        this.selectedPageIsExternal = msg[3];
        this.selectedPageDescription = msg[4];
        this.selectedPageType = msg[5];
        this.mode=this.MODE_SHOW_AVAILABLE_PAGES;
        this.cmdHandlers['linkEditorMenu'](['setMenu', 'linkEditorSubMenu2','linkEditorMenu']);
      }else if(this.mode==this.MODE_SHOW_AVAILABLE_PAGES){
        debugger;
        this.configObject.columns = this.existingDataColumns;
        this.availableLinks[this.selectedPageLink]=this.configObject.data[msg[1]];
        this.configObject.perPage = this.getTableHeight(window.innerHeight);
        this.configObject.columns = this.existingDataColumns;
        this.configObject.data = this.availableLinks;
//        this.configObject.data[this.selectedPageLink]=this.
        this.mode==this.MODE_SHOW_LINKS;
        this.prompt='Existing Links - Click on one to select';
        this.reloadKey+=1;
        this.cmdHandlers['linkEditorMenu'](['setMenu', 'linkEditorSubMenu1','linkEditorMenu']);
      }

    },
    doReturnToLinkEditorMain(msg, context){
      console.log('in doReturnToLinkEditorMain', msg, context);
      this.configObject.columns = this.existingDataColumns;
      this.configObject.data = this.config.existingData.card_parameters.content.availableLinks;
      this.configObject.perPage = this.getTableHeight(window.innerHeight);
      this.prompt='Existing Links - Click on one to select';
      this.reloadKey+=1;
      this.cmdHandlers['linkEditorMenu'](['setMenu', 'linkEditorSubMenu1','linkEditorMenu']);
    },
    doChangeLink(msg, context) {
      console.log('in doChangeLink', msg, context);
      this.prompt = 'Available Pages - Click on one to change this link'
      this.getMySpaces();
    },

    getMySpaces(){
      var apiPath = this.$store.getters.getApiBase;
      console.log('apiPath - ',apiPath);
      axios.get(apiPath+'api/shan/getMySpaces?XDEBUG_SESSION_START=15122"', {
//    axios.get('http://localhost:8000/api/shan/getMySpaces?XDEBUG_SESSION_START=15122"', {
        params:{
          orgId:this.$store.getters.getOrgId,
          userId: this.$store.getters.getLoggedInUserId,
        }
      }).then(response=> {
        debugger;
        console.log('getMySpaces',response);
//        this.data=response.data;
        this.configObject.data = response.data;
        this.configObject.columns = this.loadedDataColumns;
        this.configObject.perPage = this.getTableHeight(window.innerHeight);
        this.reloadKey+=1;
      }).catch(e=>{
        console.log(e);
      });
    },

    getTableHeight(windowHeight){
      if(windowHeight>700) return 7;
      if(windowHeight<700 && windowHeight>550)return 6;
      return 5;
    }







  }
}
</script>

<style scoped>
.dialogLayout {
  display:grid;
  grid-template-rows: 15% 70% 15%;
  border-style: solid;
  border-color: red;
  border-width: 2px;
}
.linkTable {
  margin-left: 10%;
  margin-right: 10%;
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
.promptClass {
  margin-left: auto;
  margin-right: auto;
  font-family: Candara;
  font-size: medium;
  color: red;
}
</style>

