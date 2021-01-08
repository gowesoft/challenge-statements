import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FilterService } from '../filter/filter.service';

@Component({
	selector: 'app-statements',
	templateUrl: './statements.component.html',
	styleUrls: ['./statements.component.scss']
})
export class StatementsComponent implements OnChanges {
    @Output() hideLoader = new EventEmitter<boolean>();
	@Input() statements: any = '';
	username: string = '';
	totalPages: number = 0;
    allStatements: Array<any> = [];
    sumOfDebitTransactions: number = 0;
    sumOfCreditTransactions: number = 0;
    overallBalance: number = 0;
    show: boolean = false;
    monthStatements: any = [];

	constructor(private filterService: FilterService) { }

	clearVariables() {
		this.username = '';
        this.totalPages = 0;
        this.allStatements = [];
        this.sumOfCreditTransactions = 0;
        this.sumOfDebitTransactions = 0;
        this.overallBalance = 0;
        this.monthStatements = [];
	}

	calculateCurrentBalance() {
        for (let i = 0; i < this.allStatements.length; i++) {
            const elem = this.allStatements[i];

            if (elem.txnType === 'debit') {
                this.sumOfDebitTransactions = this.sumOfDebitTransactions + Number(elem.amount.replace(/[^0-9.-]+/g,""));
            } else if (elem.txnType === 'credit') {
                this.sumOfCreditTransactions = this.sumOfCreditTransactions + Number(elem.amount.replace(/[^0-9.-]+/g,""));
            }
        }

        this.overallBalance = this.sumOfCreditTransactions - this.sumOfDebitTransactions;
        this.show = true;
        this.hideLoader.emit(false);
    }

    convertTimestampToDate(timestamp: any) {
        return `${new Date(timestamp).getMonth()+1}-${new Date(timestamp).getFullYear()}`;
    }

    insertNewElementToMonthStatements(date: Date, elem: any) {
        const elemToInsert = {
            date: date,
            statements: [elem]
        };
        this.monthStatements.push(elemToInsert);
    }
    
    generateMonthStatements() {
        for (let i = 0; i < this.allStatements.length; i++) {
            const elem = this.allStatements[i];
            const date: any = this.convertTimestampToDate(elem.timestamp);
            
            if (this.monthStatements.length === 0) {
                this.insertNewElementToMonthStatements(date, elem);
            } else {
                const index = this.monthStatements.findIndex((elem: { date: any; }) => {
                    return elem.date === date;
                });
                if (index !== -1) {
                    this.monthStatements[index].statements.push(elem);
                } else {
                    this.insertNewElementToMonthStatements(date, elem);
                }
            }
        }
    }

    calculateMonthBalanceCreditAndDebit() {
        for (let i = 0; i < this.monthStatements.length; i++) {
            const month = this.monthStatements[i];
            month.balance = 0;
            month.debit = 0;
            month.credit = 0;
            for (let j = 0; j < month.statements.length; j++) {
                const statement = month.statements[j];
                if (statement.txnType === 'debit') {
                    month.balance = month.balance - Number(statement.amount.replace(/[^0-9.-]+/g,""));
                    month.debit = month.debit + Number(statement.amount.replace(/[^0-9.-]+/g,""));
                } else if (statement.txnType === 'credit') {
                    month.balance = month.balance + Number(statement.amount.replace(/[^0-9.-]+/g,""));
                    month.credit = month.credit + Number(statement.amount.replace(/[^0-9.-]+/g,""));
                }
            }
        }
    }

	getAllStatements() {
		const pages = [];
		const allStatements: any = [];
		for (let i = 1; i <= this.totalPages; i++) {
			pages.push(i);
		}
		Promise.all(pages.map(async (page) => {
            const statements: any = await this.filterService.getAllStatements(this.statements.userID, page.toString());
            for (let i = 0; i < statements.data.length; i++) {
                const elem = statements.data[i];
                allStatements.push(elem);
            }
		})).then(() => {
            console.log(allStatements);
            this.allStatements = allStatements.sort((a: any, b: any) => {
                return b.timestamp - a.timestamp;
            });
            this.calculateCurrentBalance();
            this.generateMonthStatements();
            this.calculateMonthBalanceCreditAndDebit();
		});
	}

	ngOnChanges(changes: SimpleChanges) {
        this.show = false;
		if (this.statements.total_pages > 0) {
			this.username = this.statements.data[0].userName;
			this.totalPages = this.statements.total_pages;
			this.getAllStatements();
		} else {
			this.clearVariables();
		}
	}

}
