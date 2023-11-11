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

        },
        fontPicker: function(dataToLoad) {
//                    debugger;
          console.log('fontPicker loader-', dataToLoad);
          var fontFamily='';
          var fontSize='';
          var fontWeight='';
          var fontStyle='';
          var textAlign='';
          var textColor='';
          if(typeof(dataToLoad['font-family'])!='undefined'){
            fontFamily=dataToLoad['font-family'];
          }
          if(typeof(dataToLoad['font-size'])!='undefined'){
            fontSize=dataToLoad['font-size'];
          }
          if(typeof(dataToLoad['font-style'])!='undefined'){
            fontStyle=dataToLoad['font-style'];
          }
          if(typeof(dataToLoad['font-weight'])!='undefined'){
            fontWeight=dataToLoad['font-weight'];
          }
          if(typeof(dataToLoad['text-align'])!='undefined'){
            textAlign = dataToLoad['text-align'];
          }
          if(typeof(dataToLoad['color'])!='undefined'){
            textColor = dataToLoad['color'];
          }
          return {
            fontFamily: fontFamily,
            fontSize: fontSize,
            fontWeight: fontWeight,
            fontStyle: fontStyle,
            alignment: textAlign,
            color: textColor
          }

        },
        borders: function(dataToLoad){
//          debugger;
          var includeBdr='';
          if(typeof(dataToLoad['borderInclude'])!='undefined'){
            if(dataToLoad['borderInclude']=='checked'){
              includeBdr='yes';
            }else{
              includeBdr='no';
            }
            var borderSpec = dataToLoad['border'].split(' ');
            var borderColor = borderSpec[2];
//                        var borderColor="#ffccbb"
            return {
              includeBorder: includeBdr,
              borderSize: borderSpec[0],
              borderColor: borderColor
            }
          }else{
            return {
              includeBorder: 'no',
              borderSize: '',
              borderColor: ''
            }
          }
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


