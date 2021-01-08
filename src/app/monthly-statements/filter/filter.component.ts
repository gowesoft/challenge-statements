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
	@Output() sendStatements = new EventEmitter<any>();

	searchForm: FormGroup = new FormGroup({
		userID: new FormControl('')
	});

	constructor(
		private filterService: FilterService,
		private fb: FormBuilder
	) { }

	onSubmit(hideLoader: any): void {
		this.hideLoader.emit(hideLoader);
		this.sendStatements.emit('');
		if (this.searchForm.value.userID !== '') {
			this.filterService.getStatements(this.searchForm.value.userID).subscribe(data => {
				data.userID = this.searchForm.value.userID;
				this.hideLoader.emit(false);
				this.sendStatements.emit(data);
			});
		}
	}

	ngOnInit(): void { }

}
