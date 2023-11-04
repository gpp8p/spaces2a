<script>
export default {
  name: 'utils',
  methods: {
    handleEvt (msg) {
//      debugger;
//      console.log('handleEvt', msg);
      if (typeof (this.evtOpt) !== 'undefined') {
        this.evtOpt(msg)
      } else {
        this.$emit('cevt', msg);
      }
    },
    getCardStyling(mCss){
      console.log('getCardStyling-',mCss);
      var styleArray = mCss.split(';');
      console.log('styleArray-', styleArray);
      var styleValues= {}
      for(var s = 1;s<styleArray.length;s++){
        var thisStyleElement = styleArray[s].split(':');
        debugger;
        //          console.log('thisStyleElement-', thisStyleElement);
        if(thisStyleElement[0]=='background-image'){
          styleValues[thisStyleElement[0]]=thisStyleElement[1]+':'+thisStyleElement[2]+':'+thisStyleElement[3]
        }else{
          styleValues[thisStyleElement[0]]=thisStyleElement[1];
        }

      }
      console.log('styleValues-', styleValues);
      return styleValues;
    },
    getCardGridStyle(mCss){
      var styleArray = mCss.split(';');
      return styleArray[0];
    },
    substituteStyle(existingCss, styleName, newValue){
      debugger;
      var existingStyleValues = this.getCardStyling(existingCss);
      if(typeof(existingStyleValues[styleName])!='undefined'){
        existingStyleValues[styleName]=newValue;
      }
      var styleKeys = Object.keys(existingStyleValues);
      var newCss='';
      for(var s = 0;s<(styleKeys.length-1);s++){
        newCss = newCss+ styleKeys[s]+':'+existingStyleValues[styleKeys[s]]+';';
      }
      console.log(newCss);
      return newCss;

    }
  },
  data(){
    return {

    }
  },
  watch: {

  }
}
</script>
