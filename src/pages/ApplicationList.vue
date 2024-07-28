<template>
    <q-page padding>
      <q-table
        :rows="applications"
        :columns="columns"
        row-key="id"
        title="Application List"
      >
        <template v-slot:top-right>
          <q-btn @click="goToApplicationForm" color="primary" label="Add Application" />
        </template>
      <template v-slot:body-cell-actions="props">
      <q-td :props="props">
          <span v-if="props.col.name !== 'actions'">{{ props.row[props.col.field] }}</span>
          <div v-else>
            <q-btn flat round icon="visibility" @click="viewApplication(props.row.id)" color="primary" />
            <q-btn flat round icon="edit" @click="editApplication(props.row.id)" color="secondary" />
            <q-btn flat round icon="delete" @click="deleteApplication(props.row.id)" color="negative" />
          </div>
        </q-td>
      </template>
      </q-table>
    </q-page>
  </template>
  
  <script lang="ts">
import axios from 'axios';
import { Application, Column } from 'src/interface/model';

  export default {
    data () {
      return {
        applications: [] as Application[],
        columns: [
          { name: 'studentName', required: true, label: 'Student', align: 'left', field: (row: { studentName: string; }) => row.studentName, format: (val: string) => `${val}`, sortable: true },
          { name: 'course', align: 'left', label: 'Course', field: 'course', sortable: true },
          { name: 'applicationDate', align: 'left', label: 'Application Date', field: 'applicationDate',format: this.formatDate, sortable: true },
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
      async fetchApplications() {
        try {
          const response = await axios.get('http://localhost:5239/api/applications');
          this.applications = response.data
        } catch (error) {
          console.error('Error fetching applications:', error);
        }
      },
      editApplication (id: number){
        this.$router.push(`/application-form/${id}?edit=true`)
      },
      viewApplication(id: number) {
      this.$router.push(`/application-form/${id}?view=true`);
      },
      async deleteApplication(id: number) {
        try {
          await axios.delete(`http://localhost:5239/api/applications/${id}`);
          this.fetchApplications();
        } catch (error) {
          console.error('Error deleting student:', error)
        }
      },
      goToApplicationForm () {
        this.$router.push('/application-form')
      }
    },
    created() {
      this.fetchApplications();
    },
  }
  </script>
  