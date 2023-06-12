<template>
  <span class="menuArea">
    <span>

    </span>
    <span>
        <Menu
            name="topLevelMenu"
            @cevt="handleEvt"
        ></Menu>
    </span>
    <span>
      <login
             name="login"
             @cevt="handleEvt">
      </login>
    </span>
  </span>
</template>

<script>
import utils from '../components/utils.vue';
import Menu from '../components/menuNew.vue';
import login from '../components/login.vue';

export default {
  name: "mainNavigationArea",
  props:{
    name:{
      type: String,
      required: true
    }
  },
  components: {Menu, login},
  mixins: [utils],
  mounted(){
    console.log(this.name,' is mounted');
    debugger;
//    this.cmdHandlers['topLevelMenu'](['setMenu', 'adminLogged','topLevelMenu']);
    this.$emit('cevt', ['setCmdHandler', this.handleCmd, this.name]);
  },
  beforeDestroy() {
    this.$emit('cevt', ['removeCmdHandler', this.handleCmd, this.name]);
  },
  data(){
    return {
      cmdHandlers:{},
    }
  },
  methods:{
//cmd handlers
    handleCmd(args){
      console.log(this.name, ' handleCmd', args);
      this.cmdHandler(args, this);
    },
    cmdHandler(args, self){
 //       debugger;
 //     if(args[2]==this.name){
        var cmdType ={
          'default': function(args, self){
            console.log('cmdHandler in dummy - something else', args, self);
          },
          'loginVerify':function(args, self){
            console.log('loginVerify called in mainNav-', args, self);
//            debugger;
            self.doLoginVerify(args,self);
          },
          'setMenu':function(args, self){
            console.log('setMenu called in mainNav-', args, self);
            debugger;
            self.doSetMenu(args,self);
          }
        }
        if(typeof(cmdType)!='undefined'){
//          debugger;
          try {
            (cmdType[args[0]](args, self));
          } catch (e) {
            console.log('unknown cmd -',args, this.name);
            var availableHandlers = Object.keys(this.cmdHandlers);
            console.log('available cmd handlers-',availableHandlers);

            if(availableHandlers.length>0){
              for(var a=0;a<availableHandlers.length;a++){
                debugger;
                this.cmdHandlers[availableHandlers[a]]([args[0], args[1], args[2]]);
              }
            }



          }
        }
 //     }


    },
// put do cmds here
    doSetMenu(args, self){
      console.log('doSetMenu called in mainNav-', args, self);
      this.cmdHandlers['topLevelMenu'](['setMenu', args[1],'topLevelMenu']);
    },
    doLoginVerify(args, self){
      console.log('in doLoginVerify of mainNavigationArea', args, self);
      this.cmdHandlers['login'](['loginVerify', args, 'login']);
    },
//event handler
    evtOpt(msg){
      console.log('evtOpt in menu', msg);
      this.evtHandler(msg, this);
    },
    evtHandler(msg, self){
      console.log('evtHandler in manNavigationArea-', msg, self);
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
        try {
          (evtType[msg[0]](msg, self));
        } catch (e) {
          this.$emit('cevt', msg);
        }
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
.menuArea {
  display: grid;
  grid-template-rows: 100%;
  grid-template-columns: 20% 60% 20%;
}
</style>

