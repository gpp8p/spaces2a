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
//        debugger;
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

    },
  removeElementByIndex(array, indexToRemove) {
  if (indexToRemove < 0 || indexToRemove >= array.length) {
    // Check if the index is out of bounds
    console.out("Index out of bounds");
    return array; // Return the original array
  }

  // Use the splice() method to remove the element at the specified index
  array.splice(indexToRemove, 1);

  return array;
  },

  insertObjectBeforeIndex(array, indexToInsertBefore, objectToInsert) {
      if (indexToInsertBefore < 0 || indexToInsertBefore > array.length) {
        // Check if the index is out of bounds
        console.out("Index out of bounds");
        return array; // Return the original array
      }

      // Use the splice() method to insert the object at the specified index
      array.splice(indexToInsertBefore, 0, objectToInsert);

      return array;
  },

  insertObjectAfterIndex(array, indexToInsertAfter, objectToInsert) {
      if (indexToInsertAfter < -1 || indexToInsertAfter >= array.length - 1) {
        // Check if the index is out of bounds
        console.out("Index out of bounds");
        return array; // Return the original array
      }

      // Calculate the index to insert after, accounting for -1 (to insert at the beginning)
      const insertIndex = indexToInsertAfter + 1;

      // Use the splice() method to insert the object at the specified index
      array.splice(insertIndex, 0, objectToInsert);

      return array;
    },

  shiftObjectTowardsBeginning(array, indexToShift) {
      if (indexToShift < 0 || indexToShift >= array.length) {
        // Check if the index is out of bounds
        console.out("Index out of bounds");
        return array; // Return the original array
      }

      if (indexToShift === 0) {
        // If the object is already at the beginning, no need to shift
        return array;
      }

      // Remove the object at the specified index
      const objectToShift = array.splice(indexToShift, 1)[0];

      // Insert the object one position towards the beginning
      array.splice(indexToShift - 1, 0, objectToShift);

      return array;
    },

  shiftObjectTowardsEnd(array, indexToShift) {
      if (indexToShift < 0 || indexToShift >= array.length) {
        // Check if the index is out of bounds
        console.out("Index out of bounds");
        return array; // Return the original array
      }

      if (indexToShift === array.length - 1) {
        // If the object is already at the end, no need to shift
        return array;
      }

      // Remove the object at the specified index
      const objectToShift = array.splice(indexToShift, 1)[0];

      // Insert the object one position towards the end
      array.splice(indexToShift + 1, 0, objectToShift);

      return array;
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
