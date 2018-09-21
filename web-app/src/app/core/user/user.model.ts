export class User {
  email: string;
  photoURL: string;
  role: string;
  school: string;

  constructor(email: string, photoURL: string, role: string, school: string) {
    this.email = email;
    this.photoURL = photoURL;
    this.role = role;
    this.school = school;
  }
}
