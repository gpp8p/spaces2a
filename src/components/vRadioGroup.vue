<template>
  <span>
      <span  :style="this.componentStyle" >
        <span :style="this.labelStyle" v-if="this.hasLabel==true">
             <label>
                {{this.groupLabel}}
             </label>
        </span>
        <span >
          <vRadio v-for="(thisRadio, index) in this.radioButtons"
                  :key="index"
                  :cmdObject = thisRadio
                  :cmdObjectVersion = thisCmdObjectVersion
                  :name = groupName
                  @cevt="handleEvt"
          ></vRadio>
        </span>
    </span>

  </span>
</template>

<script>
import utils from "@/components/utils";
import vRadio from "@/components/vRadio.vue";
export default {
name: "vRadioGroup",
  components: {vRadio},
  mixins:[utils],
  props: {
    cmdObject: {
      type: Object,
      required: false
    },
    name:{
      type: String,
      required: false
    }
  },
  data(){
    return {
      radioButtons:[],
      buttonOrientation:'',
      defaultOrientation:'horozontal',
      hasLabel:false,
      groupLabel:'',
      groupName:'',
      groupLabelClass:'',
      labelStyle: '',
      componentStyle:{},
      defaultGroupLabelClass:'labelPlusInput',
      defaultButtonLabelClass: 'radioLabel',
      thisCmdObjectVersion:0,
      cmdHandlers:{},
      leafComponent: false
    }
  },
  created(){
//    debugger;
    this.radioButtons = this.cmdObject.radioButtons;
    this.buttonOrientation = this.cmdObject.orient;
    if(typeof(this.cmdObject.componentStyle)!='undefined'){
      this.componentStyle = this.cmdObject.componentStyle;
    }
    if(typeof(this.cmdObject.groupLabel)!='undefined'){
      this.groupLabel = this.cmdObject.groupLabel;
      this.hasLabel = true;
    }
    if(typeof(this.cmdObject.labelStyle)!='undefined'){
      this.labelStyle =  this.cmdObject.labelStyle;
    }else{
      if(this.hasLabel==true){
        this.groupLabelClass = this.defaultGroupLabelClass;
      }
    }
    this.groupName = this.cmdObject.groupName;
  },
  mounted(){
//  debugger;
    var o;
    if(typeof(this.cmdObject.buttonLabelStyle)!='undefined'){
      for(o =0; o<this.radioButtons.length; o++){
        this.radioButtons[o].labelStyle = this.cmdObject.buttonLabelStyle;
      }
    }else{
      for(o =0; o<this.radioButtons.length; o++){
        this.radioButtons[o].labelClass = this.defaultButtonLabelClass;
      }

    }
    for(o =0; o<this.radioButtons.length; o++){
      if(typeof(this.cmdObject.orient)!='undefined'){
        this.radioButtons[o].orient = this.cmdObject.orient;
      }else{
        this.radioButtons[o].orient = this.defaultOrientation;
      }
    }
//    debugger;
    for(o =0; o<this.radioButtons.length; o++){
      this.radioButtons[o].existingData = this.cmdObject.fieldValue;
    }
    this.$emit('cevt', ['setCmdHandler', this.handleCmd, this.name]);
    this.thisCmdObjectVersion+=1;
  },
  beforeDestroy() {
    this.$emit('cevt', ['removeCmdHandler', this.handleCmd, this.name]);
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
      console.log('evtOpt in radioGroup', msg);
      this.evtHandler(msg, this);
    },
    evtHandler(msg, self){
      console.log('evtHandler in menu-', msg, self);
      debugger;
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
      debugger;
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
.labelPlusInput {
  display:grid;
  width:100%;
  margin-top: 3px;
  grid-template-columns: 20% 80%;
  font-family: Arial;
  font-size: medium;
  color: #0a3aff;
}

</style>
