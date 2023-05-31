
<script>
//import utils from '../components/utils.vue';
import axios from "axios";
import store from "@/store";
export default {
  name: "pageLoader",
  methods: {
    loadPage: function(layoutId, userId, orgId, mode) {
//      this.cardInstances = [];
//      this.displayGrid=true;
//      this.layoutId = layoutId;
//      this.cancelLayoutEdit();
//      console.log("reloading" + msg);
//     debugger;
      var apiPath = this.$store.getters.getApiBase;
      console.log('apiPath - ',apiPath);
      axios.get(apiPath+'api/shan/getLayout?XDEBUG_SESSION_START=19884', {
//      axios.get('http://localhost:8000/api/shan/getLayout?XDEBUG_SESSION_START=19884', {
        params:{
          orgId:orgId,
          userId:userId,
          layoutId:layoutId
        }
      }).then(response => {
        // JSON responses are automatically parsed.
        //                   debugger;
        console.log('getLayout-',response);
        console.log('getLayout content', response.data.cards);
        console.log('loaded layout-', layoutId);
        store.commit('setCurrentLayoutId', layoutId);
        console.log("stored layoutId-",this.$store.getters.getCurrentLayoutId);
//        store.commit('setCurrentLayoutDescription', response.data.layout.description);
//        store.commit('setCurrentLayoutLabel', response.data.layout.menu_label);
        /*
                this.gridParamDefinition = this.layoutGridParameters(
                    response.data.layout.height,
                    response.data.layout.width,
                    response.data.layout.backgroundColor,
                    response.data.layout.backgroundImageUrl,
                    response.data.layout.backgroundType,
                    response.data.layout.backgroundDisplay,
                );

         */
//        debugger;
//        this.gridCss = 'display:grid; '+'grid-gap:'+ this.cmdObject[this.name].cellGap+'; background-color: '+this.cmdObject[this.name].backgroundColor+'; ';
//        this.gridCss = this.gridCss + this.gridParameters.rowGrid+this.gridParameters.columnGrid;
        this.subCmdObject.allCards = response.data.cards;
        debugger;
        if(typeof(response.data.rowHeight)!='undefined'){
//        rowHeight already set from loaded page, so contentHeight is also pre-determined
          var pageContentHeight = response.data.rowHeight*response.data.layout.height
          this.gridParamDefinition = this.layoutGridParameters(response.data.layout.height, response.data.layout.width, pageContentHeight);
          console.log('gridParamDefinition-', this.gridParamDefinition);
          this.gridCss = this.backgroundImageCss(response.data.layout.backgroundImageUrl,
              this.$store.getters.getContentWidth,
              pageContentHeight,
              this.gridParamDefinition.rowGrid,
              this.gridParamDefinition.columnGrid,
              response.data.layout.backgroundDisplay);
          var cardDisplayParams = {
            rowHeight: (response.data.rowHeight),
            viewMode: mode
          }
          this.subCmdObject.allCards = this.updateCardDisplayParams(this.subCmdObject.allCards,cardDisplayParams);
        }else{
//          this.gridParamDefinition = this.layoutGridParameters(response.data.layout.height, response.data.layout.width, this.$store.getters.getContentHeight);
//         debugger;
          let gapTotal = Number(response.data.layout.width*3)+3;
          let vgapTotal = Number(response.data.layout.height*3)+3;
          let rawScreenWidth = this.$store.getters.getContentWidth-gapTotal;
          let cellHeight = Math.round((this.$store.getters.getContentHeight-vgapTotal)/response.data.layout.height);
//          let cellHeight_a = Math.round(context.cmdObject.height/response.data.layout.height);
          let cellWidth = Math.round((this.$store.getters.getContentWidth-gapTotal)/response.data.layout.width);
//          let cellWidth_a = Math.round((context.cmdObject.width-gapTotal)/response.data.layout.width)

//          console.log("cellWidth-", cellWidth, cellWidth_a);
//          console.log("celllHeight-", cellHeight, cellHeight_a);
          this.gridCols=response.data.layout.width;
          this.gridRows=response.data.layout.height;
          this.gridParamDefinition=this.layoutGridParameters(response.data.layout.height, response.data.layout.width, cellHeight, cellWidth);
          if(response.data.layout.backgroundType=='C'){
            this.gridCss = this.colorBackgroundCss(this.gridParamDefinition.rowGrid, this.gridParamDefinition.columnGrid, response.data.layout.backgroundColor, this.$store.getters.getContentHeight)
          }else{
            this.gridCss = this.backgroundImageCss(response.data.layout.backgroundImageUrl,
                this.$store.getters.getContentWidth,
                this.$store.getters.getContentHeight,
                this.gridParamDefinition.rowGrid,
                this.gridParamDefinition.columnGrid,
                response.data.layout.backgroundDisplay);
          }


          var cardDisplayParams = {
            rowHeight: (Math.round(this.$store.getters.getContentHeight/response.data.layout.height)),
            viewMode: mode
          }
          this.subCmdObject.allCards = this.updateCardDisplayParams(this.subCmdObject.allCards,cardDisplayParams);
          this.subCmdObject.gridCss=this.gridCss;
          if(mode==this.EDIT_VIEW){
            this.allCards = this.subCmdObject.allCards;
            this.blankPageCells = this.makeBlankPage(response.data.layout.height,  response.data.layout.width, '#DBAA6E');
            for(var c = 0; c<this.allCards.length; c++){
              var thisCard = this.allCards[c];
              console.log('card_position-',thisCard.card_position);
              debugger;
              var dimensions = {
                top: thisCard.card_position[this.CARD_TOP],
                left: thisCard.card_position[this.CARD_LEFT],
                bottom: (thisCard.card_position[this.CARD_BOTTOM]+thisCard.card_position[this.CARD_TOP]-1),
                right: (thisCard.card_position[this.CARD_RIGHT]+thisCard.card_position[this.CARD_LEFT]-1)
              }
              var cardSelectedArea = this.getSelectedArea(dimensions);
              var cardEditedCells =   this.splicePageCells(cardSelectedArea);
              this.blankPageCells=cardEditedCells;
            }

          }


        }
        this.LayoutPermissions = response.data.perms;
        if(this.canView(this.LayoutPermissions)){
          console.log('permissions Ok');
        }else{
          this.$router.push({
            name: 'errorPage',
            params: { errorMessage: 'You do not have permission to access that page' }
          });
        }
        store.commit('setPerms', response.data.perms);
        this.$emit('layoutChanged',[this.layoutId]);
        store.commit('setCurrentLayoutId', this.layoutId);
//                    this.$eventHub.$emit('layoutChanged');
        this.reloadCards+=1;
      }).catch(e => {
        console.log(e);
        this.errors.push(e);
      });
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

    canView(perms){
      if(this.$store.getters.getIsAdmin>0){
        return true;
      }else{
        if(perms.admin) return true;
        if(perms.author) return true;
        if(perms.view) return true;
      }


//                console.log(perms);
      return false;
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


  }
}
</script>

<style scoped>

</style>

