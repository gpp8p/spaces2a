<template>
  <span class="layoutMenu">
       <menu-item v-for="(item, index) in currentItems.items"
                  :thisItem="item"
                  :itemConfig="currentItems"
                  :key="index"
                  :name="item[1]"
                  @cevt="handleEvt"
       >
      </menu-item>
  </span>
</template>

<script>
import utils from '../components/utils.vue';
import MenuItem from "@/components/menuItem";
export default {
  name: "menuItems",
  mixins: [utils],
  components :{MenuItem},
  props:{
    name:{
      type: String,
      required: true
    }
  },
  data(){
    return {
      currentItems:[],
    }
  },
  mounted(){
/*
    this.$nextTick(()=>{
      this.$emit('cevt', ['setCmdHandler', this.handleCmd, this.name]);
      console.log('menuItems is mounted');
    })
*/
    this.$emit('cevt', ['setCmdHandler', this.handleCmd, this.name]);
    console.log('menuItems is mounted');
  },
  beforeDestroy() {
    this.$emit('cevt', ['removeCmdHandler', this.handleCmd, this.name]);
  },
  methods:{
    handleCmd(msg){
      console.log('menu handleCmd', msg);
      this.cmdHandler(msg, this);
    },
    cmdHandler(msg, self){
 //     debugger;
//      console.log('menuItems cmdHandler-',msg[2], this.name);
      if(msg[2]==this.name){
        var cmdType ={
          'setCurrentItems': function(msg, context){
            context.doSetCurrentItems(msg, context);
          },
          'default': function(context, msg){
            console.log('cmdHandler in menuItems - something else', msg, context);
          }
        }
        if(typeof(cmdType)!='undefined'){
          (cmdType[msg[0]](msg, self) || cmdType['default'])();
        }
      }

    },
    doSetCurrentItems(msg, context){
//      debugger;
      context.currentItems=msg[1];
    }
  }
}
</script>

<style scoped>
.layoutMenu {
  display: flex;
  justify-content: space-evenly;
  height: 100%;
  width:100%;
  align-items: baseline;
  margin-top: 6px;
}

</style>
