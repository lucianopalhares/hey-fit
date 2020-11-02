<template>
 <v-app >

    <v-navigation-drawer left app v-model="sidebarLeft" mobile-breakpoint="650" 
    dark style="background-color:#8f8f90">

  <v-card
    class="mx-auto"
    max-width="344"
    outlined
  >
    <v-list-item three-line>

      <v-list-item-avatar
        tile
        size="80"
      >
      <v-img
        :src="require('assets/images/logo.jpg')"
      ></v-img>
      </v-list-item-avatar>

      <v-list-item-content>

        <!--
        <v-list-item-title class="headline mb-1">
          *
        </v-list-item-title>
        -->
        <v-list-item-subtitle>Hey! FIT</v-list-item-subtitle>

        <div class="overline mb-2" v-if="$auth.loggedIn">

         Olá, {{ $auth.user.name }} {{ this.time }}

        </div>
      </v-list-item-content>

    </v-list-item>

  </v-card>


  <v-card
    class="mx-auto"
    max-width="344"
    light
  >

  <v-expansion-panels v-if="$auth.user.is_admin">
    <v-expansion-panel>
      <v-expansion-panel-header>
        <template v-slot:default="{ open }">
          <v-row no-gutters>
            <v-col cols="12">
             Acesso Admin
            </v-col>
          </v-row>
        </template>
      </v-expansion-panel-header>
      <v-expansion-panel-content>

        <v-list>
          <v-list-item-group
            active-class="border"
            color="indigo"
            >                  
   

            <v-list-item @click="$store.dispatch('user/showList',true)">
              <v-list-item-icon>
                <v-icon v-text="'mdi-account-lock'"></v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title v-text="'Usuários'"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <UserList />
            <UserForm />
            <UserDelete />

            

          </v-list-item-group>
        </v-list>

      </v-expansion-panel-content>
    </v-expansion-panel>
</v-expansion-panels>



  </v-card>
     
   </v-navigation-drawer>



   <v-app-bar app>   
     
     <v-app-bar-nav-icon @click="sidebarLeft = !sidebarLeft"></v-app-bar-nav-icon>  

  
         

      <v-tooltip right>
        <template v-slot:activator="{ on, attrs }">
          <v-btn 
            icon 
            class="mx-1" 
            @click="exit"
            v-bind="attrs"
            v-on="on"
            >
            <v-icon>mdi-exit-to-app</v-icon>
          </v-btn>
        </template>
        <span>Sair</span>
      </v-tooltip>

   </v-app-bar>
 
   <v-main light style="background-color:#fff">
     <v-container fluid style="height: 100%">

       <nuxt />

     </v-container>
   </v-main>

   <Loading />

 </v-app>
</template>
 
<script>

import { mapState, mapMutations, mapActions, mapGetters } from "vuex";

import Loading from "@/components/loading";

import UserList from "@/components/user/UserList";
import UserForm from "@/components/user/UserForm";
import UserDelete from "@/components/user/UserDelete";
 
export default {
 data: () => ({
    sidebarLeft: false,
    time: '',
    date: '',
 }),
  middleware: ['logged'],
  components: {   
    Loading,  
    UserList,
    UserForm,
    UserDelete,  
  },
 computed: {  
    ...mapGetters({
      isAuthenticated: "isAuthenticated",
      loggedInUser: "loggedInUser",
    }),

 },
  watch: {

  },

 methods: {
    exit() {
      //this.$auth.logout();
      this.$router.push("/logout");
    },
    updateTime() {      

      setInterval(function(){

          var week = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

          var cd = new Date();
          this.time = this.zeroPadding(cd.getHours(), 2) + ':' + this.zeroPadding(cd.getMinutes(), 2) + ':' + this.zeroPadding(cd.getSeconds(), 2);
          this.date = this.zeroPadding(cd.getFullYear(), 4) + '-' + this.zeroPadding(cd.getMonth()+1, 2) + '-' + this.zeroPadding(cd.getDate(), 2) + ' ' + week[cd.getDay()];
    
      }.bind(this), 1000);

   },
    zeroPadding(num, digit) {
        var zero = '';
        for(var i = 0; i < digit; i++) {
            zero += '0';
        }
        return (zero + num).slice(-digit);
    },
 },
 created() {

    var timerID = setInterval(this.updateTime, 1000);
    this.updateTime();
 }
};
</script>
<style scoped>
.v-application {
  background-color: #fff;
}
.theme--dark.v-application {
  background-color: var(--v-background-base, #121212) !important;
}
.theme--light.v-application {
  background-color: var(--v-background-base, white) !important;
}
.border {
  border: 2px dashed orange;
}
</style>
