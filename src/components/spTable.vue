<template>
  <span>
    <table class="styled-table">
      <thead class="headerClass">
        <tr>
          <th :style="thisColumn.columnStyle" v-for="(thisColumn, index) in this.styledColumns"
              :key="index"
          >
            <span  v-if="thisColumn.visible">{{thisColumn.label}}</span>
          </th>
        </tr>
      </thead>
      <tbody>
       <tr v-for="(row, rowIndex) in this.styledData" :key="rowIndex" @click="rowSelected(rowIndex)">
          <td v-for="(cell, cellIndex) in row" :key="cellIndex">
            {{ cell }}
          </td>
        </tr>
      </tbody>
    </table>
  </span>
</template>

<script>
import utils from '../components/utils.vue';

export default {
  name: "sptable",
  props:{
    data :{
      type: Array,
      required: true
    },
    columns: {
      type: Array,
      required: true
    },
    bordered:{
      type: String,
      required: true
    },
    paginated: {
      type: Boolean,
      required: true
    },
    perPage:{
      type: Number,
      required: true
    }

  },

  components: {},
  mixins: [utils],
  mounted(){
    console.log('spTable is mounted-', this.data, this.columns, this.bordered, this.paginated, this.perPage);
    debugger;
    this.$emit('cevt', ['setCmdHandler', this.handleCmd, this.name]);
    console.log('sptable columns', this.columns);
    for(var c=0;c<this.columns.length;c++){
      var columnIsNumeric = false;
      if(typeof(this.columns[c].numeric)!='undefined'){
        columnIsNumeric=this.columns[c].numeric
      }
      var columnStyle = "width:"+this.columns[c].width+";";
      var columnVisible=true;
      if(typeof(this.columns[c].visible)!='undefined'){
        columnVisible=this.columns[c].visible;
      }
      var thisStyledColumn = {
        label: this.columns[c].label,
        field: this.columns[c].field,
        numeric: columnIsNumeric,
        columnStyle:columnStyle,
        visible:columnVisible
      }
      console.log('thisStyledColumns-', thisStyledColumn);
      if(columnVisible){
        this.styledColumns.push(thisStyledColumn);
      }
    }
    for(var d=0; d<this.data.length;d++){
      var styledRow=[];
      var thisRow = this.data[d];
      for(var s=0;s<this.styledColumns.length;s++){
        if(this.styledColumns[s].visible){
          styledRow.push(thisRow[this.styledColumns[s].field]);
        }
      }
      this.styledData.push(styledRow);
    }


  },
  beforeDestroy() {
    this.$emit('cevt', ['removeCmdHandler', this.handleCmd, this.name]);
  },
  data(){
    return {
      cmdHandlers:{},
      leafComponent: false,
      styledColumns:[],
      styledData:[],
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
    rowSelected(msg){
      debugger;
      console.log("rowSelected-", this.data[msg]);
      this.$emit('selected', this.data[msg]);
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
    doMenuItemSelected(msg, context){
      console.log('headlineCard doMenuItemSelected-', msg, context);
      debugger;
      if(msg.length>3){
        msg[3](this);
      }else{
        switch(msg[2]){
          default:{
            this.$emit('cevt', msg);
          }
        }
      }
    },


  }
}
</script>

<style scoped>
.styled-table {
  border: 2px;
  font-size: 0.9em;
  font-family: sans-serif;
  width: 100%;

}
.styled-table thead tr {
  background-color: #0a3ae7;
  color: #ffffff;
  text-align: left;
}
.styled-table th,
.styled-table td {
  padding-top:15px;
  text-align: left;
}
.styled-table tr:hover {
  background-color: #4AAE9B;
}


.styled-table tbody tr {
  border-bottom: 1px solid #dddddd;
}



.styled-table tbody tr:last-of-type {
  border-bottom: 2px solid #009879;
}
.styled-table tbody tr.active-row {
  font-weight: bold;
  color: #009879;
}

</style>
