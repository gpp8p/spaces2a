<template>
  <span :style="cardCss">
    <div v-if="this.cardMode==this.CARD_EDIT" class="editCardClass">
      <span style="background-color: yellow; color: blue; font-size: medium; padding-bottom: 3px;" v-if="this.cardMode==this.CARD_EDIT" >
        <Menu
            name="cardMenu"
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
        </span>
          <span v-if="this.showOptions==true">
            <menuItemsNew
                :currentItems="menuItems"
                :key="headlineOptionsReload"
                name="headlineCardOptions"
                @cevt="handleEvt"
            ></menuItemsNew>
          </span>

      </span>
    </div>


  </span>
</template>

<script>
import utils from '../components/utils.vue';
import Menu from "../components/menuNew.vue";
import menuItemsNew from "../components/menuItemsNewVertical.vue";
import axios from "axios";
import store from "@/store";



export default {
  name: "NavigationMenu",
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
    console.log(this.name,' is mounted');
    this.$emit('cevt', ['setCmdHandler', this.handleCmd, this.name]);
    this.$emit('cevt', ['cardMounted','',this.name]);
    console.log('navMenu config-',this.config);
    this.cardCss= this.config.card_parameters.style;
    if(typeof(this.config.id)!='undefined'){
      this.cardId = this.config.id;
    }
    console.log(this.name,'headlineCard is mounted', this.config);
    this.$emit('cevt', ['setCmdHandler', this.handleCmd, this.name]);
    this.$emit('cevt', ['cardMounted','',this.name]);
//    this.cardCss = this.config.card_parameters.gridCss +'; background-color:'+this.config.card_parameters.backgroundColor.colorSelect+';color:'+this.config.card_parameters.color+';';
    this.cardCss= this.config.card_parameters.style;
    console.log('headline card style-', this.cardCss);
    debugger;
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
          linkType: lType,
          direction:'V'
        }
        if(typeof (this.config.card_parameters.content.availableLinks[l].layout_link_to)!='undefined'){
          this.menuItems.items.push(thisItem);
        }
      }else{
        thisItem = {
          label:this.config.card_parameters.content.availableLinks[l].description,
          action: "",
          linkUrl: this.config.card_parameters.content.availableLinks[l].link_url,
          type: 'mItem',
          linkType: lType,
          direction:'V'
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
    doMenuMounted(msg, context){
      console.log('in doMenuMounted', msg, context);
      this.cmdHandlers['cardMenu'](['setMenu', 'cardMenu','cardMenu']);
    },
    doSetCardMode(msg, context){
//      debugger;
      this.cardMode=this.CARD_EDIT
      console.log('in doSetCardMode', msg, context);
    },
    doSetValue(msg, context){
      debugger;
      if(msg[2]==this.name){
        console.log('navigationMenu doSetValue-',msg, context);
        debugger;
        this.saveCardConfiguration(msg, context);
      }
    },
    doMenuItemSelected(msg, context){
      console.log('headlineCard doMenuItemSelected-', msg, context);
      debugger;
      if(msg.length>3){
        msg[3](this);
      }else{
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
            debugger;
            var thisCardId = context.config.id;
            console.log('editHeadline menu choice-',context.config);
            store.commit('setCardBeingEditedId', thisCardId);
            this.$emit('cevt', ['menuItemSelected', 'editCardWithLinks', context.name, context.config ])
            break;
          }
          default:{
            this.$emit('cevt', msg);
          }
        }
      }


    },



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

</style>
