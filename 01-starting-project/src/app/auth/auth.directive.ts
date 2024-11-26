import { Directive, effect, inject, input, TemplateRef, ViewContainerRef } from '@angular/core';
import { Permission } from './auth.model';
import { AuthService } from './auth.service';

@Directive({
  selector: '[appAuth]',
  standalone: true
})
export class AuthDirective {
  userType = input.required<Permission>({alias: 'appAuth'}); //use AuthType instead of userType
  private authService = inject(AuthService);
  private templateRef = inject(TemplateRef);
  //When you use TemplateREf you are telling angular that  
  //you are using the directive on an ng-template
  //and that you want to control the content inside of the template

  private viewContainerRef = inject(ViewContainerRef);
  //this is a reference in the DOM where the template is being used
 //it gives you access to the DOM element

  constructor() { 
    effect(() => {
      //runs whenever a signal value changes
      if (this.authService.activePermission() === this.userType()) {
        console.log('allow access');
        this.viewContainerRef.createEmbeddedView(this.templateRef); //tells angular to add new content into a certain place in the DOM
                                                                    //it needs a templateRef to know where to add the content
                                                                    //it tells angular, take the content and display it wherever the directive is being used
      }else{
        console.log('deny access');
        this.viewContainerRef.clear();
      }
    })
  }

}
