
<script>
export default {
name: "dialogDefinitions",
  methods: {
    getDialogDefinition(dialogName){
      switch(dialogName){
        case 'oneWindow':{
          return {
            oneWindow:{
              dialogStyle :{
                position:'fixed',
                top:'30%',
                left:'30%',
                height:'40vh',
                width:'50vw',
                backgroundColor:'lavender',
                color:'blue',
                borderRadius:'10px',
                boxShadow:'10px 10px 5px lightslategrey',
              },
              leafComponent: false,
              menuName:'dialogSubMenu2',
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
          return {
            configureHeadlineCard :{
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
              fields:[
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
                          fieldLabel:"Image",
                          val: "image",
                        },
                        {
                          fieldLabel: "Transparent",
                          val: "transparent",
                        },
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
                  fieldIdentifier: 'hasShadow',
                  name: "hasShadow",
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
                  fieldIdentifier: 'rCorners',
                  name: "rCorners",
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
                      val: 'smallBorder',
                      label: 'Small',
                      isDisabled: false,
                      isSelected: false
                    },
                    {
                      val: 'mediumBorder',
                      label: 'mediumBorder',
                      isDisabled: false,
                      isSelected: false
                    },
                    {
                      val: 'thickBorder',
                      label: 'Thick',
                      isDisabled: false,
                      isSelected: false
                    },
                  ],

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
        case 'headlineCard':{
          return {
            card_component: 'headlineCard',
            cardName: '',
            cardBackground: {
              backgroundType:"color",
              colorSelect:"#0a3aff",
            }
          }
        }

      }
    }
  }
}
</script>

