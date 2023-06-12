<template>
  <o-dropdown aria-role="list" @change="ddChanged" >
    <template #trigger="{ active }">
      <div :style="itemStyle">
        {{thisItem.label}}
        <o-icon
            variant="success"
            icon="menu-down"
            slot="trigger"
            role="button"
        >
        </o-icon>
      </div>
    </template>

    <o-dropdown-item v-for="(item, index) in thisItem.submenu.items"
                     :key="index"
                     @click="ddClicked(item.action)" class="ddClass">
      <span>{{item.label}}</span>

    </o-dropdown-item>


  </o-dropdown>
</template>

<script>
import utils from '../components/utils.vue';

export default {
  name: "dropDownMenuItem",
  props:{
    name:{
      type: String,
      required: true
    },
    thisItem: {
      type: Object,
      required: false
    },
    itemConfig: {
      type: Object,
      required: true
    }
  },
  components: {},
  mixins: [utils],
  mounted(){
    this.itemStyle =  this.itemConfig.style;
    this.itemLabel = this.thisItem.label;
    this.itemValue = this.thisItem.action;
    this.itemType = this.thisITem.type;
    console.log('itemStyle =',this.itemStyle);
    console.log(this.name,' is mounted');
    this.$emit('cevt', ['setCmdHandler', this.handleCmd, this.name]);
  },
  beforeDestroy() {
    this.$emit('cevt', ['removeCmdHandler', this.handleCmd, this.name]);
  },
  data(){
    return {
      cmdHandlers:{},
      leafComponent: false,
      itemType:0,
      itemStyle:'',
      itemLabel:'',
      itemValue:''
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
    ddClicked(m){
      console.log('dd was clicked!', m);
      this.$emit('cevt',['menuItemSelected',m, this.name]);
    },
    ddChanged(m){
      console.log('dd changed-', m);
    }



  }
}
</script>

<style scoped>

.dd1 {
  background-color: #0a3aff;
}

.ddClass {
  font-family: Helvetica;
  font-size: 16px;
  background-color: #ffcd90;
}

@import "https://cdn.jsdelivr.net/npm/@mdi/font@6.5.95/css/materialdesignicons.min.css";
</style>

