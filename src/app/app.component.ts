import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'stensul';
    showLoader = false;

    toggleLoader(show: boolean) {
        this.showLoader = show;
    }
}
