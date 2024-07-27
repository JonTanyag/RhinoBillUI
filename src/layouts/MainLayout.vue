<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round @click="drawer = !drawer" icon="menu" aria-label="Menu" />
        <q-toolbar-title>
          Quasar App
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="drawer" show-if-above bordered>
      <q-list>
        <q-item-label header>Navigation</q-item-label>

        <q-item to="/student-list" clickable>
          <q-item-section>
            <q-item-label>Students</q-item-label>
          </q-item-section>
        </q-item>

        <q-item to="/course-list" clickable>
          <q-item-section>
            <q-item-label>Courses</q-item-label>
          </q-item-section>
        </q-item>

        <q-item to="/application-list" clickable>
          <q-item-section>
            <q-item-label>Applications</q-item-label>
          </q-item-section>
        </q-item>

      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  data () {
    return {
      drawer: true
    }
  }
}
</script>

<style scoped>
</style>
