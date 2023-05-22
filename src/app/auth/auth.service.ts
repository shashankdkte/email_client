import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface UsernameReponse {
  available: boolean;
}
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  usernameAvailable(username: string) {
    return this.http.post<UsernameReponse>(
      'https://api.angular-email.com/auth/username',
      {
        username,
      }
    );
  }
}
