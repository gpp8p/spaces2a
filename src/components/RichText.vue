<template>

  <div :style="cardCss" class="cardBody  scrollbar-hidden">
      <span class="editCardClass cardHeader" v-if="this.mode==this.CARD_EDIT" >
        <Menu
            name="cardMenu"
            @cevt="handleEvt"
        ></Menu>
      </span>
    <span class="editCardClass searchBoxStyle" v-if="this.mode==this.SHOW_TEXT && this.showSearch==true" >
      search feature here....
    </span>

      <span v-if="this.mode==this.SHOW_TEXT"  v-html="this.cardText" >
      </span>



  </div>
</template>

<script>
import utils from '../components/utils.vue';
import Menu from "../components/menuNew.vue";
//import store from "@/store";
//import menuItemsNew from "../components/menuItemsNewVertical.vue";
//import axios from "axios";
//import store from "@/store";


export default {
  name: "RichText",
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
  components: {Menu},
  mixins: [utils],
  mounted(){
    debugger;
    console.log(this.name,' is mounted', this.config);
    this.$emit('cevt', ['setCmdHandler', this.handleCmd, this.name]);
    this.$emit('cevt', ['cardMounted','',this.name]);
    this.cardCss= this.config.card_parameters.style;
    console.log("rt style-", this.cardCss);
    if(typeof(this.config.id)!='undefined'){
      this.cardId = this.config.id;
    }
    if(this.cardCss.includes('includeSearch:checked')){
      this.showSearch=true;
    }
    if(typeof(this.config.card_parameters.content.cardText)!='undefined'){
      this.cardText =  this.config.card_parameters.content.cardText;
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
      SHOW_TEXT:0,
      SRC_UPLOAD:1,
      ENTER_METADATA:2,
      RICH_TEXT_EDITOR:3,
      CARD_EDIT:5,
      SEARCH:6,
      mode: 0,
      cardId:0,
      showSearch: false,
      cardText:'',

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
    doMenuMounted(msg, context){
      console.log('in doMenuMounted', msg, context);
      this.cmdHandlers['cardMenu'](['setMenu', 'cardMenuRt','cardMenu']);
    },

    doSetCardMode(msg, context){
//      debugger;
      this.mode=this.CARD_EDIT
      console.log('in doSetCardMode', msg, context);
    },
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
        'removeCmdHandler': function(msg, context){
          context.doRemoveCmdHandler(msg, context);
        },
        'menuMounted': function(msg, context){
          //console.log('evtHandler - a menu event', msg);
          context.doMenuMounted(msg, context);
        },
        'menuItemSelected': function(msg, context){
          //console.log('evtHandler - a menu event', msg);
          context.doMenuItemSelected(msg, context);
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
    doMenuItemSelected(msg, context){
      console.log('RichText doMenuItemSelected-', msg, context);
      debugger;
      if(msg.length>3){
        msg[3](this);
      }else{
        switch(msg[2]){
          default:{
            this.$emit('cevt', msg);
          }
        }
      }
    },
    doSetValue(msg, context){
      debugger;
      if(msg[2]==this.name){
        console.log('RichText card doSetValue-',msg, context);
        debugger;
        this.saveCardConfiguration(msg, context);
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
.cardBody {
  height: 100%;
  scrollbar-width:none;
  font-family: "Times New Roman";
  overflow: auto;
  padding-left: 5px;
}
.textAreaDisplay {
  margin-left: 2%;
}

.cardStyle {
  height: 100%;
  width: 100%;
  font-family: "Times New Roman";
}
.scrollbar-hidden::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge add Firefox */
.scrollbar-hidden {
  -ms-overflow-style: none;
  scrollbar-width: none; /* Firefox */
}

.cardHead {
  color: blue;
  height: 6%;
  background-color: #fff722;
  font-family: Geneva;
  font-size: 12px;
  font-style: normal;
  font-weight: bold;
}
.editCardClass {
  display: grid;
  grid-template-rows: 30px 80%;
}
.cardHeader {
  background-color: yellow;
  color: blue;
  font-size: medium;
  padding-bottom: 3px;

}

.searchBoxStyle {
  background-color: #7588e7;
  color: #f3bf04;
  font-size: medium;
  padding-bottom: 3px;

}


.cardFooter {
  height: 5%;
  width:100%;
  margin-left: auto;
  margin-right: auto;
  text-align: center
}



</style>
