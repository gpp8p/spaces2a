<script>
export default {
  name: 'menuDefinitions',
  methods: {
    getMenuOpts(menuContext) {
              debugger;
      switch (menuContext) {
        case 'testMenu1': {
          return {
            items: [
              ['Page Setup', 'pageSetup'],
              ['New Card', 'newCard']
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
              ['Edit', 'editPage'],
              ['Delete', 'deletePage'],
              ['Publish', 'publish'],
              ['Create', 'pageSetup'],
              ['Access', 'pageAccess'],
              ['My Spaces', 'mySpaces'],
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
              ['Edit', 'editPage'],
              ['Delete', 'deletePage'],
              ['Create', 'pageSetup'],
              ['Access', 'pageAccess'],
              ['My Spaces', 'mySpaces'],
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
              ['Cancel', 'dismissDialog'],
              ['Login', 'loginVerify'],
              ['Continue As Guest', 'loginGuest'],
              ['Register', 'registerUser'],
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
              ['Cancel', 'cancelCardInsert']
            ],
            message: 'Drag your mouse to identify card area',
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
              ['Cancel', 'cancelCardInsert'],
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
              ['Cancel', 'dismissDialog']
            ],
            currentSelectedMenuOption: 'Appearence',
            style: 'color:blue; font-family: Geneva; font-size: 10px;',
            hoverStyle: 'color:red; font-family: Geneva; font-size: 10px;',
            menuType: 'dialog'
          }
        }
        case 'mySpacesMenu':{
          return {
            items: [
              ['Cancel', 'dismissDialog']
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
              ['Save', 'saveScreenEntry'],
              ['Cancel', 'dismissDialog'],
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
              ['Create Card', 'createCard'],
              ['Cancel', 'dismissDialog'],
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
