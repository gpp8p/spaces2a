<template>
  <span :style="cellCss" v-on:mousedown="mouseDown"  v-on:mousemove="mouseOver" v-on:mouseup="mouseUp">

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
//    console.log(this.name,' is mounted');
    this.cellCss = this.config.cell_parameters.style;
    this.thisCellAddress = this.cellAddress(this.config.cell_position[1], this.config.cell_position[0]);
    this.$emit('cevt', ['setPageCmdHandler', this.handleCmd, this.name, this.thisCellAddress]);
  },
  beforeDestroy() {
    this.$emit('cevt', ['removePageCmdHandler', this.handleCmd, this.name]);
  },
  data(){
    return {
      cmdHandlers:{},
      leafComponent: false,
      cellCss:'',
      thisCellAddress:''
    }
  },
  methods:{
//cmd handlers
    handleCmd(args){
//      console.log(this.name, ' handleCmd', args);
      this.cmdHandler(args, this);
    },
    cmdHandler(args, self){
//      debugger;
      if(args[2]==this.name || this.leafComponent==false){
        var cmdType ={
          'default': function(context, args){
            console.log('cmdHandler in dummy - something else', args, context);
          },
          'setCell':function(args, context){
//            console.log('setCell-', args, context);
            context.doSetCell(context, args);
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
//      debugger;
      console.log('mouseDown', 'mouseDown', this.config.cell_position, this.name);
//      this.handleEvt(['mouseEvt',this.cellId, 'mouseDown', this.cellConfig.cell_position]);
      this.$emit('cevt', ['mouseEvt', 'mouseDown', this.config.cell_position, this.name]);

    },
    mouseOver(){
/*
      try {
        console.log('mouseOver', this.config.id, this.config.cell_position, this.name);
      } catch (e) {
        console.log('error in Cell', e);
      }
 */
      this.$emit('cevt', ['mouseEvt', 'mouseOver', this.config.cell_position, this.name]);
    },
    mouseUp(){
      //console.log('mouseUp', this.cellId, this.cellConfig.cell_position);
      this.$emit('cevt', ['mouseEvt', 'mouseUp', this.config.cell_position, this.name]);
    },
// put do cmds here
    doSetCell(context, args){
//      console.log('in doSetCell', context, args);
//      debugger;
      var thisCellStyle = this.config.cell_parameters.gridCss+";"+"background-color:"+args[1]+";color:"+args[2];
      this.cellCss = thisCellStyle;

    },
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
    },
    cellAddress(x,y){
//      debugger;
      var zeros='000000';
      var addrX = x.toString();
      var addrY = y.toString();
      addrX = zeros+addrX;
      addrY = zeros+addrY;
      var newAddr = addrX.slice(-4)+addrY.slice(-4);
      return newAddr;
    },



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

