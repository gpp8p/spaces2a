<template>
  <span class="labelPlusInput">
    <span>
       {{cmdObject.fieldLabel}}
    </span>
    <span class="fpick">
          <selectv2
              :cmdObject="cmdObject.family"
              :name="this.familyName"
              @cevt="handleEvt"
          ></selectv2>
          <selectv2
              :cmdObject="cmdObject.fontStyle"
              :name="this.styleName"
              @cevt="handleEvt"
          ></selectv2>
          <selectv2
              :cmdObject="cmdObject.size"
              :name="this.sizeName"
              @cevt="handleEvt"
          ></selectv2>
          <selectv2
              :cmdObject="cmdObject.weight"
              :name="this.weightName"
              @cevt="handleEvt"
          ></selectv2>
      <selectv2
          :cmdObject="cmdObject.alignment"
          :name="this.alignmentName"
          @cevt="handleEvt"
      ></selectv2>
      <colorV2
          :cmdObject="cmdObject.fontColor"
          :name="this.fontColorName"
          @cevt="handleEvt"
      ></colorV2>
    </span>
  </span>
</template>

<script>
import utils from '../components/utils.vue';
import selectv2 from "@/components/selectv2";
import colorV2 from "@/components/colorV2";

export default {
  name: "fontPickerRow",
  props:{
    name:{
      type: String,
      required: true
    },
    cmdObject:{
      type: Object,
      required: false
    }
  },
  components: {selectv2, colorV2},
  mixins: [utils],
  mounted(){
    console.log(this.name,' is mounted');
    console.log('fontPickerRow cmdObject-', this.cmdObject);
    this.$emit('cevt', ['setCmdHandler', this.handleCmd, this.name]);
  },
  beforeDestroy() {
    this.$emit('cevt', ['removeCmdHandler', this.handleCmd, this.name]);
  },
  data(){
    return {
      cmdHandlers:{},
      leafComponent: false,
      familyName:this.name+"_fontSelect",
      styleName: this.name+"_styleSelect",
      sizeName: this.name+"_sizeSelecty",
      weightName: this.name+"_weightSelect",
      alignmentName: this.name+"_alignmentSelect",
      fontColorName: this.name+"_fontColorSelect"


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
          /*  example
                    'setCardMode':function(args, context){
                      self.doSetCardMode(args, context);
                    }
          */
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
    }



  }
}
</script>

<style scoped>
  .fpick {
    display: grid;
    font-size: 12px;
    grid-template-columns: 15% 15% 15% 15% 15% 15%;
  }
  .vAlign {
    display:block;
    margin-top: auto;
    margin-bottom: auto;
  }
  .colorSelect {
    display: grid;
    grid-template-rows: 40% 60%;
  }
  .labelPlusInput {
    display:grid;
    width:100%;
    margin-top: 3px;
    grid-template-columns: 20% 80%;
    font-family: Arial;
    font-size: small;
    color: #0a3aff;
  }
  .selectStyle {
    background: powderblue;
    color:blue;
    font-weight: bold;
    font-size: 12px;
    margin-bottom: 3px;
    width: 100%;
    margin-right: 15%;
    margin-top:5px;
  }
  input[type='color'] {
    vertical-align: middle;
  }
</style>

