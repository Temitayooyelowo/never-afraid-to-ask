export class UserDetails {
  courseCode: string;
  userId: string;
  timeStamp: Date;
  content: string;

  constructor(courseCode: string, userId: string, timeStamp: Date, content: string) {
    this.courseCode = courseCode;
    this.userId = userId;
    this.timeStamp = timeStamp;
    this.content = content;
  }
}
