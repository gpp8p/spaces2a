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
//          console.log('thisStyleElement-', thisStyleElement);
        styleValues[thisStyleElement[0]]=thisStyleElement[1];
      }
      console.log('styleValues-', styleValues);
      return styleValues;
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
