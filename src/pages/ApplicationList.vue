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
  
  <script>
  export default {
    data () {
      return {
        applications: [],
        columns: [
          { name: 'studentId', required: true, label: 'Student ID', align: 'left', field: row => row.studentId, format: val => `${val}`, sortable: true },
          { name: 'courseId', align: 'left', label: 'Course ID', field: 'courseId', sortable: true },
          { name: 'applicationDate', align: 'left', label: 'Application Date', field: 'applicationDate', sortable: true },
        ]
      }
    },
    methods: {
      goToApplicationForm () {
        this.$router.push('/application-form')
      }
    }
  }
  </script>
  