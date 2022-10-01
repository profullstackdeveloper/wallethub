/**
 * Add 2 input forms in the following component for first name and last name. Once both forms are filled out by the user, 
 * and user has clicked out of the fields, then beside it a username should be automatically generated which should be in 
 * the following format: [firstname]_[lastname]_[random integer]
 * First name and last name should be lowercased, and then a random integer between 1 and 9 should be added to the end
 * For example: if the inputs are "John" and "DOE" the generated username could be "john_doe_4" or "john_doe_2"
 */
import { Component, NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";
import { CommonModule } from '@angular/common';

@Component({
    selector: 'ng-app',
    template: `
                <h2>Enter your first and last name</h2>
                <div class="container">
                    <label class="mb-10">First name: <input (change)="setFirstName($event)"></label>
                    <label class="mb-10">Last name: <input (change)="setLastName($event)"></label>
                    <h2 *ngIf="errorMessage" class="error-message">
                        Please fill every forms.
                    </h2>
                    <h2 *ngIf="!errorMessage">
                        {{result}}
                    </h2>                
                </div>
                `,
    styles: [`
        .error-message {
            color: red;
        }
        .container {
            display: flex;
            flex-direction: column;
        }
        .mb-10 {
            margin-bottom: 10px;
        }
    `]
})
export class UserNameComponent {

    firstName: string = "";
    lastName: string = "";
    result: string = "";
    errorMessage: boolean = false;

    setFirstName(event) {
        this.firstName = String(event.target.value).toLowerCase();
        const randVal = Math.floor(Math.random() * 10);
        const suffix = randVal == 0 || randVal == 10 ? 1 : randVal
        if (this.firstName && this.lastName) {
            this.result = this.firstName + '_' + this.lastName + '_' + String(suffix);
            this.errorMessage = false;
        } else {
            this.errorMessage = true;
        }
    }

    setLastName(event) {
        this.lastName = String(event.target.value).toLowerCase();
        const randVal = Math.floor(Math.random() * 10);
        const suffix = randVal == 0 || randVal == 10 ? 1 : randVal
        if (this.firstName && this.lastName) {
            this.result = this.firstName + '_' + this.lastName + '_' + String(suffix);
            this.errorMessage = false;
        } else {
            this.errorMessage = true;
        }
    }

}

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: "",
                component: UserNameComponent
            }
        ])
    ],
    declarations: [UserNameComponent]
})
export class UserNameModule { };