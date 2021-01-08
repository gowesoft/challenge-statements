import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Statement } from '../statements/statements.model';

@Injectable({
	providedIn: 'root'
})
export class FilterService {
	url = 'https://jsonmock.hackerrank.com/api/transactions?userId=';

	constructor(private http: HttpClient) { }

	getStatements(id: string): Observable<any> {
		return this.http.get(`${this.url}${id}`);
	}

	async getAllStatements(id: string, num: string) {
		return await this.http.get(`${this.url}${id}&page=${num}`).toPromise();
	}
}
