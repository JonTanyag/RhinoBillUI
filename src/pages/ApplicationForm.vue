<template>
  <q-page class="form-container" padding>
    <q-form @submit.prevent="handleSubmit">
      <q-select
        v-model="application.studentId"
        :options="studentsOptions"
        option-label="firstName"
        option-value="id"
        label="Select Student"
        emit-value
        map-options
      />
      <q-select
        v-model="application.courseId"
        :options="coursesOptions"
        option-label="title"
        option-value="id"
        label="Select Course"
        emit-value
        map-options
      />
      <q-input
        v-model="application.applicationDate"
        type="date"
        label="Application Date"
      />
      <q-btn type="submit" label="Save" color="primary" />
    </q-form>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';
import { QPage, QForm, QSelect, QInput, QBtn } from 'quasar';

interface Student {
  id: number;
  firstName: string;
}

interface Course {
  id: number;
  title: string;
}

interface Application {
  id: number;
  studentId: number;
  courseId: number;
  applicationDate: string;
}

export default defineComponent({
  components: {
    QPage,
    QForm,
    QSelect,
    QInput,
    QBtn
  },
  data() {
    return {
      application: {
        id: 0,
        studentId: 0,
        courseId: 0,
        applicationDate: ''
      } as Application,
      studentsOptions: [] as Student[],
      coursesOptions: [] as Course[]
    };
  },
  methods: {
    async fetchStudents() {
      try {
        const response = await axios.get('http://localhost:5239/api/students');
        this.studentsOptions = response.data;
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    },
    async fetchCourses() {
      try {
        const response = await axios.get('http://localhost:5239/api/courses');
        this.coursesOptions = response.data;
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    },
    async fetchApplication(id: number) {
      try {
        const response = await axios.get(`http://localhost:5239/api/applications/${id}`);
        this.application = response.data;
      } catch (error) {
        console.error('Error fetching application:', error);
      }
    },
    async handleSubmit() {
      try {
        const payload = {
            application: {
              id: this.application.id,
              studentId: this.application.studentId,
              courseId: this.application.courseId,
              applicationDate: this.application.applicationDate
            }
          };

        if (this.application.id) {
          await axios.put(`http://localhost:5239/api/applications/${this.application.id}`, payload);
        } else {
          await axios.post('http://localhost:5239/api/applications', payload);
        }
        this.$router.push('/application-list');
        
      } catch (error) {
        console.error('Error saving application:', error);
      }
    },
    initializeApplication(id?: number) {
      if (id) {
        this.fetchApplication(id);
      } else {
        this.application = {
          id: 0,
          studentId: 0,
          courseId: 0,
          applicationDate: ''
        };
      }
    }
  },
  mounted() {
    this.fetchStudents();
    this.fetchCourses();
    const id = this.$route.params.id;
    this.initializeApplication(id ? Number(id) : undefined);
  }
});
</script>

<style scoped>
/* Add any custom styling here */
</style>
