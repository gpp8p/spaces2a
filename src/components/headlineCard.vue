<template>
  <span :style="cardCss">
    <div v-if="this.cardMode==this.CARD_EDIT" class="editCardClass">
      <span style="background-color: yellow; color: blue; font-size: medium" v-if="this.cardMode==this.CARD_EDIT">
        <Menu
            name="headlineCardMenu"
            @cevt="handleEvt"
        ></Menu>
      </span>
      <span>
        Headline Card!!
      </span>
    </div>
    <div v-if="this.cardMode==this.CARD_DISPLAY">
      <span>
        Headline Card!!
      </span>
    </div>

  </span>
</template>

<script>
import utils from '../components/utils.vue';
import Menu from "../components/menuNew.vue";

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
  components: {Menu},
  mixins: [utils],
  mounted(){
    console.log(this.name,'headlineCard is mounted', this.config);
    this.$emit('cevt', ['setCmdHandler', this.handleCmd, this.name]);
    this.$emit('cevt', ['cardMounted','',this.name]);
//    this.cardCss = this.config.card_parameters.gridCss +'; background-color:'+this.config.card_parameters.backgroundColor.colorSelect+';color:'+this.config.card_parameters.color+';';
      this.cardCss= this.config.card_parameters.style;

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
      cardMode:0
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
          }
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
                                      debugger;
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
    }



  }
}
</script>

<style scoped>
.cardEditMenu{
  height:10%;
  width:100%;
  background-color: yellow;
  color: blue;
}
.editCardClass {
  display: grid;
  grid-template-rows: 10% 90%;
}

</style>

