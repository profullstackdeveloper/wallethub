/**
 * In the following component, update the code so that when the value of the [loan-amount] is changed:
 * * If it's blank or 0, the values of [monthly_payment] and [late_payment] becomes "N/A",
 * * If it has a value, the value of [monthly_payment] becomes 2% of [loan-ammount] and the value of [late_payment] becomes 5% of [monthly_payment].
 * * Both [monthly_payment] and [late_payment] should print in the template in currency format : $1,234
 */

import { Component, Input,NgModule  } from '@angular/core';
import { RouterModule } from "@angular/router";
import { FormsModule } from '@angular/forms';
import { SymbolPipe } from './symbol.pipe';


@Component({
    selector : 'ng-app',
    template : `<div>
                    <h2>Loan Details</h2>
                    <b>Monthly Payment:</b> {{monthly_payment !== "N/A" ? (monthly_payment | symbol: 'USD') : monthly_payment}} <br/>
                    <b>Late Payment Fee : {{late_payment !== "N/A" ? (late_payment | symbol: 'USD') : late_payment}}</b> <br/>
                    <input type="number" [ngModel]="loan_amount" (ngModelChange)="handleChange($event)">
                </div>`
})
export class Test01Component {

    loan_amount:number = 1000;
    monthly_payment:number | string = 200;
    late_payment: number | string = 10;
    
    handleChange (value:number) {
        this.loan_amount = value;
        console.log(this.loan_amount);
        this.monthly_payment = !this.loan_amount || this.loan_amount === 0 ? "N/A" : this.loan_amount * 2 / 100;
        this.late_payment = !this.loan_amount || this.loan_amount === 0 ? "N/A" : this.monthly_payment !== "N/A" ? Number(this.monthly_payment) * 5 / 100 : "N/A";
    }
}

@NgModule({
    imports : [
        RouterModule.forChild([
            {
                path : "",
                component : Test01Component
            }
        ]),
        FormsModule,
    ],
    declarations : [Test01Component, SymbolPipe]
})
export class Test01Module {}