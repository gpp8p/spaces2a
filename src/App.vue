<template>
  <body class="noScroll">
    <span class="layoutScreen">
      <section class="navbar">
        <mainNavigationArea
          name="mainNavArea"
          @cevt="handleEvt"
        ></mainNavigationArea>
      </section>
      <dialog2
          v-if="this.showDialog==true"
          :config="dialogConfiguration"
          name="mainDialog"
          :key="dialogReload"
          @cevt="handleEvt"
      ></dialog2>
      <linkEditor
          v-if="this.showLinkEditor==true"
          :config="linkEditorConfiguration"
          name="linkEditor"
          :key="dialogReload"
          @cevt="handleEvt"
      ></linkEditor>
      <section class="content">
        <Page v-if="this.mode==this.SHOW_PAGE"
              name ='mainPage'
              :config="pageConfiguration"
              @cevt="handleEvt"
              :key="pageReload"
              :is-draggable=false
        ></Page>
      </section>

    </span>
  </body>
</template>
<script>
import Vue from 'vue';
import Oruga from '@oruga-ui/oruga';
import '@oruga-ui/oruga/dist/oruga.css';
Vue.use(Oruga);
import store from './store';
import utils from './components/utils.vue';
//import eGrid from './components/eGrid.vue';
import switchBoard from './components/switchBoard.vue';
import Page from "./components/Page.vue";
//import Menu from './components/menu.vue';
import dialog2 from './components/dialog2';
import linkEditor from './components/linkEditor';
import mainNavigationArea from "./components/mainNavigationArea.vue";
//import dummy from "./components/dummy.vue";
import '@oruga-ui/oruga-next/dist/oruga.css';
import '@oruga-ui/oruga-next/dist/oruga-full-vars.css'

