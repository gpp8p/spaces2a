<template>
  <span :style="config.gridCss">
    <cell v-for="(thisCell, index) in config.pageCells"
          :config="thisCell"
          :is-draggable=false
          :key="index"
          :name="thisCell.cell_parameters.name"
          @cevt="handleEvt"
    ></cell>
    <component v-for="(thisCard, index) in config.allCards"
               :is="thisCard.card_component"
               :config="thisCard"
               :is-draggable=false
               :key="index"
               :name="thisCard.card_parameters.content.card_name"
               @cevt="handleEvt"
    ></component>
  </span>
</template>

<script>
import utils from '../components/utils.vue';
import Cell from "../components/Cell.vue";
import Headline from "../components/headlineCard.vue";
import NavigationMenu from "../components/NavigationMenu.vue";
import RichText from "../components/RichText.vue";

export default {
  name: "eGrid",
  props:{
    name:{
      type: String,
      required: true
    },
    config:{
      type: Object,
      required: true
    }
  },
  components: {Cell, Headline, NavigationMenu, RichText},
  mixins: [utils],
  mounted(){
//    debugger;
    console.log(this.name,' is mounted');
    this.$emit('cevt', ['setCmdHandler', this.handleCmd, this.name]);
//    this.$emit('cevt',['getGridConfiguration']);
    console.log('headline1 cmd-', this.cmdHandlers.headline1);
  },
  beforeDestroy() {
    this.$emit('cevt', ['removeCmdHandler', this.handleCmd, this.name]);
  },
  data(){
    return {
      cmdHandlers:{},
      leafComponent: false
    }
  },
  methods:{
//cmd handlers
    handleCmd(args){
//      console.log(this.name, ' handleCmd', args);
      this.cmdHandler(args, this);
    },
    cmdHandler(args, self){
      if(args[2]==this.name || this.leafComponent==false){
        var cmdType ={
          'default': function(args, context){
            console.log('cmdHandler in dummy - something else', args, context);
          },
          'setGridConfig':function(args, context){
            console.log('cmdHandler in eGrid - setGridConfig', args, context);
//            debugger;
            context.doSetEGridConfig(args, context);
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
//                debugger;
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
//      console.log('evtOpt in menu', msg);
      this.evtHandler(msg, this);
    },
    evtHandler(msg, self){
//      console.log('evtHandler in eGrid-', msg, self);
//      debugger;
      var evtType = {
        'setPageCmdHandler': function(msg, context){
          context.doSetPageCmdHandler(msg, context);
        },
        'mouseEvt': function(msg, context){
          context.doMouseEvt(msg, context);
        },
        'setCmdHandler': function(msg, context){
//          console.log('setCmdHandler in egrid-', msg);
          context.doSetCmdHandler(msg, context);
        },
        // eslint-disable-next-line no-unused-vars
        'removeCmdHandler': function(msg, context){
//          context.doRemoveCmdHandler(msg, context);
        },
        'removePageCmdHandler': function(msg, context){
          console.log('evtHandler - a eGrid event', msg, context);
          this.$emit('cevt', ['removeCmdHandler', msg[1], msg[2]]);
        },
        'cardMounted':function(msg, context){
          context.doCardMounted(msg, context);
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
    doSetPageCmdHandler(msg, context){
      console.log('eGrid - doSetPageCmdHandler-', msg, context);
      this.$emit('cevt', ['setCmdHandler', msg[1], msg[2], msg[3]]);
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
    doSetEGridConfig(msg, context){
      console.log('doSetEGridConfig-',msg, context);
    },
    doCardMounted(msg, context){
      console.log('doCardMounted-', msg, context, this.cmdHandlers[msg[2]]);
      if(this.config.pageCells.length>0){
        this.cmdHandlers[msg[2]](['setCardMode', 'editPage',msg[2]]);
      }

    },
    // eslint-disable-next-line no-unused-vars
    doMouseEvt(msg, context){
//      console.log('egrid doMouseEvt-', msg, context);
      this.$emit('cevt', msg);
    }
  }
}
</script>

<style scoped>
.defaultClass {
  font-family: Monaco;
  font-size: large;
  color: blue;
}
</style>
