export interface Student {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    birthday: string;
    phoneNumber: string;
  }

  export interface Course {
    id: number;
    code: string;
    title: string;
    credits: number;
  }

  export interface Application {
    id: number;
    studentId: number;
    courseId: number;
    applicationDate: Date;
    students: Student[];
    courses: Course[];
  }
  
  export interface Column {
    name: string;
    label: string;
    field: keyof Student | string;
    align?: 'left' | 'center' | 'right';
    sortable?: boolean;
  }

  
  