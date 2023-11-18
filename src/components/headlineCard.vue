<template>
  <span :style="cardCss">
    <div v-if="this.cardMode==this.CARD_EDIT" class="editCardClass">
      <span style="background-color: yellow; color: blue; font-size: medium; padding-bottom: 3px;" v-if="this.cardMode==this.CARD_EDIT" >
        <Menu
            name="headlineCardMenu"
            @cevt="handleEvt"
        ></Menu>
      </span>
      <span>
        <span v-bind:style='this.headlineStyle'>
        {{ this.cardTitle }}
          <span v-if="this.showOptions==true">
            <menuItemsNew
                :currentItems="menuItems"
                :key="headlineOptionsReload"
                name="headlineCardOptions"
                @cevt="handleEvt"
            ></menuItemsNew>
          </span>
        </span>
      </span>
    </div>
    <div v-if="this.cardMode==this.CARD_DISPLAY">
      <span>
        <span  v-bind:style='this.headlineStyle'>
        {{ this.cardTitle }}
          <span v-if="this.showOptions==true">
            <menuItemsNew
                          :currentItems="menuItems"
                          :key="headlineOptionsReload"
                          name="headlineCardOptions"
                          @cevt="handleEvt"
            ></menuItemsNew>
          </span>
        </span>
      </span>
    </div>

  </span>
</template>

<script>
import utils from '../components/utils.vue';
import Menu from "../components/menuNew.vue";
import menuItemsNew from "../components/menuItemsNew.vue";
import axios from "axios";

