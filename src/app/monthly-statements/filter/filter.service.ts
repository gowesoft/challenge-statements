import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class FilterService {
	url = 'https://jsonmock.hackerrank.com/api/transactions?userId=';

	constructor(private http: HttpClient) { }

	getStatements(id: string): Observable<any> {
		return this.http.get(`${this.url}${id}`);
	}

	getAllStatements(id: string, num: string): Observable<any> {
		return this.http.get(`${this.url}${id}&page=${num}`);
	}
}
