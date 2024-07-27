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
          { name: 'applicationDate', align: 'left', label: 'Application Date', field: 'applicationDate', sortable: true },
        ] as Column[]
      }
    },
    methods: {
      async fetchApplications() {
        try {
          const response = await axios.get('http://localhost:5239/api/applications');
          this.applications = response.data
        } catch (error) {
          console.error('Error fetching applications:', error);
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
  