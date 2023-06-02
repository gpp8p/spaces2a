<template>
  <span class="defaultClass">
    <eGrid v-if="this.mode==this.MODE_EDIT"
        name ='eGrid'
        @cevt="handleEvt"
        :is-draggable=false
        :config="gridConfigs"
        :key="updateGrid"
    ></eGrid>
    <displayGrid v-if="this.mode==this.MODE_DISPLAY"
        name ='displayGrid'
        @cevt="handleEvt"
        :is-draggable=false
        :config="gridConfigs"
    ></displayGrid>
  </span>
</template>

<script>
import utils from '../components/utils.vue';
import eGrid from "../components/eGrid.vue"
import displayGrid from "../components/displayGrid"
import axios from "axios";
import store from "@/store";

export default {
  name: "Page",
  props:{
    name:{
      type: String,
      required: true
    },
    config:{
      type: Object,
      required: false
    }
  },
  components: {eGrid, displayGrid},
  mixins: [utils],
  mounted(){
//    console.log(this.name,' is mounted');
    this.$emit('cevt', ['setCmdHandler', this.handleCmd, this.name]);
//    this.$emit('cevt',['getPageConfiguration']);
    debugger;
    switch(this.config.action){
      case this.PAGE_EDIT:{
        this.pageConfigs=this.config;
        this.createPage(this);
        this.mode=this.MODE_EDIT;
        break;
      }
      case this.PAGE_LOAD_EDIT:{
/*
        console.log('Page is mounted - PAGE_DISPLAY', this.config);
        this.loadPage(this.config.pageId, this.$store.getters.getLoggedInUserId, this.$store.getters.getOrgId, this.PAGE_EDIT);
        this.mode=this.MODE_EDIT;
        this.updateGrid+=1;
*/
        this.loadPage(this.config.pageId, this.$store.getters.getLoggedInUserId, this.$store.getters.getOrgId, this.PAGE_EDIT, this);
/*
        var mockConfig = {
          pageDescription: "page description",
          pageHeight: this.lpHeight,
          pageName: "page name",
          pageWidth: "15",
          permissions: "open",
          rowHeight: "60",
          screenWidth: "100",
          pageBackground: {
            backgroundType: "color",
            colorSelect: "#0a3aff"
          }
        }
        this.pageConfigs=mockConfig;
        this.createPage(this);
        this.mode=this.MODE_EDIT;
          console.log(mockConfig);
*/
        break;
      }
    }

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
      PAGE_LOAD_EDIT:3,
      PAGE_LOAD_DISPLAY:4,
      MODE_EDIT:1,
      MODE_DISPLAY:2,
      mouseStatus:0,
      MOUSE_NOT_CLICKED:0,
      MOUSE_DOWN: 1,
      MOUSE_UP:2,
      MOUSE_CLICK_SELECT:3,
      CARD_TOP:0,
      CARD_LEFT:1,
      CARD_BOTTOM:2,
      CARD_RIGHT:3,
      dragStartX:0,
      dragStartY:0,
      dragEndX:0,
      dragEndY:0,
      straightLeft:1,
      upLeft:2,
      downLeft:3,
      straightRight:4,
      upRight:5,
      downRight:6,
      straightUp:7,
      straightDown:8,
      selectedColor: '#CCCCCC',
      unselectedColor: '#DBAA6E',
      prevX:0,
      prevY:0,
      selectedArea:{},
      updateGrid:0,
      cellIndex:{},
      dummy:{},
      debugOn:false,
      widthNow:0,
      allCards:[],
      lpHeight:0,
      lpWidth:0,
      lpRowHeight:0


    }
  },
  methods:{
//cmd handlers
    handleCmd(args){
//      console.log(this.name, ' handleCmd', args);
      this.cmdHandler(args, this);
    },
    cmdHandler(args, self){
      if(args[2]==this.name || this.leafComponent==false){
        var cmdType ={
          'default': function(args, context){
//            console.log('cmdHandler in Page - something else', args, context);
          },
          'setPageConfig':function(args, context){
//            console.log('cmdHandler in Page - sewtPageConfig', args, context);
//            debugger;
            context.doSetPageConfig(args, context);
          },
          'createNewCard':function(args, context){
//            console.log('createNewCard', args, context);
            context.doCreateNewCard(args, context);
          },
          'pageSelected': function(args, context){
            console.log('Page doPageSelected-', args, context);
          }
        }
        if(typeof(cmdType)!='undefined'){
          try {
            (cmdType[args[0]](args, self));
          } catch (e) {
//            console.log('unknown cmd -',args, this.name);
            var availableHandlers = Object.keys(this.cmdHandlers);
//            console.log('available cmd handlers-',availableHandlers);

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
 //     console.log('in doSetPageConfig', args, context);
      context.pageConfigs=args[1];
      context.createPage(context);

      this.mode=this.PAGE_EDIT;
 //     this.setupPageCss(args[1]);
    },

    createPage(context){
      debugger;
      console.log('createPage-',context.pageConfigs);
      context.gridConfigs.gridCss = context.setupPageCss(context.pageConfigs);
      context.gridConfigs.pageCells = context.makeBlankPage(context.pageConfigs.pageHeight,
          context.pageConfigs.pageWidth,
          '#DBAA6E');
    },

    loadPage: function(layoutId, userId, orgId, mode, context) {

      var apiPath = this.$store.getters.getApiBase;
      console.log('apiPath - ',apiPath);
      axios.get(apiPath+'api/shan/getLayout?XDEBUG_SESSION_START=19884', {
        params:{
          orgId:orgId,
          userId:userId,
          layoutId:layoutId
        }
      }).then(response => {
        console.log('getLayout-',response);
        console.log('getLayout content', response.data.cards);
        console.log('loaded layout-', layoutId);
        context.lpHeight = response.data.layout.height;
        context.lpWidth = response.data.layout.width;
        let vgapTotal = Number(response.data.layout.height*3)+3;
        context.lpRowHeight = Math.round((this.$store.getters.getContentHeight-vgapTotal)/response.data.layout.height);
        var loadedPageConfig = {
          pageDescription: "page description",
          pageHeight: context.lpHeight,
          pageName: "page name",
          pageWidth: context.lpWidth,
          rowHeight: context.lpRowHeight,
          screenWidth: "100",
          pageBackground: {
            backgroundType: "color",
            colorSelect: "#0a3aff"
          }
        }
        context.pageConfigs=loadedPageConfig;
        context.createPage(context);

        console.log('new page cells-', context.gridConfigs.pageCells);
        console.log('new page cards-', response.data.cards);
        for(var c = 0;c<response.data.cards.length;c++){
          var thisCardDimensions = response.data.cards[c].card_position;
          console.log('cardDimensions-', thisCardDimensions);
          var cardSelectedArea = {
            bottomRightX: response.data.cards[c].card_position[3],
            bottomRightY: response.data.cards[c].card_position[2],
            topLeftX: response.data.cards[c].card_position[1],
            topLeftY: response.data.cards[c].card_position[0],
          }
          console.log('cardSelectedArea-',cardSelectedArea);
          context.gridConfigs.pageCells = context.updateBlankPage(context.pageConfigs.pageHeight,
              context.pageConfigs.pageWidth,
              '#DBAA6E',
              cardSelectedArea,
              context.gridConfigs.pageCells );
          context.mode=this.MODE_EDIT;
        }
      }).catch(e => {
        console.log(e);
        this.errors.push(e);
      });
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

    colorBackgroundCss(rowCss, columnCss, backgroundColor, heightInPixels){
//      debugger;
      let gridCss =
          "display: grid; grid-gap: 3px; background-color: "+backgroundColor+"; height:"+heightInPixels+"px; color: #ffcd90; " +
          rowCss + columnCss

      return gridCss
    },
    updateCardDisplayParams(cards, displayParams){
//      debugger;
      for(var c=0;c<cards.length;c++){
        var thisCard = cards[c];
        cards[c].displayParams = displayParams;
        console.log('card-',thisCard);
      }
      return cards;
    },

    canView(perms) {
      if (this.$store.getters.getIsAdmin > 0) {
        return true;
      } else {
        if (perms.admin) return true;
        if (perms.author) return true;
        if (perms.view) return true;
      }
    },


//event handler
    evtOpt(msg){
//      console.log('evtOpt in Page', msg);
      this.evtHandler(msg, this);
    },
    evtHandler(msg, self){
//      console.log('evtHandler in Page-', msg, self);
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
//          console.log('evtHandler in Page  - something else', msg, context);
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
//      console.log('doSetCmdHandler-',msg, context);
      context.cmdHandlers[msg[2]]=msg[1];
//      console.log('cellIndex entry-', msg[3],'-', msg[2]);
      this.cellIndex[msg[3]]=msg[2];
    },
    doRemoveCmdHandler(msg, context){
//      console.log('doRemoveCmdHandler-',msg, context);
      delete(this.cmdHandlers[msg[2]]);
    },
    doCreateNewCard(msg, context){
      console.log('doCreateNewCard-',context.selectedArea, msg);
//      debugger;
      context.cmdHandlers={};
      context.gridConfigs.pageCells = context.updateBlankPage(context.pageConfigs.pageHeight,
          context.pageConfigs.pageWidth,
          '#DBAA6E',
          context.selectedArea,
          context.gridConfigs.pageCells
      );
      var thisCard = this.createBlankCardInstance(context.selectedArea.topLeftY,
          context.selectedArea.topLeftX,
          (context.selectedArea.bottomRightY),
          (context.selectedArea.bottomRightX),
          msg[1].cardName,
          msg[1].cardBackground, 'headlineCard');
      this.allCards.push(thisCard);
      context.gridConfigs.allCards=this.allCards;

      context.updateGrid+=1;
      this.debugOn=true;
//      console.log('after egrid reload-',context.cmdHandlers, context.cellIndex);
//      debugger;
    },

    doMouseEvt(msg, context){
      if(this.debugOn==true&&this.mouseStatus==this.MOUSE_DOWN&&msg[1]=='mouseOver'){
//        console.log('debugOn mouse event 1-', msg);
      }
//      console.log('in Page doMouseEvt-', msg, context );
      this.dummy = context;
      switch(this.mouseStatus){
        case this.MOUSE_NOT_CLICKED:{
          if(msg[1]=='mouseDown'){
           this.mouseStatus = this.MOUSE_DOWN;
           this.dragStartX = msg[2][1];
           this.dragStartY = msg[2][0];
 //          console.log('mouseOver-',msg[2][1],msg[2][0]);
//           console.log('dragStartX-',this. dragStartX);
//           console.log('dragStartY-',this. dragStartY);
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
//            console.log('mouseUp-', this.dragEndX, this.dragEndY);
//            console.log('dragDirection-', this.dragDirection(this.dragEndX, this.dragEndY, this.dragStartX, this.dragStartY));
            try {
              this.fillCellsInArea(this.dragEndX, this.dragEndY, this.dragStartX, this.dragStartY);
            } catch (e) {
//              debugger;
//              console.log('error 1', e);
//              console.log('error in fillCells',this.dragEndX, this.dragEndY, this.dragStartX, this.dragStartY);
            }
//            debugger;
            var dragStartHandler = this.findHandler(this.dragStartX, this.dragStartY);
            var dragEndHandler = this.findHandler(this.dragEndX, this.dragEndY);
            dragStartHandler(['setCell', this.selectedColor, 'blue']);
            dragEndHandler(['setCell', this.selectedColor, 'blue']);
//            this.findHandler(this.dragStartX, this.dragStartY)(['setCell', '#DBAA6E','blue']);
//            this.findHandler(this.dragEndX, this.dragEndY)(['setCell', '#DBAA6E','blue']);
            this.selectedArea = this.normalizeSelectedArea(this.dragEndX, this.dragEndY, this.dragStartX, this.dragStartY)
            this.mouseStatus=this.MOUSE_NOT_CLICKED;
//            debugger;
            this.cardAreaSet();
          }else if(msg[1]=='mouseOver'){
            if(this.debugOn==true){
//              console.log('debugOn mouse event 2-', msg);
            }
            try {
              var mouseOverCell = this.cellAddress(msg[2][1], msg[2][0]);
              console.log('mouseOverCell a-', mouseOverCell, msg);
              if (this.prevX != 0 && this.prevY != 0) {
                try {
                  this.fillCellsInArea(this.prevX, this.prevY, this.dragStartX, this.dragStartY, this.unselectedColor);
                } catch (e) {
                    console.log(e.stack);
 //                 debugger;
//                  console.log('error 2', e);
//                  console.log('error in fillCells',this.dragEndX, this.dragEndY, this.dragStartX, this.dragStartY)
                }
              }
              this.prevX = msg[2][1];
              this.prevY = msg[2][0];
//            console.log('mouseOver- (x-y)', msg[2][1], msg[2][0], 'to', this. dragStartX, this. dragStartY);
//              console.log('mouseOverCell b-', mouseOverCell, msg);
              try {
                this.fillCellsInArea(msg[2][1], msg[2][0], this.dragStartX, this.dragStartY, this.selectedColor);
              } catch (e) {
//                console.log('error 3', e);
//                console.log('error in fillCells',this.dragEndX, this.dragEndY, this.dragStartX, this.dragStartY)
              }
            } catch (e) {
//              console.log('error in mopuseOver-', e, mouseOverCell);
              debugger;
            }
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
    cardAreaSet(){
//      console.log('inCardAreaSet-');
      var cardSelectParams = ['selectCardType'];
      this.$emit('cevt', cardSelectParams);
    },
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
//          debugger;
//          console.log('newCellAddress-', this.cellAddress(w,h));
//          var cellAddr= this.cellAddress(w,h);
          var c = this.createBlankCellInstance(h, w, 1, 1, newCellId,backgroundColor);
//          this.cellIndex[cellAddr]=c.cell_parameters.name;
          pageCells.push(c);
          newCellId++;
        }
      }
      return pageCells;
    },
    cellAddress(x,y){
//     debugger;
      var zeros='000000';
      var addrX = x.toString();
      var addrY = y.toString();
      addrX = zeros+addrX;
      addrY = zeros+addrY;
      var newAddr = addrX.slice(-4)+addrY.slice(-4);
      return newAddr;
    },
    updateBlankPage(height, width, backgroundColor, selectedArea, existingPageCells){
      var pageCells = [];
      console.log('inUpdateBlankPage-', existingPageCells);
      height++;
      width++;
      debugger;
      for ( var c = 0; c< existingPageCells.length; c++){
        var cellPositionY =  existingPageCells[c].cell_position[0];
        var cellPositionX =  existingPageCells[c].cell_position[1];
        var thisCell= existingPageCells[c];
//        console.log('cell in selected area-', this.isCellInSelectedArea(cellPositionX, cellPositionY, selectedArea));
//        console.log('cell position-', cellPositionX, cellPositionY);
        if(this.isCellInSelectedArea(cellPositionX, cellPositionY, selectedArea)==false){
          pageCells.push(thisCell);
        }
      }

      return pageCells;
    },
/*
    updateBlankPage(height, width, backgroundColor, selectedArea, existingPageCells){
      this.layoutGrid = [];
      var pageCells = [];
      var newCellId = 1;
      this.cellIndex={};
      console.log('inUpdateBlankPage-', existingPageCells);
      height++;
      width++;
      debugger;
      for (var y = 1; y < height; y++) {
//        var gridRow = [];
        for (var x = 1; x < width; x++) {
          if(this.isCellInSelectedArea(x,y,selectedArea)==false){
//            var cellAddr= this.cellAddress(x,y);
            var c = this.createBlankCellInstance(y, x, 1, 1, newCellId,backgroundColor);
//            this.cellIndex[cellAddr]=c.cell_parameters.name;
            pageCells.push(c);
            newCellId++;
          }
        }
      }
      return pageCells;
    },
    */
    isCellInSelectedArea(x,y,selectedArea){
      if(y>=selectedArea.topLeftY&&y<=selectedArea.bottomRightY){
        if(x>=selectedArea.topLeftX&&x<=selectedArea.bottomRightX){
          return true;
        }else{
          return false;
        }
      }else{
        return false;
      }
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
    createBlankCardInstance(row, col, height, width, id, background, type){
      var thisGridCss = this.computeGridCss(row, col, height, width);
      var thisCardStyle = thisGridCss+";"+"background-color:"+background+";color:#0000FF;";
//      debugger;
      var thisCardName = 'card'+id;
      var thisCardParams = {
        style: thisCardStyle,
        backgroundColor: background,
        gridCss: thisGridCss,
        name: thisCardName,
        color: '#0000FF',
        type: type
      }
      var thisInstance = {component: type, cell_position: [row,col,height,width], id:id, toDelete: false, cell_parameters: thisCardParams};
      console.log('new card details-', thisInstance);
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
        endRow = height+1;
      }
      if(width==1){
        endCol=startColumn+width;
      }else{
        endCol = width+1;
      }
      var thisCss = "grid-area:"+startRow+"/"+startColumn+"/"+endRow+"/"+endCol;
      return thisCss;

    },
    dragDirection(dragX, dragY, topLeftX, topLeftY){
      var dragDirection;
      if(dragX < topLeftX){
        if(dragY == topLeftY){
          dragDirection = this.straightLeft;
        }else if(dragY < topLeftY){
          dragDirection = this.upLeft;
        }else{
          dragDirection = this.downLeft;
        }
      }else if(dragX>topLeftX){
        if(dragY == topLeftY){
          dragDirection = this.straightRight;
        }else if(dragY < topLeftY){
          dragDirection = this.upRight;
        }else{
          dragDirection = this.downRight;
        }
      }else if(dragX==topLeftX){
        if(dragY < topLeftY){
          dragDirection = this.straightUp;
        }else{
          dragDirection=this.straightDown;
        }
      }
      return dragDirection;
    },
    normalizeSelectedArea(dragX, dragY, topLeftX, topLeftY){
//      debugger;
      // eslint-disable-next-line no-unused-vars
      var thisDragDirection = this.dragDirection(dragX, dragY, topLeftX, topLeftY);
      // eslint-disable-next-line no-undef,no-unused-vars
      var selTopLeftX;
      // eslint-disable-next-line no-unused-vars
      var selTopLeftY;
      // eslint-disable-next-line no-unused-vars
      var selBottomRightX;
      // eslint-disable-next-line no-unused-vars
      var selBottomRightY;
      // eslint-disable-next-line no-undef
      switch(thisDragDirection){
        case this.straightLeft:{
          selTopLeftX=dragX;
          selTopLeftY=dragY;
          selBottomRightX=topLeftX;
          selBottomRightY=dragY;
          break;
        }
        case this.upLeft:{
          selTopLeftX=dragX;
          selTopLeftY=dragY;
          selBottomRightX=topLeftX;
          selBottomRightY=topLeftY;
          break;
        }
        case this.downLeft:{
          selTopLeftX=dragX;
          selTopLeftY=topLeftY;
          selBottomRightX=topLeftX;
          selBottomRightY=dragY;
          break;
        }
        case this.straightRight:{
          selTopLeftX=topLeftX;
          selTopLeftY=dragY;
          selBottomRightX=dragX;
          selBottomRightY=dragY;
          break;
        }
        case this.upRight:{
          selTopLeftX=topLeftX;
          selTopLeftY=dragY;
          selBottomRightX=dragX;
          selBottomRightY=topLeftY;
          break;
        }
        case this.downRight:{
          selTopLeftX=topLeftX;
          selTopLeftY=topLeftY;
          selBottomRightX=dragX;
          selBottomRightY=dragY;
          break;
        }
        case this.straightUp:{
          selTopLeftX=dragX;
          selTopLeftY=dragY;
          selBottomRightX=dragX;
          selBottomRightY=topLeftY;
          break;
        }
        case this.straightDown:{
          selTopLeftX=dragX;
          selTopLeftY=topLeftY;
          selBottomRightX=dragX;
          selBottomRightY=dragY;

          break;
        }
      }
//      console.log('x1-',selTopLeftX, 'y1-', selTopLeftY, 'x2-', selBottomRightX, 'y2-', selBottomRightY);
      return {
        topLeftX:selTopLeftX,
        topLeftY:selTopLeftY,
        bottomRightX:selBottomRightX,
        bottomRightY:selBottomRightY
      }
    },
    fillCellsInArea(dragX, dragY, topLeftX, topLeftY, fillColor){
      // eslint-disable-next-line no-unused-vars
      console.log('in fillCellsInArea',dragX, dragY, topLeftX, topLeftY, fillColor);
//      var widthNow;
      var thisDragDirectiion = this.dragDirection(dragX, dragY, topLeftX, topLeftY);
      console.log('dragDirection-',thisDragDirectiion);

      var row;
      var col;
      var cellHandler;

      switch(thisDragDirectiion){
        case this.upLeft:{
          this.widthNow = topLeftX - dragX;
          for (row = (topLeftY - 1); row >= (dragY-1); row--) {
            //console.log('row=', row);
            for (col = dragX-1; (col<(topLeftX));  col++) {
              cellHandler = this.findHandler(col+1, row+1);
              cellHandler(['setCell', fillColor, 'blue']);
            }
          }
          break;
        }
        case this.straightLeft:{
          row = dragY-1;
//          debugger;
          for (col = (topLeftX - 1); col > dragX-1 ; col--){
            cellHandler = this.findHandler(col+1, row+1);
            cellHandler(['setCell', fillColor, 'blue']);
          }
          break;
        }

        case this.downLeft:{
          this.widthNow = topLeftX - dragX;
          for (row = (topLeftY - 1); row < dragY; row++) {
            for (col = dragX-1; (col<(topLeftX));  col++) {
              cellHandler = this.findHandler(col+1, row+1);
              cellHandler(['setCell', fillColor, 'blue']);
            }
          }
          break;
        }
        case this.straightRight:{
          row = dragY-1;

          for (col = (topLeftX - 1); col < dragX; col++) {
            cellHandler = this.findHandler(col+1, row+1);
            cellHandler(['setCell', fillColor, 'blue']);
          }
          break;
        }
        case this.upRight:{
          for (row = (topLeftY - 1); row >= (dragY-1); row--) {
            for (col = (topLeftX - 1); col < dragX; col++) {
              cellHandler = this.findHandler(col+1, row+1);
              cellHandler(['setCell', fillColor, 'blue']);
            }
          }
          break;
        }
        case this.downRight:{
          this.widthNow = dragX-topLeftX;
          for (row = (topLeftY - 1); row < dragY; row++) {
            for (col = (topLeftX - 1); col < dragX; col++) {
              cellHandler = this.findHandler(col+1, row+1);
              cellHandler(['setCell', fillColor, 'blue']);
            }
          }
          break;
        }
        case this.straightUp:{
          col = dragX -1;
          for (row = dragY-1; row< topLeftY; row++){
            cellHandler = this.findHandler(col+1, row+1);
            cellHandler(['setCell', fillColor, 'blue']);
          }
          break;
        }
        case this.straightDown:{
          col = dragX -1;
          for (row = (topLeftY -1); row< dragY-1; row++){
            cellHandler = this.findHandler(col+1, row+1);
            cellHandler(['setCell', fillColor, 'blue']);
          }
          break;
        }
      }
    },

/*
    findHandler(cellX, cellY){
      var startY = (this.gridColumns*(cellY-1));
      var selectedCellAt = startY+(cellX-1);
      var cell = this.gridConfigs.pageCells[selectedCellAt];
      var cellName = cell.cell_parameters.name;
      console.log('selectedCell-', cell, cellName);
      return this.cmdHandlers[cellName];
    }
*/
    findHandler(cellX, cellY){
      var thisCellAddress = this.cellAddress(cellX, cellY);
      var cellName = this.cellIndex[thisCellAddress];
//      console.log('in Page - findHandler-',cellX, cellY, thisCellAddress, cellName);
      return this.cmdHandlers[cellName];
    }


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

