<template>
  <span>
    <ul>
       <component v-for="(item, index) in currentItems.items"
                  :is="item.type"
                  :thisItem="item"
                  :itemConfig="currentItems"
                  :key="index"
                  :name="item.action"
                  @cevt="handleEvt"
       >
      </component>
    </ul>
  </span>
</template>

<script>
import utils from '../components/utils.vue';
import mItem from "@/components/mItem";
import dropDownMenuItem from "@/components/dropDownMenuItem";
export default {
  name: "menuItemsNewVertical",
  mixins: [utils],
  components :{mItem, dropDownMenuItem},
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
    console.log('menuItemsNew attrs',this.$attrs.currentItems);
    if(typeof(this.$attrs.currentItems)!='undefined'){
      this.currentItems = this.$attrs.currentItems;
    }
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
ul {
  list-style-type: none;
}

</style>

