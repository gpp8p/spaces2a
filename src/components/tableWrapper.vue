<template>
    <span class="myspaceWrapper">
      <o-table :data="data"
               :columns="columns"
               :selected.sync="selected"
               :paginated="isPaginated"
               :per-page="perPage"
               :current-page.sync="currentPage"
               :pagination-simple="isPaginationSimple"
               :pagination-position="paginationPosition"
               aria-next-label="Next page"
               aria-previous-label="Previous page"
               aria-page-label="Page"
               aria-current-label="Current page"
               @update:selected="spaceSelected"
               focusable> </o-table>
    </span>
</template>

<script>
import utils from '../components/utils.vue';


export default {
  name: "tableWrapper",
  props:{
    name:{
      type: String,
      required: true
    },
    config:{
      type: Object,
      required: true
    }
  },
  components: {},
  mixins: [utils],
  mounted(){
    debugger;
    this.data = this.config.data;
    this.perPage = this.config.perPage;
    this.columns = this.config.columns;
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
      isPaginated: true,
      isPaginationSimple: false,
      paginationPosition: 'bottom',
      defaultSortDirection: 'asc',
      sortIcon: 'arrow-up',
      sortIconSize: 'small',
      currentPage: 1,
      perPage: 0,
      nxtPage: 'Next Page',
      selected:'',
      columns:[],
      data:[]
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
    spaceSelected(msg){
      console.log('spaceSAelected', msg);
      this.$emit('cevt',['pageSelected', msg.id] );
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
@import "https://cdn.jsdelivr.net/npm/@mdi/font@6.5.95/css/materialdesignicons.min.css";
.myspaceWrapper {
  font-family: Arial;
  width: 100%;
  margin-right: 10%;
}
</style>

