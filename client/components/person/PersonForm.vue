<template>

  <!-- inicio do template -->
        
        <!-- modal form - inicio -->
        <v-dialog
          :value="isEdit || isNew || isShow"
          max-width="500px"
          @outside="close()"
          @input="v => v || close()"
        >
          <v-card>

            <v-form
              ref="form"
              v-model="isValid"
              lazy-validation
              @submit.prevent="submit"
            >

            <v-card-title>
              <span class="headline">{{ dialogTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                    cols="12"
                    sm="12"
                    md="12"
                  >
                    <v-text-field
                      v-model="dataItem.name"
                      label="Nome"
                      :rules="[v => !!v || 'Nome é obrigatório']"
                      :disabled="disabled"
                    ></v-text-field>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col
                    cols="6"
                    sm="6"
                    md="6"
                  >
                  Altura (em cm)
                    <v-text-field
                      v-model="dataItem.height"
                      type="number"
                      label="Altura"
                      :rules="[v => !!v || 'Altura é obrigatório']"
                      :disabled="disabled"
                    ></v-text-field>
                  </v-col>

                  <v-col
                    cols="6"
                    sm="6"
                    md="6"
                  >
                  Peso (em kg)
                    <v-text-field
                      v-model="dataItem.weight"
                      type="number"
                      label="Peso"
                      :rules="[v => !!v || 'Peso é obrigatório']"
                      :disabled="disabled"
                    ></v-text-field>
                  </v-col>

                </v-row>

                <v-row>

                   <v-col
                    cols="6"
                    sm="6"
                    md="6"
                  >
                  <v-checkbox 
                    v-model="dataItem.athlete"
                    :label="'é Atleta'"  
                    :disabled="disabled"
                    v-bind:false-value="false"
                    v-bind:true-value="true"
                  ></v-checkbox>
                  </v-col>

                   <v-col
                    cols="6"
                    sm="6"
                    md="6"
                  >
                  <v-checkbox 
                    v-model="dataItem.lactose_intolerance"
                    :label="'é Intolerante a Lactose'"  
                    :disabled="disabled"
                    color="success"
                    v-bind:false-value="false"
                    v-bind:true-value="true"
                  ></v-checkbox>
                  </v-col>

                </v-row>

               

              </v-container>
            </v-card-text>


            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="close"
              >
                Fechar
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                type="submit"
                v-if="isForm"
              >
                Salvar
              </v-btn>
            </v-card-actions>
            
            </v-form>
          </v-card>
        </v-dialog>
        <!-- modal form - fim -->
  
</template>

<script>

import { mapState, mapMutations, mapActions, mapGetters } from "vuex";

  export default {
    props: {

    },
    data () {
      return {
        label: 'Pessoa',
        isValid: '',
        dataItem:{},
      }
    },
    created () {
      
    },
    beforeDestroy(){
    
    },
    updated () {

    },
    mounted () {
    
    },
    computed: {
      ...mapState({
        isNew: state => state.person.create,
        isEdit: state => state.person.edit,
        isShow: state => state.person.show,
        isForm: state => state.person.form,
      }),
      ...mapGetters({
        item: "person/item",//item selecionado
        indexItem: "person/indexItem",
        hasItem: "person/hasItem",
      }),
      dialogTitle () {

        let mode;
        
        if( this.isNew ) mode = 'Nova';
        if( this.isEdit ) mode = 'Editar';
        if( this.isShow ) mode = 'Visualizar';

        return mode + ' ' + this.label;

      },
      disabled () {
        return this.isShow;
      },
    },
    methods: {

      close () {
        
        this.$store.dispatch('person/reset');
        
      },

      submit () {

        if (this.$refs.form.validate()) {

          let mode = 'update'

          if(this.isNew) mode = 'store'        

          this.$nextTick(() => {
            this.$store.dispatch('person/'+mode, this.dataItem);      
          })
          
        }
      },
    },
    watch: {
      isForm(val) {

        this.dataItem = {};

        if(this.hasItem){

          this.dataItem = {
            name: this.item.name,
            height: this.item.height,
            weight: this.item.weight,
            lactose_intolerance: this.item.lactose_intolerance,
            athlete: this.item.athlete
          };

          if(this.item.id!=undefined) this.dataItem.id = this.item.id
        }
      },
      isShow(val) {
        this.dataItem = this.item
      }
    },
  }
</script>
<style>

  tbody tr:nth-of-type(odd) {
    background-color: rgba(0, 0, 0, .05);
  }

</style>
