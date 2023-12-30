<template>
  <span class="layoutMenu">
      <span v-if="this.showMessage==true">
        {{this.currentMessage}}
      </span>
      <menu-items v-if="this.showMessage==false"
                  :currentItems="currentItems"
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
  name: "menu",
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
      currentMessage:'',
      showMessage:false
    }
  },
  methods:{
    handleCmd(args){
      console.log('menu handleCmd', args);
      this.cmdHandler(args, this);
    },
    cmdHandler(args, self){
      debugger;
//      console.log('cmdHandler-',args[2], this.name);
      if(args[2]==this.name){
        var cmdType ={
          'setMenu': function(args, context){
            context.doSetMenu(args, context);
          },
          'setMessage': function(args, context){
            context.doSetMessage(args, context);
          },
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
    doSetMenu(msg, context){
      debugger;
      console.log('doSetMenu-', msg);
      context.currentItems=this.getMenuOpts(msg[1]);
      this.cmdHandlers['menuItems'](['setCurrentItems', this.currentItems, 'menuItems']);
//      this.menuVersion+=1;
    },
    doSetMessage(msg, context){
      console.log('in doSetMessage-', msg, context);
      this.showMessage=true;
      this.currentMessage=msg[1];
    },

    evtOpt(msg){
      console.log('evtOpt in menu', msg);
      this.evtHandler(msg, this);
    },
    evtHandler(msg, self){
      console.log('evtHandler in menu-', msg, self);
//      debugger;
      var evtType = {
        'setCmdHandler': function(msg, context){
          //console.log('evtHandler - a menu event', msg);
          context.doSetCmdHandler(msg, context);
        },
        'removeCmdHandler': function(msg, context){
          context.doRemoveCmdHandler(msg, context);
        },
 /*
        'default': function(msg, context){
          if(typeof(msg[0])!='undefined'){
            this.$emit('cevt', msg);
          }else{
            console.log('evtHandler in menu  - possibly malformed event', msg, context);
          }

        }
*/
      }
//      debugger;
//      console.log(evtType[msg[0]](msg, self));
      if(typeof(evtType)!='undefined'){
//        (evtType[msg[0]](msg, self) || evtType['default'])();

        try {
          (evtType[msg[0]](msg, self));
        } catch (e) {
//          console.log('error-',e);
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
    }



  }
}
</script>

<style scoped>

</style>
