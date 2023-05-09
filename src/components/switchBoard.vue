

<script>
//import store from "@/store";

export default {
  name: "switchBoard",
  methods:{


    evtHandler(msg, self){
      console.log('evtHandler-', msg, self);
//     debugger;
      var evtType = {
        'setCmdHandler': function(msg, context){
          console.log('evtHandler - a menu event', msg);
          context.doSetCmdHandler(msg, context);
        },
        'removeCmdHandler': function(msg, context){
          context.doRemoveCmdHandler(msg, context);
        },
        'menuItemSelected': function(msg, context){
          context.doMenuSelection(msg, context);
        },
        'loginVerify': function(msg, context){
          context.doLoginVerify(msg, context);
        },
        'loggedIn': function(msg, context){
          context.doLogedIn(msg, context);
        },
/*
        'default': function(msg, context){
          console.log('evtHandler - something else', msg, context);
        }
 */
      }
      try {
        (evtType[msg[0]](msg, self));
      } catch (e) {
        this.$emit('cevt', msg);
      }
    },
    doSetCmdHandler(msg, context){
//      debugger;
      console.log('doSetCmdHandler-',msg, context);
      context._data.cmdHandlers[msg[2]]=msg[1];
    },
    doRemoveCmdHandler(msg, context){
      console.log('doRemoveCmdHandler-',msg, context);
      delete(context._data.cmdHandlers[msg[2]]);
    },
    doLoginVerify(msg, context){
      console.log('switchBoard doLoginVerify-',msg, context);
      context._data.cmdHandlers['mainNavArea'](msg);
    },
    doLogedIn(msg, context){
      console.log('in doLogedIn', msg, context);
      context.showDialog=false;
      if(msg[2]==1){
        this.cmdHandlers['mainNavArea'](['setMenu', 'adminLogged','topLevelMenu']);
      }else{
        if(msg[1].admin==true){
          this.cmdHandlers['mainNavArea'](['setMenu', 'adminLogged','topLevelMenu']);
        }else if(msg[1].author==true){
          this.cmdHandlers['mainNavArea'](['setMenu', 'authorLogged','topLevelMenu']);
        }else{
          this.cmdHandlers['mainNavArea'](['setMenu', 'userLogged','topLevelMenu']);
        }

      }
    },
    doMenuSelection(msg, self){
      var evtType = {
        'editPage': function(msg, context){
          context.doEditPage(msg, context);
        },
        'pageSetup':function(msg, context){
          context.doSetupPage(msg, context);
        }
      }
      try {
        (evtType[msg[1]](msg, self));
      } catch (e) {
        console.log('unknown menu Selection-',msg);

        var availableHandlers = Object.keys(self._data.cmdHandlers);
        console.log('available cmd handlers-',availableHandlers);

        if(availableHandlers.length>0){
          for(var a=0;a<availableHandlers.length;a++){
            debugger;
            self._data.cmdHandlers[availableHandlers[a]]([msg[2], msg[1], msg[2]]);
          }
        }


      }
    },
    doEditPage(msg, context){
      console.log('doEditPage selected', msg, context);
    },
    doSetupPage(msg, context){
      console.log('pageSetup selected', msg, context);
      context.dialogConfiguration='createPage';
      context.showDialog=true;
    },
    doShowLogin(context){
//      debugger;
      context.dialogConfiguration='login';
      context.showDialog=true;
    },

  }
}
</script>

<style scoped>

</style>
