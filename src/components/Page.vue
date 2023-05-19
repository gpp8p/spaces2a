<template>
  <span class="defaultClass">
    <eGrid v-if="this.mode==this.PAGE_EDIT"
        name ='eGrid'
        @cevt="handleEvt"
        :config="gridConfigs"
    ></eGrid>
  </span>
</template>

<script>
import utils from '../components/utils.vue';
import eGrid from "../components/eGrid.vue"

export default {
  name: "Page",
  props:{
    name:{
      type: String,
      required: true
    }
  },
  components: {eGrid},
  mixins: [utils],
  mounted(){
    console.log(this.name,' is mounted');
    this.$emit('cevt', ['setCmdHandler', this.handleCmd, this.name]);
    this.$emit('cevt',['getPageConfiguration']);
  },
  beforeDestroy() {
    this.$emit('cevt', ['removeCmdHandler', this.handleCmd, this.name]);
  },
  data(){
    return {
      cmdHandlers:{},
      leafComponent: false,
      gridRows:0,
      gridColumns:0,
//      gridParameters:{},
      pageConfigs:{},
      gridCss:'',
      gridConfigs:{},
      mode:0,
      PAGE_DISPLAY:1,
      PAGE_EDIT:2,
      mouseStatus:0,
      MOUSE_NOT_CLICKED:0,
      MOUSE_DOWN: 1,
      MOUSE_UP:2,
      MOUSE_CLICK_SELECT:3,
      dragStartX:0,
      dragStartY:0,
      dragEndX:0,
      dragEndY:0,

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
          'default': function(args, context){
            console.log('cmdHandler in Page - something else', args, context);
          },
          'setPageConfig':function(args, context){
            console.log('cmdHandler in Page - sewtPageConfig', args, context);
//            debugger;
            context.doSetPageConfig(args, context);
          }
        }
        if(typeof(cmdType)!='undefined'){
          try {
            (cmdType[args[0]](args, self));
          } catch (e) {
            console.log('unknown cmd -',args, this.name);
            var availableHandlers = Object.keys(this.cmdHandlers);
            console.log('available cmd handlers-',availableHandlers);

            if(availableHandlers.length>0){
              for(var a=0;a<availableHandlers.length;a++){
//                debugger;
                this.cmdHandlers[availableHandlers[a]]([args[0], args[1], args[2]]);
              }
            }
          }
        }
      }
    },
// put do cmds here
    doSetPageConfig(args, context){
      console.log('in doSetPageConfig', args, context);
      context.pageConfigs=args[1];
      context.createPage(context);

      this.mode=this.PAGE_EDIT;
 //     this.setupPageCss(args[1]);
    },

    createPage(context){
//      debugger;
      context.gridConfigs.gridCss = context.setupPageCss(context.pageConfigs);
      context.gridConfigs.pageCells = context.makeBlankPage(context.pageConfigs.pageHeight,
          context.pageConfigs.pageWidth,
          '#DBAA6E');
    },

    setupPageCss(configs){
      this.gridRows = configs.pageHeight;
      this.gridColumns = configs.pageWidth;
      var cellGapAmt=3;
      var cellGap = cellGapAmt+'px';
      let gapTotal = Number(this.gridColumns*cellGapAmt)+cellGapAmt;
      var cellHeight;
      if(typeof(configs.rowHeight)!=undefined){
        cellHeight = Number(configs.rowHeight);
      }else {
        cellHeight = Math.round(this.$store.getters.getContentHeight / this.gridRows);
      }
      let cellWidth = Math.round((this.$store.getters.getContentWidth-gapTotal)/this.gridColumns);
      var gridParameters = this.layoutGridParameters(this.gridRows, this.gridColumns, cellHeight, cellWidth);
      var gridCss;
      if(configs.pageBackground.backgroundType=='color'){
        gridCss = 'display:grid; '+'grid-gap:'+ cellGap+'; background-color: '+configs.pageBackground.colorSelect+'; ';
        gridCss = gridCss + gridParameters.rowGrid+gridParameters.columnGrid;
      }else{
        gridCss = this.backgroundImageCss(configs.backgroundImageUrl,
            this.$store.getters.getContentWidth,
            this.$store.getters.getContentHeight,
            gridParameters.rowGrid,
            gridParameters.columnGrid,
            configs.backgroundDisplay);
      }
      return gridCss;
    },
    backgroundImageCss(backgroundUrl, widthBackground, heightBackground, gridHeightCss, gridWidthCss, backgroundDisplay){
//      debugger;
      switch(backgroundDisplay){
        case 'crop':{
          var gridCss =
              "display: grid; grid-gap: 3px; background-image: url("+backgroundUrl+"); background-size:cover; background-repeat: no-repeat; background-position: center; height: 90vh; color: #ffcd90; " +
              gridHeightCss +
              ";" +
              gridWidthCss +
              ";";
          return gridCss
        }
        case 'existing':{
          gridCss =
              "display: grid; grid-gap: 3px; background-image: url("+backgroundUrl+"); background-size:contain; background-repeat: no-repeat; background-position: center; height: 90vh; color: #ffcd90; " +
              gridHeightCss +
              ";" +
              gridWidthCss +
              ";";
          return gridCss
        }
        case 'stretch':{
          gridCss =
              "display: grid; grid-gap: 3px; background-image: url("+backgroundUrl+"); background-size:"+widthBackground+heightBackground+"; background-repeat:no-repeat; background-position: center; height: 90vh; color: #ffcd90; " +
              gridHeightCss +
              ";" +
              gridWidthCss +
              ";";
          return gridCss
        }
        case 'repeat':{
          gridCss =
              "display: grid; grid-gap: 3px; background-image: url("+backgroundUrl+"); background-size:auto auto; background-repeat:repeat; background-position: center; height: 90vh; color: #ffcd90; " +
              gridHeightCss +
              ";" +
              gridWidthCss +
              ";";
          return gridCss
        }
        default:{
          gridCss =
              "display: grid; grid-gap: 3px; background-image: url("+backgroundUrl+"); background-size:cover; background-repeat: no-repeat; background-position: center; height: 90vh; color: #ffcd90; " +
              gridHeightCss +
              ";" +
              gridWidthCss +
              ";";
          return gridCss
        }
      }

    },
