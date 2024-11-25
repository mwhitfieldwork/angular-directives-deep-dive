import { Directive, ElementRef, HostListener, inject, input, Input } from "@angular/core";

@Directive({
    selector: '[appSafeLink]', //the square brackets make it an attribute
    standalone: true, //now you can use this directive without ngMOudles
    host:{ //this is the same as @HostListener
        '(click)': 'onConfirmLeavePage($event)'
    }
})

export class SafeLinkDirective {
    @Input() docsLink!: string;
    //queryParam  = input('myapp');// if you use this you have to define the variable in the template
    queryParam  = input('myapp', {alias: 'appSafeLink'});// adding the configuration heere means that you can use the - 
                                                        //the attribute directive as the variable instead of the queryparam

    //You can inject services into directives justlike compoenents
    private hostElemmentrRef = inject<ElementRef<HTMLAnchorElement>>(ElementRef); 
                                    // you can inject things like this
                                    //The ElementRef is a wrapper around the native DOM element
                                    //we can also what type the ELemntRef will wrap
    constructor() {
        console.log('safe link directive is active');
    }

    onConfirmLeavePage(event: MouseEvent) {
      const wantsToLeave =  window.confirm('Are you sure you want to leave?');

      if (wantsToLeave) {
        const address = this.hostElemmentrRef.nativeElement.href; //now you have access to the native element
        //const address = (event.target as HTMLAnchorElement).href; //event.target.href // typescript isnt sure that this is a link
                        
        (event.target as HTMLAnchorElement).href = address + '?from=' + this.queryParam();   //with this, the query parameter should be added to the outgoing link          
        //typecasted as HMTLAnchorElement, which is another way of doing it
        return
     }

    event.preventDefault();
    }

}