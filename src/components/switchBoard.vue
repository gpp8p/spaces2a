

<script>
//import store from "@/store";

export default {
  name: "switchBoard",
  methods:{


    evtHandler(msg, self){
      console.log('App evtHandler-', msg, self);
//     debugger;
      var evtType = {
        'setCmdHandler': function(msg, context){
//          console.log('evtHandler - a menu event', msg);
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
        'configurePage':function(msg, context){
          context.doConfigurePage(msg, context);
        },
        'setMenu':function(msg, context){
          context.doSetMenu(msg, context);
        },
//        'pageConfig':function(msg, context){
//          context.doPageConfig(msg, context);
//        },
//        'getPageConfiguration':function(msg, context){
//          context.doSetPageConfig(msg, context);
//        },
        'selectCardType':function(msg, context){
//          debugger;
          context.doSelectCardType(msg, context);
        },
        'createCard':function(msg, context){
          console.log('createCard-', msg, context);
          context.doCreateCard(msg, context);
        },
        'createNewCard':function(msg, context){
          console.log('createNewCard-', msg, context);
          context.doCreateNewCard(msg, context);
        },
        'dismissDialog':function(msg, context){
          console.log('dismissDialog-', msg, context);
          context.doDismissDialog(msg, context);
        },
        'pageSelected':function(msg, context){
          console.log('pageSelected in App-', msg, context);
          context.doPageSelected(msg, context);
        },
        'saveScreenEntry':function(msg, context){
          context.doSaveScreenEntry(msg, context);
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
//      console.log('doSetCmdHandler-',msg, context);
      context._data.cmdHandlers[msg[2]]=msg[1];
    },
    doRemoveCmdHandler(msg, context){
      console.log('doRemoveCmdHandler-',msg, context);
      delete(context._data.cmdHandlers[msg[2]]);
    },
    doDismissDialog(msg, context){
      console.log('doDismissDialog-',msg, context);
      this.showDialog=false;
    },
    doMySpaces(msg, context){
      console.log('doMySpaces-',msg, context);
      context.dialogConfiguration.definition='mySpaces';
      context.showDialog=true;
    },
    doPageSelected(msg, context){
      console.log('doPageSelected-',msg, context);
//      debugger;
      context.showDialog=false;
      this.pageConfiguration={}
      this.pageConfiguration.action=this.PAGE_LOAD_DISPLAY;
      this.pageConfiguration.pageId = msg[1];
      this.mode=this.SHOW_PAGE;
      this.pageReload+=1;
//      context.cmdHandlers['mainPage'](['displayPage', msg,'mainPage']);
    },
    doSetMenu(msg, context){
      console.log('Page in doSetMenu-', msg, context);
      this.cmdHandlers['mainNavArea'](['setMenu', msg[1],'topLevelMenu']);

    },
/*
    doPageEdit(msg, context){
      console.log('at doPageEdit-', msg, context);
      this.pageConfiguration={}
      this.pageConfiguration.action=this.PAGE_EDIT;
      this.pageConfiguration.pageId = msg[1];
      this.mode=this.SHOW_PAGE;
      this.pageReload+=1;
    },
*/
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
      this.pageConfiguration={}
      this.pageConfiguration.action=this.PAGE_LOAD_DISPLAY;
      this.pageConfiguration.pageId = this.$store.getters.getOrgHome;
      this.mode=this.SHOW_PAGE;

    },
/*
    doPageConfig(msg, context){
      console.log('in doPageConfig-', msg, context);
      context.showDialog=false;
      context.mode=context.SHOW_PAGE;
      context.pageConfiguration=msg[1];
    },
 */
//    doSetPageConfig(msg,context){
//      context.cmdHandlers['mainPage'](['setPageConfig', context.pageConfiguration,'mainPage']);
//    },
    doSelectCardType(msg,context){
//      debugger;
      console.log('in doSelectCardType', msg, context);
      context.dialogConfiguration.definition='newCardSelect';
      context.showDialog=true;
    },
    doMenuSelection(msg, self){
      var evtType = {
        'editPage': function(msg, context){
          context.doEditPage(msg, context);
        },
        'pageSetup': function(msg, context){
          context.doPageSetup(msg, context);
        },
        'oneWindow':function(msg, context){
          var m = msg;
          m.pageType='oneWindow';
          context.doConfigurePage(msg, context);
        },
        'cancelCardInsert': function(msg, context){
          context.doCancelCardInsert(msg, context);
        },
        'cardExitEdit': function(msg, context){
          context.doCardExitEdit(msg, context);
        },
        'configureHeadlineCard': function(msg, context){
          context.doConfigureHeadlineCard(msg, context);
        },
//        'saveScreenEntry':function(msg, context){
//          context.doSaveScreenEntry(msg, context);
//        },
        'mySpaces':function(msg, context){
          context.doMySpaces(msg, context);
        }
//        'createCard':function(msg, context){
//          context.doCreateCard(msg, context);
//        },

      }
      try {
        (evtType[msg[1]](msg, self));
      } catch (e) {
        console.log('unknown menu Selection-',msg);
/*
        var availableHandlers = Object.keys(self._data.cmdHandlers);
        console.log('available cmd handlers-',availableHandlers);

        if(availableHandlers.length>0){
          for(var a=0;a<availableHandlers.length;a++){
            debugger;
            self._data.cmdHandlers[availableHandlers[a]]([msg[2], msg[1], msg[2]]);
          }
        }
*/

      }
    },
    doEditPage(msg, context){
      console.log('doEditPage selected', msg, context);
      this.pageConfiguration.action=this.PAGE_LOAD_EDIT;
      this.cmdHandlers['mainNavArea'](['setMenu', 'editPage','topLevelMenu']);
      this.showDialog = false;
      this.mode=this.SHOW_PAGE;
      this.pageReload+=1;
    },
/*
    doPageSetup(msg, context){
      console.log('pageSetup selected', msg, context);
      context.dialogConfiguration.definition='pageDefaultSelect';
      context.showDialog=true;
    },
 */
    doConfigurePage(msg, context){
      console.log('switchboard doConfigurePage-', msg, context);
//      debugger;
      if(typeof(msg[1])=='undefined'){
        this.cmdHandlers['mainNavArea'](['setMessage', 'You must select a page type','topLevelMenu']);
      }else{
        context.dialogConfiguration.definition=msg[1];
        this.showDialog = true;
        context.dialogReload+=1;
      }
    },

    doSaveScreenEntry(msg, context){
//      debugger;
      console.log('switchboard doSaveScreenEntry', msg, context);
      this.pageConfiguration = msg[1];
      this.pageConfiguration.action=this.PAGE_EDIT;
      this.showDialog = false;
      this.cmdHandlers['mainNavArea'](['setMessage', 'Please select an area by dragging your mouse']);
      this.mode=this.SHOW_PAGE;
      this.pageReload+=1;
    },
    doShowLogin(context){
//      debugger;
      context.dialogConfiguration.definition='login';
      context.showDialog=true;
    },
    doCreateCard(msg, context){
//      debugger;
      console.log('doCreateCard menu selection', msg, context);
      if(typeof(msg[1].card_component)=='undefined'){
        this.cmdHandlers['mainNavArea'](['setMessage', 'You must select a card type','topLevelMenu']);
      }else{
//        context.showDialog=false;
//        this.cmdHandlers['mainPage'](['createNewCard',msg[1].card_component]);
        context.dialogConfiguration.definition=msg[1].card_component;
        context.dialogReload+=1;
      }
    },
    doCreateNewCard(msg, context){
//      debugger;
      console.log('doCreateNewCard menu selection', msg, context);
      if(msg[1].cardName.length==0){
        this.cmdHandlers['mainNavArea'](['setMessage', 'You must enter a card name','topLevelMenu']);
      }else{
        context.showDialog=false;
        this.cmdHandlers['mainPage'](['createNewCard', msg[1], 'mainPage']);
      }
    },
    doCancelCardInsert(msg, context){
      console.log('switchboard doCancelCardInsert', msg, context);
      context.showDialog=false;
      this.pageConfiguration={}
      this.pageConfiguration.action=this.PAGE_LOAD_DISPLAY;
      this.pageConfiguration.pageId = this.$store.getters.getOrgHome;
      this.mode=this.SHOW_PAGE;
      this.pageReload+=1;

    },
    doCardExitEdit(msg, context){
      console.log('in switchboard doCardExitEdit', msg, context);
      this.pageConfiguration={}
      this.pageConfiguration.action=this.PAGE_LOAD_DISPLAY;
      this.pageConfiguration.pageId = this.$store.getters.getCurrentLayoutId;
      this.mode=this.SHOW_PAGE;
      this.pageReload+=1;
    },
    doConfigureHeadlineCard(msg, context){
      console.log('in sb - doConfigureHeadlineCard', msg, context);
      context.dialogConfiguration.definition='configureHeadlineCard';
//      debugger;
      var mainStylingCss;
      var subElementStylingCss;
      var thisCardSubStyling;
      mainStylingCss = msg[3].card_parameters.style;
      console.log('mainStylingCss',mainStylingCss);
      var thisCardStyling = this.getCardStyling(mainStylingCss);
      try {
        subElementStylingCss = msg[3].elementStyles.sub[0];
        thisCardSubStyling = this.getCardStyling(subElementStylingCss);
      } catch (e) {
        console.log('no substyling information - ', e);
        thisCardSubStyling={};
      }
      console.log('thisCardStyline-', thisCardStyling);
      context.dialogConfiguration.existingData={cardName: msg[2],
                                                cardConfig: msg[3],
                                                cardStyles:thisCardStyling,
                                                cardSubStyles: thisCardSubStyling};
      context.showDialog=true
      context.dialogReload+=1;

    },
    getCardStyling(mCss){
        console.log('getCardStyling-',mCss);
        var styleArray = mCss.split(';');
        console.log('styleArray-', styleArray);
        var styleValues= {}
        for(var s = 1;s<styleArray.length;s++){
          var thisStyleElement = styleArray[s].split(':');
//          console.log('thisStyleElement-', thisStyleElement);
          styleValues[thisStyleElement[0]]=thisStyleElement[1];
        }
        console.log('styleValues-', styleValues);
        return styleValues;
    }


  }
}
</script>

<style scoped>

</style>
