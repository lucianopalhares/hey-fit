export const state = () => ({
    items: [],
    item: {},
    indexItem: -1,
    edit: false,
    create: false,
    show: false,    
    delete: false,
    showList: false,
    itemForm: {},
  });
  
  export const getters = {
    items(state) {
      return state.items
    },
    item(state) {
      return state.item
    },
    itemForm(state) {
      return state.itemForm
    },
    indexItem(state) {
      return state.indexItem
    },
    itemSelected(state) {
      return Object.keys(state.item).length > 0 ? true : false;
    },
    hasItemForm(state) {
      return Object.keys(state.itemForm).length > 0 ? true : false;
    },
  };
  
  export const mutations = {
    SET_ITEMS(state,payload) {
      state.items = payload;
    },
    SET_ITEM(state,payload) {
      state.item = payload;

      if(Object.keys(payload).length > 0){ // se esta selecionando algum item
          if(payload.id == undefined ){
            state.itemForm = payload
          }else{
            if(state.itemForm.id != undefined && state.itemForm.id != payload.id){
              state.itemForm = payload
            }else{
              state.itemForm = payload
            }
          }          
      }else{
        if(Object.keys(state.itemForm).length==0 || state.itemForm.id != undefined){
          state.itemForm = payload 
        }
      }
    },
    SET_INDEX_ITEM(state,payload) {
      state.indexItem = payload;
    },
    SET_CREATE(state) {
      state.create = true;
      state.edit = false;
      state.show = false;
      state.indexItem = -1;
    },
    SET_EDIT(state) {
      state.create = false;
      state.edit = true;
      state.show = false;
    },
    SET_SHOW(state) {
      state.create = false;
      state.edit = false;
      state.show = true;
    },
    SET_RESET(state) {
      state.create = false;
      state.edit = false;
      state.show = false;      
    },
    SET_DELETE(state, payload) {
      state.delete = payload;
    },
    SET_SHOW_LIST(state, show) {
      state.create = false;
      state.edit = false;
      state.show = false;
      state.showList = show;
    },
    STORE (state, item) {

      this.commit("config/SET_LOADING", true);
    
      this.$axios.$post('/api/pessoa',item).then(response => {
        
        if(response.item !== undefined){

          this.commit("config/SET_LOADING", false);
          
          state.item = state.itemForm;
          state.item.id = response.item.id;
          
          state.items.push(state.item)
          
          this.$toast.success('Cadastrado com sucesso!',{
            position:'top-right',
            duration:3000,
            keepOnHover:true
          })

          
          this.commit("person/SET_RESET");
          state.itemForm = {}; 
           

        }else{

          this.$toast.error('Erro ao salvar dados ..',{
            position:'top-right',
            duration:3000,
            keepOnHover:true
          })
        }   

      }).catch(error => {

        this.$toast.error(error.message,{
          position:'top-right',
          duration:3000,
          keepOnHover:true
        })

      });        
        
    },
    UPDATE (state, item) { 

      if(Object.keys(state.items).length > 0
        && Object.keys(state.item).length > 0
        && state.indexItem >= 0
        && state.item.id ) {  
          
        this.commit("config/SET_LOADING", true);

        this.$axios.$put('/api/pessoa/'+state.item.id,item).then(response => {
      
          if(response.item !== undefined && response.item.length){ 
            
            this.commit("config/SET_LOADING", false);
            
            state.item = state.itemForm;
            
            Object.assign(state.items[state.indexItem], state.item)            
            
            this.$toast.success('Atualizado com sucesso!',{
              position:'top-right',
              duration:3000,
              keepOnHover:true
            })

            this.commit("person/SET_RESET");
            state.itemForm = {};                  

          }else{

            this.$toast.error('Erro ao salvar dados ..',{
              position:'top-right',
              duration:3000,
              keepOnHover:true
            })
          }   

        }).catch(error => {

          this.$toast.error(error.message,{
            position:'top-right',
            duration:3000,
            keepOnHover:true
          })

        });
      }
    },
    DELETE_ITEM (state) {

      if(Object.keys(state.items).length > 0
        && Object.keys(state.item).length > 0
        && state.indexItem >= 0
        && state.item.id ){

        this.commit("config/SET_LOADING", true);

        this.$axios.$delete('/api/pessoa/'+state.item.id).then(response => {
         
          if(response){  

            this.commit("config/SET_LOADING", false);
            
            state.items.splice(state.indexItem, 1)

            this.$toast.success('Deletado com sucesso!',{
              position:'top-right',
              duration:3000,
              keepOnHover:true
            })

            state.delete = false;
            
          }else{

            this.$toast.error('Erro ao salvar dados ..',{
              position:'top-right',
              duration:3000,
              keepOnHover:true
            })
          }   

        }).catch(error => {

          this.$toast.error(error.message,{
            position:'top-right',
            duration:3000,
            keepOnHover:true
          })

        });
      }
    },
    FETCH_ITEMS (state, payload) {

      this.commit("config/SET_LOADING", true);

      state.items = [];

      this.$axios.$post('/api/filtra-pessoas',{where:payload}).then(response => {

        if(response.items !== undefined){  

          this.commit("config/SET_LOADING", false);
          
          state.items = response.items          

        }else{

          this.$toast.error('Erro ao buscar os Eventos ..',{
            position:'top-right',
            duration:3000,
            keepOnHover:true
          })

        }                  
         
      }).catch(error => {

        this.$toast.error(error.message,{
          position:'top-right',
          duration:3000,
          keepOnHover:true
        })

      });

    },
  };
  
  export const actions = {
    async fetchItems({ commit }, payload = {}) { 
      
      await commit("FETCH_ITEMS", payload);
    },
    items({ commit }, payload) {
    
      commit("SET_ITEMS", payload);
    },
    item({ commit }, payload) {
    
      commit("SET_ITEM", payload);
    },
    indexItem({ commit }, payload) {
    
      commit("SET_INDEX_ITEM", payload);
    },
    create({ commit }) {
    
      commit("SET_CREATE");
    },
    edit({ commit }) {
      
      commit("SET_EDIT");
    },
    show({ commit }) {
    
      commit("SET_SHOW");
    },
    reset({ commit }) {
    
      commit("SET_RESET");
    },
    delete({ commit }, payload = true) {
    
      commit("SET_DELETE", payload);
    },
    showList({ commit }, show) {
    
      commit("SET_SHOW_LIST", show);
    }, 
    async store({ commit }, item) {
    
      await commit("STORE", item);
    },
    async update({ commit }, item) {
    
      await commit("UPDATE", item);
    },
    async deleteItem({ commit }) {
    
      await commit("DELETE_ITEM");
    },
  };

  export const strict = false