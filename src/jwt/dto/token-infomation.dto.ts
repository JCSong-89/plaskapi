export class TokenInfomation {
  accessToken: string;
  userId: string
  expiresIn: number;

  constructor(data: any) {
    this.userId = data.userId;
    this.accessToken = this.accessToken;
    this.expiresIn = data.expiresIn;
  }
}
