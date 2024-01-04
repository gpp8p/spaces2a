<template>
  <section :style="dialogStyle" class="dialogLayout">
  <span class="promptClass">{{this.prompt}}</span>
  <span class="linkTable" v-if="this.mode == this.MODE_CREATE_PAGE ||
                                this.mode==this.MODE_COPY_PAGE ||
                                this.mode == this.MODE_SHOW_LINKS ||
                                this.mode == this.MODE_SHOW_AVAILABLE_PAGES ||
                                this.mode == this.MODE_SHOW_AVAILABLE_PAGES_ADD_LINK ||
                                this.mode == this.MODE_HEADLINE_TEXT" >
    <ccPage v-if="this.pleaseWait==false"
        name = 'ccPage'
        :config = 'ccPageConfig'
        :key = "reloadKey"
        @cevt="handleEvt"
    ></ccPage>
    <span v-if="this.pleaseWait == true" class="pleaseWait">
      <h2> Please Wait</h2>
    </span>
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
import Menu from "../components/menuNew.vue";
import menuDefinitions from "../components/menuDefinitionsNew.vue";
import dialogDefinitions from "../components/dialogDefinitions.vue";
import componentLoaders from "@/components/componentLoaders";
import ccPage from "@/components/ccPage";


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
  components: {Menu, ccPage},
  mixins: [utils, menuDefinitions, dialogDefinitions, componentLoaders],
  mounted(){
    console.log(this.name,' is mounted');
    debugger;
    this.$emit('cevt', ['setCmdHandler', this.handleCmd, this.name]);
    this.componentLoaders = this.getComponentLoaders();
    this.dialogFields = this.getDialogDefinition(this.config.definition, this.componentLoaders);
    this.dialogStyle = this.dialogFields.linkEditor.dialogStyle;
    this.cmdHandlers['linkEditorMenu'](['setMenu', this.dialogFields.linkEditor.menuName,'linkEditorMenu']);
    this.ccPageConfig.columns = this.existingDataColumns;
    this.ccPageConfig.definition = 'linkEditor';
    this.ccPageConfig.existingData ={};
    Object.keys(this.config.existingData.card_parameters.content).forEach(key => {
      console.log('existing data key-',key, this.config.existingData.card_parameters.content[key]);
      this.ccPageConfig.existingData[key]=this.config.existingData.card_parameters.content[key];
    });
    this.availableLinks = this.config.existingData.card_parameters.content.availableLinks;
    console.log('windowSize-', window.innerHeight);
    console.log('mounted ccPageConfig-', this.ccPageConfig);
    this.prompt='Existing Links - Click on one to select a link to change';
    debugger;
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
      MODE_SHOW_LINKS:7,
      MODE_CREATE_PAGE:1,
      MODE_COPY_PAGE:2,
      MODE_ADD_LINK:3,
      MODE_EXTERNAL_LINK:4,
      MODE_EDIT_HEADLINE:5,
      MODE_SHOW_AVAILABLE_PAGES:6,
      MODE_SHOW_AVAILABLE_PAGES_ADD_LINK:8,
      MODE_HEADLINE_TEXT:9,
      pleaseWait:false,
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
    availableLinks:[],
    targetTemplateId:0,
    copyIt:false,
    ccPageConfig:{},
    cardTitle:''
//    dataToSave:{}

    }
  },
  methods:{
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
      console.log('evtOpt in linkEditor', msg);
      this.evtHandler(msg, this);
    },
    evtHandler(msg, self){
      console.log('evtHandler in- linkEditor', msg, self);
      debugger;
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
        'fieldInput': function(msg, context){
          context.doFieldInput(msg, context);
        },
        'changeLink':function(msg, context){
          context.doChangeLink(msg, context);
        },
        'setMenuTo':function(msg, context){
          context.doSetMenuTo(msg, context);
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
        'createPage': function(msg, context){
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
        'copyThisPageDo':function(msg, context){
          context.doCopyThisPageDo(msg, context);
        },
        'loadAvailableLinks':function(msg, context){
          context.doLoadAvailableLinks(msg, context);
        },
        'cancelSelectPage':function(msg, context){
          context.doReturnToLinkEditorMain(msg, context);
        },
        'newPageLink':function(msg, context){
          context.doNewPageLink(msg, context);
        },
        'insertPage':function(msg, context){
          context.doInsertPage(msg, context);
        },
        'returnToPageSelected':function(msg, context){
          context.doReturnToPageSelected(msg, context);
        },
        'removeLink':function(msg, context){
          context.doRemoveLink(msg, context);
        },
        'saveNewPageAddLink':function(msg, context){
          context.doSaveNewPageAddLink(msg, context);
        },
        'copyThisPageInsertLink':function(msg, context){
          context.doCopyThisPageInsertLink(msg, context);
        },
        'moveLinkUp':function(msg, context){
          context.doMoveLinkUp(msg, context);
        },
        'moveLinkDown':function(msg, context){
          context.doMoveLinkDown(msg, context);
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
    doSetMenuTo(msg, context){
      console.log('in doSetMenuTo-', msg, context);
      this.cmdHandlers['linkEditorMenu'](['setMenu', msg[1],'linkEditorMenu']);
    },
    doNewPageLink(msg, context){
      console.log('in doNewPageLink-', msg, context);
      debugger;
      this.cmdHandlers['linkEditorMenu'](['setMenu', 'newPageLink','linkEditorMenu']);
    },
    doInsertPage(msg, context){
      console.log('in doInsert-', msg, context);
      this.cmdHandlers['linkEditorMenu'](['setMenu', 'newPageInsert','linkEditorMenu']);
    },
    doCopyThisPage(msg, context){
      console.log('in CopyThisPage', msg, context);
      this.ccPageConfig.definition = 'copyPage';
      this.cmdHandlers['linkEditorMenu'](['setMenu', 'linkEditorSubMenu3','linkEditorMenu']);
      this.mode = this.MODE_COPY_PAGE;
      this.prompt='';
      this.reloadKey+=1;
    },

    doFieldInput(msg, context){
      console.log('at doFieldInput-', msg, context);
      this.dialogData[msg[1]]=msg[2];
    },

    doAddLink(msg, context){
      console.log('in addLink', msg, context);
      this.prompt = "Find the link you wish toi add and click on it"
      this.getMySpaces(this.MODE_SHOW_AVAILABLE_PAGES_ADD_LINK);
    },
    doRemoveLink(msg, context){
      debugger;
      console.log('in removeLink-', msg, context);
      this.availableLinks = context.removeElementByIndex(this.availableLinks, this.selectedPageLink);
      this.ccPageConfig.existingData.availableLinks=this.availableLinks;
      this.ccPageConfig.definition = 'linkEditor';
      this.mode=this.MODE_SHOW_LINKS;
      this.prompt='Existing Links - Click on one to select a link to change';
      this.reloadKey+=1;
      console.log('back to show links -', this.mode);
      this.cmdHandlers['linkEditorMenu'](['setMenu', 'linkEditorSubMenu1','linkEditorMenu']);

    },
    doMoveLinkUp(msg, context){
      debugger;
      console.log('in moveLink up-', msg, context);
      this.availableLinks = context.shiftObjectTowardsBeginning(this.availableLinks, this.selectedPageLink);
      this.ccPageConfig.existingData.availableLinks=this.availableLinks;
      this.ccPageConfig.definition = 'linkEditor';
      this.mode=this.MODE_SHOW_LINKS;
      this.prompt='Existing Links - Click on one to select a link to change';
      this.reloadKey+=1;
      console.log('back to show links -', this.mode);
      this.cmdHandlers['linkEditorMenu'](['setMenu', 'linkEditorSubMenu1','linkEditorMenu']);

    },
    doMoveLinkDown(msg, context){
      debugger;
      console.log('in move link down-', msg, context);
      this.availableLinks = context.shiftObjectTowardsEnd(this.availableLinks, this.selectedPageLink);
      this.ccPageConfig.existingData.availableLinks=this.availableLinks;
      this.ccPageConfig.definition = 'linkEditor';
      this.mode=this.MODE_SHOW_LINKS;
      this.prompt='Existing Links - Click on one to select a link to change';
      this.reloadKey+=1;
      console.log('back to show links -', this.mode);
      this.cmdHandlers['linkEditorMenu'](['setMenu', 'linkEditorSubMenu1','linkEditorMenu']);

    },
    doCreatePageAndLink(msg, context){
      console.log('in CreatePageAndLink', msg, context);
      this.ccPageConfig.definition = 'createPageAndLink';
      this.mode=this.MODE_CREATE_PAGE;
      this.prompt='Create This Page and Add It to the Card\'s Links';
      this.reloadKey+=1;
      this.cmdHandlers['linkEditorMenu'](['setMenu', 'createPageMenu','linkEditorMenu']);

    },
    doAddExternalLink(msg, context){
      console.log('in AddExternalLink', msg, context);
    },
    doEditHeadline(msg, context){
      console.log('in headlineText', msg, context);

      this.ccPageConfig.definition = 'headlineText';
      this.cmdHandlers['linkEditorMenu'](['setMenu', 'linkEditorSubMenu3','linkEditorMenu']);
      this.mode = this.MODE_HEADLINE_TEXT;
      this.prompt='';
      this.reloadKey+=1;

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
        this.selectedPageLink = this.availableLinks.findIndex((element) => element.id == msg[1].id);
        console.log('selectedElementIndex-', this.selectedPageLink);
        this.selectedPageIsExternal = msg[1].isExternal;
        this.selectedPageDescription = msg[1].description;
        this.selectedPageType = msg[1].type;
        this.mode=this.MODE_SHOW_AVAILABLE_PAGES;
        this.prompt = 'Available Pages - Click on one to change this link'
//        this.getMySpaces(this.MODE_SHOW_AVAILABLE_PAGES);
        this.cmdHandlers['linkEditorMenu'](['setMenu', 'linkEditorSubMenu2','linkEditorMenu']);
      }else if(this.mode==this.MODE_SHOW_AVAILABLE_PAGES){
        debugger;
        console.log('space selected-', msg);
        var selectedPage = {};

        selectedPage.id = msg[1].id
        selectedPage.layout_link_to = msg[1].id;
        selectedPage.description = msg[1].menu_label;
        selectedPage.link_url = this.$store.getters.getUrlBase+'/displayLayout/'+msg[1].id;
        selectedPage.isExternal=0;
        console.log('selectedPage-', selectedPage);
        this.availableLinks[this.selectedPageLink]=selectedPage;
        console.log('ccPageConfig - 2', this.ccPageConfig);
        this.ccPageConfig.existingData.availableLinks=this.availableLinks;
        this.ccPageConfig.definition = 'linkEditor';
        this.mode=this.MODE_SHOW_LINKS;
        this.prompt='Existing Links - Click on one to select a link to change';
        this.reloadKey+=1;
        context.cmdHandlers['linkEditorMenu'](['setMenu', 'linkEditorSubMenu1','linkEditorMenu']);
      }else if(this.mode==this.MODE_SHOW_AVAILABLE_PAGES_ADD_LINK){
        selectedPage = {};
        debugger;
        selectedPage.id = msg[1].id
        selectedPage.layout_link_to = msg[1].id;
        selectedPage.description = msg[1].menu_label;
        selectedPage.link_url = this.$store.getters.getUrlBase+'/displayLayout/'+msg[1].id;
        selectedPage.isExternal=0;
        console.log('selectedPage add iink-', selectedPage);
        this.availableLinks.push(selectedPage);
        this.ccPageConfig.existingData.availableLinks=this.availableLinks;
        this.ccPageConfig.definition = 'linkEditor';
        this.mode=this.MODE_SHOW_LINKS;
        this.prompt='Existing Links - Click on one to select a link to change';
        this.reloadKey+=1;
        console.log('back to show links -', this.mode);
        this.cmdHandlers['linkEditorMenu'](['setMenu', 'linkEditorSubMenu1','linkEditorMenu']);
      }

    },
    doReturnToPageSelected(msg, context){
      console.log('in doRetiurnToPageSelected', msg, context);
      this.cmdHandlers['linkEditorMenu'](['setMenu', 'linkEditorSubMenu2','linkEditorMenu']);
    },
    doReturnToLinkEditorMain(msg, context){
      debugger;
      console.log('in doReturnToLinkEditorMain', msg, context);
      this.ccPageConfig.columns = this.loadedDataColumns;
      this.ccPageConfig.perPage = this.getTableHeight(window.innerHeight);
//      this.ccPageConfig.data =  this.config.existingData.card_parameters.content.availableLinks;
      Object.keys(this.config.existingData.card_parameters.content).forEach(key => {
        console.log('existing data key-',key, this.config.existingData.card_parameters.content[key]);
        this.ccPageConfig.existingData[key]=this.config.existingData.card_parameters.content[key];
      });
      this.availableLinks = this.config.existingData.card_parameters.content.availableLinks;



      this.ccPageConfig.definition = 'linkEditor';
      this.mode=this.MODE_SHOW_LINKS;
      this.prompt='Existing Links - Click on one to select a link to change';
      this.cmdHandlers['linkEditorMenu'](['setMenu', 'linkEditorSubMenu1','linkEditorMenu']);
      this.reloadKey+=1;

    },
    doLoadAvailableLinks(msg, context) {
      console.log('in doLoadAvailableLinks', msg, context);
      this.prompt="Click on page to substitute for this link"
      this.getMySpaces(this.MODE_SHOW_AVAILABLE_PAGES);
    },
    doSaveNewPageAddLink(msg, context) {
      console.log('in doSaveNewPageAddLink-', msg, context);
//      this.$emit('cevt', ['saveNewPageAddLink', this.dialogData]);
      var pageSavedCallback = function(layoutId, context, updateLinkDataCallback){
        debugger;
        console.log('pageSavedCallback-', layoutId, context);
        var thisCardTitle='';
        if(context.cardTitle.length>0){
          thisCardTitle=context.cardTtile;
        }
        updateLinkDataCallback(context, thisCardTitle);
        debugger;
        var pageToInsert={};
        pageToInsert.id = layoutId
        pageToInsert.layout_link_to = layoutId;
        pageToInsert.description = context.dialogData.pageName;
        pageToInsert.link_url = context.$store.getters.getUrlBase+'/displayLayout/'+layoutId;
        pageToInsert.isExternal=0;
        context.availableLinks=context.insertObjectAfterIndex(context.availableLinks, context.selectedPageLink, pageToInsert)
        context.ccPageConfig.existingData.availableLinks=context.availableLinks;
        context.ccPageConfig.definition = 'linkEditor';
        context.mode=context.MODE_SHOW_LINKS;
        context.prompt='Existing Links - Click on one to select a link to change';
        context.reloadKey+=1;
        console.log('back to show links -', context.mode);
        context.cmdHandlers['linkEditorMenu'](['setMenu', 'linkEditorSubMenu1','linkEditorMenu']);
      }
      var updateLinkDataCallback=function(context, title){
        console.log('in updateLinkDataCallback-', context, cardTitle);
        var cardTitle = ''
        if(typeof(title)!='undefined'){
          cardTitle = title;
        }
        var allCardLinks = JSON.stringify(context.availableLinks);
        var linksSavedCallback = function(){
          console.out('links saved');
        }
        var orient = 'horozontal';
        this.updateLinkData(orient, cardTitle, allCardLinks, linksSavedCallback)


      }
      this.saveNewPage(context, pageSavedCallback, updateLinkDataCallback);

    },
    doCopyThisPageInsertLink(msg, context) {
      console.log('in copythisPageInsertLink', msg, context);
      this.targetTemplateId = this.$store.getters.getCurrentLayoutId;
      var copyTemplateCallback = function(layoutId, context){
        console.log('in copythisPageInsertLink',layoutId, context);
        var pageToInsert={};
        pageToInsert.id = layoutId
        pageToInsert.layout_link_to = layoutId;
        pageToInsert.description = context.dialogData.pageName;
        pageToInsert.link_url = context.$store.getters.getUrlBase+'/displayLayout/'+layoutId;
        pageToInsert.isExternal=0;
        context.availableLinks=context.insertObjectAfterIndex(context.availableLinks, context.selectedPageLink, pageToInsert)
        context.ccPageConfig.existingData.availableLinks=context.availableLinks;
        context.ccPageConfig.definition = 'linkEditor';
        context.mode=context.MODE_SHOW_LINKS;
        context.prompt='Existing Links - Click on one to select a link to change';
        context.reloadKey+=1;
        console.log('back to show links -', context.mode);
        context.cmdHandlers['linkEditorMenu'](['setMenu', 'linkEditorSubMenu1','linkEditorMenu']);
      }
      this.makeTemplateClone(copyTemplateCallback, context);
    },

    getMySpaces(nextMode){
      debugger;
      this.pleaseWait=true;
      var apiPath = this.$store.getters.getApiBase;
      console.log('apiPath - ',apiPath);
      axios.get(apiPath+'api/shan/getMySpaces?XDEBUG_SESSION_START=15122"', {
        params:{
          orgId:this.$store.getters.getOrgId,
          userId: this.$store.getters.getLoggedInUserId,
        }
      }).then(response=> {
        debugger;
        console.log('getMySpaces',response);
        this.ccPageConfig.existingData ={};
        this.ccPageConfig.existingData.availablePages = response.data;
        this.ccPageConfig.columns = this.loadedDataColumns;
        this.ccPageConfig.perPage = this.getTableHeight(window.innerHeight);
        this.ccPageConfig.definition = 'availablePages';


//        this.prompt = 'Available Pages - Click on one to change this link'
        this.pleaseWait=false;
        this.mode = nextMode;
        this.reloadKey+=1;
      }).catch(e=>{
        console.log(e);
      });
    },

    getTableHeight(windowHeight){
      if(windowHeight>700) return 7;
      if(windowHeight<700 && windowHeight>550)return 6;
      return 5;
    },
    doCopyThisPageDo(msg, context) {
      console.log('at doCopyThisPageDo', msg, context);
      var copyTemplateCallback = function(layoutId, context){
        console.log('in copyTemplateCallback',layoutId, context);
      }
      this.targetTemplateId = this.$store.getters.getCurrentLayoutId;
      this.makeTemplateClone(copyTemplateCallback, context);
      this.copyIt=true;
    },

// end of methods
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
.pleaseWait {
  font-family: Candara;
  color:red;
}
.promptClass {
  margin-left: auto;
  margin-right: auto;
  font-family: Candara;
  font-size: medium;
  color: red;
}
</style>

