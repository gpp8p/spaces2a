<template>
  <span>
    <button :class="buttonClass" :style="buttonStyle" type="button" @mouseover="mouseOver" @mouseleave="mouseLeave" @click="buttonClicked">{{this.buttonLabel}}</button>
  </span>
</template>

<script>
import utils from './utils.vue';
export default {
name: "vbutton",
  extends: utils,
  props: {
    cmdObject: {
      type: Object,
      required: false
    },
    cmdObjectVersion: {
      type: Number,
      required: false
    },
    name:{
      type: String,
      required: false
    }
  },
  created(){
    debugger;
/*
    var cmdObjectKeys = Object.keys(this.cmdObject[this.name].style);
    var newStyle = '';
    for(var d = 0; d< cmdObjectKeys.length; d++){
      newStyle = newStyle + cmdObjectKeys[d]+': '+ this.cmdObject[this.name][cmdObjectKeys[d]]+';';    }
    this.buttonStyle = newStyle;

 */
    this.buttonClass = this.cmdObject.class;
    this.buttonLabel = this.cmdObject.label
    if(typeof(this.cmdObject.style)!='undefined'){
      this.buttonStyle = this.cmdObject.style;
    }
  },
  methods:{
    buttonClicked(){
      this.$emit('cevt',['buttonClicked',this.name]);
    },
    mouseOver(){
      this.buttonStyle=this.cmdObject.hoverStyle;
    },
    mouseLeave(){
      this.buttonStyle=this.cmdObject.style;
    }
  },
  data(){
    return {
      buttonStyle:'',
      buttonClass:'',
      buttonLabel:''
    }
  }
}
</script>

<style scoped>



</style>
