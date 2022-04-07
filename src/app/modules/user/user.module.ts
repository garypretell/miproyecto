import { NgModule } from '@angular/core';
import { UserRoutingModule } from './user-routing.module';

import { UserListComponent } from './user-list/user-list.component';

@NgModule({
  declarations: [
    UserListComponent
  ],
  imports: [
    UserRoutingModule
  ]
})
export class UserModule { }
