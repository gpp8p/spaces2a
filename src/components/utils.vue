<script>
import axios from "axios";
//import store from "@/store";

export default {
  name: 'utils',
  methods: {
    handleEvt (msg) {
//      debugger;
//      console.log('handleEvt', msg);
      if (typeof (this.evtOpt) !== 'undefined') {
        this.evtOpt(msg)
      } else {
        this.$emit('cevt', msg);
      }
    },
    getCardStyling(mCss){
      console.log('getCardStyling-',mCss);
      var styleArray = mCss.split(';');
      console.log('styleArray-', styleArray);
      var styleValues= {}
      for(var s = 0;s<styleArray.length;s++){
//      for(var s = 1;s<styleArray.length;s++){
        var thisStyleElement = styleArray[s].split(':');
//        debugger;
        //          console.log('thisStyleElement-', thisStyleElement);
        if(thisStyleElement[0]=='background-image'){
          styleValues[thisStyleElement[0]]=thisStyleElement[1]+':'+thisStyleElement[2]+':'+thisStyleElement[3]
        }else{
          styleValues[thisStyleElement[0]]=thisStyleElement[1];
        }

      }
      console.log('styleValues-', styleValues);
      return styleValues;
    },
    getCardGridStyle(mCss){
      var styleArray = mCss.split(';');
      return styleArray[0];
    },
    substituteStyle(existingCss, styleName, newValue){
      debugger;
      var existingStyleValues = this.getCardStyling(existingCss);
      if(typeof(existingStyleValues[styleName])!='undefined'){
        existingStyleValues[styleName]=newValue;
      }
      var styleKeys = Object.keys(existingStyleValues);
      var newCss='';
      for(var s = 0;s<(styleKeys.length-1);s++){
        newCss = newCss+ styleKeys[s]+':'+existingStyleValues[styleKeys[s]]+';';
      }
      console.log(newCss);
      return newCss;

    },
  removeElementByIndex(array, indexToRemove) {
  if (indexToRemove < 0 || indexToRemove >= array.length) {
    // Check if the index is out of bounds
    console.out("Index out of bounds");
    return array; // Return the original array
  }

  // Use the splice() method to remove the element at the specified index
  array.splice(indexToRemove, 1);

  return array;
  },

  insertObjectBeforeIndex(array, indexToInsertBefore, objectToInsert) {
      if (indexToInsertBefore < 0 || indexToInsertBefore > array.length) {
        // Check if the index is out of bounds
        console.out("Index out of bounds");
        return array; // Return the original array
      }

      // Use the splice() method to insert the object at the specified index
      array.splice(indexToInsertBefore, 0, objectToInsert);

      return array;
  },

  insertObjectAfterIndex(array, indexToInsertAfter, objectToInsert) {
      if (indexToInsertAfter < -1 || indexToInsertAfter >= array.length - 1) {
        // Check if the index is out of bounds
        console.out("Index out of bounds");
        return array; // Return the original array
      }

      // Calculate the index to insert after, accounting for -1 (to insert at the beginning)
      const insertIndex = indexToInsertAfter + 1;

      // Use the splice() method to insert the object at the specified index
      array.splice(insertIndex, 0, objectToInsert);

      return array;
    },

  shiftObjectTowardsBeginning(array, indexToShift) {
      if (indexToShift < 0 || indexToShift >= array.length) {
        // Check if the index is out of bounds
        console.out("Index out of bounds");
        return array; // Return the original array
      }

      if (indexToShift === 0) {
        // If the object is already at the beginning, no need to shift
        return array;
      }

      // Remove the object at the specified index
      const objectToShift = array.splice(indexToShift, 1)[0];

      // Insert the object one position towards the beginning
      array.splice(indexToShift - 1, 0, objectToShift);

      return array;
    },

  shiftObjectTowardsEnd(array, indexToShift) {
      debugger;
      if (indexToShift < 0 || indexToShift >= array.length) {
        // Check if the index is out of bounds
        console.out("Index out of bounds");
        return array; // Return the original array
      }

      if (indexToShift === array.length - 1) {
        // If the object is already at the end, no need to shift
        return array;
      }

      // Remove the object at the specified index
      const objectToShift = array.splice(indexToShift, 1)[0];

      // Insert the object one position towards the end
      array.splice(indexToShift + 1, 0, objectToShift);

      return array;
    },

    updateLinkData(orient, cardTitle, allCardLinks, linksSavedCallback){
      debugger;
      var apiPath = this.$store.getters.getApiBase;
      var thisCardTitle;
      if(typeof(cardTitle)=='undefined'){
        thisCardTitle='';
      }else{
        thisCardTitle = cardTitle;
      }

      axios.post(apiPath+'api/shan/updateCardLinks?XDEBUG_SESSION_START=17516', {
//      axios.post('http://localhost:8000/api/shan/updateCardLinks?XDEBUG_SESSION_START=17516', {
        orient: orient,
        cardTitle: thisCardTitle,
        allLinks:allCardLinks,
        org_id: this.$store.getters.getOrgId,
        layout_id: this.$store.getters.getCurrentLayoutId,
        card_instance_id:this.$store.getters.getCardBeingEditedId,
        is_external:0,
        type:'U'
      }).then(response=>
      {
          debugger;
        console.log(response);
        linksSavedCallback();
      }).catch(function(error) {
        //       debugger;
        alert('returned with an error'+error);
        console.log(error);
      });

    },

    addNewLink(newLink){
      debugger;
//      var urlBase = this.$store.getters.getUrlBase;
      var apiPath = this.$store.getters.getApiBase;
      console.log('apiPath - ',apiPath);
      axios.post(apiPath+'api/shan/addNewLink?XDEBUG_SESSION_START=17516', {
        org_id: this.$store.getters.getOrgId,
        layout_id: this.$store.getters.getCurrentLayoutId,
        card_instance_id:newLink.cardId,
        is_external:newLink.is_external,
        description: newLink.linkDescription,
        linkUrl:newLink.linkUrl,
        type: newLink.type,
        insertPoint: newLink.insertPoint,
        addInsert: newLink.addInsert
      }).then(response=>
      {
        console.log('response imageCard saved', response);
        if(response.data=='ok'){
          debugger;
          console.log('link added',this.content);
          this.$emit('cevt',['pageSelected', this.$store.getters.getCurrentLayoutId]);


        }
      }).catch(function(error) {
        console.log(error);
      });

    },


    saveNewPage(context, layoutSavedCallback, updateLinkDataCallback){
      debugger;
      var backgroundImage;
      var backgroundColor;
      var backgroundType;
      var backgroundDisplay;
      var dialogData = context.dialogData;
      if(dialogData.pageBackground.backgroundType=='color'){
        backgroundColor = dialogData.background.colorSelect;
        backgroundType = 'C';
        backgroundImage='';
        backgroundDisplay = '';
      }else{
        backgroundType = 'I';
        backgroundImage= dialogData.backgroundImage;
        backgroundColor = '';
        backgroundDisplay = dialogData.backgroundDisplay;
      }
      // eslint-disable-next-line no-unused-vars
      var template;
      if(dialogData.template=='no'){
        template=false;
      }else{
        template=true;
      }
      // eslint-disable-next-line no-unused-vars
      var perms;
      if(dialogData.permissions=='open'){
        perms='default';
      }else{
        perms='template';
      }
      console.log('in saveNewPage-', context, layoutSavedCallback);
      var apiPath = this.$store.getters.getApiBase;
      axios.post(apiPath+'api/shan/createLayoutNoBlanks?XDEBUG_SESSION_START=17516', {
//        axios.post('http://localhost:8000/api/shan/createLayoutNoBlanks?XDEBUG_SESSION_START=17516', {
        name: dialogData.pageName,
        description: dialogData.pageDescription,
        height: dialogData.pageHeight,
        width: dialogData.pageWidth,
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
//        store.commit('setCurrentLayoutId', response.data);
        layoutSavedCallback(response.data, context, updateLinkDataCallback);

      }).catch(function(error) {
        console.log(error);
      });

    },

    computeGridCss(row, col, height, width){
//        debugger;
      var startRow = row;
      var startColumn = col;
      var endRow=0;
      var endCol=0;
      if(height==1){
        endRow = row;
      }else{
        endRow = height+1;
      }
      if(width==1){
        endCol=startColumn+width;
      }else{
        endCol = width+1;
      }
      var thisCss = "grid-area:"+startRow+"/"+startColumn+"/"+endRow+"/"+endCol;
      return thisCss;

    },

    setStyleCss(enteredStyles, gridStyle){
      console.log('enteredStyles-', enteredStyles);
//      debugger;
      var thisStyleElements = Object.keys(enteredStyles);
      var newStyle = gridStyle+";";
      var newSubStyle = '';
      var newTitleStyle = '';
      var newTitleStyleElements = {};
      var newSubStyleElements = {};
      var newSubStyleValues ={};
      for(var s=0; s< thisStyleElements.length; s++){
        console.log('headline style element-', thisStyleElements[s],'-', enteredStyles[thisStyleElements[s]]);
        switch(thisStyleElements[s]){
          case 'borders':{
            console.log('borders-', enteredStyles[thisStyleElements[s]]);
            if(enteredStyles[thisStyleElements[s]].includeBorder=='yes'){
              var newBorderSpec='';
              newBorderSpec = newBorderSpec+'border:'+enteredStyles[thisStyleElements[s]].borderSize;
              newBorderSpec = newBorderSpec+' solid ';
              newBorderSpec = newBorderSpec+enteredStyles[thisStyleElements[s]].borderColor;
              newBorderSpec = newBorderSpec+";";
              newTitleStyleElements['border'] = 'border:'+enteredStyles[thisStyleElements[s]].borderSize+' solid '+enteredStyles[thisStyleElements[s]].borderColor+";";
              newTitleStyleElements['borderInclude'] = "borderInclude:checked;"
              newTitleStyleElements['borderRadius']= "border-radius:8px;";
              newTitleStyleElements['borderSize']="border-width:"+enteredStyles[thisStyleElements[s]].borderSize+";";
              newBorderSpec = newBorderSpec+ "borderInclude:checked;";
              newStyle = newStyle+newBorderSpec;

            }
            break;
          }
          case 'background':{
            if(enteredStyles[thisStyleElements[s]].backgroundType=='color'){
              var newBackgroundSpec = '';
              newBackgroundSpec = newBackgroundSpec+'backgroundTypeColor:checked;';
              newBackgroundSpec = newBackgroundSpec+'background-color:'+enteredStyles[thisStyleElements[s]].colorSelect+";";
              newStyle = newStyle+ newBackgroundSpec;
              newTitleStyleElements['backgroundTypeColor']="backgroundTypeColor:checked;";
              newTitleStyleElements['backgroundColor']='background-color:'+enteredStyles[thisStyleElements[s]].colorSelect+";";
              console.log('newStyle-', newStyle);
            }else if(enteredStyles[thisStyleElements[s]].backgroundType=='image'){
//              debugger;
              console.log('image background need to fill this in');
              newBackgroundSpec = newBackgroundSpec+'backgroundTypeImage:checked;';
              newTitleStyleElements['backgroundTypeImage']="backgroundTypeImage:checked;";
              newBackgroundSpec = newBackgroundSpec + enteredStyles[thisStyleElements[s]].url+";";
              console.log('headline card at 376-',enteredStyles[thisStyleElements[s]].backgroundDisplay);
              switch(enteredStyles[thisStyleElements[s]].backgroundDisplay){
                case 'crop':{
                  newBackgroundSpec = newBackgroundSpec+'background-size:crop;';
                  newTitleStyleElements['backgroundSize']="background-size:crop;";
                  newTitleStyleElements['backgroundRepeat']="background-repeat:no-repeat;";
//                  newTitleStyleElements['backgroundPosition']="background-position: center center;";
                  break;
                }
                case 'cover':{
                  newBackgroundSpec = newBackgroundSpec+'background-size:100% 100%;';
//                  newBackgroundSpec = newBackgroundSpec+'background-size:cover;';
                  newTitleStyleElements['backgroundSize']="background-size:100% 100%;";
                  newTitleStyleElements['backgroundRepeat']="background-repeat:no-repeat;";
//                  newTitleStyleElements['backgroundPosition']="background-position: center center;";
                  break;
                }
                case 'contain':{
                  newBackgroundSpec = newBackgroundSpec+'background-size:contain;';
                  newTitleStyleElements['backgroundSize']="background-size:contain;";
                  newTitleStyleElements['backgroundRepeat']="background-repeat:no-repeat;";
                  break;
                }
                case 'repeat':{
                  newBackgroundSpec = newBackgroundSpec+'background-size:contain;background-repeat:repeat;';
                  newTitleStyleElements['backgroundSize']="background-size:contain;";
                  newTitleStyleElements['backgroundRepeat']="background-repeat:repeat;";

                  break;
                }
              }
//              debugger;
              var imageRef = enteredStyles[thisStyleElements[s]].url;
              if(imageRef.includes("url(")){
                newTitleStyleElements['backgroundImage']="background-image:"+enteredStyles[thisStyleElements[s]].url+";";
              }else{
                newTitleStyleElements['backgroundImage']="background-image:url("+enteredStyles[thisStyleElements[s]].url+");";
              }


            }else if(enteredStyles[thisStyleElements[s]].backgroundType=='transparent'){
              newBackgroundSpec = '';
              newBackgroundSpec = newBackgroundSpec+'backgroundTypeColor:checked;';
              newBackgroundSpec = newBackgroundSpec+'background-color:transparent;';
              newTitleStyleElements['backgroundTypeColor']="backgroundTypeColor:checked;";
              newTitleStyleElements['backgroundColor']='background-color:'+'transparent;';
              newStyle = newStyle+ newBackgroundSpec;
            }
            break;
          }
          case 'roundIncluded':{
//            debugger;
            if(enteredStyles[thisStyleElements[s]]=='yes'){
              newTitleStyleElements['roundIncluded']="roundIncluded:checked;";
              newStyle = newStyle+"roundIncluded:checked;";
              newStyle = newStyle+ "border-radius:8px;";
            }
            break;
          }
          case 'shadow':{
            if(enteredStyles[thisStyleElements[s]]=='yes'){
              newTitleStyleElements['shadow']="shadow:checked;";
              newTitleStyleElements['boxShadow']="box-shadow:10px 20px 30px black;";
              newStyle = newStyle+"shadow:checked;";
              newStyle= newStyle+"box-shadow:10px 20px 30px black;";
              break;
            }
            break;
          }
          case 'titleStyles_alignmentSelect':{
            newStyle = newStyle+'text-align:'+enteredStyles[thisStyleElements[s]]+';';
            newTitleStyleElements['textAlign']="text-align:"+enteredStyles[thisStyleElements[s]]+";";
            break;
          }
          case 'titleStyles_fontColorSelect':{
            newTitleStyle = newTitleStyle+'color:'+enteredStyles[thisStyleElements[s]]+';';
            newTitleStyleElements['color']="color:"+enteredStyles[thisStyleElements[s]]+";"
            break;
          }
          case 'titleStyles_fontSelect':{
            newTitleStyle = newTitleStyle+'font-family:'+enteredStyles[thisStyleElements[s]]+';';
            newTitleStyleElements['fontFamily']="font-family:"+enteredStyles[thisStyleElements[s]]+';';
            break;
          }
          case 'titleStyles_sizeSelecty':{
            newTitleStyle = newTitleStyle+'font-size:'+enteredStyles[thisStyleElements[s]]+';';
            newTitleStyleElements['fontSize']='font-size:'+enteredStyles[thisStyleElements[s]]+';';
            break
          }
          case 'titleStyles_styleSelect':{
            newTitleStyle = newTitleStyle+'font-style:'+enteredStyles[thisStyleElements[s]]+';';
            newTitleStyleElements['fontStyle']='font-style:'+enteredStyles[thisStyleElements[s]]+';';
            break;
          }
          case 'titleStyles_weightSelect':{
            newTitleStyle = newTitleStyle+'font-weight:'+enteredStyles[thisStyleElements[s]]+';';
            newTitleStyleElements['fontWeight']='font-weight:'+enteredStyles[thisStyleElements[s]]+';';
            break;
          }
          case 'subElementStyles_alignmentSelect':{
            if(enteredStyles[thisStyleElements[s]].length>0){
              newSubStyle = newSubStyle+'text-align:'+enteredStyles[thisStyleElements[s]]+';';
              newSubStyleElements['textAlign']="text-align:"+enteredStyles[thisStyleElements[s]]+";";
              newSubStyleValues['textAlign']=enteredStyles[thisStyleElements[s]];
              break;
            }else{
              break;
            }
          }
          case 'subElementStyles_fontColorSelect':{
            newSubStyle = newSubStyle+'color:'+enteredStyles[thisStyleElements[s]]+';';
            newSubStyleElements['color']="color:"+enteredStyles[thisStyleElements[s]]+";"
            newSubStyleValues['color']=enteredStyles[thisStyleElements[s]];
            break;
          }
          case 'subElementStyles_fontSelect':{
            newSubStyle = newSubStyle+'font-family:'+enteredStyles[thisStyleElements[s]]+';';
            newSubStyleElements['fontFamily']="font-family:"+enteredStyles[thisStyleElements[s]]+';';
            newSubStyleValues['fontFamily']=enteredStyles[thisStyleElements[s]];
            break;
          }
          case 'subElementStyles_sizeSelecty':{
            newSubStyle = newSubStyle+'font-size:'+enteredStyles[thisStyleElements[s]]+';';
            newSubStyleElements['fontSize']='font-size:'+enteredStyles[thisStyleElements[s]]+';';
            newSubStyleValues['fontSize']=enteredStyles[thisStyleElements[s]];
            break;
          }
          case 'subElementStyles_weightSelect':{
            newSubStyle = newSubStyle+'font-weight:'+enteredStyles[thisStyleElements[s]]+';';
            newSubStyleElements['fontWeight']='font-weight:'+enteredStyles[thisStyleElements[s]]+';';
            newSubStyleValues['fontWeight']=enteredStyles[thisStyleElements[s]];
            break;
          }
          case 'subElementStyles_styleSelect':{
            newSubStyle = newSubStyle+'font-style:'+enteredStyles[thisStyleElements[s]]+';';
            newSubStyleElements['fontStyle']='font-style:'+enteredStyles[thisStyleElements[s]]+';';
            newSubStyleValues['fontStyle']=enteredStyles[thisStyleElements[s]];
            break;
          }

        }

      }
      console.log('newStyle-', newStyle);
      console.log('newSubStyle', newSubStyle);
      console.log('newTitleStyle', newTitleStyle);
      console.log('newTitleStyleElements', newTitleStyleElements);
      console.log('newSubStyleElements', newSubStyleElements);
      console.log('newSubStyleValues',newSubStyleValues);
      return [newStyle, newSubStyle, newTitleStyle, newTitleStyleElements, newSubStyleValues, newSubStyleElements];
    },

    makeTemplateClone(copyTemplateCallback, context){
      var apiPath = this.$store.getters.getApiBase;
      console.log('apiPath - ',apiPath);
      debugger;

      axios.post(apiPath+'api/shan/cloneTemplate?XDEBUG_SESSION_START=14668', {
        //      axios.post('http://localhost:8000/api/shan/cloneTemplate?XDEBUG_SESSION_START=14668', {
        params:{
          layoutId: context.$store.getters.getCurrentLayoutId,
          templateId: context.targetTemplateId,
          orgId: context.$store.getters.getOrgId,
          description: context.dialogData['pageDescription'],
          menu_label: context.dialogData['pageName'],
          permType: context.dialogData['permissions'],
          copyIt: context.copyIt
        }
      })
          .then(response => {
            console.log(response);
//            console.log('route status after makeTemplateClone', this.$route.name);
//            console.log('cmd after makeTemplateClone:'+this.cmd);
            debugger;
            copyTemplateCallback(response.data, this);

          })
          .catch(e => {
            console.log(e,'- cloneTemplate failed');
          });

    },
    saveNewCard(layoutId, title, restricted, cardType, tlrow, tlcol, brrow, brcol, apiPath, jsonConfigurationPackage, context){
      debugger;
      axios.post(apiPath+'api/shan/saveCardAndConfiguration?XDEBUG_SESSION_START=12016', {
//        axios.post('http://localhost:8000/api/shan/saveCardOnly?XDEBUG_SESSION_START=12016', {
        layoutId: layoutId,
        cardTitle: title,
        restricted: restricted,
        cardType: cardType,
        topLeftRow: tlrow,
        topLeftCol: tlcol,
        bottomRightRow: brrow,
        bottomRightCol: brcol,
        cardParams:jsonConfigurationPackage
      }).then(response=>
      {
        debugger;
//        configureCardCallback(context);
        console.log('card saved:',response);
  //      context.$emit('cevt', ['cardSaved']);
        context.doCardSaved({}, context)

      }).catch(function(error) {
        this.$emit('layoutMessage', ['error', 'There was an error saving this card',0 ]);
        console.log(error);
        return "error:"+error;
      });
    },

    doConfigureCard(msg, context) {
      console.log('in sb - doConfigureCard', msg, context);
      context.dialogConfiguration = {};
      context.dialogConfiguration.definition = 'configureCard';
      debugger;
      var mainStylingCss;
      var subElementStylingCss;
      var thisCardSubStyling;
      mainStylingCss = msg[3].card_parameters.style;
      console.log('mainStylingCss', mainStylingCss);
      var thisCardStyling = context.getCardStyling(mainStylingCss);

      if (typeof (msg[3].elementStyles) != 'undefined') {
        subElementStylingCss = ";" + msg[3].elementStyles.sub[0];
        thisCardSubStyling = context.getCardStyling(subElementStylingCss);
      } else {
        console.log('thisCardStyline-', thisCardStyling);
        console.log('this background-color ', thisCardStyling['background-color']);
        console.log('is true-', ((thisCardStyling['background-color'] == '#dbddd0') && (thisCardStyling['backgroundTypeColor'] == 'checked') && (thisCardStyling['color'] == '#0000FF')));
        console.log('thisCardSubstyling', thisCardSubStyling);
        if (((thisCardStyling['background-color'] == '#dbddd0') && (thisCardStyling['backgroundTypeColor'] == 'checked') && (thisCardStyling['color'] == '#0000FF'))) {
          console.log('this is a new card');
        } else {
          console.log('not a new card');
          context.dialogConfiguration.existingData = {
            cardName: msg[2],
            cardConfig: msg[3],
            cardStyles: thisCardStyling,
            cardSubStyles: thisCardSubStyling
          };
        }
      }
      context.showDialog = true
      context.dialogReload += 1;
    },

    saveCardConfiguration(msg, context){
//      var currentMainStyles = this.getCardStyling(context.cardCss);
      var currentGridStyle = this.getCardGridStyle(context.cardCss);
      var cardConfigurationObject = [];
      var newCssValues = this.setStyleCss(msg[1], currentGridStyle);
      context.cardCss = newCssValues[0];
      context.menuItems.style = newCssValues[1];
      context.headlineStyle = newCssValues[2];
      context.headlineOptionsReload+=1;
      cardConfigurationObject[0]=context.cardId;
      cardConfigurationObject[1]=newCssValues[3];
      cardConfigurationObject[2]={};
      var newSub = [];
      newSub[0]={
        elementConfiguration:newCssValues[4],
        elementName:'sub',
        elementStyles:newCssValues[5]
      }
      cardConfigurationObject[3]=newSub;
      var jsonCardConfigurationPackage = JSON.stringify(cardConfigurationObject);
      console.log('jsonCardConfigurationPackage', jsonCardConfigurationPackage);
      var apiPath = this.$store.getters.getApiBase;
      console.log('apiPath - ', apiPath);

      axios.post(apiPath+'api/shan/saveCardParameters?XDEBUG_SESSION_START=14252', {
//        axios.post('http://localhost:8000/api/shan/saveCardParameters?XDEBUG_SESSION_START=14252', {
        cardParams: jsonCardConfigurationPackage,
      }).then(response=>
      {
        console.log(response);
        this.$emit('cevt',['configurationHasBeenSaved', this.$store.getters.getCurrentLayoutId]);
      }).catch(function(error) {
        console.log(error);
      });

    }





  },
  data(){
    return {

    }
  },
  watch: {

  }
}
</script>
