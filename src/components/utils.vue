<script>
export default {
  name: 'utils',
  methods: {
    handleEvt (msg) {
//      debugger;
//      console.log('handleEvt', msg);
      if (typeof (this.evtOpt) !== 'undefined') {
        this.evtOpt(msg)
      } else {
        this.$emit('cevt', msg);
      }
    },
  },
  data(){
    return {

    }
  },
  watch: {

  }
}
</script>
