<script>
export default {
name: "menuDefinitionsNew",
  methods: {
    getMenuOpts(menuContext) {
//      debugger;
      switch (menuContext) {
        case 'testMenu1': {
          return {
            items: [
              {
                label:'Page Setup',
                action: 'pageSetup',
                type: 'mItem'
              },
              {
                label:'New Card',
                action: 'newCard',
                type: 'mItem'
              }
            ],
            currentSelectedMenuOption: 'pageSetup',
            style: 'color:blue; font-family: Geneva; font-size: 14px;',
            hoverStyle: 'color:red; font-family: Geneva; font-size: 14px;',
            menuType: 'main'

          }
        }
        case 'adminLogged': {
          return {
            items: [
              {
                label:'Edit',
                action: 'editPage',
                type: 'mItem'
              },
              {
                label:'Delete',
                action: 'deletePage',
                type: 'mItem'
              },
              {
                label:'Publish',
                action: 'publish',
                type: 'mItem'
              },
              {
                label: 'Create',
                action: 'pageSetup',
                type: 'dropDownMenuItem',
                submenu: {
                  items:[
                    {
                      label: 'One Window Page',
                      action: 'oneWindow'
                    },
                    {
                      label: 'Long Page',
                      action: 'extPage'
                    },
                    {
                      label: 'Bulk Email Draft',
                      action: 'emailPage'
                    }
                  ]
                }
              },

/*
              {
                label:'Create',
                action: 'pageSetup',
                type: 'mItem'
              },

 */
              {
                label:'Access',
                action: 'pageAccess',
                type: 'mItem'
              },
              {
                label:'My Spaces',
                action: 'mySpaces',
                type: 'mItem'
              }
            ],
            currentSelectedMenuOption: 'pageSetup',
            style: 'color:blue; font-family: Geneva; font-size: 14px;',
            hoverStyle: 'color:red; font-family: Geneva; font-size: 14px;',
            menuType: 'main'

          }
        }
        case 'authorLogged': {
          return {
            items: [
              {
                label:'Edit',
                action: 'editPage',
                type: 'mItem'
              },
              {
                label:'Delete',
                action: 'deletePage',
                type: 'mItem'
              },
              {
                label:'Publish',
                action: 'publish',
                type: 'mItem'
              },
              {
                label:'Create',
                action: 'pageSetup',
                type: 'mItem'
              },
              {
                label:'Access',
                action: 'pageAccess',
                type: 'mItem'
              },
              {
                label:'My Spaces',
                action: 'mySpaces',
                type: 'mItem'
              }
            ],
            currentSelectedMenuOption: 'pageSetup',
            style: 'color:blue; font-family: Geneva; font-size: 14px;',
            hoverStyle: 'color:red; font-family: Geneva; font-size: 14px;',
            menuType: 'main'

          }
        }
        case 'userLogged': {
          return {
            items: [
            ],
            currentSelectedMenuOption: 'pageSetup',
            style: 'color:blue; font-family: Geneva; font-size: 14px;',
            hoverStyle: 'color:red; font-family: Geneva; font-size: 14px;',
            menuType: 'main'

          }
        }
        case 'loginMenu': {
          return {
            items: [
              {
                label:'Cancel',
                action: 'dismissDialog',
                type: 'mItem'
              },
              {
                label:'Login',
                action: 'loginVerify',
                type: 'mItem'
              },
              {
                label:'Continue As Guest',
                action: 'loginGuest',
                type: 'mItem'
              },
              {
                label:'Register',
                action: 'registerUser',
                type: 'mItem'
              },
            ],
            style: 'color:blue; font-family: Geneva; font-size: 10px;',
            hoverStyle: 'color:red; font-family: Geneva; font-size: 10px;',
            menuType: 'dialog'
          }
        }
        case 'insertCard': {
          console.log('insertCard menu');
          return {
            items: [
              {
                label:'Cancel',
                action: 'cancelCardInsert',
                type: 'mItem'
              }
            ],
            message: 'Drag your mouse to identify card area',
            currentSelectedMenuOption: 'pageSetup',
            style: 'color:blue; font-family: Geneva; font-size: 14px;',
            hoverStyle: 'color:red; font-family: Geneva; font-size: 14px;',
            messageStyle: 'color:blue; font-family: Geneva; font-size: 10px;',
            menuType: 'main'

          }
        }
        case 'editPage': {
          console.log('editPage menu');
          return {
            items: [
              {
                label:'Cancel',
                action: 'cancelCardInsert',
                type: 'mItem'
              },
/*
              {
                label: 'Add Card To Page',
                action: 'addCard',
                type: 'dropDownMenuItem',
                submenu: {
                  items:[
                    {
                      label: 'Headline Card',
                      action: 'headlineCard'
                    },
                    {
                      label: 'Navigation Menu',
                      action: 'navMenu'
                    },
                    {
                      label: 'Rich Text Card',
                      action: 'richText'
                    },
                    {
                      label: 'Image Card',
                      action: 'imageCard'
                    },
                    {
                      label: 'PDF',
                      action: 'pdfCard'
                    },
                    {
                      label: 'Your Tube Video',
                      action: 'youTube'
                    }
                  ]
                }
              },

 */
            ],
            message: 'Drag your mouse to identify card area',
            showMessage: true,
            currentSelectedMenuOption: 'pageSetup',
            style: 'color:blue; font-family: Geneva; font-size: 14px;',
            hoverStyle: 'color:red; font-family: Geneva; font-size: 14px;',
            messageStyle: 'margin-left: 40%; color:blue; font-family: Geneva; font-size: 14px;',
            menuType: 'main'

          }
        }
        case 'insertCardCancel': {
          console.log('insertCard menu');
          return {
            items: [
              {
                label:'Cancel',
                action: 'cancelCardInsert',
                type: 'mItem'
              }
            ],
            currentSelectedMenuOption: 'pageSetup',
            style: 'color:blue; font-family: Geneva; font-size: 14px;',
            hoverStyle: 'color:red; font-family: Geneva; font-size: 14px;',
            messageStyle: 'margin-left: 40%; color:blue; font-family: Geneva; font-size: 14px;',
            menuType: 'main'
          }
        }
        case 'dialogSubMenu1':{
          return {
            items: [
              {
                label:'Cancel',
                action: 'dismissDialog',
                type: 'mItem'
              },
              {
                label:'Configure Page',
                action: 'configurePage',
                type: 'mItem'
              }
            ],
            currentSelectedMenuOption: 'configurePage',
            style: 'color:blue; font-family: Geneva; font-size: 10px;',
            hoverStyle: 'color:red; font-family: Geneva; font-size: 10px;',
            menuType: 'dialog'
          }
        }
        case 'mySpacesMenu':{
          return {
            items: [
              {
                label:'Cancel',
                action: 'dismissDialog',
                type: 'mItem'
              }
            ],
            currentSelectedMenuOption: 'Appearence',
            style: 'color:blue; font-family: Geneva; font-size: 10px;',
            hoverStyle: 'color:red; font-family: Geneva; font-size: 10px;',
            menuType: 'dialog'
          }
        }
        case 'dialogSubMenu2':{
          return {
            items: [
              {
                label:'Save',
                action: 'saveScreenEntry',
                type: 'mItem'
              },
              {
                label:'Cancel',
                action: 'dismissDialog',
                type: 'mItem'
              }
            ],
            currentSelectedMenuOption: 'Appearence',
            style: 'color:blue; font-family: Geneva; font-size: 10px;',
            hoverStyle: 'color:red; font-family: Geneva; font-size: 10px;',
            menuType: 'dialog'

          }
        }
        case 'specifyCardDialogMenu':{
          return {
            items: [
              {
                label:'Choose This Card Type',
                action: 'createCard',
                type: 'mItem'
              },
              {
                label:'Cancel',
                action: 'dismissDialog',
                type: 'mItem'
              }
            ],
            currentSelectedMenuOption: 'Appearence',
            style: 'color:blue; font-family: Geneva; font-size: 10px;',
            hoverStyle: 'color:red; font-family: Geneva; font-size: 10px;',
            menuType: 'dialog'

          }
        }
        case 'headlineCardMenu':{
          return {
            items: [
              {
                label:'Configure',
                action: 'configureHeadlineCard',
                type: 'mItem'
              },
              {
                label:'Resize/Move',
                action: 'resizeHeadlineCard',
                type: 'mItem'
              },
              {
                label:'Delete',
                action: 'deleteHeadlineCard',
                type: 'mItem'
              },
              {
                label:'Edit',
                action: 'editHeadlineCard',
                type: 'mItem'
              },
              {
                label:'Exit',
                action: 'cardExitEdit',
                type: 'mItem'
              }
            ],
            currentSelectedMenuOption: 'Appearence',
            style: 'color:blue; font-family: Geneva; font-size: 10px;',
            hoverStyle: 'color:red; font-family: Geneva; font-size: 10px;',

          }
        }
        case 'configureNewCardMenu':{
          return {
            items: [
              {
                label:'Create This Card',
                action: 'createNewCard',
                type: 'mItem'
              },
              {
                label:'Cancel',
                action: 'dismissDialog',
                type: 'mItem'
              }
            ],
            currentSelectedMenuOption: 'Appearence',
            style: 'color:blue; font-family: Geneva; font-size: 10px;',
            hoverStyle: 'color:red; font-family: Geneva; font-size: 10px;',

          }
        }


      }
    }


  }


}
</script>

