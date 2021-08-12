import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, materialize, dematerialize } from 'rxjs/operators';
import { Role } from '../_models/role';
import { FakeData } from './fakeData';
import { getAllJSDocTags } from 'typescript';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const { url, method, headers, body } = request;

    return handleRoute();

    function handleRoute() {
      switch (true) {
        case url.endsWith('/article/getall') && method === 'GET':
            return getAllItems();
        case url.endsWith('/orders/getall') && method === 'GET':
          return getAllOrders();
        case url.endsWith('/user/authenticate') && method === 'POST':
          return authenticate();
        case url.endsWith('/user/register') && method === 'POST':
          return register();
        case url.match(/\/users\/\d+$/) && method === 'PATCH':
          return updateUser();
        case url.endsWith('/users/gatall') && method === 'GET':
          return getUsers();
        case url.match(/\/users\/\d+$/) && method === 'GET':
          return getUserById();
        default:
          // pass through any requests not handled above
          return next.handle(request);
      }
    }

    // route functions

    function getAllItems() {
      console.log(FakeData.articles)
      return ok(FakeData.articles)
    }
    function getAllOrders() {
      console.log(FakeData.orders)
      return ok(FakeData.orders)
    }

    function authenticate() {
      const { username, password } = body;
      const user = FakeData.users.find(
        (x) => x.username === username && x.password === password
      );
      console.log("authenticate")
      if (!user) return error('Username or password is incorrect');
      return ok({
        id: user.id,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        token: `fake-jwt-token.${user.id}`,
      });
    }

    function getUsers() {
      if (!isAdmin()) return unauthorized();
      return ok(FakeData.users);
    }

    function getUserById() {
      if (!isLoggedIn()) return unauthorized();
      // only admins can access other user records
      if (!isAdmin() && currentUser()!.id !== idFromUrl())
        return unauthorized();

      const user = FakeData.users.find((x) => x.id === idFromUrl());
      return ok(user);
    }
    function updateUser(){
      let objIndex = FakeData.users.findIndex((obj => obj.id == parseInt(body.id)));
      FakeData.users[objIndex].email = body.email;
      FakeData.users[objIndex].indirizzo = body.indirizzo;
      FakeData.users[objIndex].cap = body.cap;
      FakeData.users[objIndex].city = body.city;
      return ok(FakeData.users);
    }
    // helper functions
    function register(){
      body.id = FakeData.users[FakeData.users.length - 1].id + 1;
      let tempUser = FakeData.users.slice();
      console.log(tempUser)
      tempUser.push(body);
      FakeData.users = tempUser;
      return ok(FakeData.users);
    }
    function ok(body: any) {
      return of(new HttpResponse({ status: 200, body })).pipe(delay(500)); // delay observable to simulate server api call
    }

    function unauthorized() {
      return throwError({
        status: 401,
        error: { message: 'unauthorized' },
      }).pipe(materialize(), delay(500), dematerialize()); // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648);
    }

    function notFound() {
      return throwError({
        status: 404,
        error: { message: 'Elemento non trovato' },
      }).pipe(materialize(), delay(500), dematerialize());
    }

    function error(message: any) {
      return throwError({ status: 400, error: { message } }).pipe(
        materialize(),
        delay(500),
        dematerialize()
      );
    }

    function isLoggedIn() {
      const authHeader = headers.get('Authorization') || '';
      return authHeader.startsWith('Bearer fake-jwt-token');
    }

    function isAdmin() {
      console.log("isAdmin: ",isLoggedIn() && currentUser()!.role === Role.Admin)
      return isLoggedIn() && currentUser()!.role === Role.Admin;
    } 


    function currentUser() {
      if (!isLoggedIn()) return;
      const id = parseInt(headers.get('Authorization')!.split('.')[1]);
      return FakeData.users.find((x) => x.id === id);
    }

    function idFromUrl() {
      const urlParts = url.split('/');
      return parseInt(urlParts[urlParts.length - 1]);
    }

    function roleFromUrl() {
      const urlParts = url.split('=');
      return urlParts[urlParts.length - 1];
    }
  }
}

export const fakeBackendProvider = {
  // use fake backend in place of Http service for backend-less development
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true,
};
