import { NgModule } from '@angular/core';
import { NotificationComponent } from './notification.component';
import { NotificationService } from './notification.service';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    NgbModule
  ],
  declarations: [
    NotificationComponent
  ],
  providers: [
    NotificationService
  ],
  exports: [
    NotificationComponent
  ]
})
export class NotificationModule {
}
