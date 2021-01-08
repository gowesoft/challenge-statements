import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FilterService } from '../filter/filter.service';

@Component({
	selector: 'app-statements',
	templateUrl: './statements.component.html',
	styleUrls: ['./statements.component.scss']
})
export class StatementsComponent implements OnChanges {
	@Input() statements: any = '';
	username: string = '';
	totalPages: number = 0;
	allStatements: Array<any> = [];

	constructor(private filterService: FilterService) { }

	clearVariables() {
		this.username = '';
		this.totalPages = 0;
	}

	calculateCurrentBalance() {

	}

	async getAllStatements() {
		const pages = [];
		const allStatements: any = [];
		for (let i = 1; i <= this.totalPages; i++) {
			pages.push(i);
		}
		Promise.all(await pages.map((page) => {
			this.filterService.getAllStatements(this.statements.userID, page.toString()).subscribe(data => {
				allStatements.push(data.data);
			});
		})).then(() => {
			this.allStatements = allStatements;
			console.log(this.allStatements.length);
		});
	}

	ngOnChanges(changes: SimpleChanges) {
		if (this.statements.total_pages > 0) {
			this.username = this.statements.data[0].userName;
			this.totalPages = this.statements.total_pages;
			this.getAllStatements();
			this.calculateCurrentBalance();
		} else {
			this.clearVariables();
		}
	}

}
