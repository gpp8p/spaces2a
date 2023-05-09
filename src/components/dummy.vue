<template>
  <span class="layoutMenu">
      <menu-items :currentItems="currentItems"
                  :key="menuVersion"
                  name="menuItems"
                  @cevt="handleEvt"
      ></menu-items>
  </span>
</template>

<script>
import menuItems from "../components/menuItems.vue";
import menuDefinitions from "../components/menuDefinitions.vue";
import utils from '../components/utils.vue';

export default {
name: "dummy",
  props:{
    name:{
      type: String,
      required: true
    }
  },
  components: {menuItems},
  mixins: [menuDefinitions, utils],
  mounted(){
  console.log('menu is mounted');
    this.$emit('cevt', ['setCmdHandler', this.handleCmd, this.name]);
  },
  beforeDestroy() {
    this.$emit('cevt', ['removeCmdHandler', this.handleCmd, this.name]);
  },
  data(){
    return {
      menuVersion:0,
      currentItems:[],
      cmdHandlers:{},
    }
  },
  methods:{
    handleCmd(msg){
      console.log('menu handleCmd', msg);
      this.cmdHandler(msg, this);
    },
    cmdHandler(msg, self){
//      debugger;
//      console.log('cmdHandler-',msg[2], this.name);
      if(msg[2]==this.name){
        var cmdType ={
          'setMenu': function(msg, context){
            context.doSetMenu(msg, context);
          },
          'default': function(context, msg){
            console.log('cmdHandler in dummy - something else', msg, context);
          }
        }
        if(typeof(cmdType)!='undefined'){
          (cmdType[msg[0]](msg, self) || cmdType['default'])();
        }
      }

    },
    doSetMenu(msg, context){
      debugger;
      console.log('doSetMenu-', msg);
      context.currentItems=this.getMenuOpts(msg[1]);
      this.cmdHandlers['menuItems'](['setCurrentItems', this.currentItems, 'menuItems']);
//      this.menuVersion+=1;
    },

    evtOpt(msg){
      console.log('evtOpt in menu', msg);
      this.evtHandler(msg, this);
    },
    evtHandler(msg, self){
      console.log('evtHandler in menu-', msg, self);
      debugger;
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
        }
      }
      if(typeof(evtType)!='undefined'){
        (evtType[msg[0]](msg, self) || evtType['default'])();
      }
    },
    doSetCmdHandler(msg, context){
      debugger;
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
