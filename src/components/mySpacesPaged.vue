<template>
  <span class="tablePlusPager">
      <tableWrapper
          :cmdObject = "configObject"
          :key = "reloadKey"
          @cevt="handleEvt"
      ></tableWrapper>
    <pagination
        :totalPages="10"
        :perPage="10"
        :currentPage="currentPage"
        @pagechanged="onPageChange"
    ></pagination>
  </span>
</template>

<script>
import utils from '../components/utils.vue';
import axios from "axios";
import tableWrapper from '../components/tableWrapper.vue';
import pagination from '../components/Pagination.vue';
// eslint-disable-next-line no-unused-vars
import store from "@/store";

export default {
  name: "mySpaces",
  props: {
    name: {
      type: String,
      required: true
    },
    cmdObject: {
      type: Object,
      required: false
    }
  },
  components: {tableWrapper, pagination},
  mixins: [utils],
  mounted() {
    console.log(this.name, ' is mounted');
    debugger;
    this.$emit('cevt', ['setCmdHandler', this.handleCmd, this.name]);
    this.configObject = this.cmdObject;
    this.configObject.perPage = this.cmdObject.perPage;
    this.countMySpaces();
    this.getMySpacesPaged();
  },
  beforeDestroy() {
    this.$emit('cevt', ['removeCmdHandler', this.handleCmd, this.name]);
  },
  data() {
    return {
      cmdHandlers: {},
      leafComponent: false,
      reloadKey: 0,
      configObject: {},
      limit: 80,
      offset: 0,
      spacesCount: 0
    }
  },
  methods: {
//cmd handlers
    handleCmd(args) {
      console.log(this.name, ' handleCmd', args);
      this.cmdHandler(args, this);
    },
    cmdHandler(args, self) {
      if (args[2] == this.name || this.leafComponent == false) {
        var cmdType = {
          'default': function (context, args) {
            console.log('cmdHandler in dummy - something else', args, context);
          }
        }
        if (typeof (cmdType) != 'undefined') {
          try {
            (cmdType[args[0]](args, self));
          } catch (e) {
            console.log('unknown cmd -', args, this.name);
            console.log('unknown cmd -', args, this.name);
            var availableHandlers = Object.keys(this.cmdHandlers);
            console.log('available cmd handlers-', availableHandlers);

            if (availableHandlers.length > 0) {
              for (var a = 0; a < availableHandlers.length; a++) {
                //                       debugger;
                this.cmdHandlers[availableHandlers[a]]([args[0], args[1], args[2]]);
              }
            }
          }
        }
      }
    },
// put do cmds here

//event handler
    evtOpt(msg) {
      console.log('evtOpt in menu', msg);
      this.evtHandler(msg, this);
    },
    evtHandler(msg, self) {
      console.log('evtHandler in- (set this)', msg, self);
//      debugger;
      var evtType = {
        'setCmdHandler': function (msg, context) {
          //console.log('evtHandler - a menu event', msg);
          context.doSetCmdHandler(msg, context);
        },
        'removeCmdHandler': function (msg, context) {
          context.doRemoveCmdHandler(msg, context);
        },
        'pageSelected': function (msg, context) {
          context.doPageSelected(msg, context);
        },
        'default': function (msg, context) {
          console.log('evtHandler in menu  - something else', msg, context);
        }
      }
      if (typeof (evtType) != 'undefined') {
        try {
          (evtType[msg[0]](msg, self));
        } catch (e) {
          this.$emit('cevt', msg);
        }
      }
    },
    doSetCmdHandler(msg, context) {
//      debugger;
      console.log('doSetCmdHandler-', msg, context);
      this.cmdHandlers[msg[2]] = msg[1];
    },
    doRemoveCmdHandler(msg, context) {
      console.log('doRemoveCmdHandler-', msg, context);
      delete (this.cmdHandlers[msg[2]]);
    },
    doPageSelected(msg, context) {
      console.log('doPageSelected-', msg, context);
      this.$emit('cevt', ['pageSelected', msg[1].id]);
    },
    getMySpacesPaged() {
      var apiPath = this.$store.getters.getApiBase;
      console.log('apiPath - ', apiPath);
      axios.get(apiPath + 'api/shan/getMySpacesPaged?XDEBUG_SESSION_START=15122"', {
//    axios.get('http://localhost:8000/api/shan/getMySpaces?XDEBUG_SESSION_START=15122"', {
        params: {
          orgId: this.$store.getters.getOrgId,
          userId: this.$store.getters.getLoggedInUserId,
          limit: this.limit,
          offset: this.offset
        }
      }).then(response => {
        debugger;
        console.log('getMySpaces', response);
//        this.data=response.data;
        this.configObject.fieldValue = response.data;
        this.reloadKey += 1;
      }).catch(e => {
        console.log(e);
      });
    },
    countMySpaces() {
      var apiPath = this.$store.getters.getApiBase;
      console.log('apiPath - ', apiPath);
      axios.get(apiPath + 'api/shan/countMySpaces?XDEBUG_SESSION_START=15122"', {
//    axios.get('http://localhost:8000/api/shan/getMySpaces?XDEBUG_SESSION_START=15122"', {
        params: {
          orgId: this.$store.getters.getOrgId,
          userId: this.$store.getters.getLoggedInUserId,
        }
      }).then(response => {
        debugger;
        console.log('pages count-',response.data);
        this.spacesCount = response.data[0].count;
      }).catch(e => {
        console.log(e);
      });

    }
  }
}
</script>

<style scoped>
.tablePlusPager {
    display: grid;
    grid-template-rows: 90% 10%;
    grid-template-columns: 100%;
}

</style>

