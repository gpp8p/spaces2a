<template>
  <span :style="wrapperStyle" >
    <chooserOption v-for="(thisOption, index) in this.selectOptions"
                   :key="index"
                   :cmdObject = thisOption
                   :name = thisOption.val
                   @cevt="handleEvt"
    ></chooserOption>
  </span>
</template>

<script>
import utils from '../components/utils.vue';
import chooserOption from '../components/chooserOption.vue';

export default {
  name: "chooser",
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
  components: {chooserOption},
  mixins: [utils],
  mounted(){
    console.log(this.name,' is mounted-', this.cmdObject);
    this.$emit('cevt', ['setCmdHandler', this.handleCmd, this.name]);
    var o;
    this.selectOptions = this.cmdObject.options;
    if(typeof(this.cmdObject.fieldValue)!='undefined'){
      for(o =0; o<this.selectOptions.length; o++){
        this.selectOptions[o].existingData = this.cmdObject.fieldValue;
      }
      console.log('select sets - ',this.cmdObject.existingData);
      console.log(this.selectOptions);
    }
    this.wrapperStyle = this.cmdObject.wrapperStyle;
    var optionHeight = Math.round(100/this.selectOptions.length).toString()+"% ";
    this.optionStyle = 'width: 100%; ' +
        'height:'+optionHeight+'; ';
//        'background-color:'+ this.cmdObject.optionBackground+'; '+
//        'color: '+this.cmdObject.optionColor+'; ';
    for(o =0; o<this.selectOptions.length; o++){
      this.selectOptions[o].style = this.optionStyle;
    }

  },
  beforeDestroy() {
    this.$emit('cevt', ['removeCmdHandler', this.handleCmd, this.name]);
  },
  data(){
    return {
      cmdHandlers:{},
      leafComponent: false,
      wrapperStyle:'',
      selectOptions: [],
      optionDefinitions:[],
      optionStyle:''
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
    },
    kevt(){
      debugger;
      console.log('keyPressed');
    }



  }
}
</script>

<style scoped>

</style>

