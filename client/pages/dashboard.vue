<template>
  <div>
    
      <v-banner
        single-line
        color="secondary"
      >
        <v-icon
          slot="icon"
          color="warning"
          size="36"
        >
          mdi-apple-finder
        </v-icon>
        Dashboard
    
      </v-banner>

      <v-divider
        class="mx-2"
        inset
        vertical
      ></v-divider>      
      
  <v-data-table
    :headers="headers"
    :items="data"    
    class="elevation-1"
    light
    :footer-props="{
      showFirstLastPage: true,
      'items-per-page-text':'item por página'
    }"
    :search="search"
    :custom-filter="filterOnlyCapsText"
    :loading="loading"
    v-if="isShowList"
  >
    <template v-slot:no-data>
      Sem dados disponiveis
    </template>

    <template v-slot:top>

      <v-toolbar
        flat
        color="success"
      >

        <v-toolbar-title >        
          <v-icon
          slot="icon"
          color="default"
          size="36"
          class="mr-5"
        >
          mdi-account-switch
        </v-icon>
        Pessoas
        </v-toolbar-title>

        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>

        <v-spacer></v-spacer>
        
     <v-badge
        bordered
        color="primary"
        icon="mdi-refresh"
        overlap        
      >
        <v-btn
          class="white--text"
          color="info"
          depressed
          @click="fetchData()"
        >
          Atualizar
        </v-btn>
      </v-badge>
        <v-divider
          class="mx-1"
          inset
          vertical
        ></v-divider>
       

    <v-badge
        bordered
        color="error"
        icon="mdi-plus"
        overlap        
      >
        <v-btn
          class="white--text"
          color="info"
          depressed
          @click="dialogItem({},'create')"
        >
          Nova Pessoa
        </v-btn>
      </v-badge>
       
        
      </v-toolbar>

    <v-row>
      <v-col>

      <v-text-field
        v-model="search"
        label="Buscar (apenas minusculo)"
        class="mx-4"
      ></v-text-field>

      </v-col>
      <v-col>

      <v-select
          :items="filters"
          label="Filtro"
          @change="filter($event)"
      ></v-select>

      </v-col>
    </v-row>

    </template>

    
    <template v-slot:item.lactose_intolerance="{ item }">

      {{item.lactose_intolerance?'Sim':'Não'}}

    </template>
    <template v-slot:item.athlete="{ item }">

      {{item.athlete?'Sim':'Não'}}

    </template>

    <template v-slot:item.actions="{ item }">

      <v-icon
        small
        class="mr-2"
        @click="dialogItem(item,'edit')"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="dialogItem(item,'show')"
      >
        mdi-eye
      </v-icon>
      <v-icon
        small
        @click="dialogItem(item,'delete')"
      >
        mdi-delete
      </v-icon>

    </template>
    
  </v-data-table>     
     
    <PersonForm />
    <PersonDelete />

  </div>
</template>
<script>
  import { mapState, mapActions, mapGetters, mapMutations } from "vuex";

  import PersonForm from "@/components/person/PersonForm";
  import PersonDelete from "@/components/person/PersonDelete";

  export default {
    data: () => ({
      search:'',
      data:[],
      filters: ['Selecione o Filtro','Acima do Peso', 'Peso Ideal', 'Abaixo do Peso', 'Pessoas Altas','Pessoas Medianas','Pessoas Baixas',
      'Pessoas Intolerantes a Lactose','Pessoas Atletas'],
    }),
    layout: "default",
    components: {
      PersonForm,
      PersonDelete,  
    },
    created () {

      

    },
    updated () {
      
    },
    computed: {
      ...mapState({
        isShowList: state => state.person.showList,
        loading: state => state.config.loading,
        isNewPerson: state => state.person.create,
      }),
      ...mapGetters({
        items: "person/items",
      }),

      headers () {
        return [
          { text: '#', value: 'id' },
          { text: 'Nome', value: 'name' },
          { text: 'Altura', value: 'height' },
          { text: 'Peso', value: 'weight' },
          { text: 'Lactose', value: 'lactose_intolerance' },
          { text: 'Atleta', value: 'athlete' },
          { text: 'Opções', value: 'actions', sortable: false },          
        ]
      },
    },
    watch: {

      
    },

    mounted () {
      this.$store.dispatch('person/showList',true)
    },

    methods: {
      filterOnlyCapsText (value, search, item) {
        return value != null &&
          search != null &&
          typeof value === 'string' &&
          value.toString().toLocaleLowerCase().indexOf(search) !== -1
      },
      fetchData() {

        this.$store.dispatch('person/fetchItems');

},
      dialogItem (item, mode) {  
        
        this.$store.dispatch('person/'+mode);

        this.$store.dispatch('person/item',Object.assign({}, item));  
        this.$store.dispatch('person/indexItem',this.items.indexOf(item));
      },
      filter ( event ) {

        this.data = []

        var filter = this.items

        if(event=='Acima do Peso'){
          filter = filter.filter((item) => {
            return parseInt(item.weight) >= 90
          })
        }else if(event=='Peso Ideal'){
          filter = filter.filter((item) => {
            return item.weight >= 70 && item.weight <= 89
          })
        }else if(event=='Abaixo do Peso'){
          filter = filter.filter((item) => {
            return item.weight <= 70
          })
        }else if(event=='Pessoas Altas'){
          filter = filter.filter((item) => {
            return item.height >= 180
          })
        }else if(event=='Pessoas Medianas'){
          filter = filter.filter((item) => {
            return item.height >= 160 && item.height <= 179
          })
        }else if(event=='Pessoas Baixas'){
          filter = filter.filter((item) => {
            return item.height <= 159
          })
        }else if(event=='Pessoas Intolerantes a Lactose'){
          filter = filter.filter((item) => {
            return item.lactose_intolerance == true
          })
        }else if(event=='Pessoas Atletas'){
          filter = filter.filter((item) => {
            return item.athlete == true
          })
        }
        
        this.data = filter;
      }
    },
    watch: {
      isShowList (val) {

        if(this.isShowList) this.fetchData()           
          
      },
      items ( val ) {
        this.data = this.items
      }
    },
  }
</script>
<style>
/*
  table {
     table-layout: fixed;
  }*/
</style>
