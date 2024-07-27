<template>
  <q-page padding>
    <q-form @submit.prevent="submitForm">
      <q-input v-model="student.firstName" label="First Name" :readonly="isViewMode" required />
      <q-input v-model="student.lastName" label="Last Name" :readonly="isViewMode" required />
      <q-input v-model="student.email" label="Email" :readonly="isViewMode" required />
      <q-input
        v-model="student.birthday"
        label="Birthday"
        :mask="'####-##-##'"
        :rules="[val => val && val.length === 10 || 'Please enter a valid date in YYYY-MM-DD format']"
      ></q-input>
      <q-input v-model="student.phoneNumber" label="Phone Number" :readonly="isViewMode" required />
      <q-btn @click="back" color="primary" label="Back" />
      <q-btn v-if="!isViewMode" type="submit" color="primary" label="Submit" />
    </q-form>
  </q-page>
</template>
  
  <script lang="ts">
  import axios from 'axios';
  import { useRoute } from 'vue-router';
  // import {Student} from '../interface/model';
  
  export default {
    data () {
    return {
      student: {
        id: 0,
        firstName: '',
        lastName: '',
        email: '',
        birthday: '',
        phoneNumber: ''
      },
      isViewMode: false,
      isEditMode: false
    }
  },
  created() {
    const route = useRoute();
    const studentId = Number(route.params.id);
    this.isViewMode = route.query.view == 'true';
    this.isEditMode = route.query.edit == 'true';

    if (studentId) {
      this.loadStudent(studentId)
    }
  },
    methods: {
      async loadStudent(id: number) {
        try {
          const response = await axios.get(`http://localhost:5239/api/students/${id}`)
          this.student = response.data
        } catch (error) {
          console.error('Error loading student:', error)
        }
    },
    async submitForm() {
      try {
        const payload = {
          student: {
            id: this.student.id,
            firstName: this.student.firstName,
            lastName: this.student.lastName,
            email: this.student.email,
            birthday: this.student.birthday,
            phoneNumber: this.student.phoneNumber
          }
        };
        if (this.isEditMode) {
          // Update existing student
          await axios.put(`http://localhost:5239/api/students/${this.student.id}`, payload);
        } else {
          // Create new student
          await axios.post('http://localhost:5239/api/students', payload);
        }

        // Redirect to the student list or show a success message
        this.$router.push('/student-list');
      } catch (error) {
        console.error('Error submitting student form:', error);
      }
    },
    back(){
      this.$router.push('/student-list');
    },
    }
  }
  </script>
  