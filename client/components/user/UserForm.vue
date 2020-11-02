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
                    cols="8"
                    sm="6"
                    md="8"
                  >
                    <v-text-field
                      v-model="dataItem.name"
                      label="Nome"
                      :rules="[v => !!v || 'Nome é obrigatório']"
                      :disabled="disabled"
                    ></v-text-field>
                  </v-col>

                   <v-col
                    cols="4"
                    sm="6"
                    md="4"
                  >
                  <v-checkbox 
                    v-model="dataItem.is_admin"
                    :label="'é Admin'"  
                    :disabled="disabled"
                  ></v-checkbox>


                  </v-col>

                </v-row>

                <v-row>
                  <v-col
                    cols="12"
                    sm="6"
                    md="12"
                  >
                    <v-text-field
                      v-model="dataItem.email"
                      label="Email"
                      :rules="emailRules"
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
                    <v-text-field
                      v-model="dataItem.password"
                      type="password"
                      label="Senha"
                      :rules="passwordRules"
                      :disabled="disabled"
                    ></v-text-field>
                  </v-col>

                   <v-col
                    cols="6"
                    sm="6"
                    md="6"
                  >
                    <v-text-field
                      v-model="dataItem.confirmPassword"
                      type="password"
                      label="Confirme a Senha"
                      :rules="confirmPasswordRules.concat(passwordConfirmationRule)"   
                      :disabled="disabled"          
                    ></v-text-field>
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
                v-if="isNew || isEdit"
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
        label: 'Usuário',
        isValid: '',
        emailRules: [ 
          v => !!v || 'Email é obrigatório', 
          v => !v || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'Deve ser um email válido'
        ],
        passwordRules: [ 
          v => !!v || 'Senha é obrigatório', 
          v => (v && v.length >= 5) || 'Senha deve ter pelo menos 5 caracteres' 
        ],
        confirmPasswordRules: [v => !!v || "Senha é obrigatório"],
        validPassword: "",
        dataItem: {}
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
        isNew: state => state.user.create,
        isEdit: state => state.user.edit,
        isShow: state => state.user.show,
        isForm: state => state.user.form,
      }),
      ...mapGetters({
        item: "user/item",//item selecionado
        indexItem: "user/indexItem",
        hasItem: "user/hasItem",
      }),
      passwordConfirmationRule() {
        return () =>
          this.dataItem.password === this.dataItem.confirmPassword || "As senhas devem combinar";
      },
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
        
        this.$store.dispatch('user/reset');
        
      },

      submit () {

        if (this.$refs.form.validate()) {

          let mode = 'update'

          if(this.isNew) mode = 'store'        

          this.$nextTick(() => {
            this.$store.dispatch('user/'+mode, this.dataItem);      
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
            email: this.item.email,
            password: this.item.password,
            is_admin: this.item.is_admin
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

