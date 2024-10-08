import { Component } from '@angular/core';

@Component({
  selector: 'app-edit-notification',
  templateUrl: './edit-notification.component.html',
  styleUrl: './edit-notification.component.css'
})
export class EditNotificationComponent {
  breadCrumbItems: Array<{}>;

  ngOnInit() {
    console.log('i am in edit notification');
    this.breadCrumbItems = [{ label: 'Notifications' }, { label: 'Edit notification', active: true }];
  }
}
