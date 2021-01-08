import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { FilterService } from './filter.service';

@Component({
	selector: 'app-filter',
	templateUrl: './filter.component.html',
	styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
	searchForm: FormGroup = new FormGroup({
		userID: new FormControl('')
	});

	constructor(
		private filterService: FilterService,
		private fb: FormBuilder
	) { }

	onSubmit(): void {
		if (this.searchForm.value.userID !== '') {
			this.filterService.getStatements(this.searchForm.value.userID).subscribe(data => {
				console.log(data);
			});
		}
	}

	ngOnInit(): void { }

}
