<template>
  <section :style="dialogStyle" class="dialogLayout">
  <span class="">
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
      dialogData:{},
      dialogFields:[],

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
        'menuItemSelected': function(msg, context){
          context.doMenuItemSelected(msg, context);
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
//        debugger;
        console.log('getMySpaces',response);
//        this.data=response.data;
        this.configObject.data = response.data;
        this.reloadKey+=1;
      }).catch(e=>{
        console.log(e);
      });
    },







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

