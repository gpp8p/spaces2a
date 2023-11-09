<script>
export default {
name: "componentLoaders",
  methods:{
    getComponentLoaders(){
      return {
        background: function(dataToLoad){
          debugger;

          console.log('componentLoader for background', dataToLoad);
          var styleElements = dataToLoad;
          debugger;
          console.log('entering loader for bg picker-', styleElements);
//          var thisComponentLoader = componentLoaders.background;
//          thisComponentLoader();
//                    console.log('componentLoader invoked-', componentLoaders.background());
//                    console.log(loadExistingBackground(styleElements));
          var bgType='';
          var clrSel=styleElements['background-color'];
          if(clrSel=='transparent'){
            return {
              colorSelect: 'transparent',
              backgroundType:'transparent',
              url: '',
              backgroundDisplay:''
            }
          }
          var urlSpec='';
          var bgDisplay='';
          if(typeof(styleElements['backgroundTypeColor'])!='undefined'){
            bgType = 'color';
          }else if(typeof(styleElements['backgroundTypeImage'])!='undefined'){
            bgType='image';
            urlSpec = styleElements['background-image'];
            var bgDisp = styleElements['background-size'];
            if(bgDisp=="100% 100%"){
              bgDisplay='cover';
            }else{
              bgDisplay = bgDisp;
            }
            var bgRepeat=styleElements['background-repeat'];
            if(bgRepeat=='repeat'){
              bgDisplay='repeat';
            }
            //                     bgDisplay = styleElements['background-size'];
            clrSel = '';

          }else{
            bgType='transparent';
            clrSel='transparent'
          }
          var rval = {
            colorSelect: clrSel,
            backgroundType:bgType,
            url: urlSpec,
            backgroundDisplay:bgDisplay
          }
          return rval;

        }
      }
    }

  },
  data(){
    return {

    }
  }
}
</script>


