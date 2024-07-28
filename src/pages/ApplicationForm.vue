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
        :readonly="isViewMode"
        :rules="[val => !!val || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) || 'Required field']"
      />
      <q-select
        v-model="application.courseId"
        :options="coursesOptions"
        option-label="title"
        option-value="id"
        label="Select Course"
        emit-value
        map-options
        :readonly="isViewMode"
        :rules="[val => !!val || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) || 'Required field']"
      />
      <q-input
        v-model="formattedApplicationDate"
        type="date"
        label="Application Date"
        :readonly="isViewMode"
        :rules="[val => !!val || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) || 'Required field']"
      />
      <q-btn @click="back" color="primary" label="Back" />
      <q-btn type="submit" label="Save" color="primary" />
    </q-form>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';
import { QPage, QForm, QSelect, QInput, QBtn } from 'quasar';
import { useRoute } from 'vue-router';

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
  props: {
    readOnly: {
      type: Boolean,
      default: false
    }
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
      coursesOptions: [] as Course[],
      isViewMode: false,
      isEditMode: false
    };
  },
  computed: {
    formattedApplicationDate: {
      get() {
        if (this.application.applicationDate) {
          return this.application.applicationDate.substring(0,10).toString(); // Format to YYYY-MM-DD
        }
        return '';
      },
      set(value:string) {
        this.application.applicationDate = new Date(value).toISOString();
      },
    },
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
    },
    back() {
      this.$router.push('/application-list');
    },
  },
  created() {
    this.fetchStudents();
    this.fetchCourses();

    const route = useRoute();
    const applicationId = Number(route.params.id);
    this.isViewMode = route.query.view == 'true';
    this.isEditMode = route.query.edit == 'true';

    if (applicationId) {
      this.initializeApplication(applicationId ? Number(applicationId) : undefined);
    }
  }
});
</script>

