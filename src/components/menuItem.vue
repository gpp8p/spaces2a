<template>
  <span>
    <span  :style="itemStyle"  @mouseover="hoverStyle" @mouseleave="normalStyle" @click="processClick" class="itemClass">
      {{this.itemLabel}}
    </span>
  </span>

</template>

<script>
import utils from './utils.vue';
export default {
  name: "menuItem",
  mixins: [utils],
  props: {
    thisItem: {
      type: Object,
      required: false
    },
    itemConfig: {
      type: Object,
      required: true
    },
    name:{
      type: String,
      required: false
    },
  },
  mounted(){
//    debugger;
    this.itemStyle =  this.itemConfig.style;
    this.itemLabel = this.thisItem[0];
    this.itemValue = this.thisItem[1];
    console.log('itemStyle =',this.itemStyle);
  },
  data(){
    return {
      itemType:0,
      itemStyle:'',
      itemLabel:'',
      itemValue:''
    }
  },
  methods:{
    processClick(){
//      debugger;
//      this.$emit('cevt',['menuItemSelected', this.cmdObject.value]);
      this.$emit('cevt',['menuItemSelected',this.thisItem[1], this.name]);
    },
    hoverStyle(){
      this.itemStyle =  this.itemConfig.hoverStyle;
//      console.log('hover-', this.itemStyle);
    },
    normalStyle(){
      this.itemStyle =  this.itemConfig.style;
      //    console.log('normal-', this.itemStyle);
    }
  }
}
</script>

<style scoped>

</style>
