import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    matrixSaved: false,
    currentMatrix: [],
    urlBase:'',
    apiBase:'',
    helpUrl:'',
    org_id:0,
    default_org:'root',
    directLoginLink:0,
    logStatus:0,
    org_home:0,
    loggedInUserId: '',
    is_admin: 0,
    currentLayoutId:0,
    perms: {},
    contentHeight:0,
    contentWidth:0
  },
  mutations: {
    setMatrixSaved(state, matrixSaved){
      state.matrixSaved = matrixSaved;
    },
    setCurrentMatrix(state, currentMatrix){
      state.currentMatrix = currentMatrix;
    },
    setUrlBase(state, urlBase){
      state.urlBase = urlBase;
    },
    setApiBase(state, apiBase){
      state.apiBase = apiBase;
    },
    setHelpUrl(state, helpUrl){
      state.helpUrl = helpUrl;
    },
    setDefaultOrg(state, defaultOrg){
      state.default_org = defaultOrg;
    },
    setOrgId(state, orgId){
      state.org_id = orgId;
    },
    setDirectLoginLink(state, directLoginLink){
      state.directLoginLink = directLoginLink;
    },
    setLogStatus(state, logStatus){
      state.logStatus = logStatus;
    },
    setOrgHome(state, orgHome){
      state.org_home = orgHome;
    },
    setLoggedInUserId(state, loggedInUserId){
      state.loggedInUserId = loggedInUserId;
    },
    setIsAdmin(state, isAdmin){
      state.is_admin = isAdmin;
    },
    setCurrentLayoutId(state, currentLayoutId){
      state.currentLayoutId = currentLayoutId;
    },
    setPerms(state, currentPerms){
      state.perms=currentPerms;
    },
    setContentHeight(state, contentHeight){
      state.contentHeight=contentHeight;
    },
    setContentWidth(state, contentWidth){
      state.contentWidth = contentWidth;
    }




  },
  getters: {
    getMatrixSaved(state){
      return state.matrixSaved;
    },
    getCurrentMatrix(state){
      return state.currentMatrix;
    },
    getUrlBase(state){
      return state.urlBase
    },
    getApiBase(state){
      return state.apiBase
    },
    getHelpUrl(state){
      return state.helpUrl
    },
    getDefaultOrg(state){
      return state.default_org;
    },
    getOrgId(state){
      return state.org_id
    },
    getDirectLoginLink(state){
      return state.directLoginLink
    },
    getLogStatus(state){
      return state.logStatus;
    },
    getOrgHome(state){
      return state.org_home;
    },
    getLoggedInUserId(state){
      return state.loggedInUserId;
    },
    getIsAdmin(state){
      return state.is_admin;
    },
    getCurrentLayoutId(state){
      return state.currentLayoutId
    },
    getPerms(state){
      return state.perms
    },
    getContentHeight(state){
      return state.contentHeight;
    },
    getContentWidth(state){
      return state.contentWidth;
    },

  }

})
