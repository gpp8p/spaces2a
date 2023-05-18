<template>
  <span :style="cellCss" v-on:mousedown="mouseDown"  v-on:mouseover="mouseOver" v-on:mouseup="mouseUp">
    Cell Here
  </span>
</template>

<script>
import utils from '../components/utils.vue';

export default {
  name: "Cell",
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
  components: {},
  mixins: [utils],
  mounted(){
//    debugger;
    console.log(this.name,' is mounted');
    this.cellCss = this.config.cell_parameters.style;
    this.$emit('cevt', ['setPageCmdHandler', this.handleCmd, this.name]);
  },
  beforeDestroy() {
    this.$emit('cevt', ['removePageCmdHandler', this.handleCmd, this.name]);
  },
  data(){
    return {
      cmdHandlers:{},
      leafComponent: false,
      cellCss:''
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
          }
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
//                debugger;
                this.cmdHandlers[availableHandlers[a]]([args[0], args[1], args[2]]);
              }
            }
          }
        }
      }
    },
    clickEvt(){
      //     this.handleEvt(['cellClicked',this.cellId]);
      //console.log('clickEvent:', this.cellId);
    },
    mouseDown(){
      debugger;
      console.log('mouseDown', 'mouseDown', this.config.cell_position, this.config.name);
//      this.handleEvt(['mouseEvt',this.cellId, 'mouseDown', this.cellConfig.cell_position]);
      this.$emit('cevt', ['mouseEvt', 'mouseDown', this.config.cell_position, this.config.name]);

    },
    mouseOver(){
      //console.log('mouseOver', this.cellId, this.cellConfig.cell_position);
      this.$emit('cevt', ['mouseEvt', 'mouseOver', this.config.cell_position, this.config.name]);
    },
    mouseUp(){
      //console.log('mouseUp', this.cellId, this.cellConfig.cell_position);
      this.$emit('cevt', ['mouseEvt', 'mouseUp', this.config.cell_position, this.config.name]);
    },
// put do cmds here

//event handler
    evtOpt(msg){
      console.log('evtOpt in Cell', msg);
      this.evtHandler(msg, this);
    },
    evtHandler(msg, self){
      console.log('evtHandler in Cell- ', msg, self);
//      debugger;
      var evtType = {
        'setPageCmdHandler':function(msg, context){
          console.log('evtHandler - a Cell event eating the event', msg, context);
        },
        'setCmdHandler': function(msg, context){
          //console.log('evtHandler - a menu event', msg);
          context.doSetCmdHandler(msg, context);
        },
        'removeCmdHandler': function(msg, context){
          context.doRemoveCmdHandler(msg, context);
        },
        'default': function(msg, context){
          console.log('evtHandler in Cell  - something else', msg, context);
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
    }



  }
}
</script>

<style scoped>
.defaultClass {
  font-family: Monaco;
  font-size: small;
  color: blue;
}
</style>

