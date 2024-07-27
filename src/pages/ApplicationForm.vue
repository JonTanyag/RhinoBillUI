<template>
    <q-page padding>
      <q-form @submit="submitForm">
        <q-input v-model="application.studentId" label="Student ID" type="number" required />
        <q-input v-model="application.courseId" label="Course ID" type="number" required />
        <q-input v-model="application.applicationDate" label="Application Date" type="date" required />
        <q-btn type="submit" color="primary" label="Submit" />
      </q-form>
    </q-page>
  </template>
  
  <script>
  export default {
    data () {
      return {
        application: {
          studentId: 0,
          courseId: 0,
          applicationDate: ''
        }
      }
    },
    methods: {
      submitForm () {
        // handle form submission
      }
    }
  }
  </script>
  