<template>
  <span>
      <span class="colorSelect" v-if="labelLocation==this.LABEL_VERTICAL">
        <span>
          Color
        </span>
        <span>
          <input type="color"  v-model = "colorVal"  @change="this.colorValueChanged" />
        </span>
      </span>
      <span class="colorSelect" v-if="labelLocation==this.LABEL_NOT">
        <span>
          <input type="color"  v-model = "colorVal"   />
        </span>
      </span>
  </span>

</template>

<script>
import utils from '../components/utils.vue';

export default {
  name: "colorv2",
  props:{
    name:{
      type: String,
      required: true
    },
    cmdObject:{
      type: Object,
      required: true
    }
  },
  components: {},
  mixins: [utils],
  mounted(){
    debugger;
    console.log(this.name,'colorV2 is mounted-', this.cmdObject);
    if(typeof(this.cmdObject.labelLocation)!='undefined'){
      this.labelLocation = this.cmdObject.labelLocation;
    }else{
      this.labelLocation = this.LABEL_NOT;
    }
    if(typeof(this.cmdObject.labelValue)!='undefined'){
      this.labelValue = this.cmdObject.labelValue;
    }
    if(typeof(this.cmdObject.colorVal)!='undefined'){
      this.colorVal = this.cmdObject.colorVal;
    }else{
      this.colorVal = '#ffffff';
    }
    this.$emit('cevt', ['setCmdHandler', this.handleCmd, this.name]);
    this.$emit('cevt', ['fieldInput',this.name, this.colorVal]);
  },
  beforeDestroy() {
    this.$emit('cevt', ['removeCmdHandler', this.handleCmd, this.name]);
  },
  data(){
    return {
      cmdHandlers:{},
      leafComponent: true,
      LABEL_NOT:0,
      LABEL_VERTICAL:1,
      LABEL_HOROZONTAL:2,
      labelLocation:0,
      labelValue:'',
      colorVal:''
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
    },

    colorValueChanged(){
      this.$emit('cevt', ['fieldInput',this.name, this.colorVal]);
    }



  }
}
</script>

<style scoped>
.colorSelect {
  display: grid;
  grid-template-rows: 40% 60%;
}
</style>

