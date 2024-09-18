import { Component, EventEmitter, Output } from '@angular/core';
import intlTelInput from 'intl-tel-input';

@Component({
  selector: 'app-phone-number',
  templateUrl: './phone-number.component.html',
  styleUrl: './phone-number.component.css'
})
export class PhoneNumberComponent {
  
  @Output() phoneNumberChanged = new EventEmitter<string>();
  ngAfterViewInit() {
 //const input = this.phoneInput.nativeElement;
 setTimeout(() => {

    const input = document.querySelector('#phoneInput') as HTMLInputElement;
    intlTelInput(input, {
      initialCountry: 'sa', // you can change the initial country
      //preferredCountries: ['us', 'gb', 'fr'] as any, // add preferred countries
      utilsScript: 'node_modules/intl-tel-input/build/js/utils.js' // for validation and formatting
    });
    input.addEventListener('input', () => {
      const phoneNumber = input.value;
      this.phoneNumberChanged.emit(phoneNumber);
    });
  }, 100);

  }
  
}