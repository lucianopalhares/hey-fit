<template>
  <!-- inicio do template -->

        <!-- modal - inicio -->
        <v-dialog v-model="isDelete" max-width="500px">
          <v-card>
            <v-card-title>Tem certeza que quer excluir esta {{label}} ?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Cancelar</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">Sim</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <!-- modal - fim -->

</template>

<script>

import { mapState, mapMutations, mapActions, mapGetters } from "vuex";

  export default {
    props: {

    },
    data () {
      return {
        label: 'Pessoa',
      }
    },
    created () {
   
    },
    beforeDestroy(){
     
    },
    computed: {
      ...mapState({
        isDelete: state => state.person.delete,
      }),
      ...mapGetters({
        dataItem: "person/item",
        dataItemIndex: "person/indexItem"
      }),
    },
    methods: {

      close () {
        
        this.$store.dispatch('person/delete',false)

      },
      deleteItemConfirm () {

        this.$store.dispatch('person/deleteItem',this.dataItem)

      },
    },
    watch: {
      /*item (val) {
        this.dataItem = val
      }*/
    },
  }
</script>
<style>

tbody tr:nth-of-type(odd) {
  background-color: rgba(0, 0, 0, .05);
}

</style>