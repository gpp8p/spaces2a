<template>
    <span class="uploadWrapperStyle">

        <input type="file" id="file" ref="file" v-if="this.fileAlreadySelected==false" v-on:change="handleFileUpload()"/>
           <span >
                <select v-model="backgroundDisplayType" @change="displayTypeChange">
                  <option value="crop">Crop to Fit</option>
                  <option value="contain">Existing Size</option>
                  <option value="cover">Stretch</option>
                  <option value="repeat">Repeat</option>
                </select>
              </span>
        <span v-if="this.fileAlreadySelected==true">

          <o-button variant="primary" size="small" @click="changeImage">Change Image</o-button>
        </span>
        <span v-if="uploadStatus">
            Ok!
        </span>

    </span>
</template>

<script>
import utils from '../components/utils.vue';
import axios from "axios";

export default {
  name: "fileUpload",
  props:{
    name:{
      type: String,
      required: true
    },
    config:{
      type: Object,
      required: false
    }
  },
  components: {},
  mixins: [utils],
  mounted(){
    console.log(this.name,' is mounted');
    this.$emit('cevt', ['setCmdHandler', this.handleCmd, this.name]);
    if(typeof(this.config.imageUrl)!='undefined'){
      this.fileAlreadySelected=true;
    }
    if(typeof(this.config.backgroundDisplay)!='undefined'){
      this.backgroundDisplayType = this.config.backgroundDisplay;
    }

  },
  beforeDestroy() {
    this.$emit('cevt', ['removeCmdHandler', this.handleCmd, this.name]);
  },
  data(){
    return {
      cmdHandlers:{},
      leafComponent: false,
      fileAlreadySelected: false,
      uploadStatus: false,
      backgroundDisplayType:'',
    }
  },
  methods:{
//cmd handlers
    handleCmd(args){
      console.log(this.name, ' handleCmd', args);
      this.cmdHandler(args, this);
    },
    cmdHandler(args, self){
      if(args[2]==this.name || this.leafComponent==false){
        var cmdType ={
          'default': function(context, args){
            console.log('cmdHandler in dummy - something else', args, context);
          }
          /*  example
                    'setCardMode':function(args, context){
                      self.doSetCardMode(args, context);
                    }
          */
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
    evtOpt(msg){
      console.log('evtOpt in menu', msg);
      this.evtHandler(msg, this);
    },
    evtHandler(msg, self){
      console.log('evtHandler in- (set this)', msg, self);
//      debugger;
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
//      debugger;
      console.log('doSetCmdHandler-',msg, context);
      this.cmdHandlers[msg[2]]=msg[1];
    },
    doRemoveCmdHandler(msg, context){
      console.log('doRemoveCmdHandler-',msg, context);
      delete(this.cmdHandlers[msg[2]]);
    },

    handleFileUpload(){
      console.log('handleFileUpload called');
      this.file = this.$refs.file.files[0];
      this.submitFile();
    },
    changeImage(){
      this.fileAlreadySelected=false;
    },
    displayTypeChange(){
      debugger;
      console.log('display type changed-', this.backgroundDisplayType);
      this.$emit('cevt', ['fieldInput','backgroundDisplay', this.backgroundDisplayType]);
    },
    submitFile(){
      let formData = new FormData();
      formData.append('file', this.file);
      formData.append('org', this.$store.getters.getOrgId);
      formData.append('fileRole', 'backgroundImage');
// eslint-disable-next-line no-debugger
      debugger;
      var apiPath = this.$store.getters.getApiBase;
      console.log('apiPath - ',apiPath);

      axios.post( apiPath+'api/shan/fileUpload?XDEBUG_SESSION_START=15617',
//                axios.post( 'http://localhost:8000/api/shan/fileUpload?XDEBUG_SESSION_START=15617',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
      ).then(response=>{
// eslint-disable-next-line no-console
        debugger;
        this.returnedData = response.data;
        this.$emit('cevt', ['fieldInput','backgroundType', 'image', this.returnedData]);
        this.$emit('cevt', ['fieldInput','backgroundImage', this.returnedData]);
        this.$emit('cevt', ['fieldInput','backgroundDisplay', this.backgroundDisplayType]);
        console.log('SUCCESS!!'+response.data);
        this.uploadStatus=false;
      }).catch(function(error){
            debugger;
        console.log('FAILURE!!'+error);
      });
    },

  }
}
</script>

<style scoped>
.uploadWrapperStyle{
  padding-top: 10px;
}
</style>
