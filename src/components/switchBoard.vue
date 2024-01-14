

<script>
//import store from "@/store";

import store from "@/store";
import axios from "axios";

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
        'resizeCard':function(msg, context){
//          debugger;
          context.doResizeCard(msg, context);
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
        'configurationHasBeenSaved':function(msg, context){
          console.log('configurationHasBeenSaved in App-', msg, context);
          context.doConfigurationHasBeenSaved(msg, context);
        },
/*
        'saveNewPageAddLink':function(msg, context){
          context.doSaveNewPageAddLink(msg, context);
        },
*/
        'saveScreenEntry':function(msg, context){
          context.doUpdateScreenEntry(msg, context);
        },
        'updateScreenEntry':function(msg, context){
          context.doUpdateScreenEntry(msg, context);
        },
        'saveCardConfigurationEntry':function(msg, context){
          context.doSaveCardConfigurationEntry(msg, context);
        },
        'cardSaved':function(msg, context){
          context.doCardSaved(msg, context);
        },
        'setNewCardDimensions':function(msg, context){
          context.doSetNewCardDimensions(msg, context);
        },
        'editThisPage':function(msg, context){
          context.doEditPage(msg, context);
        },
        'currentPageSettings':function(msg, context){
          context.doCurrentPageSettings(msg, context);
        },
        'exitEdit':function(msg, context){
          context.doCardExitEdit(msg, context);
        },
        'showDialog':function(msg, context){
          context.doShowDialog(msg, context);
        },
        'createCardAndConfiguration':function(msg, context){
          context.doCreateCardAndConfiguration(msg, context);
        },
        'selectedArea':function(msg, context){
          context.doSelectedArea(msg, context);
        }






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
    doShowDialog(msg, context){
      console.log('in doShowDialog', msg, context);
    },
    doDismissDialog(msg, context){
      console.log('doDismissDialog-',msg, context);
      context.dialogConfiguration={};
      context.linkEditorConfiguration={};
      this.showDialog=false;
      this.showLinkEditor=false;
    },
    doMySpaces(msg, context){
      console.log('doMySpaces-',msg, context);
      debugger;
      context.dialogConfiguration.definition='mySpaces';
      context.showDialog=true;
    },
    doPageSelected(msg, context){
      console.log('doPageSelected-',msg, context);
      debugger;
      context.showDialog=false;
      this.pageConfiguration={}
      this.pageConfiguration.action=this.PAGE_LOAD_DISPLAY;
      this.pageConfiguration.pageId = msg[1];
      this.mode=this.SHOW_PAGE;
      this.pageReload+=1;
//      context.cmdHandlers['mainPage'](['displayPage', msg,'mainPage']);
    },

    doConfigurationHasBeenSaved(msg, context){
      console.log('doConfigurationHasBeenSavedd-',msg, context);
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
    doResizeCard(msg,context){
      console.log('switchboard in doResizeCard', msg, context);
      this.cmdHandlers['mainPage'](['resizeCard', msg[3], 'mainPage']);
    },
    doSetNewCardDimensions(msg,context){
      console.log('switchboard - doSetNewCardDimensions-', msg, context);
//      debugger;
      this.cmdHandlers['mainPage'](['setNewCardDimensions', msg, 'mainPage']);
    },
    doCurrentPageSettings(msg,context){
      console.log('switchboard in doCurrentPageSettings', msg, context);
      context.dialogConfiguration.definition='pageSettings';
      context.dialogConfiguration.existingData= msg[1];
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
        'editHeadlineCard': function(msg, context){
          context.doEditHeadlineCard(msg, context);
        },
        'resizeCard':function(msg, context){
          context.doResizeCard(msg, context);
        },
        'mySpaces':function(msg, context){
          context.doMySpaces(msg, context);
        },
        'pageSettings':function(msg, context){
          context.doPageSettings(msg, context);
        },
//        'createCardAndConfiguration':function(msg, context){
//          context.doCreateCardAndConfiguration(msg, context);
//        }
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
      debugger;
      if(typeof(msg[1])=='undefined'){
        this.cmdHandlers['mainNavArea'](['setMessage', 'You must select a page type','topLevelMenu']);
      }else{

        context.dialogConfiguration.definition=msg[1];
        this.showDialog = true;
        context.dialogReload+=1;





      }
    },
    doPageSettings(msg, context){
      console.log('in doPageSettings', msg, context);
      this.cmdHandlers['mainPage'](['pageSettings']);
    },
/*
    doSaveNewPageAddLink(msg, context){
      console.log('at doSaveNewPage-',msg, context);
    },
 */
    doUpdateScreenEntry(msg, context){
      console.log('at doUpdateScreenEntry-', msg, context);
      debugger;
      // eslint-disable-next-line no-unused-vars
      var backgroundImage;
      // eslint-disable-next-line no-unused-vars
      var backgroundColor;
      // eslint-disable-next-line no-unused-vars
      var backgroundType;
      // eslint-disable-next-line no-unused-vars
      var backgroundDisplay;
      if(msg[1].background.backgroundType=='color'){
        backgroundColor = msg[1].background.colorSelect;
        backgroundType = 'C';
        backgroundImage='';
        backgroundDisplay = '';
      }else{
        backgroundType = 'I';
        if(typeof(msg[1].background.url)=='undefined'){
          backgroundImage=msg[1].backgroundImage;
        }else{
          backgroundImage= msg[1].pageBackground.url;
        }
        backgroundColor = '';
        backgroundDisplay = msg[1].backgroundDisplay;
      }
      // eslint-disable-next-line no-unused-vars
      var template;
      if(msg[1].template=='no'){
        template=false;
      }else{
        template=true;
      }
      // eslint-disable-next-line no-unused-vars
      var perms;
      perms='default';
/*
      if(msg[1].permissions=='open'){
        perms='default';
      }else{
        perms='template';
      }
*/
      var apiPath = this.$store.getters.getApiBase;
      axios.post(apiPath+'api/shan/updateLayout?XDEBUG_SESSION_START=17516', {
//        axios.post('http://localhost:8000/api/shan/createLayoutNoBlanks?XDEBUG_SESSION_START=17516', {
        name: msg[1].pageName,
        description: msg[1].pageDescription,
        height: msg[1].pageHeight,
        width: msg[1].pageWidth,
        backgroundColor: backgroundColor,
        backgroundType: backgroundType,
        backgroundImage: backgroundImage,
        backgroundDisplay: backgroundDisplay,
        template: template,
        userId: this.$store.getters.getLoggedInUserId,
        user: this.$store.getters.getLoggedInUser,
        orgId: this.$store.getters.getOrgId,
        layoutId: this.$store.getters.getCurrentLayoutId,
        permType: perms,
      }).then(response=>
      {
        debugger;
        console.log('page update-', response.data);
        context.showDialog=false;
        context.pageConfiguration={}
        context.pageConfiguration.action= context.PAGE_LOAD_DISPLAY;
        context.pageConfiguration.pageId = context.$store.getters.getCurrentLayoutId;
        context.mode=context.SHOW_PAGE;
        context.pageReload+=1;


//        this.pageConfiguration.action=this.PAGE_DISPLAY;
//        this.showDialog = false;
//        this.$emit('cevt',['pageSelected', this.$store.getters.getCurrentLayoutId]);
//       this.dialogConfiguration={};
//        this.cmdHandlers['mainNavArea'](['setMessage', 'Please select an area by dragging your mouse']);
//        this.mode=this.SHOW_PAGE;
//        this.pageReload+=1;

//        this.layoutId=response.data;


//        this.$emit('layoutSaved', [this.layoutId, this.height, this.width, this.description, this.menu_label, this.val]);
//                this.$refs.editGrid.createBlankLayout(msg[2],msg[3],msg[1],msg[0]);
      }).catch(function(error) {
        console.log(error);
      });

    },
    doSelectedArea(msg, context){
      console.log('in doSelectedArea', msg, context);
      context.selectedArea = msg[1];
    },
    doCreateCardAndConfiguration(msg, context){
      console.log('in doCreateCardAndConfiguration-',msg, context);
      context.cardConfiguration = msg[1];
      var configureCardCallback = function(context){
        console.log('in configureCardCallback', context);
      }



      this.saveNewCard(this.$store.getters.getCurrentLayoutId,
          context.newCardParams['cardName'],
          false,
          context.newCardParams['card_component'],
          context.selectedArea.topLeftY,
          context.selectedArea.topLeftX,
          context.selectedArea.bottomRightY,
          context.selectedArea.bottomRightX,
          this.$store.getters.getApiBase,
          context,
          configureCardCallback);


    },

    doSaveScreenEntry(msg, context){
      debugger;
      console.log('switchboard doSaveScreenEntry', msg, context);
      this.pageConfiguration = msg[1];

      this.pageConfiguration.action=this.PAGE_EDIT;
      this.showDialog = false;
      this.cmdHandlers['mainNavArea'](['setMessage', 'Please select an area by dragging your mouse']);
      this.mode=this.SHOW_PAGE;
      this.pageReload+=1;
      var backgroundImage;
      var backgroundColor;
      var backgroundType;
      var backgroundDisplay;
      if(msg[1].background.backgroundType=='color'){
        backgroundColor = msg[1].background.colorSelect;
        backgroundType = 'C';
        backgroundImage='';
        backgroundDisplay = '';
      }else{
        backgroundType = 'I';
        backgroundImage= msg[1].background.backgroundImage;
        backgroundColor = '';
        backgroundDisplay = msg[1].background.backgroundDisplay;
      }
      // eslint-disable-next-line no-unused-vars
      var template;
      if(msg[1].template=='no'){
        template=false;
      }else{
        template=true;
      }
      // eslint-disable-next-line no-unused-vars
      var perms;
      if(msg[1].permissions=='open'){
        perms='default';
      }else{
        perms='template';
      }
      var apiPath = this.$store.getters.getApiBase;
      axios.post(apiPath+'api/shan/createLayoutNoBlanks?XDEBUG_SESSION_START=17516', {
//        axios.post('http://localhost:8000/api/shan/createLayoutNoBlanks?XDEBUG_SESSION_START=17516', {
        name: msg[1].pageName,
        description: msg[1].pageDescription,
        height: msg[1].pageHeight,
        width: msg[1].pageWidth,
        backgroundColor: backgroundColor,
        backgroundType: backgroundType,
        backgroundImage: backgroundImage,
        backgroundDisplay: backgroundDisplay,
        template: template,
        userId: this.$store.getters.getLoggedInUserId,
        user: this.$store.getters.getLoggedInUser,
        orgId: this.$store.getters.getOrgId,
        layoutId: this.$store.getters.getCurrentLayoutId,
        permType: perms,
      }).then(response=>
      {
        debugger;
        store.commit('setCurrentLayoutId', response.data);
        this.pageConfiguration.action=this.PAGE_EDIT;
        this.showDialog = false;
 //       this.dialogConfiguration={};
        this.cmdHandlers['mainNavArea'](['setMessage', 'Please select an area by dragging your mouse']);
        this.mode=this.SHOW_PAGE;
        this.pageReload+=1;

//        this.layoutId=response.data;


//        this.$emit('layoutSaved', [this.layoutId, this.height, this.width, this.description, this.menu_label, this.val]);
//                this.$refs.editGrid.createBlankLayout(msg[2],msg[3],msg[1],msg[0]);
      }).catch(function(error) {
        console.log(error);
      });


    },
    doSaveCardConfigurationEntry(msg, context){
      console.log('at doSaveCardConfigurationEntry-', msg, context);
      this.showDialog = false;
      context.dialogConfiguration={};
      debugger;
      this.cmdHandlers['mainPage'](['setValue', msg[1],msg[2].cardName]);
    },
    doShowLogin(context){
//      debugger;
      context.dialogConfiguration.definition='login';
      context.showDialog=true;
    },
    doCreateCard(msg, context){
      debugger;
      console.log('doCreateCard menu selection', msg, context);
      if(typeof(msg[1].card_component)=='undefined'){
        this.cmdHandlers['mainNavArea'](['setMessage', 'You must select a card type','topLevelMenu']);
      }else{
        context.showDialog=false;
        debugger;
        switch(msg[1].card_component){
          case 'Headline':{
            context.newCardParams = msg[1];
            context.dialogConfiguration.definition='configureHeadlineCard';
            context.dialogConfiguration.menuOverride='newCardConfigureMenu';
            context.showDialog=true;
            context.dialogReload+=1;

            break;
          }
        }



//        this.cmdHandlers['mainPage'](['createNewCardConfigure', msg[1], 'mainPage']);
//        this.cmdHandlers['mainPage'](['createNewCard', msg[1], 'mainPage']);
//        this.cmdHandlers['mainPage'](['createNewCard',msg[1].card_component]);
//        context.dialogConfiguration.definition=msg[1].card_component;
//        context.dialogReload+=1;
      }
    },
    doCreateNewCard(msg, context){
      debugger;
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
    doCardSaved(msg, context){
      console.log('at doCardSaved-', msg, context);
      this.pageConfiguration={}
      this.pageConfiguration.action=this.PAGE_LOAD_DISPLAY;
      this.pageConfiguration.pageId = this.$store.getters.getCurrentLayoutId;
      this.mode=this.SHOW_PAGE;
      this.pageReload+=1;
    },
    doCardExitEdit(msg, context){
      console.log('in switchboard doCardExitEdit', msg, context);
      this.pageConfiguration={}
      this.pageConfiguration.action=this.PAGE_LOAD_DISPLAY;
      this.pageConfiguration.pageId = this.$store.getters.getCurrentLayoutId;
      this.mode=this.SHOW_PAGE;
      context.showLinkEditor=false;
      context.showDialog=false;
      this.pageReload+=1;
    },
    doEditHeadlineCard(msg, context){
      console.log('in switchboard doEditHeadlineCard', msg, context);
      this.linkEditorConfiguration.definition = 'linkEditor';
      this.linkEditorConfiguration.existingData = msg[3];
      this.showLinkEditor=true;
    },
    doConfigureHeadlineCard(msg, context){
      console.log('in sb - doConfigureHeadlineCard', msg, context);
      context.dialogConfiguration.definition='configureHeadlineCard';
      debugger;
      var mainStylingCss;
      var subElementStylingCss;
      var thisCardSubStyling;
      mainStylingCss = msg[3].card_parameters.style;
      console.log('mainStylingCss',mainStylingCss);
      var thisCardStyling = this.getCardStyling(mainStylingCss);

      if(typeof(msg[3].elementStyles)!='undefined'){
        subElementStylingCss = ";"+msg[3].elementStyles.sub[0];
        thisCardSubStyling = this.getCardStyling(subElementStylingCss);
      }else{
//        debugger;
//        var defaultStyling = this.getDialogDefaults('configureHeadlineCard');
//        console.log('configure headline card default styling-',defaultStyling);
//        thisCardSubStyling = defaultStyling.titleStyle.subElementValue;
//        thisCardSubStyling={};
      }


/*
      try {
        subElementStylingCss = ";"+msg[3].elementStyles.sub[0];
        thisCardSubStyling = this.getCardStyling(subElementStylingCss);
        console.log('in sb subElementStylingCss - ', subElementStylingCss, thisCardSubStyling);
      } catch (e) {
        console.log('no substyling information - ', e);
        thisCardSubStyling={};
      }
*/
      console.log('thisCardStyline-', thisCardStyling);
      console.log('this background-color ', thisCardStyling['background-color']);
      console.log('is true-', ((thisCardStyling['background-color']=='#dbddd0')&& (thisCardStyling['backgroundTypeColor']=='checked')&& (thisCardStyling['color']=='#0000FF')));
      console.log('thisCardSubstyling', thisCardSubStyling);
      if(((thisCardStyling['background-color']=='#dbddd0')&& (thisCardStyling['backgroundTypeColor']=='checked')&& (thisCardStyling['color']=='#0000FF'))){
        console.log('this is a new card');
      }else{
        console.log('not a new card');
        context.dialogConfiguration.existingData={cardName: msg[2],
          cardConfig: msg[3],
          cardStyles:thisCardStyling,
          cardSubStyles: thisCardSubStyling};
      }

      context.showDialog=true
      context.dialogReload+=1;

    },
/*
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
*/

  }
}
</script>

<style scoped>

</style>
