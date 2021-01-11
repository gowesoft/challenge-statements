import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'challenge';
    showLoader = false;
    statements = '';

    toggleLoader(show: boolean) {
        this.showLoader = show;
    }

    getStatements(statements: any) {
        this.statements = statements;
    }
}
