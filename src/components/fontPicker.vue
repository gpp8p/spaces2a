<template>
  <span class="labelPlusInput">
    <span>
       {{cmdObject.fieldLabel}}
    </span>
    <span class="fpick">
      <span class="fselect">
        <span>
          Font
        </span>
        <span>
          <vSelect :cmdObject="this.cmdObject.pickers.fontFamily" name="fontSelect"></vSelect>
        </span>
      </span>
      <span class="fselect">
        <span>
          Size
        </span>
        <span>
          <vSelect :cmdObject="this.cmdObject.pickers.size" name="sizeSelect"></vSelect>
        </span>
      </span>
      <span class="fselect">
        <span>
          Style
        </span>
        <span>
          <vSelect :cmdObject="this.cmdObject.pickers.style" name="styleSelect"></vSelect>
        </span>
      </span>
      <span class="fselect">
        <span>
          Weight
        </span>
        <span>
          <vSelect :cmdObject="this.cmdObject.pickers.weight" name="weightSelect"></vSelect>
        </span>
      </span>
      <span class="fselect">
        <span>
          Alignment
        </span>
        <span>
          <vSelect :cmdObject="this.cmdObject.pickers.alignment" name="alignmentSelect"></vSelect>
        </span>
      </span>
      <span class="fselect">
        <span>
          Color
        </span>
        <span>
          <input type="color"  :value = "this.cmdObject.pickers.color.colorSelect"  @change="colorSelect"/>
        </span>
      </span>
    </span>
  </span>
</template>

<script>
import utils from '../components/utils.vue';
import vSelect from "@/components/vSelect";
export default {
  name: "fontPicker",
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
  components: {vSelect},
  mixins: [utils],
  mounted(){
    console.log(this.name,' is mounted');
    this.$emit('cevt', ['setCmdHandler', this.handleCmd, this.name]);
  },
  beforeDestroy() {
    this.$emit('cevt', ['removeCmdHandler', this.handleCmd, this.name]);
  },
  data(){
    return {
      cmdHandlers:{},
      leafComponent: false
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
      console.log('evtOpt in fontPicker', msg);
      this.evtHandler(msg, this);
    },
    evtHandler(msg, self){
      console.log('evtHandler in- (set this)', msg, self);
//      debugger;
      var evtType = {
        'setCmdHandler': function(msg, context){
          context.doSetCmdHandler(msg, context);
        },
        'removeCmdHandler': function(msg, context){
          context.doRemoveCmdHandler(msg, context);
        },
        'default': function(msg, context){
          console.log('evtHandler in fontPicker  - something else', msg, context);
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
.fselect {
  display: grid;
  grid-template-rows: 50% 50%;
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
</style>

