<template>
    <q-page padding>
      <q-form @submit="submitForm">
        <q-input v-model="course.code" label="Code" :readonly="isViewMode"
        :rules="[val => !!val || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) || 'Must be between 5-10 alphanumeric characters only (no special characters']" required />
        <q-input v-model="course.title" label="Title" :readonly="isViewMode"
        :rules="[val => !!val || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) || 'Must be between 5-50 alphanumeric and/or special characters only']" required />
        <q-input v-model="course.credits" label="Credits" type="number" :readonly="isViewMode"
        :rules="[val => !!val || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) || 'Must be more than 0']" required />
        <q-btn @click="back" color="primary" label="Back" />
        <q-btn v-if="!isViewMode" type="submit" color="primary" label="Submit" />
      </q-form>
    </q-page>
  </template>
  
  <script>
  import axios from 'axios';
  import { defineComponent } from 'vue';
  import { useRoute } from 'vue-router';
  export default defineComponent({
    data () {
      return {
        course: {
          code: '',
          title: '',
          credits: 0
        },
        isViewMode: false,
        isEditMode: false
      }
    },
    created(){
      const route = useRoute();
      const courseId = Number(route.params.id);
      this.isViewMode = route.query.view == 'true';
      this.isEditMode = route.query.edit == 'true';

      if (courseId) {
        this.loadCourse(courseId)
      }
    },
    methods: {
      async loadCourse(id) {
        try {
          const response = await axios.get(`http://localhost:5239/api/courses/${id}`)
          this.course = response.data;
        } catch (error) {
          console.error('Error loading course: ', error)
        }
      },
      async submitForm () {
        // handle form submission
        try {
          const payload = {
            course: {
              id: this.course.id,
              code: this.course.code,
              title: this.course.title,
              credits: this.course.credits
            }
          };
          if (this.isEditMode) {
           await axios.put(`http://localhost:5239/api/courses/${this.course.id}`, payload)
          } else {
            await axios.post('http://localhost:5239/api/courses', payload)
          }

          this.$router.push('/course-list');
        } catch (error) {
          console.error('Error submitting course form:', error);
        }
      },
      back(){
        this.$router.push('/course-list');
      },
    }
  });
  </script>
  