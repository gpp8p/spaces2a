<template>
  <o-dropdown aria-role="list" @change="ddChanged" >
    <template #trigger="{ active }">
      <div class="ddClass">
        {{thisItem.label}}
        <o-icon
            variant="success"
            icon="menu-down"
            slot="trigger"
            role="button"
        >
        </o-icon>
      </div>
    </template>

      <o-dropdown-item v-for="(item, index) in thisItem.submenu.items"
                       :key="index"
                       @click="ddClicked(item.action)" class="ddClass">
        <span>{{item.label}}</span>

      </o-dropdown-item>


  </o-dropdown>
</template>

<script>
export default {
name: "pdTest",
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
  data(){
    return {
      vala:'a',
      valb:'b',
      valc:'c',
      returnValue :['a', 'b', 'c'],
      labels: ['return a', 'return b', 'return c'],
      items:[
        {
          label: 'return a',
          action: 'a'
        },
        {
          label: 'return b',
          action: 'b'
        },
        {
          label: 'return c',
          action: 'c'
        }
      ]
    }
  },
  methods:{
    ddClicked(m){
      console.log('dd was clicked!', m);
    },
    ddChanged(m){
      console.log('dd changed-', m);
    }
  }
}
</script>

<style scoped>

.dd1 {
  background-color: #0a3aff;
}

.ddClass {
  font-family: Helvetica;
  font-size: 16px;
  background-color: #ffcd90;
}

@import "https://cdn.jsdelivr.net/npm/@mdi/font@6.5.95/css/materialdesignicons.min.css";
</style>
