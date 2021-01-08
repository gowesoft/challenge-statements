import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { FilterService } from './filter.service';

@Component({
	selector: 'app-filter',
	templateUrl: './filter.component.html',
	styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
	@Output() hideLoader = new EventEmitter<boolean>();

	searchForm: FormGroup = new FormGroup({
		userID: new FormControl('')
	});

	constructor(
		private filterService: FilterService,
		private fb: FormBuilder
	) { }

	onSubmit(hideLoader: any): void {
		this.hideLoader.emit(hideLoader);
		if (this.searchForm.value.userID !== '') {
			this.filterService.getStatements(this.searchForm.value.userID).subscribe(data => {
				console.log(data);
				this.hideLoader.emit(false);
			});
		}
	}

	ngOnInit(): void { }

}