export default {
  name: "headlineCard",
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
  components: {Menu, menuItemsNew},
  mixins: [utils],
  mounted(){
    if(typeof(this.config.id)!='undefined'){
      this.cardId = this.config.id;
    }
    console.log(this.name,'headlineCard is mounted', this.config);
    this.$emit('cevt', ['setCmdHandler', this.handleCmd, this.name]);
    this.$emit('cevt', ['cardMounted','',this.name]);
//    this.cardCss = this.config.card_parameters.gridCss +'; background-color:'+this.config.card_parameters.backgroundColor.colorSelect+';color:'+this.config.card_parameters.color+';';
      this.cardCss= this.config.card_parameters.style;
      console.log('headline card style-', this.cardCss);
//    debugger;
    console.log('mounting Headline card element styles-', this.config.elementStyles.sub);
    if (typeof(this.config.elementStyles.sub) === 'undefined'){
      this.subStyle = '';
    }else{
      this.subStyle = this.config.elementStyles;
    }
    if(typeof(this.config.card_parameters.content.linkMenuTitle)=='undefined'){
      this.cardTitle='';
    }else{
      this.cardTitle = this.config.card_parameters.content.linkMenuTitle;
    }

    var cardStyleElements = this.cardCss.split(';');
    var hd = '';
    for(var h=1; h < cardStyleElements.length;h++){
      if(cardStyleElements[h].startsWith('font-size')|cardStyleElements[h].startsWith('font-family')|cardStyleElements[h].startsWith('color')|cardStyleElements[h].startsWith('font-style')|cardStyleElements[h].startsWith('font-weight')){
        hd = hd+cardStyleElements[h]+';';
      }
    }
    this.headlineStyle = hd.slice(0,-1);
    debugger;
    var subElementStyles = this.config.elementStyles.sub[0];
    console.log('headline subelement styles-',subElementStyles);
    var hov=this.substituteStyle(subElementStyles, 'color', 'red');
    this.menuItems = {
      currentSelectedMenuOption: 'Appearence',
      style: subElementStyles,
      hoverStyle: hov,
      menuType: 'headline',
      items:[]
    }
    for(var l=0;l<this.config.card_parameters.content.availableLinks.length; l++){
      console.log('link-',this.config.card_parameters.content.availableLinks[l]);
      this.showOptions=true;
      var lType=0;
      if(this.config.card_parameters.content.availableLinks[l].isExternal){
        lType = this.LINK_EXTERNAL;
      }else{
        lType = this.LINK_INTERNAL;
      }
      debugger;
      if(lType==this.LINK_INTERNAL){
        var thisItem = {
          label:this.config.card_parameters.content.availableLinks[l].description,
          action: this.config.card_parameters.content.availableLinks[l].layout_link_to,
          type: 'mItem',
          linkType: lType
        }
        if(typeof (this.config.card_parameters.content.availableLinks[l].layout_link_to)!='undefined'){
          this.menuItems.items.push(thisItem);
        }
      }else{
        thisItem = {
          label:this.config.card_parameters.content.availableLinks[l].description,
          action: "",
          linkUrl: this.config.card_parameters.content.availableLinks[l].linkUrl,
          type: 'mItem',
          linkType: lType
        }
        if(typeof (this.config.card_parameters.content.availableLinks[l].layout_link_to)!='undefined'){
          this.menuItems.items.push(thisItem);
        }
      }

    }
  },
  beforeDestroy() {
    this.$emit('cevt', ['removeCmdHandler', this.handleCmd, this.name]);
  },
  data(){
    return {
      cmdHandlers:{},
      leafComponent: false,
      cardCss:'',
      CARD_EDIT:1,
      CARD_DISPLAY:0,
      cardMode:0,
      subStyle:'',
      cardTitle:'',
      headlineStyle:'',
      showOptions:false,
      currentItems:[],
      LINK_INTERNAL:0,
      LINK_EXTERNAL:1,
      menuItems:{},
      headlineOptionsReload:0,
      cardId:0
    }
  },
  methods:{
//cmd handlers
    handleCmd(args){
      console.log(this.name, ' handleCmd', args);
      this.cmdHandler(args, this);
    },
    cmdHandler(args, self){
      debugger;
      if(args[2]==this.name || this.leafComponent==false){
        var cmdType ={
          'default': function(context, args){
            console.log('cmdHandler in dummy - something else', args, context);
          },
          'setCardMode':function(args, context){
            self.doSetCardMode(args, context);
          },
          'setValue':function(args, context){
            self.doSetValue(args, context);
          },
        }
        if(typeof(cmdType)!='undefined'){
          try {
            (cmdType[args[0]](args, self));
          } catch (e) {
            console.log('unknown cmd -',args, this.name);
            console.log('unknown cmd -',args, this.name);
            var availableHandlers = Object.keys(self._data.cmdHandlers);
            console.log('available cmd handlers-',availableHandlers);

            if(availableHandlers.length>0){
              for(var a=0;a<availableHandlers.length;a++){
//                                      debugger;
                this.cmdHandlers[availableHandlers[a]]([args[0], args[1], args[2]]);
              }
            }
          }
        }
      }
    },
// put do cmds here
    doSetValue(msg, context){
      debugger;
      if(msg[2]==this.name){
        console.log('headlineCard doSetValue-',msg, context);
        debugger;
        var currentMainStyles = this.getCardStyling(this.cardCss);
        var currentGridStyle = this.getCardGridStyle(this.cardCss);
        var cardConfigurationObject = [];
        console.log('gridStyle-', currentGridStyle);
        console.log('currentMainStyles-', currentMainStyles);
        console.log('entered styles-', msg[1]);
        var newCssValues = this.setStyleCss(msg[1], currentGridStyle);
        this.cardCss = newCssValues[0];
        this.menuItems.style = newCssValues[1];
        this.headlineStyle = newCssValues[2];
        this.headlineOptionsReload+=1;
        cardConfigurationObject[0]=this.cardId;
        cardConfigurationObject[1]=newCssValues[3];
        cardConfigurationObject[2]={};
        var newSub = [];
        newSub[0]={
          elementConfiguration:newCssValues[4],
          elementName:'sub',
          elementStyles:newCssValues[5]
        }
        cardConfigurationObject[3]=newSub;
        console.log('cardConfigurationObject-', cardConfigurationObject);
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
//event handler
    evtOpt(msg){
      console.log('evtOpt in headlineCard', msg);
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
        'menuMounted': function(msg, context){
          //console.log('evtHandler - a menu event', msg);
          context.doMenuMounted(msg, context);
        },
        'menuItemSelected': function(msg, context){
          //console.log('evtHandler - a menu event', msg);
          context.doMenuItemSelected(msg, context);
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
//      debugger;
      console.log('doSetCmdHandler-',msg, context);
      this.cmdHandlers[msg[2]]=msg[1];
    },
    doRemoveCmdHandler(msg, context){
      console.log('doRemoveCmdHandler-',msg, context);
      delete(this.cmdHandlers[msg[2]]);
    },
    doSetCardMode(msg, context){
//      debugger;
      this.cardMode=this.CARD_EDIT
      console.log('in doSetCardMode', msg, context);
    },
    doMenuMounted(msg, context){
      console.log('in doMenuMounted', msg, context);
      this.cmdHandlers['headlineCardMenu'](['setMenu', 'headlineCardMenu','headlineCardMenu']);
    },
    doMenuItemSelected(msg, context){
      console.log('headlineCard doMenuItemSelected-', msg, context);
      switch(msg[2]){
        case 'internal_link':{
          this.$emit('cevt',['pageSelected', msg[1]]);
          break;
        }
        case 'external_link':{
          break
        }
        case 'resizeCard':{
          console.log('resizeCard-', context);
          this.$emit('cevt', ['menuItemSelected', 'resizeCard', context.name, context.config ])
          break;

        }
        case 'configureHeadlineCard':{
          console.log('configureHeadline menu choice-',context.config);
          this.$emit('cevt', ['menuItemSelected', 'configureHeadlineCard', context.name, context.config ])
          break;
        }
        case 'editHeadlineCard':{
          console.log('editHeadline menu choice-',context.config);
          this.$emit('cevt', ['menuItemSelected', 'editHeadlineCard', context.name, context.config ])
          break;
        }
        default:{
          this.$emit('cevt', msg);
        }
      }

    },
    setStyleCss(enteredStyles, gridStyle){
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
              debugger;
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
              debugger;
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
            debugger;
            if(enteredStyles[thisStyleElements[s]]=='yes'){
              newTitleStyleElements['roundIncluded']="roundIncluded:checked;";
              newStyle = newStyle+"roundIncluded:checked;";
              newStyle = newStyle+ "border-radius:8px;";
            }
            break;
          }
          case 'shadow':{
            newTitleStyleElements['shadow']="shadow:checked;";
            newTitleStyleElements['boxShadow']="box-shadow:10px 20px 30px black;";
            newStyle = newStyle+"shadow:checked;";
            newStyle= newStyle+"box-shadow:10px 20px 30px black;";
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
    }



  }
}
</script>

<style scoped>
.cardEditMenu{
  height:15%;
  width:100%;
  background-color: yellow;
  color: blue;
}
.editCardClass {
  display: grid;
  grid-template-rows: 30px 80%;
}

.center {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  border: 3px solid green;
}

</style>

