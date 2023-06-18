<template>
  <span>
     <span class="labelPlusInput"  v-if="this.hasLabel==true">
         <label :for="name" :style="cmdObject.labelStyle" class="labelPlusInput">
            {{this.fieldLabel}}
         </label>
         <span>
            <input v-model="fieldValue"
                   true-value="yes"
                   false-value="no"
                   type="checkbox"
                   :id="name"
                   ref="input"
                   @change="fieldChanged" />
         </span>
     </span>
     <span class="inputOnly" v-if="this.hasLabel==false">
         <span>
            <input v-model="fieldValue"
                   true-value="yes"
                   false-value="no"
                   type="checkbox"
                   :id="name"
                   :style="fieldStyle"
                   ref="input"
                   @change="fieldChanged" />
         </span>
     </span>
  </span>
</template>

<script>
import utils from '../components/utils.vue';

export default {
  name: "checkbox",
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
  components: {},
  mixins: [utils],
  mounted(){
    console.log(this.name,' is mounted');
    var cType =  typeof this.cmdObject.hasLabel;
    if(cType != 'boolean'){
      this.hasLabel = false;
    }else if(this.cmdObject.hasLabel==false){
      this.hasLabel = false;
    }else{
      this.hasLabel = true;
      this.fieldLabel = this.cmdObject.fieldLabel;
    }

    cType = typeof this.cmdObject.fieldValue;
    if(cType !='undefined'){
      this.fieldValue = this.cmdObject.fieldValue;
    }else{
      this.fieldValue='no';
    }
    this.$emit('cevt', ['setCmdHandler', this.handleCmd, this.name]);
  },
  beforeDestroy() {
    this.$emit('cevt', ['removeCmdHandler', this.handleCmd, this.name]);
  },
  data(){
    return {
      cmdHandlers:{},
      leafComponent: false,
      fieldValue: '',
      hasLabel:false,
      fieldStyle:'',
      labelStyle:'',
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
      console.log('evtOpt in checkbox', msg);
      this.evtHandler(msg, this);
    },
    evtHandler(msg, self){
      console.log('evtHandler in- (set this)', msg, self);
//      debugger;
      var evtType = {
        'setCmdHandler': function(msg, context){
          //console.log('evtHandler - a checkbox event', msg);
          context.doSetCmdHandler(msg, context);
        },
        'removeCmdHandler': function(msg, context){
          context.doRemoveCmdHandler(msg, context);
        },
        'default': function(msg, context){
          console.log('evtHandler in checkbox  - something else', msg, context);
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
