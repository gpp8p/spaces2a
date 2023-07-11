<template>
  <span class="">
    <span v-if="this.labelLocation==this.LABEL_NOT">
         <select :size="this.selectSize" :multiple="multiple" @change="onChange($event, this.eventKey)" v-model="selectVal" :style="cmdObject.selectStyle" >
                  <option v-if="this.selectSize==0"  class="optionStyle">Please Select</option>
                  <v-option v-for="(thisOption, index) in cmdObject.options"
                            :key="index"
                            :cmdObject = thisOption
                            :cmdObjectVersion = thisCmdObjectVersion
                            :name = thisOption.val
                            class="optionStyle"
                  ></v-option>
            </select>
    </span>
    <span v-if="this.labelLocation==this.LABEL_VERTICAL" class="fselectVertical">
        <span>
          {{this.labelValue}}
        </span>
        <span>
         <select :size="this.selectSize" :multiple="multiple" @change="onChange($event, this.eventKey)" v-model="selectVal" :style="cmdObject.selectStyle" >
                  <option v-if="this.selectSize==0"  class="optionStyle">Please Select</option>
                  <v-option v-for="(thisOption, index) in cmdObject.options"
                            :key="index"
                            :cmdObject = thisOption
                            :cmdObjectVersion = thisCmdObjectVersion
                            :name = thisOption.val
                            class="optionStyle"
                  ></v-option>
            </select>
        </span>
    </span>
    <span v-if="this.labelLocation==this.LABEL_HOROZONTAL" class="fselectHorozontal">
        <span>
          {{this.labelValue}}
        </span>
        <span>
         <select :size="this.selectSize" :multiple="multiple" @change="onChange($event, this.eventKey)" v-model="selectVal" :style="cmdObject.selectStyle" >
                  <option v-if="this.selectSize==0"  class="optionStyle">Please Select</option>
                  <v-option v-for="(thisOption, index) in cmdObject.options"
                            :key="index"
                            :cmdObject = thisOption
                            :cmdObjectVersion = thisCmdObjectVersion
                            :name = thisOption.val
                            class="optionStyle"
                  ></v-option>
            </select>
        </span>
    </span>

  </span>
</template>

<script>
import utils from '../components/utils.vue';
import vOption from "../components/option2.vue";
export default {
  name: "selectv2",
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
  components: {vOption},
  mixins: [utils],
  mounted(){
    console.log(this.name,' selectv2 is mounted-', this.cmdObject.options);
    this.selectVal = this.cmdObject.selectVal;
    this.eventKey = this.cmdObject.eventKey;
    if(typeof(this.cmdObject.labelLocation)!='undefined'){
      this.labelLocation = this.cmdObject.labelLocation;
    }
    if(typeof(this.cmdObject.labelValue)!='undefined'){
      this.labelValue = this.cmdObject.labelValue;
    }
    this.$emit('cevt', ['setCmdHandler', this.handleCmd, this.name]);
  },
  updated(){
    console.log(this.name,' selectv2 is updated-', this.cmdObject.options);
  },
  beforeDestroy() {
    this.$emit('cevt', ['removeCmdHandler', this.handleCmd, this.name]);
  },
  data(){
    return {
      cmdHandlers:{},
      leafComponent: false,
      selectVal:'',
      eventKey:'',
      LABEL_NOT:0,
      LABEL_VERTICAL:1,
      LABEL_HOROZONTAL:2,
      labelLocation:0,
      labelValue:''

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

.fselectVertical {
  display: grid;
  grid-template-rows: 50% 50%;
}
.fselectHorozontal{
  display:grid;
  margin-top: 3px;
  grid-template-columns: 20% 70%;
}
</style>
