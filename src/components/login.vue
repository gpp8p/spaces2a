<template>
  <span>
    <span v-if="this.logStatus==this.NOT_LOGGED_IN">Please Log In</span>
    <span v-if="this.logStatus==this.LOGGED_IN">Welcome {{this.userName}}</span>
  </span>
</template>

<script>

import store from '../store';
import axios from "axios";
import utils from "@/components/utils";
export default {
  name: "login",

  props:{
    name:{
      type: String,
      required: true
    }
  },
  components: {},
  mixins: [utils],
  mounted(){
    console.log(this.name,' is mounted');
    this.$emit('cevt', ['setCmdHandler', this.handleCmd, this.name]);
  },
  beforeDestroy() {
    this.$emit('cevt', ['removeCmdHandler', this.handleCmd, this.name]);
  },
  data(){
    return {
      cmdHandlers:{},
      logStatus:0,
      loginEmail:'',
      loginPassword:'',
      userName:'',
      NOT_LOGGED_IN:0,
      LOGGED_IN:1,
      LOG_REJECT:2,
      ERROR:3,
      credentials:{}
    }
  },
  methods:{
//cmd handlers
    handleCmd(args){
      console.log(this.name, ' handleCmd', args);
      this.cmdHandler(args, this);
    },
    cmdHandler(args, self){
      if(args[2]==this.name){
        var cmdType ={
          'loginVerify': function(args, self){
            console.log('cmdHandler in login - loginVerify', args, self);
            self.doLoginVerify(args, self);

          },
          'default': function(context, args){
            console.log('cmdHandler in dummy - something else', args, context);
          },
          'registerUser': function(args, self){
            console.log('cmdHandler in login - registerUser', args, self);
          },
        }
        if(typeof(cmdType)!='undefined'){
          try {
            (cmdType[args[0]](args, self));
          } catch (e) {
            console.log('unknown cmd -',args, this.name);
            console.log('unknown cmd -',args, this.name);
            var availableHandlers = Object.keys(this.cmdHandlers);
            console.log('available cmd handlers-',availableHandlers);

            if(availableHandlers.length>0){
              for(var a=0;a<availableHandlers.length;a++){
                debugger;
                this.cmdHandlers[availableHandlers[a]]([args[2], args[1], args[2]]);
              }
            }
          }
        }
      }
    },
    doLoginVerify(args, self){
      console.log('login - loginVerify-', args, self);
      debugger;
      this.sendLogin(args[1][1].loginEmail, args[1][1].loginPassword, this.setStatus);
    },
    sendLogin(email, password, setStatusMethod){
      debugger;
      console.log('sendLogin - ',email,password, setStatusMethod, this.$store.getters.getDefaultOrg);
      var apiPath = this.$store.getters.getApiBase;
      console.log('apiPath - ',apiPath);
      axios.post(apiPath+'api/auth/login?XDEBUG_SESSION_START=14427', {
//                axios.post('http://localhost:8000/api/auth/login?XDEBUG_SESSION_START=14427', {
        email: email,
        password: password,
        default_org: this.$store.getters.getDefaultOrg,
      }).then(response=>
      {
        if(response.data.resultType==='Ok'){
          debugger;
          this.credentials.bearerToken = response.data.access_token;
          this.credentials.loggedInUser = response.data.userName;
          this.credentials.loggedInUserId = response.data.userId;
          this.credentials.is_admin = response.data.is_admin;
//                        console.log('access token',response.data.access_token);
          axios.defaults.headers.common['Authorization'] = `Bearer ${this.credentials.bearerToken}`;

          sessionStorage.setItem('bearerToken', this.credentials.bearerToken);
          sessionStorage.setItem('loggedInUser', this.credentials.loggedInUser);
          sessionStorage.setItem('is_admin', this.credentials.is_admin);
          sessionStorage.setItem('loggedInUserId', this.credentials.loggedInUserId);
          sessionStorage.setItem('default_org', this.$store.getters.getDefaultOrg);
          sessionStorage.setItem('org_id', response.data.orgId);


          store.commit('setOrgId', response.data.orgId);
          store.commit('setOrgHome', response.data.orgHome);
          store.commit('setLoggedInUserId', response.data.userId);
          store.commit('setIsAdmin', response.data.is_admin);
          store.commit('setCurrentLayoutId', response.data.orgHome);
          store.commit('setPerms', response.data.loginPerms);
          console.log('login successful');
          this.userName = response.data.userName;
          console.log(response.data);
          this.$emit('cevt',['loggedIn',response.data.loginPerms, response.data.is_admin]);
          setStatusMethod(this.LOGGED_IN);
        }else{
//                        debugger;
          console.log(response.data.resultType);
          this.$emit('cevt', ['logError',response.data.resultType]);
        }
      }).catch(function(error) {
//                    debugger;
        console.log(error);
        setStatusMethod(-1);
      });
    },

// put do cmds here

//event handler
    evtOpt(msg){
      console.log('evtOpt in menu', msg);
      this.evtHandler(msg, this);
    },
    evtHandler(msg, self){
      console.log('evtHandler in login-', msg, self);
      debugger;
      var evtType = {
        'setCmdHandler': function(msg, context){
          //console.log('evtHandler - a menu event', msg);
          context.doSetCmdHandler(msg, context);
        },
        'removeCmdHandler': function(msg, context){
          context.doRemoveCmdHandler(msg, context);
        },
        'default': function(msg, context){
          console.log('evtHandler in menu  - something else', msg, context);
        }
      }
      if(typeof(evtType)!='undefined'){
        try {
          (evtType[msg[0]](msg, self));
        } catch (e) {
          this.$emit('cevt', msg);
        }
      }
    },
    doSetCmdHandler(msg, context){
      debugger;
      console.log('doSetCmdHandler-',msg, context);
      this.cmdHandlers[msg[2]]=msg[1];
    },
    doRemoveCmdHandler(msg, context){
      console.log('doRemoveCmdHandler-',msg, context);
      delete(this.cmdHandlers[msg[2]]);
    },
    setStatus(newStatus){
      this.logStatus = newStatus;
    },


  }
}
</script>

<style scoped>

</style>

