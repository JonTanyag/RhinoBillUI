<template>
    <q-page padding>
      <q-table
        :rows="courses"
        :columns="columns"
        row-key="id"
        title="Course List"
      >    
      <template v-slot:top-right>
        <q-btn @click="goToCourseForm" color="primary" label="Add Course" />
      </template>
      <template v-slot:body-cell-actions="props">
      <q-td :props="props">
          <span v-if="props.col.name !== 'actions'">{{ props.row[props.col.field] }}</span>
          <div v-else>
            <q-btn flat round icon="visibility" @click="viewCourse(props.row.id)" color="primary" />
            <q-btn flat round icon="edit" @click="editCourse(props.row.id)" color="secondary" />
            <q-btn flat round icon="delete" @click="deleteCourse(props.row.id)" color="negative" />
          </div>
        </q-td>
      </template>
    </q-table>
    </q-page>
  </template>
  
  <script lang="ts">
  import axios from 'axios';
  import { defineComponent } from 'vue';
  import {Course, Column} from '../interface/model';
  import { QTable, QBtn, QPage, QTd } from 'quasar';
  export default defineComponent({
    components: {
      QTable,
      QBtn,
      QPage,
      QTd
    },
    data () {
      return {
        courses: [] as Course[],
        columns: [
          { name: 'code', required: true, label: 'Code', align: 'left', field: (row: { code: string; }) => row.code, format: (val: string) => `${val}`, sortable: true },
          { name: 'title', align: 'left', label: 'Title', field: 'title', sortable: true },
          { name: 'credits', align: 'left', label: 'Credits', field: 'credits', sortable: true },
          { name: 'actions', label: 'Actions', field: 'actions', align: 'center', sortable: false }
        ] as Column[]
      }
    },
    methods: {
      async fetchCourses() {
        try {
          const response = await axios.get('http://localhost:5239/api/courses')
          this.courses = response.data;
        } catch (error) {
          console.error('Error fetching courses:', error);
        }
      },
      goToCourseForm () {
        this.$router.push('/course-form')
      },
      editCourse (id: number){
        this.$router.push(`/course-form/${id}?edit=true`)
      },
      viewCourse(id: number) {
      this.$router.push(`/course-form/${id}?view=true`);
      },
      async deleteCourse(id: number) {
        try {
          await axios.delete(`http://localhost:5239/api/courses/${id}`);
          this.fetchCourses();
        } catch (error) {
          console.error('Error deleting student:', error)
        }
      },
    },
    created(){
      this.fetchCourses();
    },
  });
  </script>
  