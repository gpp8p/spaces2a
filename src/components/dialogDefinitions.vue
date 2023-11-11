
<script>
export default {
name: "dialogDefinitions",
  methods: {
    getDialogDefinition(dialogName, componentLoaders){
      switch(dialogName){
        case 'oneWindow':{
          return {
            oneWindow:{
              dialogStyle :{
                position:'fixed',
                top:'30%',
                left:'30%',
                height:'45vh',
                width:'50vw',
                backgroundColor:'lavender',
                color:'blue',
                borderRadius:'10px',
                boxShadow:'10px 10px 5px lightslategrey',
              },
              leafComponent: false,
              menuName:'dialogSubMenu2',
              loader: function(existingData, dialogComponents){
                console.log('in oneWindow loader -',existingData, dialogComponents );
                if(typeof(existingData)!='undefined'){
                  for(var d = 0; d<dialogComponents.length; d++){
                    if(typeof(dialogComponents[d].loader)!='undefined'){
                      console.log('loaded component - ', dialogComponents[d]);
                    }else{
    //                  console.log('not loaded component - ', dialogComponents[d]);
                      dialogComponents[d].fieldValue = existingData[dialogComponents[d].fieldIdentifier];
                    }
                  }
                }
              },
              fields:[
                {
                  type: "textLiteral",
                  fieldLabel: 'Page Type:',
                  fieldIdentifier:"pageType",
                  hasLabel: true,
                  name: "pageType",
                  size:0,
                  leafComponent: true,
                  labelStyle:{
                    color:"blue",
                    fontFamily: "Candara",
                    fontSize: "12px"
                  },
                  class: "labelPlusInput"

                },
                {
                  type: "InputField",
                  hasLabel: true,
                  fieldLabel: 'Page Name:',
                  fieldSize: 40,
                  fieldMaxLength: 60,
                  fieldIdentifier: 'pageName',
                  name: 'pageName',
                  autoFocus:true,
                  leafComponent: true,
                  labelStyle:{
                    color:"blue",
                    fontFamily: "Candara",
                    fontSize: "12px"
                  },
                  styleWithLabel:{
                    display: "grid",
                    marginTop: "3px",
                    gridTemplateColumns: "20% 70%",
                    fontFamily: "Arial",
                    fontSize: "medium",
                    color: "#0a3aff"
                  },
                  styleWithoutLabel :{
                    fontFamily: "Arial",
                    fontSize: "medium",
                    color: "#0a3aff"
                  }
                },
                {
                  type: "inputField",
                  hasLabel: true,
                  fieldLabel: 'Page Description:',
                  fieldSize: 50,
                  fieldMaxLength: 60,
                  fieldIdentifier: 'pageDescription',
                  name: 'pageDescription',
                  autoFocus:false,
                  leafComponent: true,
                  labelStyle:{
                    color:"blue",
                    fontFamily: "Candara",
                    fontSize: "12px"
                  },
                  styleWithLabel:{
                    display: "grid",
                    marginTop: "3px",
                    gridTemplateColumns: "20% 70%",
                    fontFamily: "Arial",
                    fontSize: "medium",
                    color: "#0a3aff"
                  },
                  styleWithoutLabel :{
                    fontFamily: "Arial",
                    fontSize: "medium",
                    color: "#0a3aff"
                  }
                },
                {
                  type: "inputNumberField",
                  hasLabel: true,
                  fieldLabel: 'Page Grid Rows:',
                  fieldSize: 5,
                  fieldMaxLength: 5,
                  fieldIdentifier: 'pageHeight',
                  name: 'pageHeight',
                  autoFocus:false,
                  leafComponent: true,
                  labelStyle:{
                    color:"#0a3aff",
                    fontFamily: "Candara",
                    fontSize: "12px"
                  },
                  styleWithLabel:{
                    display: "grid",
                    marginTop: "3px",
                    gridTemplateColumns: "20% 70%",
                    fontFamily: "Arial",
                    fontSize: "medium",
                    color: "#0a3aff"
                  },
                  styleWithoutLabel :{
                    fontFamily: "Arial",
                    fontSize: "medium",
                    color: "#0a3aff"
                  }
                },
                {
                  type: "inputNumberField",
                  hasLabel: true,
                  fieldLabel: 'Page Grid Columns:',
                  fieldSize: 5,
                  fieldMaxLength: 5,
                  fieldIdentifier: 'pageWidth',
                  name: 'pageWidth',
                  autoFocus:false,
                  leafComponent: true,
                  labelStyle:{
                    color:"blue",
                    fontFamily: "Candara",
                    fontSize: "12px"
                  },
                  styleWithLabel:{
                    display: "grid",
                    marginTop: "3px",
                    gridTemplateColumns: "20% 70%",
                    fontFamily: "Arial",
                    fontSize: "medium",
                    color: "#0a3aff"
                  },
                  styleWithoutLabel :{
                    fontFamily: "Arial",
                    fontSize: "medium",
                    color: "#0a3aff"
                  }
                },
                {
                  type: "inputNumberField",
                  hasLabel: true,
                  fieldLabel: 'Screen Width (%):',
                  fieldSize: 5,
                  fieldMaxLength: 5,
                  fieldIdentifier: 'screenWidth',
                  name: 'screenWidth',
                  autoFocus:false,
                  leafComponent: true,
                  labelStyle:{
                    color:"blue",
                    fontFamily: "Candara",
                    fontSize: "12px"
                  },
                  styleWithLabel:{
                    display: "grid",
                    marginTop: "3px",
                    gridTemplateColumns: "20% 70%",
                    fontFamily: "Arial",
                    fontSize: "medium",
                    color: "#0a3aff"
                  },
                  styleWithoutLabel :{
                    fontFamily: "Arial",
                    fontSize: "medium",
                    color: "#0a3aff"
                  }
                },
                {
                  type: "inputNumberField",
                  hasLabel: true,
                  fieldLabel: 'Row Height :',
                  fieldSize: 5,
                  fieldMaxLength: 5,
                  fieldIdentifier: 'rowHeight',
                  name: 'rowHeight',
                  autoFocus:false,
                  leafComponent: true,
                  labelStyle:{
                    color:"blue",
                    fontFamily: "Candara",
                    fontSize: "12px"
                  },
                  styleWithLabel:{
                    display: "grid",
                    marginTop: "3px",
                    gridTemplateColumns: "20% 70%",
                    fontFamily: "Arial",
                    fontSize: "medium",
                    color: "#0a3aff"
                  },
                  styleWithoutLabel :{
                    fontFamily: "Arial",
                    fontSize: "medium",
                    color: "#0a3aff"
                  }
                },

                {
                  type: "vRadioGroup",
                  hasLabel: "true",
                  groupLabel: "Permissions:",
                  orient: "horozontal",
                  groupName: "permissions",
                  fieldIdentifier: 'permissions',
                  name: 'permissions',
                  componentStyle:{
                    display: "grid",
                    gridTemplateColumns: "20% 70%"
                  },
                  leafComponent: true,
                  labelStyle:{
                    color:"blue",
                    fontFamily: "Candara",
                    fontSize: "12px",
                  },
                  buttonLabelStyle:{
                    color:"blue",
                    fontFamily: "Candara",
                    fontSize: "12px",
                  },
                  radioButtons: [
                    {
                      fieldLabel:"Open Access",
                      val: "open",
                    },
                    {
                      fieldLabel: "Copy Page Permissions (Restricted)",
                      val: "restricted",
                    }
                  ]
                },
                {
                  type: "vBackgroundPicker",
                  fieldLabel: "Background:",
                  hasLabel: "true",
                  leafComponent: true,
                  labelStyle:{
                    color:"blue",
                    fontFamily: "Candara",
                    fontSize: "12px",
                    marginTop: "7px"
                  },
                  fieldIdentifier: 'pageBackground',
                  name: "pageBackground",
                  styles:{
                    componentStyle:{
                      display: "grid",
                      gridTemplateColumns: "20% 80%",
                      marginTop: "7px"
                    },
                    backGroundRadioGroupStyle:{
                      type: "vRadioGroup",
                      hasLabel: "false",
                      orient: "horozontal",
                      groupName: "backgroundType",
                      leafComponent: true,
                      labelStyle:{
                        color:"blue",
                        fontFamily: "Candara",
                        fontSize: "12px",
                      },
                      buttonLabelStyle:{
                        color:"blue",
                        fontFamily: "Candara",
                        fontSize: "12px",
                      },
                      radioButtons: [
                        {
                          fieldLabel:"Color",
                          val: "color",
                        },
                        {
                          fieldLabel: "Image",
                          val: "image",
                        }
                      ]
                    }
                  }
                },
                {
                  type: "checkbox",
                  fieldLabel: "Template:",
                  hasLabel: true,
                  leafComponent: true,
                  labelStyle:{
                    color:"blue",
                    fontFamily: "Candara",
                    fontSize: "12px",
                    marginTop: "7px"
                  },
                  fieldIdentifier: 'template',
                  name: "template",
                  loader: function(styleElements){
                    //                   debugger;
                    if(typeof(styleElements['template'])!='undefined'){
                      if(styleElements['template']=='checked'){
                        return 'yes';
                      }else{
                        return 'no';
                      }
                    }else{
                      return 'no';
                    }
                  },
                  styles:{
                    componentStyle:{
                      display: "grid",
                      gridTemplateColumns: "20% 80%",
                      marginTop: "7px"
                    },
                  }
                },


              ]
            }
          }
        }
        case 'pageSettings':{
          return {
            pageSettings:{
              dialogStyle :{
                position:'fixed',
                top:'30%',
                left:'30%',
                height:'45vh',
                width:'50vw',
                backgroundColor:'lavender',
                color:'blue',
                borderRadius:'10px',
                boxShadow:'10px 10px 5px lightslategrey',
              },
              leafComponent: false,
              menuName:'dialogSubMenu4',
              loader: function(existingData, dialogComponents){
                console.log('in pageSettings loader -',existingData, dialogComponents );
                debugger;
                if(typeof(existingData)!='undefined'){
                  for(var d = 0; d<dialogComponents.length; d++){
                    if(typeof(dialogComponents[d].loader)!='undefined'){
                      console.log('loaded component - ', dialogComponents[d]);
                      dialogComponents[d].fieldValue = dialogComponents[d].loader(existingData, dialogComponents,d);
                    }else{
                      console.log('not loaded component - ', dialogComponents[d].fieldIdentifier, existingData[dialogComponents[d].fieldIdentifier]);
                      dialogComponents[d].fieldValue = existingData[dialogComponents[d].fieldIdentifier];
                    }
                  }
                }
              },
              fields:[
                {
                  type: "textLiteral",
                  fieldLabel: 'Page Type:',
                  fieldIdentifier:"pageType",
                  hasLabel: true,
                  name: "pageType",
                  size:0,
                  leafComponent: true,
                  labelStyle:{
                    color:"blue",
                    fontFamily: "Candara",
                    fontSize: "12px"
                  },
                  class: "labelPlusInput"

                },
                {
                  type: "InputField",
                  hasLabel: true,
                  fieldLabel: 'Page Name:',
                  fieldSize: 40,
                  fieldMaxLength: 60,
                  fieldIdentifier: 'pageName',
                  name: 'pageName',
                  autoFocus:true,
                  leafComponent: true,
                  labelStyle:{
                    color:"blue",
                    fontFamily: "Candara",
                    fontSize: "12px"
                  },
                  styleWithLabel:{
                    display: "grid",
                    marginTop: "3px",
                    gridTemplateColumns: "20% 70%",
                    fontFamily: "Arial",
                    fontSize: "medium",
                    color: "#0a3aff"
                  },
                  styleWithoutLabel :{
                    fontFamily: "Arial",
                    fontSize: "medium",
                    color: "#0a3aff"
                  }
                },


                {
                  type: "inputField",
                  hasLabel: true,
                  fieldLabel: 'Page Description:',
                  fieldSize: 50,
                  fieldMaxLength: 60,
                  fieldIdentifier: 'pageDescription',
                  name: 'pageDescription',
                  autoFocus:false,
                  leafComponent: true,
                  labelStyle:{
                    color:"blue",
                    fontFamily: "Candara",
                    fontSize: "12px"
                  },
                  styleWithLabel:{
                    display: "grid",
                    marginTop: "3px",
                    gridTemplateColumns: "20% 70%",
                    fontFamily: "Arial",
                    fontSize: "medium",
                    color: "#0a3aff"
                  },
                  styleWithoutLabel :{
                    fontFamily: "Arial",
                    fontSize: "medium",
                    color: "#0a3aff"
                  }
                },
                {
                  type: "textLiteral",
                  fieldLabel: 'Page Grid Rows:',
                  fieldIdentifier:"pageHeight",
                  hasLabel: true,
                  name: "pageHeight",
                  size:0,
                  leafComponent: true,
                  labelStyle:{
                    color:"blue",
                    fontFamily: "Candara",
                    fontSize: "12px"
                  },
                  class: "labelPlusInput"
                },
                {
                  type: "textLiteral",
                  fieldLabel: 'Page Grid Columns:',
                  fieldIdentifier:"pageWidth",
                  hasLabel: true,
                  name: "pageWidth",
                  size:0,
                  leafComponent: true,
                  labelStyle:{
                    color:"blue",
                    fontFamily: "Candara",
                    fontSize: "12px"
                  },
                  class: "labelPlusInput"
                },

                {
                  type: "inputNumberField",
                  hasLabel: true,
                  fieldLabel: 'Screen Width (%):',
                  fieldSize: 5,
                  fieldMaxLength: 5,
                  fieldIdentifier: 'screenWidth',
                  name: 'screenWidth',
                  autoFocus:false,
                  leafComponent: true,
                  labelStyle:{
                    color:"blue",
                    fontFamily: "Candara",
                    fontSize: "12px"
                  },
                  styleWithLabel:{
                    display: "grid",
                    marginTop: "3px",
                    gridTemplateColumns: "20% 70%",
                    fontFamily: "Arial",
                    fontSize: "medium",
                    color: "#0a3aff"
                  },
                  styleWithoutLabel :{
                    fontFamily: "Arial",
                    fontSize: "medium",
                    color: "#0a3aff"
                  }
                },
                {
                  type: "inputNumberField",
                  hasLabel: true,
                  fieldLabel: 'Row Height :',
                  fieldSize: 5,
                  fieldMaxLength: 5,
                  fieldIdentifier: 'rowHeight',
                  name: 'rowHeight',
                  autoFocus:false,
                  leafComponent: true,
                  labelStyle:{
                    color:"blue",
                    fontFamily: "Candara",
                    fontSize: "12px"
                  },
                  styleWithLabel:{
                    display: "grid",
                    marginTop: "3px",
                    gridTemplateColumns: "20% 70%",
                    fontFamily: "Arial",
                    fontSize: "medium",
                    color: "#0a3aff"
                  },
                  styleWithoutLabel :{
                    fontFamily: "Arial",
                    fontSize: "medium",
                    color: "#0a3aff"
                  }
                },

                {
                  type: "vBackgroundPicker",
                  fieldLabel: "Background:",
                  hasLabel: "true",
                  leafComponent: true,
                  labelStyle:{
                    color:"blue",
                    fontFamily: "Candara",
                    fontSize: "12px",
                    marginTop: "7px"
                  },
                  fieldIdentifier: 'pageBackground',
                  name: "pageBackground",

                  loader: function(existingData, dialogComponents, currentComponent){
                    console.log('page backgroundPicker loader-', existingData);
                    debugger;
                    if(existingData[dialogComponents[currentComponent].fieldIdentifier].backgroundType=='image'){
                      var imageUrl='';
                      var backgroundDisplay='';
                      if(typeof(existingData.backgroundImageUrl)!='undefined'){
                        imageUrl = existingData.backgroundImageUrl;
                      }
                      if(typeof(existingData.backgroundDisplay)!='undefined'){
                        backgroundDisplay = existingData.backgroundDisplay;
                      }
                      return {
                        backgroundType: 'image',
                        url:imageUrl,
                        colorSelect:'',
                        backgroundDisplay: backgroundDisplay
                      }
                    }
                    else if(existingData[dialogComponents[currentComponent].fieldIdentifier].backgroundType=='color'){
                      return {
                        backgroundType: 'color',
                        colorSelect: existingData[dialogComponents[currentComponent].fieldIdentifier].colorSelect,
                        url:''
                      }
                    }
                    else {
                      return {
                        backgroundType: 'transparent'
                      }
                    }
                  },


                  styles:{
                    componentStyle:{
                      display: "grid",
                      gridTemplateColumns: "20% 80%",
                      marginTop: "7px"
                    },
                    backGroundRadioGroupStyle:{
                      type: "vRadioGroup",
                      hasLabel: "false",
                      orient: "horozontal",
                      groupName: "backgroundType",
                      leafComponent: true,
                      labelStyle:{
                        color:"blue",
                        fontFamily: "Candara",
                        fontSize: "12px",
                      },
                      buttonLabelStyle:{
                        color:"blue",
                        fontFamily: "Candara",
                        fontSize: "12px",
                      },
                      radioButtons: [
                        {
                          fieldLabel:"Color",
                          val: "color",
                        },
                        {
                          fieldLabel: "Image",
                          val: "image",
                        }
                      ]
                    }
                  }
                },




                {
                  type: "checkbox",
                  fieldLabel: "Template:",
                  hasLabel: true,
                  leafComponent: true,
                  labelStyle:{
                    color:"blue",
                    fontFamily: "Candara",
                    fontSize: "12px",
                    marginTop: "7px"
                  },
                  fieldIdentifier: 'template',
                  name: "template",
                  loader: function(styleElements){
                    //                   debugger;
                    if(typeof(styleElements['template'])!='undefined'){
                      if(styleElements['template']=='checked'){
                        return 'yes';
                      }else{
                        return 'no';
                      }
                    }else{
                      return 'no';
                    }
                  },
                  styles:{
                    componentStyle:{
                      display: "grid",
                      gridTemplateColumns: "20% 80%",
                      marginTop: "7px"
                    },
                  }
                },


              ]
            }
          }
        }


        case 'mySpaces':{
          return {
            mySpaces:{
              dialogStyle: {
                position: 'fixed',
                top: '20%',
                left: '20%',
                height: '60vh',
                width: '65vw',
                backgroundColor: 'lavender',
                color: 'blue',
                borderRadius: '10px',
                boxShadow: '10px 10px 5px lightslategrey',
              },
              leafComponent: false,
              menuName: 'mySpacesMenu',
              fields:[
                {
                  type: 'mySpaces',
                  perPage: 8,

                  columns: [
                    {
                      field: 'id',
                      label: 'ID',
                      width: '10',
                      numeric: true
                    },
                    {
                      field: 'menu_label',
                      label: 'Name'
                    },
                    {
                      field: 'description',
                      label: 'Description'

                    },

                    {
                      field: 'height',
                      label: 'Height'
                    },
                    {
                      field: 'width',
                      label: 'Width'
                    }
                  ],
                }
              ]
            }

          }
        }
        case 'pageDefaultSelect':{
          return {
            pageDefaultSelect: {
              dialogStyle: {
                position: 'fixed',
                top: '30%',
                left: '30%',
                height: '40vh',
                width: '50vw',
                backgroundColor: 'lavender',
                color: 'blue',
                borderRadius: '10px',
                boxShadow: '10px 10px 5px lightslategrey',
              },
              leafComponent: false,
              menuName:'dialogSubMenu1',
              fields: [
                {
                  type: "vSelect",
                  options: [
                    {
                      val: 'oneWindow',
                      label: 'One Window Page',
                      isDisabled: false,
                      isSelected: false
                    },
                    {
                      val: 'extPage',
                      label: 'Long Page',
                      isDisabled: false,
                      isSelected: false
                    },
                    {
                      val: 'dialogPage',
                      label: 'Dialog',
                      isDisabled: false,
                      isSelected: false
                    },
                    {
                      val: 'emailPage',
                      label: 'Bulk Mail Draft',
                      isDisabled: false,
                      isSelected: false
                    },
                  ],
                  fieldLabel: 'Page Type:',
                  hasLabel: true,
                  multiple: false,
                  name: "pageType",
                  size: 0,
                  leafComponent: true,
                  labelStyle: {
                    color: "blue",
                    fontFamily: "Candara",
                    fontSize: "12px"
                  },
                  class: "labelPlusInput"

                }
              ]
            }
          }
        }

        case 'pageDefaultSelect_new':{
          return {
            pageDefaultSelect:{
              dialogStyle: {
                position: 'fixed',
                top: '30%',
                left: '30%',
                height: '40vh',
                width: '25vw',
                backgroundColor: 'lavender',
                color: 'blue',
                borderRadius: '10px',
                boxShadow: '10px 10px 5px lightslategrey',
              },
              leafComponent: false,
              menuName:'dialogSubMenu1',
              name: "pageType",
              fields: [
                {
                  type: "Chooser",
                  options: [
                    {
                      val: 'oneWindow',
                      label: 'One Window Page',
                      isDisabled: false,
                      isSelected: false
                    },
                    {
                      val: 'extPage',
                      label: 'Long Page',
                      isDisabled: false,
                      isSelected: false
                    },
                    {
                      val: 'dialogPage',
                      label: 'Dialog',
                      isDisabled: false,
                      isSelected: false
                    },
                    {
                      val: 'emailPage',
                      label: 'Bulk Mail Draft',
                      isDisabled: false,
                      isSelected: false
                    },
                  ],
                  wrapperStyle: 'height: 90%; ' +
                      'width: 80%; ' +
                      'background-color: powderblue; ' +
                      'margin-left: auto; ' +
                      'margin-right: auto; ' +
                      'border-style: solid; ' +
                      'border-width: 2px; ' +
                      'border-color: red; ' +
                      'display: block;'
                }
              ]
            }
          }
        }
        case 'pageDefaultSelect_old':{
          return {
            pageDefaultSelect: {
              dialogStyle: {
                position: 'fixed',
                top: '30%',
                left: '30%',
                height: '40vh',
                width: '25vw',
                backgroundColor: 'lavender',
                color: 'blue',
                borderRadius: '10px',
                boxShadow: '10px 10px 5px lightslategrey',
              },
              leafComponent: false,
              menuName:'dialogSubMenu1',
              fields: [
                {
                  type: "vSelect",
                  options: [
                    {
                      val: 'oneWindow',
                      label: 'One Window Page',
                      isDisabled: false,
                      isSelected: false
                    },
                    {
                      val: 'extPage',
                      label: 'Long Page',
                      isDisabled: false,
                      isSelected: false
                    },
                    {
                      val: 'dialogPage',
                      label: 'Dialog',
                      isDisabled: false,
                      isSelected: false
                    },
                    {
                      val: 'emailPage',
                      label: 'Bulk Mail Draft',
                      isDisabled: false,
                      isSelected: false
                    },
                  ],
                  fieldLabel: 'Page Type:',
                  hasLabel: false,
                  multiple: false,
                  name: "pageType",
                  size: 4,
                  leafComponent: true,
                  labelStyle: {
                    color: "blue",
                    fontFamily: "Candara",
                    fontSize: "12px"
                  },
                  class: "labelPlusInput"

                }
              ]
            }
          }
        }
        case 'newCardSelect':{
          return {
            newCardSelect:{
              dialogStyle: {
                position: 'fixed',
                top: '30%',
                left: '30%',
                height: '40vh',
                width: '50vw',
                backgroundColor: 'lavender',
                color: 'blue',
                borderRadius: '10px',
                boxShadow: '10px 10px 5px lightslategrey',
              },
              leafComponent: false,
              menuName:'specifyCardDialogMenu',
              fields:[
                {
                  type: "inputField",
                  hasLabel: true,
                  fieldLabel: 'Card Name:',
                  fieldSize: 50,
                  fieldMaxLength: 60,
                  fieldIdentifier: 'cardName',
                  name: 'cardName',
                  autoFocus:true,
                  leafComponent: true,
                  labelStyle:{
                    color:"blue",
                    fontFamily: "Candara",
                    fontSize: "12px"
                  },
                  styleWithLabel:{
                    display: "grid",
                    marginTop: "3px",
                    gridTemplateColumns: "20% 70%",
                    fontFamily: "Arial",
                    fontSize: "medium",
                    color: "#0a3aff"
                  },
                  styleWithoutLabel :{
                    fontFamily: "Arial",
                    fontSize: "medium",
                    color: "#0a3aff"
                  }
                },
                {
                  type: "vSelect",
                  options: [
                    {
                      val: 'Headline',
                      label: 'Headline Card',
                      isDisabled: false,
                      isSelected: false
                    },
                    {
                      val: 'navMenuCard',
                      label: 'Navigation Menu',
                      isDisabled: false,
                      isSelected: false
                    },
                    {
                      val: 'imageCard',
                      label: 'Image Card',
                      isDisabled: false,
                      isSelected: false
                    },
                    {
                      val: 'richTextCard',
                      label: 'Rich Text Card',
                      isDisabled: false,
                      isSelected: false
                    },
                  ],
                  fieldLabel: 'Card Type:',
                  hasLabel: true,
                  multiple: false,
//                  name: "cardType",
                  name: 'card_component',
                  size: 0,
                  leafComponent: true,
                  labelStyle: {
                    color: "blue",
                    fontFamily: "Candara",
                    fontSize: "12px"
                  },
                  class: "labelPlusInput"

                }
              ]
            }
          }
        }
//      is headlineCard used ?  configureHeadlineCard is what I see in action
        case 'headlineCard':{
          return {
              headlineCard :{
//            newCardSpecifications:{
              dialogStyle: {
                position: 'fixed',
                top: '30%',
                left: '30%',
                height: '40vh',
                width: '50vw',
                backgroundColor: 'lavender',
                color: 'blue',
                borderRadius: '10px',
                boxShadow: '10px 10px 5px lightslategrey',
              },
              leafComponent: false,
              menuName:'configureNewCardMenu',
              loader: function(existingData, dialogComponents){
                debugger;
                console.log('headlineCard config existing data-', existingData);
                if(typeof(existingData)!='undefined'){
                  for(var d = 0; d<dialogComponents.length; d++){
                    if(typeof(dialogComponents[d].loader)!='undefined'){
                      var loadedVal = dialogComponents[d].loader(existingData.cardStyles);
                      dialogComponents[d].fieldValue = loadedVal
                      if(typeof(existingData.cardSubStyles)!='undefined'){
                        loadedVal = dialogComponents[d].loader(existingData.cardSubStyles);
                        dialogComponents[d].subElementValue = loadedVal;
                      }
                      console.log('existingValue is', loadedVal);
                    }
                  }
                }
              },
              fields:[
                {
                  type: "vSelect",
                  options: [
                    {
                      val: 'headlineCard',
                      label: 'Headline Card',
                      isDisabled: false,
                      isSelected: false
                    },
                    {
                      val: 'navMenuCard',
                      label: 'Navigation Menu',
                      isDisabled: false,
                      isSelected: false
                    },
                    {
                      val: 'imageCard',
                      label: 'Image Card',
                      isDisabled: false,
                      isSelected: false
                    },
                    {
                      val: 'richTextCard',
                      label: 'Rich Text Card',
                      isDisabled: false,
                      isSelected: false
                    },
                  ],
                  fieldLabel: 'Card Type:',
                  hasLabel: true,
                  multiple: false,
                  name: "card_component",
                  fieldIdentifier: 'card_component',
                  size: 0,
                  leafComponent: true,
                  labelStyle: {
                    color: "blue",
                    fontFamily: "Candara",
                    fontSize: "12px"
                  },
                  class: "labelPlusInput"

                },
                {
                  type: "InputField",
                  hasLabel: true,
                  fieldLabel: 'Card Name:',
                  fieldSize: 40,
                  fieldMaxLength: 60,
                  fieldIdentifier: 'cardName',
                  name: 'cardName',
                  autoFocus:true,
                  leafComponent: true,
                  labelStyle:{
                    color:"blue",
                    fontFamily: "Candara",
                    fontSize: "12px"
                  },
                  styleWithLabel:{
                    display: "grid",
                    marginTop: "3px",
                    gridTemplateColumns: "20% 70%",
                    fontFamily: "Arial",
                    fontSize: "medium",
                    color: "#0a3aff"
                  },
                  styleWithoutLabel :{
                    fontFamily: "Arial",
                    fontSize: "medium",
                    color: "#0a3aff"
                  }
                },
                {
                  type: "vBackgroundPicker",
                  fieldLabel: "Background:",
                  hasLabel: "true",
                  leafComponent: true,
                  labelStyle:{
                    color:"blue",
                    fontFamily: "Candara",
                    fontSize: "12px",
                    marginTop: "7px"
                  },
                  fieldIdentifier: 'cardBackground',
                  name: "cardBackground",
                  styles:{
                    componentStyle:{
                      display: "grid",
                      gridTemplateColumns: "20% 80%",
                      marginTop: "7px"
                    },
                    backGroundRadioGroupStyle:{
                      type: "vRadioGroup",
                      hasLabel: "false",
                      orient: "horozontal",
                      groupName: "backgroundType",
                      labelStyle:{
                        color:"blue",
                        fontFamily: "Candara",
                        fontSize: "12px",
                      },
                      buttonLabelStyle:{
                        color:"blue",
                        fontFamily: "Candara",
                        fontSize: "12px",
                      },
                      radioButtons: [
                        {
                          fieldLabel:"Color",
                          val: "color",
                        },
                        {
                          fieldLabel: "Transparent",
                          val: "transparent",
                        },
                      ]
                    }
                  }
                },
              ]
            }
          }
        }
        case 'configureHeadlineCard':{
//        case 'configureHeadlineCard': {
          return {
            configureHeadlineCard: {
              dialogStyle: {
                position: 'fixed',
                top: '30%',
                left: '30%',
                height: '40vh',
                width: '50vw',
                backgroundColor: 'lavender',
                color: 'blue',
                borderRadius: '10px',
                boxShadow: '10px 10px 5px lightslategrey',
              },
              leafComponent: false,
              menuName: 'dialogSubMenu3',
              loader: function(existingData, dialogComponents){
                console.log('loading headline card config existing data-', existingData );
                console.log('componentLoaders-',componentLoaders);
                debugger;
                if(typeof(existingData)!='undefined'){
                  for(var d = 0; d<dialogComponents.length; d++){
                    if(typeof(dialogComponents[d].loader)!='undefined'){
                      console.log('loading a field-', dialogComponents[d]);
                      console.log('loading existing data headline-', existingData);
                      var loadedVal = dialogComponents[d].loader(existingData.cardStyles);
                      dialogComponents[d].fieldValue = loadedVal
                      if(typeof(existingData.cardSubStyles)!='undefined'){
                        loadedVal = dialogComponents[d].loader(existingData.cardSubStyles);
                        dialogComponents[d].subElementValue = loadedVal;
                      }
                      console.log('existingValue is', loadedVal);
                    }
                  }
                }
              },
              fields: [
                {
                  type: "vBackgroundPicker",
                  fieldLabel: "Background:",
                  hasLabel: "true",
                  leafComponent: true,
                  loader:function(styleElements){
                    return componentLoaders.background(styleElements);
                  },
/*
                  loader: function(styleElements){
                    debugger;
                    console.log('entering loader for bg picker-', styleElements);
                    var thisComponentLoader = componentLoaders.background;
                    thisComponentLoader();
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
                      return {
                        colorSelect: clrSel,
                        backgroundType:bgType,
                        url: urlSpec,
                        backgroundDisplay:bgDisplay
                      }
                  },
 */
                  labelStyle: {
                    color: "blue",
                    fontFamily: "Candara",
                    fontSize: "12px",
                    marginTop: "7px"
                  },
                  fieldIdentifier: 'background',
                  name: "cardBackground",
                  styles: {
                    componentStyle: {
                      display: "grid",
                      gridTemplateColumns: "20% 80%",
                      marginTop: "7px"
                    },
                    backGroundRadioGroupStyle: {
                      type: "vRadioGroup",
                      hasLabel: "false",
                      orient: "horozontal",
                      groupName: "backgroundType",
                      leafComponent: true,
                      labelStyle: {
                        color: "blue",
                        fontFamily: "Candara",
                        fontSize: "12px",
                      },
                      buttonLabelStyle: {
                        color: "blue",
                        fontFamily: "Candara",
                        fontSize: "12px",
                      },
                      radioButtons: [
                        {
                          fieldLabel: "Color",
                          val: "color",
                        },
                        {
                          fieldLabel: "Image",
                          val: "image",
                        },
                        {
                          fieldLabel: "Transparent",
                          val: "transparent",
                        }
                      ]
                    }
                  }
                },
                {
                  type: "checkbox",
                  fieldLabel: "Shadow:",
                  hasLabel: true,
                  leafComponent: true,
                  labelStyle:{
                    color:"blue",
                    fontFamily: "Candara",
                    fontSize: "12px",
                    marginTop: "7px"
                  },
                  fieldIdentifier: 'shadow',
                  name: "shadow",
                  loader: function(styleElements){
 //                   debugger;
                    if(typeof(styleElements['shadow'])!='undefined'){
                      if(styleElements['shadow']=='checked'){
                        return 'yes';
                      }else{
                        return 'no';
                      }
                    }else{
                      return 'no';
                    }
                  },
                  styles:{
                    componentStyle:{
                      display: "grid",
                      gridTemplateColumns: "20% 80%",
                      marginTop: "7px"
                    },
                  }
                },
                {
                  type: "checkbox",
                  fieldLabel: "Rnd.Corners:",
                  hasLabel: true,
                  leafComponent: true,
                  labelStyle:{
                    color:"blue",
                    fontFamily: "Candara",
                    fontSize: "12px",
                    marginTop: "7px"
                  },
                  fieldIdentifier: 'roundIncluded',
                  loader: function(styleElements){
//                    debugger;
                    if(typeof(styleElements['roundIncluded'])!='undefined'){
                      if(styleElements['roundIncluded']=='checked'){
                        return 'yes';
                      }else{
                        return 'no';
                      }
                    }else{
                      return 'no';
                    }
                  },
                  name: "roundIncluded",
                  styles:{
                    componentStyle:{
                      display: "grid",
                      gridTemplateColumns: "20% 80%",
                      marginTop: "7px"
                    },
                  }
                },
                {
                  type: "cbxSelectColor",
                  fieldLabel: "Borders:",
                  hasLabel: true,
                  leafComponent: true,
                  labelStyle:{
                    color:"blue",
                    fontFamily: "Candara",
                    fontSize: "12px",
                    marginTop: "7px"
                  },
                  selectOptions:[
                    {
                      val: 'thin',
                      label: 'Small',
                      isDisabled: false,
                      isSelected: false
                    },
                    {
                      val: 'medium',
                      label: 'Medium',
                      isDisabled: false,
                      isSelected: false
                    },
                    {
                      val: 'thick',
                      label: 'Large',
                      isDisabled: false,
                      isSelected: false
                    },
                  ],
                  loader: function(styleElements){
                    return componentLoaders.borders(styleElements);
                  },
 /*
                    debugger;
                    var includeBdr='';
                    if(typeof(styleElements['borderInclude'])!='undefined'){
                      if(styleElements['borderInclude']=='checked'){
                        includeBdr='yes';
                      }else{
                        includeBdr='no';
                      }
                      var borderSpec = styleElements['border'].split(' ');
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
*/

                  fieldIdentifier: 'borders',
                  name: "borders",
                  styles:{
                    componentStyle:{
                      display: "grid",
                      gridTemplateColumns: "20% 80%",
                      marginTop: "7px"
                    },
                  }
                },
                {
                  type: "fontPicker",
                  fieldLabel: "Title Font:",
                  hasLabel: true,
                  leafComponent: false,
                  labelStyle:{
                    color:"blue",
                    fontFamily: "Candara",
                    fontSize: "12px",
                    marginTop: "7px"
                  },
                  fieldIdentifier: 'titleStyle',
                  selectStyle:'background: powderblue;color:blue;font-weight: bold;font-size: 12px;margin-bottom: 3px;width: 100%;margin-right: 15%;margin-top:5px; ',
                  loader: function(styleElements){
                    return componentLoaders.fontPicker(styleElements);
                  },


/*
//                    debugger;
                    var fontFamily='';
                    var fontSize='';
                    var fontWeight='';
                    var fontStyle='';
                    var textAlign='';
                    var textColor='';
                    if(typeof(styleElements['font-family'])!='undefined'){
                      fontFamily=styleElements['font-family'];
                    }
                    if(typeof(styleElements['font-size'])!='undefined'){
                      fontSize=styleElements['font-size'];
                    }
                    if(typeof(styleElements['font-style'])!='undefined'){
                      fontStyle=styleElements['font-style'];
                    }
                    if(typeof(styleElements['font-weight'])!='undefined'){
                      fontWeight=styleElements['font-weight'];
                    }
                    if(typeof(styleElements['text-align'])!='undefined'){
                      textAlign = styleElements['text-align'];
                    }
                    if(typeof(styleElements['color'])!='undefined'){
                      textColor = styleElements['color'];
                    }
                    return {
                      fontFamily: fontFamily,
                      fontSize: fontSize,
                      fontWeight: fontWeight,
                      fontStyle: fontStyle,
                      alignment: textAlign,
                      color: textColor
                    }
*/

                  pickers:{
                    fontFamily:{
                      hasLabel: false,
                      options:[
                        {
                          val: 'Arial',
                          label: 'Arial',
                          isDisabled: false,
                          isSelected: false
                        },
                        {
                          val: 'Times New Roman',
                          label: 'Times New Roman',
                          isDisabled: false,
                          isSelected: false
                        },
                        {
                          val: 'Candara',
                          label: 'Candara',
                          isDisabled: false,
                          isSelected: false
                        },
                        {
                          val: 'Helvetica',
                          label: 'Helvetica',
                          isDisabled: false,
                          isSelected: false
                        },
                      ]
                    },
                    fontSize:{
                      hasLabel: false,
                      options:[
                        {
                          val: '10pt',
                          label: '10pt',
                          isDisabled: false,
                          isSelected: false
                        },
                        {
                          val: '12pt',
                          label: '12pt',
                          isDisabled: false,
                          isSelected: false
                        },
                        {
                          val: '18pt',
                          label: '18pt',
                          isDisabled: false,
                          isSelected: false
                        },
                        {
                          val: '36pt',
                          label: '36pt',
                          isDisabled: false,
                          isSelected: false
                        },
                        {
                          val: '48pt',
                          label: '48pt',
                          isDisabled: false,
                          isSelected: false
                        },
                        {
                          val: '72pt',
                          label: '72pt',
                          isDisabled: false,
                          isSelected: false
                        },
                      ]
                    },
                    fontStyle:{
                      hasLabel: false,
                      options:[
                        {
                          val: 'normal',
                          label: 'normal',
                          isDisabled: false,
                          isSelected: false
                        },
                        {
                          val: 'italic',
                          label: 'italic',
                          isDisabled: false,
                          isSelected: false
                        },
                      ]
                    },
                  fontWeight: {
                      hasLabel: false,
                      options:[
                        {
                          val: 'normal',
                          label: 'normal',
                          isDisabled: false,
                          isSelected: false
                        },
                        {
                          val: 'bold',
                          label: 'bold',
                          isDisabled: false,
                          isSelected: false
                        },
                      ]
                  },
                  alignment:{
                      hasLabel: false,
                      options:[
                        {
                          val: 'left',
                          label: 'left',
                          isDisabled: false,
                          isSelected: false
                        },                        {
                          val: 'center',
                          label: 'center',
                          isDisabled: false,
                          isSelected: false
                        },
                        {
                          val: 'right',
                          label: 'right',
                          isDisabled: false,
                          isSelected: false
                        },
                      ]
                    },
                    color:{
                      hasLabel: false,
                      colorSelect:'#ffccbb'
                    }
                  }
                }
              ]
            }
          }

        }
        case 'login':{
          return {
            login:{
              dialogStyle :{
                position:'fixed',
                top:'30%',
                left:'30%',
                height:'30vh',
                width:'50vw',
                backgroundColor:'lavender',
                color:'blue',
                borderRadius:'10px',
                boxShadow:'10px 10px 5px lightslategrey',

              },
              leafComponent: false,
              menuName: 'loginMenu',
              fields:[
                {
                  type: "inputField",
                  hasLabel: true,
                  fieldLabel: 'Email:',
                  fieldSize: 30,
                  fieldMaxLength: 50,
                  fieldIdentifier: 'loginEmail',
                  name: 'loginEmail',
                  autoFocus:true,
                  leafComponent: true,
                  labelStyle:{
                    color:"blue",
                    fontFamily: "Candara",
                    fontSize: "12px"
                  },
                  styleWithLabel:{
                    display: "grid",
                    marginTop: "3px",
                    gridTemplateColumns: "20% 70%",
                    fontFamily: "Arial",
                    fontSize: "medium",
                    color: "#0a3aff"
                  },
                  styleWithoutLabel :{
                    fontFamily: "Arial",
                    fontSize: "medium",
                    color: "#0a3aff"
                  }
                },
                {
                  type: "inputPasswordField",
                  hasLabel: true,
                  fieldLabel: 'Password:',
                  fieldSize: 30,
                  fieldMaxLength: 50,
                  fieldIdentifier: 'loginPassword',
                  name: 'loginPassword',
                  autoFocus:false,
                  leafComponent: true,
                  labelStyle:{
                    color:"blue",
                    fontFamily: "Candara",
                    fontSize: "12px"
                  },
                  styleWithLabel:{
                    display: "grid",
                    marginTop: "3px",
                    gridTemplateColumns: "20% 70%",
                    fontFamily: "Arial",
                    fontSize: "medium",
                    color: "#0a3aff"
                  },
                  styleWithoutLabel :{
                    fontFamily: "Arial",
                    fontSize: "medium",
                    color: "#0a3aff"
                  }
                },
              ]
            }
          }
        }
      }
    },
    loadExistingBackground(exData){
      console.log('in loadExistingBackground-', exData);
    },
    getDialogDefaults(pageType){
      switch(pageType){
        case 'oneWindow':{
          return {
            pageBackground:{
              backgroundType:"color",
              colorSelect:"#0a3aff",
            },
            pageDescription:"page description",
            pageName:"page name",
            pageType: "One Window Page",
            permissions:"open",
            pageHeight:"15",
            pageWidth:"15",
            rowHeight:"60",
            screenWidth:"100"
          }
//          break;
        }
        case 'extPage':{
          break;
        }
        case 'dialogPage':{
          break;
        }
        case 'emailPage':{
          break;
        }
/*
        case 'configureHeadlineCard':{
          return {
            cardBackground:{
              backgroundType:"color",
              colorSelect:"#0a3aff",
            },
          }
        }

 */
        case 'configureHeadlineCard':{
          return {
            background :{
              backgroundType: "color",
              colorSelect: "#bbfad7"
            },
//              "background-color": "#bbfad7",
//              backgroundTypeColor: "checked",
            borders:{
              includeBorder: 'yes',
              borderSize: 'medium',
              borderColor: '#0000FF'
            },
            border: "thin solid #0000FF",
            "border-radius": "8px",
            borderInclude: "yes",
            "box-shadow": "10px 20px 30px black",
            color: "#0000FF",
            titleStyle: {
              fontFamily: "Candara",
              fontSize: "18pt",
              fontStyle: "normal",
              fontWeight: "normal",
              alignment: "left",
              color: "#999999",
              subElementValue:{
                color: "#BBBBBB",
                fontFamily: "Helvetica",
                fontSize: "12pt",
                fontStyle: "normal",
                fontWeight: "normal",
                alignment: "left",
              },
            },
/*
            subElementValue:{
              color: "#0000FF",
              fontFamily: "Candara",
              fontSize: "12pt",
              fontStyle: "normal",
              fontWeight: "normal",
            },
*/

            roundIncluded: "yes",
            shadow: "yes",
            "text-align": "center",


          }
        }
      }
    }
  }
}
</script>

