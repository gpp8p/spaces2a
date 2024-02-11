<template>
  <span>
    <span  :style="itemStyle"  @mouseover="hoverStyle" @mouseleave="normalStyle" @click="processClick" class="itemClass" v-if="this.linkType==this.LINK_INTERNAL">
      {{this.thisItem.label}}
    </span>
    <span  @click="processClick" class="itemClass" v-if="this.linkType==this.LINK_EXTERNAL">
      <a :style="itemStyle"  @mouseover="hoverStyle" @mouseleave="normalStyle" v-bind:href="this.thisItem.linkUrl" target="_blank" >{{this.thisItem.label}}</a>
    </span>
  </span>

</template>

<script>
import utils from './utils.vue';
export default {
  name: "mItem",
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
    this.itemLabel = this.thisItem.label;
    this.itemValue = this.thisItem.action;
//    console.log('linkType-',this.thisItem.linkType, this.itemLabel );
    if(typeof(this.thisItem.linkType)=='undefined'|| this.thisItem.linkType==0){
      this.linkType = this.LINK_INTERNAL;
    }else{
      this.linkType = this.thisItem.linkType;
      this.linkUrl = this.thisItem.linkUrl;
    }
    console.log('itemStyle =',this.itemStyle);
    console.log('itemLabel - ',this.thisItem.label);
    console.log('linkType-', this.linkType);
  },
  data(){
    return {
      linkType:0,
      LINK_INTERNAL:0,
      LINK_EXTERNAL:1,
      linkUrl:'',
      itemStyle:'',
      itemLabel:'',
      itemValue:''
    }
  },
  methods:{
    processClick(){
      debugger;
//      this.$emit('cevt',['menuItemSelected', this.cmdObject.value]);
      if(typeof(this.thisItem.linkType)=='undefined'){
        if(typeof(this.thisItem.actionMethod)!='undefined'){
          this.$emit('cevt',['menuItemSelected',this.thisItem.action, this.name,this.thisItem.actionMethod]);
        }else{
          this.$emit('cevt',['menuItemSelected',this.thisItem.action, this.name]);
        }
      }else if(this.thisItem.linkType==this.LINK_INTERNAL){
        this.$emit('cevt',['menuItemSelected',this.thisItem.action, 'internal_link']);
      }else{
        this.$emit('cevt',['menuItemSelected',this.linkUrl, 'external_link']);
      }

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
a {
  text-decoration: none;
  color: blue;
}
</style>

