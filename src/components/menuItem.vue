<template>
  <span>
    <span  :style="itemStyle"  @mouseover="hoverStyle" @mouseleave="normalStyle" @click="processClick" class="itemClass" v-if="this.thisItemDirection===this.HOROZONTAL">
      {{this.itemLabel}}
    </span>
    <span  :style="itemStyle"  @mouseover="hoverStyle" @mouseleave="normalStyle" @click="processClick" class="itemClass" v-if="this.thisItemDirection===this.VERTICAL">
      {{this.itemLabel}}
      <BR/>
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
    if(typeof(this.thisItem.direction)!='undefined'){
      if (this.thisItem.direction=='V'){
        this.thisItemDirection=this.VERTICAL;
      }
    }
  },
  data(){
    return {
      itemType:0,
      itemStyle:'',
      itemLabel:'',
      itemValue:'',
      VERTICAL:1,
      HOROZONTAL:0,
      thisItemDirection:0

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