export default{
  name: "App",
  mixins: [utils, switchBoard],
  components: { mainNavigationArea, dialog2, linkEditor, Page},
  created() {
//    debugger;
    console.log('entry path is - ', this.$route.path);
    console.log('fullPath is - ', this.$route.fullPath);
    console.log('current href is -', window.location.href);
//    store.commit('setUrlBase', 'http://localhost:8080/');
//    store.commit('setApiBase', 'http://localhost:8000/');

    var thisHref = window.location.href;
    if(thisHref.includes('localhost')){
      store.commit('setUrlBase', 'http://localhost:8080/');
      store.commit('setApiBase', 'http://localhost:8000/');
      store.commit('setHelpUrl', 'http://localhost/spaces/2/54.html')
    }else{
      store.commit('setUrlBase', 'https://sptests.org:8080/');
      store.commit('setApiBase', 'https://sptests.org:8000/');
      store.commit('setHelpUrl','https://sptests.org/spaces/2/3.html');
    }
    console.log('urlBase is - ', this.$store.getters.getUrlBase);
    console.log('apiBase is - ', this.$store.getters.getApiBase);
    console.log('helpUrl is -', this.$store.getters.getHelpUrl);
    var pathArray=this.$route.path.substring(1).split('/');
    console.log('current pathArray-', pathArray);
    if(pathArray.length==3 && pathArray[0]=='target'){
      console.log('this is a protected page link from static html');
      console.log(pathArray);
      store.commit('setDefaultOrg', pathArray[1]);
      store.commit("setOrgId", pathArray[1]);
      store.commit('setDirectLoginLink', pathArray[2]);
    }else{
      console.log('this is a normal login');
      console.log('pathArray[0]', pathArray[0], pathArray[0].length);
      console.log('current layoutId',this.$store.getters.getCurrentLayoutId);
      if(pathArray[0].length>0){
        if(pathArray[0]=="dist"){
          pathArray=[""];
          store.commit('setDefaultOrg', 'root');
          console.log('default org set to root');
        }else{
          store.commit('setDefaultOrg', pathArray[1]);
          console.log('default org set to --', pathArray[1])
        }
      }else{
        store.commit('setDefaultOrg', 'root');
      }
    }
    console.log("pathArray - ", pathArray);

//    window.addEventListener("resize", this.resizeHandler);
    console.log('logStatus-', this.$store.getters.getLogStatus);
//    this.setMenu('testMenu1');
  },
  mounted(){
    this.setScreenDimensions();
//    this.cmdHandlers['mainNavArea'](['setMenu', 'adminLogged','topLevelMenu']);
    this.doShowLogin(this);
  },
  methods:{
    setScreenDimensions(){
//      debugger;
      console.log('in setScreenDimensions-', this.screenRows, this.screenColumns);
      var screenWidth = window.outerWidth;
      var screenHeight = window.outerHeight;
      var windowWidth=Math.round(screenWidth*this.widthFraction);
      var contentHeight=Math.round(screenHeight*this.contentHeightFraction);
      var navHeight=Math.round(screenHeight*this.navbarHeightFraction);
      var heightContent = contentHeight+'px';
      var widthContent = windowWidth+'px';
      var heightNav = navHeight+'px';
      let root = document.documentElement;
      console.log('current stored contentHeight-', this.$store.getters.getContentHeight);
      root.style.setProperty('--contentHeight', heightContent);
      store.commit('setContentHeight', contentHeight);
      root.style.setProperty('--contentWidth', widthContent);
      store.commit('setContentWidth', windowWidth);
      root.style.setProperty('--navBarHeight', heightNav);
      console.log('sApp created creenWidth-',screenWidth);
    },
    evtOpt(msg){
//      console.log('evtOpt in App', msg);
      this.evtHandler(msg, this);
    },
/*
    handleEvt(msg){
      console.log('in app cevt:',msg);
//      debugger;
      this.evtHandler(msg, this);
    },
*/
  },

  data(){
    return {
      screenRows:0,
      screenColumns:0,
      widthFraction: 0.93,
      contentHeightFraction: 0.75,
      navbarHeightFraction:0.06,
      cmdHandlers:{},
      dialogConfiguration:{},
      linkEditorConfiguration:{},
      showDialog:false,
      showLinkEditor:false,
      mode:0,
      SHOW_PAGE:1,
      dialogReload:0,
      pageReload:0,
      pageConfiguration:{},
      PAGE_DISPLAY:1,
      PAGE_EDIT:2,
      PAGE_LOAD_EDIT:3,
      PAGE_LOAD_DISPLAY:4,
    }
  }
}
</script>
<style>
:root {
  --contentHeight:0px;
  --contentWidth:0px;
  --navBarHeight:0px;

  --oruga-table-color: blue;
  --oruga-table-background-color: lavendar;
  --oruga-color-primary: green;
  --oruga-color-danger: red;
  --oruga-table-row-active-background-color:green;
  --oruga-table-hoverable-background-color:red;
  --oruga-table-row-active-color:red;
  --oruga-button-height:18px;


  --oruga-dropdown-menu-background: #ffcd90;
  --oruga-dropdown-item-hover-background-color:red;
  --oruga-dropdown-menu-box-shadow:10px 5px 5px grey;
  --oruga-dropdown-menu-border-radius:3px;


}

.noScroll {

}

.layoutScreen {
  position: static;
}
.content {
  margin-left: 2%;
  margin-top: 2px;
  height: var(--contentHeight);
  width: var(--contentWidth);
  background-color: #dbddd0;
  border-radius: 4px;
  border-width: 2px;
  border-style: solid;
  border-color: #0a3aff;
  padding-top: 8px;
  padding-left:2px;
  overflow-y: scroll;



}
.navbar {
  margin-left: 2%;
  height: var(--navBarHeight);
  width: var(--contentWidth);
  background-color: #ffcd90;
  border-radius: 4px;
  border-width: 2px;
  border-style: solid;
  border-color: #0a3aff;
  text-align: left;
  padding-top: 8px;
  padding-left: 2px;
}

</style>
