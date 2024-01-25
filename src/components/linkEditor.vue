<template>
  <section :style="dialogStyle" class="dialogLayout">
  <span class="promptClass">{{this.prompt}}</span>
  <span class="linkTable" v-if="this.mode == this.MODE_CREATE_PAGE ||
                                this.mode==this.MODE_COPY_PAGE ||
                                this.mode==this.MODE_COPY_PAGE_ADD_LINK ||
                                this.mode==this.MODE_COPY_PAGE_INSERT_LINK ||
                                this.mode == this.MODE_SHOW_LINKS ||
                                this.mode == this.MODE_SHOW_AVAILABLE_PAGES ||
                                this.mode == this.MODE_SHOW_AVAILABLE_PAGES_ADD_LINK ||
                                this.mode == this.MODE_CHANGE_LINK_LABEL ||
                                this.mode == this.MODE_COPY_TEMPLATE_ADD ||
                                this.mode == this.MODE_COPY_TEMPLATE_INSERT ||
                                this.mode == this.MODE_EXT_LINK_INSERT ||
                                this.mode == this.MODE_EXT_LINK_APPEND ||
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
    debugger;
    if(typeof(this.config.existingData.card_parameters.content.linkMenuTitle)!='undefined'){
      this.cardTitle = this.config.existingData.card_parameters.content.linkMenuTitle;
    }else{
      this.cardTitle = '';
    }
    this.cardTitle = this.config.existingData.card_parameters.content.linkMenuTitle;
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
      MODE_CHANGE_LINK_LABEL:10,
      MODE_COPY_PAGE_ADD_LINK:11,
      MODE_COPY_PAGE_INSERT_LINK:12,
      MODE_COPY_TEMPLATE_ADD:13,
      MODE_COPY_TEMPLATE_INSERT:14,
      MODE_EXT_LINK_INSERT:15,
      MODE_EXT_LINK_APPEND:16,
      ADD_LINK:0,
      INSERT_LINK:1,
      pleaseWait:false,
      dialogData:{},
      dialogFields:[],
      perPage:this.getTableHeight(window.innerHeight),
      selectedPageLink:-1,
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
      debugger;
      var menuSelection = {
        'createPage': function(msg, context){
          context.doCreatePageAndLink(msg, context);
        },
        'createPageAdd':function(msg, context){
          context.doCreatePageAndLinkAdd(msg, context);
        },
        'copyThisPageInsert': function(msg, context){
          context.doCopyThisPageInsert(msg, context);
        },
        'copyThisPageAdd':function(msg, context){
          context.doCopyThisPageAdd(msg, context);
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
          context.doSaveNewPageInsertLink(msg, context, context.ADD_LINK);
        },
        'saveNewPageInsertLink':function(msg, context){
          context.doSaveNewPageInsertLink(msg, context, context.INSERT_LINK);
        },
        'copyThisPageAppendLink':function(msg, context){
          debugger;
          var currentLayoutId = context.$store.getters.getCurrentLayoutId;
          context.doCopyThisPageAppendLink(msg, context, context.ADD_LINK, currentLayoutId);
        },
        'copyThisPageInsertLink':function(msg, context){
          var targetLayoutId = context.$store.getters.getCurrentLayoutId;
          debugger;
          context.doCopyThisPageAppendLink(msg, context, context.INSERT_LINK, targetLayoutId);
        },
        'moveLinkUp':function(msg, context){
          context.doMoveLinkUp(msg, context);
        },
        'moveLinkDown':function(msg, context){
          context.doMoveLinkDown(msg, context);
        },
        'updateHeadline':function(msg, context){
          context.doUpdateHeadline(msg, context);
        },
        'saveLinks':function(msg, context){
          context.doUpdateCardData(msg, context);
        },
        'changeLinkLabel':function(msg, context){
          context.doChangeLinkLabel(msg, context);
        },
        'updateLinkLabel':function(msg, context){
          context.doUpdateLinkLabel(msg, context);
        },
        'copyTemplate':function(msg, context){
          context.doCopyTemplate(msg, context);
        },
        'copyTemplateAdd':function(msg, context){
          console.log('copyTemplateAdd-', msg, context);
          var layoutIdToAdd = context.dialogData.templateId;
          context.doCopyThisPageAppendLink(msg, context, context.ADD_LINK, layoutIdToAdd);
        },
        'copyTemplateInsert':function(msg, context){
          console.log('copyTemplateInsert-', msg, context);
          var layoutIdToInsert = context.dialogData.templateId;
          context.doCopyThisPageAppendLink(msg, context, context.INSERT_LINK, layoutIdToInsert);
        },
        'extLinkInsert':function(msg, context){
          context.doExtLinkInsert(msg, context);
        },
        'extLinkAppend':function(msg, context){
          context.doExtLinkAppend(msg, context);
        },
        'extLinkInsertSave':function(msg, context){
          context.doExtLinkInsertSave(msg, context);
        },
        'extLinkAppendSave':function(msg, context){
          context.doExtLinkAppendSave(msg, context);
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
    doCopyThisPageInsert(msg, context){
      console.log('in doCopyThisPageInsert', msg, context);
      this.ccPageConfig.definition = 'copyPage';
      this.cmdHandlers['linkEditorMenu'](['setMenu', 'linkEditorSubMenu3','linkEditorMenu']);
      this.mode = this.MODE_COPY_PAGE;
      this.prompt='';
      this.reloadKey+=1;
    },
    doCopyThisPageAdd(msg, context){
      console.log('in CopyThisPage', msg, context);
      this.ccPageConfig.definition = 'copyPage';
      this.cmdHandlers['linkEditorMenu'](['setMenu', 'dialogSubMenu2','linkEditorMenu']);
      this.mode = this.MODE_COPY_PAGE_ADD_LINK;
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
      this.selectedPage=-1;
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
      this.selectedPage=-1;
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
      this.selectedPage=-1;
      this.mode=this.MODE_SHOW_LINKS;
      this.prompt='Existing Links - Click on one to select a link to change';
      this.reloadKey+=1;
      console.log('back to show links -', this.mode);
      this.cmdHandlers['linkEditorMenu'](['setMenu', 'linkEditorSubMenu1','linkEditorMenu']);

    },
    doUpdateHeadline(msg, context){
      console.log('in doUpdateHeadline-', msg, context);
      this.cardTitle = this.dialogData.headlineText;
      this.doUpdateCardData(msg, context);

    },
    doChangeLinkLabel(msg, context){
      console.log('in doChangeLinkLabel-', msg, context);
      this.ccPageConfig.definition = 'changeLinkLabel';
      this.ccPageConfig.existingData.linkLabel=this.selectedPageDescription;
//      this.ccPageConfig.selectedPageLink = this.selectedPageLink;
//      this.ccPageConfig.selectedPageDescription = this.selectedPageDescription;
      this.cmdHandlers['linkEditorMenu'](['setMenu', 'changeLinkLabel','linkEditorMenu']);
      this.mode = this.MODE_CHANGE_LINK_LABEL;
      this.prompt='';
      this.reloadKey+=1;

    },
    doUpdateLinkLabel(msg, context){
      console.log('in doUpdateLinkLabel-', msg, context);
      this.availableLinks[this.selectedPageLink].description=this.dialogData.linkLabel;
      this.doUpdateCardData(msg, context);
    },
    doCreatePageAndLink(msg, context){
      console.log('in CreatePageAndLink', msg, context);
      this.ccPageConfig.definition = 'createPageAndLink';
      this.mode=this.MODE_CREATE_PAGE;
      this.prompt='Create This Page and Add It to the Card\'s Links';
      this.reloadKey+=1;
      this.cmdHandlers['linkEditorMenu'](['setMenu', 'createPageMenu','linkEditorMenu']);

    },
    doCreatePageAndLinkAdd(msg, context){
      console.log('in CreatePageAndLink', msg, context);
      this.ccPageConfig.definition = 'createPageAndLink';
      this.mode=this.MODE_CREATE_PAGE;
      this.prompt='Create This Page and Add It to the Card\'s Links';
      this.reloadKey+=1;
      this.cmdHandlers['linkEditorMenu'](['setMenu', 'createPageMenuAdd','linkEditorMenu']);

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
        this.selectedPage=-1;
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
        this.selectedPage=-1;
        this.prompt='Existing Links - Click on one to select a link to change';
        this.reloadKey+=1;
        console.log('back to show links -', this.mode);
        this.cmdHandlers['linkEditorMenu'](['setMenu', 'linkEditorSubMenu1','linkEditorMenu']);
      }else if(this.mode==this.MODE_COPY_TEMPLATE_ADD){
        console.log('in copy template add-', msg,this.selectedPage);
        this.dialogData.templateId = msg[1].id;
        this.dialogData.templateDescription = msg[1].description;
        this.cmdHandlers['linkEditorMenu'](['setMenu', 'copyTemplateAdd','linkEditorMenu']);
      }else if(this.mode==this.MODE_COPY_TEMPLATE_INSERT){
        console.log('in copy template insert-', msg,this.selectedPage);
        this.dialogData.templateId = msg[1].id;
        this.dialogData.templateDescription = msg[1].description;
        this.cmdHandlers['linkEditorMenu'](['setMenu', 'copyTemplateInsert','linkEditorMenu']);
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


      this.selectedPageLink=-1;
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
    doUpdateCardData(msg, context){
      console.log('in doUpdateCardData-', msg, context);
      debugger;
      var allCardLinks = JSON.stringify(context.availableLinks);
      var linksSavedCallback = function(){
        debugger;
        console.log('links saved');
//          context.mode=context.MODE_SHOW_LINKS;
//          context.reloadKey+=1;
        context.$emit('cevt',['exitEdit','exitEdit','exitEdit']);
      }
      var orient = 'horozontal';
      debugger;
      context.updateLinkData(orient, context.cardTitle, allCardLinks, linksSavedCallback)
      console.log('links updated');

    },
    doExtLinkInsert(msg, context){
      console.log('in doExtLinkInsert-', msg, context);
      this.ccPageConfig.definition = 'extLink';
      this.cmdHandlers['linkEditorMenu'](['setMenu', 'extLinkInsertSave','linkEditorMenu']);
      this.mode = this.MODE_EXT_LINK_INSERT;
      this.prompt='Please enter a label and a url for this link';
      this.reloadKey+=1;
    },
    doExtLinkAppend(msg, context){
      console.log('in doExtLinkAppend-', msg, context);
      this.ccPageConfig.definition = 'extLink';
      this.cmdHandlers['linkEditorMenu'](['setMenu', 'extLinkAppendSave','linkEditorMenu']);
      this.mode = this.MODE_EXT_LINK_APPEND;
      this.prompt='Please enter a label and a url for this link';
      this.reloadKey+=1;
    },
    doExtLinkInsertSave(msg, context){
      console.log('in doExtLinkInsertSave-', msg, context);
    },
    doExtLinkAppendSave(msg, context){
      console.log('in doExtLinkAppendSave-', msg, context);
      var newLink = {
        cardId: this.$store.getters.getCardBeingEditedId,
        is_external: 1,
        linkDescription: context.dialogData.linkLabel,
        linkUrl: context.dialogData.linkUrl,
        type:'U',
        insertPoint:-1,
        addInsert:'add'

      }
      this.addNewLink(newLink);
    },



    doSaveNewPageInsertLink(msg, context, addOrInsert) {
      console.log('in doSaveNewPageInsertLink-', msg, context);
      var pageSavedCallback = function(layoutId, context, updateLinkDataCallback){
        debugger;
        console.log('pageSavedCallback-', layoutId, context);
        var thisCardTitle='';
        if(typeof(context.cardTitle)!='undefined'){
          if(context.cardTitle.length>0){
            thisCardTitle=context.cardTtile;
          }
        }

        debugger;
        var pageToInsert={};
        pageToInsert.id = layoutId
        pageToInsert.layout_link_to = layoutId;
        pageToInsert.description = context.dialogData.pageName;
        pageToInsert.link_url = context.$store.getters.getUrlBase+'/displayLayout/'+layoutId;
        pageToInsert.isExternal=0;
        if(addOrInsert == context.INSERT_LINK){
          context.availableLinks=context.insertObjectAfterIndex(context.availableLinks, context.selectedPageLink, pageToInsert);
        }else{
          context.availableLinks.push(pageToInsert);
        }

        updateLinkDataCallback(context, thisCardTitle);
        context.ccPageConfig.existingData.availableLinks=context.availableLinks;
        context.ccPageConfig.definition = 'linkEditor';
        context.mode=context.MODE_SHOW_LINKS;
        context.prompt='Existing Links - Click on one to select a link to change';
        context.reloadKey+=1;
        console.log('back to show links -', context.mode);
        context.cmdHandlers['linkEditorMenu'](['setMenu', 'linkEditorSubMenu1','linkEditorMenu']);
      }
      var updateLinkDataCallback=function(context, title){
        console.log('in updateLinkDataCallback-', context, title);
        debugger;

        var thisCardTitle = ''
        if(typeof(title)!='undefined'){
          thisCardTitle = title;
        }
        console.log('cardTitle-', thisCardTitle);


        var allCardLinks = JSON.stringify(context.availableLinks);
        var linksSavedCallback = function(){
          debugger;
          console.log('links saved');
//          context.mode=context.MODE_SHOW_LINKS;
//          context.reloadKey+=1;
          context.$emit('cevt',['exitEdit','exitEdit','exitEdit']);
        }
        var orient = 'horozontal';
        debugger;
        context.updateLinkData(orient, thisCardTitle, allCardLinks, linksSavedCallback)
//        context.updateLinkData(orient, context.cardTitle, allCardLinks, linksSavedCallback)
        console.log('links updated');

      }
      debugger;
      this.saveNewPage(context, pageSavedCallback, updateLinkDataCallback);

    },


    doCopyThisPageAppendLink(msg, context, addOrInsert, targetId) {
      debugger;
      console.log('in copythisPageInsertLink', msg, context, targetId);
//      this.targetTemplateId = this.$store.getters.getCurrentLayoutId;
      this.targetTemplateId = targetId;
      var copyTemplateCallback = function(layoutId, context){
        console.log('in copythisPageInsertLink',layoutId, context);
        var pageToInsert={};
        pageToInsert.id = layoutId
        pageToInsert.layout_link_to = layoutId;
        pageToInsert.description = context.dialogData.pageName;
        pageToInsert.link_url = context.$store.getters.getUrlBase+'/displayLayout/'+layoutId;
        pageToInsert.isExternal=0;
        if(addOrInsert == context.INSERT_LINK){
          context.availableLinks=context.insertObjectAfterIndex(context.availableLinks, context.selectedPageLink, pageToInsert);
        }else{
          context.availableLinks.push(pageToInsert);
        }
        context.ccPageConfig.existingData.availableLinks=context.availableLinks;
        var allCardLinks = JSON.stringify(context.availableLinks);
        var linksSavedCallback = function(){
          debugger;
          console.log('links saved');
//          context.mode=context.MODE_SHOW_LINKS;
//          context.reloadKey+=1;
          context.$emit('cevt',['exitEdit','exitEdit','exitEdit']);
        }
        var orient = 'horozontal';
        debugger;
        context.updateLinkData(orient, context.cardTitle, allCardLinks, linksSavedCallback)
        console.log('links updated');
        context.ccPageConfig.definition = 'linkEditor';
        context.mode=context.MODE_SHOW_LINKS;
        context.prompt='Existing Links - Click on one to select a link to change';
        context.reloadKey+=1;
        console.log('back to show links -', context.mode);
        context.cmdHandlers['linkEditorMenu'](['setMenu', 'linkEditorSubMenu1','linkEditorMenu']);
      }
      this.makeTemplateClone(copyTemplateCallback, context);
    },

    doCopyTemplate(msg, context){
      console.log('in doCopyTemplate-', msg, context);
      debugger;
      if(context.selectedPageLink==-1){
        this.getTemplates(this.MODE_COPY_TEMPLATE_ADD);
      }else{
        this.getTemplates(this.MODE_COPY_TEMPLATE_INSERT);
      }
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


    getTemplates(nextMode){
      debugger;
      this.pleaseWait=true;
      var apiPath = this.$store.getters.getApiBase;
      console.log('apiPath - ',apiPath);
      axios.get(apiPath+'api/shan/availableTemplates?XDEBUG_SESSION_START=15122"', {
        params:{
          orgId:this.$store.getters.getOrgId,
        }
      }).then(response=> {
        debugger;
        console.log('getMySpaces',response);
        this.ccPageConfig.existingData ={};
        this.ccPageConfig.existingData.availableTemplates = response.data;
        this.ccPageConfig.columns = this.loadedDataColumns;
        this.ccPageConfig.perPage = this.getTableHeight(window.innerHeight);
        this.ccPageConfig.definition =  'availableTemplates';


        this.prompt = 'Available Templates - Click on one to select it'
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

