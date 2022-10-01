/**
 * Update the following components to meet the requirements : 
 * 
 * * Bind [email] property to input[name="email"]
 * * Bind [password] property to input[name="password"]
 * 
 * Without using angular forms, validate both fields so that :
 * * email is in correct format ( ex: ends with @a.com)
 * * password contains at least one special character, one upper case character, one lower case character, one number and a minium of 8 characters in length
 * * The fields should be validated when trying to submit the form
 * * Prevent the form from doing an actual form submit and instead, after validation pass, turn on the [logged_in] flag
 * 
 * You can add error messages below each field that shows if the field is not valid
 */
import { Component, NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";
import { CommonModule } from '@angular/common';

@Component({
    selector: 'ng-app',
    template: `<form>
                     <h2>Login</h2>
                     <br/>
                     <input type="email" [value]="email" name="email" (change)="input_change($event)" />
                     <br/>
                     <input type="password" [value]="password" name="password" (change)="input_change($event)" />
                     <button type="submit" (click)="submit()">Submit</button>
                     <br/><br/>
                     <div *ngIf="logged_in">Logged In!</div>
                 </form>`
})
export class Test03Component {

    email: string = "";
    password: string = "";

    logged_in = false;

    submit() {
        console.log(this.email);
    }

    input_change(e) {
        if (e.target.name === "email") {
            this.email = e.target.value;
        }
        else if (e.target.name === "password") {
            this.password = e.target.value;
        }
        if (this.validate()) this.logged_in = true;
        else this.logged_in = false;
    }

    validate() {
        let regex = new RegExp("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})");
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.email) && regex.test(this.password);
    }
}

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: "",
                component: Test03Component
            }
        ])
    ],
    declarations: [Test03Component]
})
export class Test03Module { };