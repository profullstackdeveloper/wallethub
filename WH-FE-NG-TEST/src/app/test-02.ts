/**
 * Update the following components to meet the requirements : 
 * * Bind `field` of [textfield] component to its text input
 * * Pass value of `field` from [textfield] component to [title] property of component [ng-app]
 */
import { Component, NgModule, Output, EventEmitter } from '@angular/core';
import { RouterModule } from "@angular/router";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector : 'textfield',
    template : '<input type="text" [(ngModel)]="field" (ngModelChange)="updateTitle()"/>'
})
export class TextField {
    field: string = "";
    @Output() updateTitleEvent = new EventEmitter<string>();
    

    updateTitle() {
        this.updateTitleEvent.emit(this.field);
    }
}

@Component({
    selector : 'child-component',
    template : `<h2>Title:<h2><br/><textfield (updateTitleEvent)="setTitle($event)"></textfield>`
})
export class ChildComponent {

    @Output() updateTitleEvent = new EventEmitter<string>();

    setTitle(title: string) {
        this.updateTitleEvent.emit(title);
    }
}


@Component({
    selector : 'ng-app',
    template : `<div>
                    <child-component (updateTitleEvent)="updateTitle($event)"></child-component> <br/>
                    Title is {{title}}
                </div>`
})
export class Test02Component {

    title:string = "";

    updateTitle (title: string) {
        this.title = title;
    }
}

@NgModule({
    imports : [
        CommonModule,
        FormsModule,
        RouterModule.forChild([
            {
                path : "",
                component : Test02Component
            }
        ])
    ],
    declarations : [Test02Component,ChildComponent,TextField],
})
export class Test02Module {};