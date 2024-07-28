<template>
  <q-page padding>
    <q-table
      :rows="students"
      :columns="columns"
      row-key="id"
      title="Student List"
    >
    <template v-slot:top-right>
        <q-btn @click="goToStudentForm" color="primary" label="Add Student" />
      </template>
    <template v-slot:body-cell-actions="props">
      <q-td :props="props">
          <span v-if="props.col.name !== 'actions'">{{ props.row[props.col.field] }}</span>
          <div v-else>
            <q-btn flat round icon="visibility" @click="viewStudent(props.row.id)" color="primary" />
            <q-btn flat round icon="edit" @click="editStudent(props.row.id)" color="secondary" />
            <q-btn flat round icon="delete" @click="deleteStudent(props.row.id)" color="negative" />
          </div>
        </q-td>
      </template>
    </q-table>
  </q-page>
</template>
  
  <script lang="ts">

import axios from 'axios'
import { defineComponent } from 'vue';
import {Student, Column} from '../interface/model';
  export default defineComponent({
    data () {
      return {
        students: [] as Student[],
        columns: [
          { name: 'firstName', required: true, label: 'First Name', align: 'left', field: (row: { firstName: string; }) => row.firstName, format: (val: string) => `${val}`, },
          { name: 'lastName', align: 'left', label: 'Last Name', field: 'lastName', sortable: true },
          { name: 'email', align: 'left', label: 'Email', field: 'email', sortable: true },
          { name: 'birthday', align: 'left', label: 'Birthday', field: 'birthday', format: this.formatDate, sortable: true },
          { name: 'phoneNumber', align: 'left', label: 'Phone Number', field: 'phoneNumber', sortable: true },
          { name: 'actions', label: 'Actions', field: 'actions', align: 'center', sortable: false }
        ] as Column[]
      }
    },
    methods: {
      formatDate(dateString: string): string {
      const date = new Date(dateString);
      const month = ('0' + (date.getMonth() + 1)).slice(-2); // Months are zero-based
      const day = ('0' + date.getDate()).slice(-2);
      const year = date.getFullYear();
      return `${month}/${day}/${year}`;
    },
    async fetchStudents() {
      try {
        const response = await axios.get('http://localhost:5239/api/students')
        this.students = response.data
      } catch (error) {
        console.error('Error fetching students:', error)
      }
    },
    goToStudentForm () {
      this.$router.push('/student-form')
    },
    viewStudent(id: number) {
      this.$router.push(`/student-form/${id}?view=true`);
    },
    editStudent(id: number) {
      this.$router.push(`/student-form/${id}?edit=true`);
    },
    async deleteStudent(id: number) {
      try {
        await axios.delete(`http://localhost:5239/api/students/${id}`);
        this.fetchStudents();
      } catch (error) {
        console.error('Error deleting student:', error)
      }
    },
  },
  created() {
    this.fetchStudents()
  }
  });
  </script>
  