//event handler
    evtOpt(msg){
      console.log('evtOpt in Page', msg);
      this.evtHandler(msg, this);
    },
    evtHandler(msg, self){
      console.log('evtHandler in Page-', msg, self);
//      debugger;
      var evtType = {
        'setCmdHandler': function(msg, context){
          context.doSetCmdHandler(msg, context);
        },
        'removeCmdHandler': function(msg, context){
          context.doRemoveCmdHandler(msg, context);
        },
        'mouseEvt':function(msg, context){
          context.doMouseEvt(msg, context);
        },
  /*
        'getGridConfiguration': function(msg, context){
          context.doSetGridConfiguration(msg, context);
        },
  */
        'default': function(msg, context){
          console.log('evtHandler in Page  - something else', msg, context);
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
    doMouseEvt(msg, context){
      console.log('in Page doMouseEvt-', msg, context );
      switch(this.mouseStatus){
        case this.MOUSE_NOT_CLICKED:{
          if(msg[1]=='mouseDown'){
           this.mouseStatus = this.MOUSE_DOWN;
           this.dragStartX = msg[2][1];
           this.dragStartY = msg[2][0];
           console.log('dragStartX-',this. dragStartX);
           console.log('dragStartY-',this. dragStartY);
          }
          break;
        }
        case this.MOUSE_CLICK_SELECT:{
          break;
        }
        case this.MOUSE_DOWN:{
          if(msg[1]=='mouseUp'){
            this.dragEndX = msg[2][1];
            this.dragEndY = msg[2][0];
            this.mouseStatus=this.MOUSE_NOT_CLICKED;
          }
          break;
        }
      }
    },
 /*
    doSetGridConfiguration(msg, context){
      debugger;
      context.setupPageCss(context.pageConfigs);
      context.cmdHandlers['eGrid'](['setGridConfig', context.gridCss,'eGrid']);
    },

  */
    layoutGridParameters(height, width, cellHeight, cellWidth) {
//      debugger;
      var gridHeightCss="grid-template-rows: "
      var gridWidthCss="grid-template-columns: ";
      for (var x = 0; x < height; x++) {
        gridHeightCss = gridHeightCss+cellHeight + "px ";
      }
      for (x = 0; x < width; x++) {
        gridWidthCss = gridWidthCss + cellWidth + "px ";
      }
      var gridCssObject = {};
      gridCssObject.rowGrid = gridHeightCss+";";
      gridCssObject.columnGrid = gridWidthCss+";";
      return gridCssObject;

    },
    makeBlankPage(height, width, backgroundColor) {
//                debugger;
//      console.log('entering makeBlankPage-', height, width, backgroundColor);
      this.layoutGrid = [];
      var pageCells = [];
      var newCellId = 1;
      height++;
      width++;
      for (var h = 1; h < height; h++) {
//        var gridRow = [];
        for (var w = 1; w < width; w++) {
          var c = this.createBlankCellInstance(h, w, 1, 1, newCellId,backgroundColor);
          pageCells.push(c);
          newCellId++;
        }
      }
      return pageCells;
    },
    createBlankCellInstance(row, col, height, width, id, background){
//      console.log('createBlankCellInstance:'+row+' '+col+' '+height+' '+width+ ' '+id);
      var thisGridCss = this.computeGridCss(row, col, height, width);
      var thisCellStyle = thisGridCss+";"+"background-color:"+background+";color:#0000FF;";
//      debugger;
      var thisCellName = 'c'+id;
      var thisCellParams = {
        style: thisCellStyle,
        backgroundColor: background,
        gridCss: thisGridCss,
        name: thisCellName,
        color: '#0000FF'
      }

//      var thisCellParams = this.getCellParams(thisCellStyle, background, thisGridCss, '#0000FF');

      var thisInstance = {component: 'Cell', cell_position: [row,col,height,width], id:id, toDelete: false, cell_parameters: thisCellParams};
      return thisInstance;

    },
    computeGridCss(row, col, height, width){
//        debugger;
      var startRow = row;
      var startColumn = col;
      var endRow=0;
      var endCol=0;
      if(height==1){
        endRow = row;
      }else{
        endRow = row+height;
      }
      endCol=startColumn+width;
      var thisCss = "grid-area:"+startRow+"/"+startColumn+"/"+endRow+"/"+endCol;
      return thisCss;

    },



  }
}
</script>

<style scoped>
.defaultClass {
  font-family: Monaco;
  font-size: large;
  color: blue;
}
</style>

