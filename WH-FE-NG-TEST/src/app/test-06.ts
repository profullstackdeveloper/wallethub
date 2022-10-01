/**
 * Fix the following component so that it meets the requirements:
 * * The [textarea] becomes a user inputed property.
 * * The content that user inputs will preserve its whitespaces and linebreaks when printed under the [review_content] property
 * * It should not allow rendering of html tags to prevent a security vulnerability (keep the inner text however)
 * * If the user enters a link in the content (ex : https://wallethub.com) it should become an anchor element when printed in the page 
 */
import { Component, NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'ng-app',
    template: `
                 <h2>User Review:</h2>
                 <textarea class="textfield" placeholder="Write your Review" [value]="review_input" [ngModel]="review_input" (ngModelChange)="input_change($event)"></textarea>
                 <br/><br/>
                 <h3>Output:</h3>
                 <div class="output" [innerHTML]="review_content"></div>
                 `,
    styles: [
        `.textfield {
             width: 600px;
             height: 220px;
             padding: 10px;
             box-sizing: border-box;
         }`,
        `.output { 
             max-width: 100%;
             width: 600px;
             border: solid 1px #f9f6f6;
             padding: 5px;
             background: #ecebeb; 
         }`
    ]
})
export class ReviewComponent {
    // sample input
    review_input =
        `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
 Maecenas tincidunt vestibulum ligula, sed viverra erat tempus nec. 
 
 Pellentesque blandit mauris congue elit eleifend, facilisis tristique dolor dictum:
           1) Nulla et tempus orci
           2) Integer semper porttitor faucibus
           
 At "https://wallethub.com" <b>bolded text</b><script>dfdfd</script>`

    review_content = ""

    input_change(text) {
        const removeTag = new RegExp("(<[a-zA-Z0-9]+>)|(</[a-zA-Z0-9]+>)", "g");

        this.review_content = this.filter(text);
        console.log(this.review_content);
        console.log("changed");
    }

    ngOnInit() {
        this.review_content = this.filter(this.review_input);
    }

    filter(text: string) {
        let remove_script = text.replace(/<script.*>.*<\/script>/ims, " ");
        let remove_tag = remove_script.replace(/(<([^>]+)>)/ig, '');
        let add_pre = "<pre>".concat(remove_tag, "</pre>");
        let add_url = this.urlify(add_pre);

        return add_url;
    }

    urlify(text) {
        var urlRegex = /(https?:\/\/[^\s]+)/g;
        return text.replace(urlRegex, function (url) {
            return '<a href="' + url + '">' + url + '</a>';
        })
        // or alternatively
        // return text.replace(urlRegex, '<a href="$1">$1</a>')
    }

}

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild([
            {
                path: "",
                component: ReviewComponent
            }
        ])
    ],
    declarations: [ReviewComponent]
})
export class ReviewModule { }