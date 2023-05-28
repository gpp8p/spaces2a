<template>
  <body class="noScroll">
    <span class="layoutScreen">
      <section class="navbar">
        <mainNavigationArea
          name="mainNavArea"
          :config="pageConfiguration"
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
      <section class="content">
        <Page v-if="this.mode==this.SHOW_PAGE"
              name ='mainPage'
              @cevt="handleEvt"
              :is-draggable=false
        ></Page>
      </section>

    </span>
  </body>
</template>
<script>
import store from './store';
import utils from './components/utils.vue';
//import eGrid from './components/eGrid.vue';
import switchBoard from './components/switchBoard.vue';
import Page from "./components/Page.vue";
//import Menu from './components/menu.vue';
import dialog2 from './components/dialog2';
import mainNavigationArea from "./components/mainNavigationArea.vue";
//import dummy from "./components/dummy.vue";
export default{
  name: "App",
  mixins: [utils, switchBoard],
  components: { mainNavigationArea, dialog2, Page},
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
    if(pathArray.length==3 && pathArray[0]=='target'){
      console.log('this is a protected page link from static html');
      console.log(pathArray);
      store.commit('setDefaultOrg', pathArray[1]);
      store.commit("setOrgId", pathArray[1]);
      store.commit('setDirectLoginLink', pathArray[2]);
    }else{
      console.log('this is a normal login');
      console.log('current layoutId',this.$store.getters.getCurrentLayoutId);
      if(pathArray[0].length>0){
        if(pathArray[0]=="dist"){
          pathArray=[""];
          store.commit('setDefaultOrg', 'root');
        }else{
          store.commit('setDefaultOrg', pathArray[0]);
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
      dialogConfiguration:'',
      showDialog:false,
      mode:0,
      SHOW_PAGE:1,
      dialogReload:0,
      pageConfiguration:{}

    }
  }
}
</script>
<style>
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
