import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import intlTelInput from 'intl-tel-input';

@Component({
  selector: 'app-phone-number',
  templateUrl: './phone-number.component.html',
  styleUrl: './phone-number.component.css'
})
export class PhoneNumberComponent {
  
  
  @Input() phone: string | undefined; // Add Input decorator to accept phone number from the parent
  @Output() phoneNumberChanged = new EventEmitter<string>();
  iti: any;
  
  
  ngAfterViewInit() {
  
    setTimeout(() => {

    const input = document.querySelector('#phoneInput') as HTMLInputElement;
    this.iti = intlTelInput(input, {
      initialCountry: 'sa', // you can change the initial country
      //preferredCountries: ['us', 'gb', 'fr'] as any, // add preferred countries
      utilsScript: 'node_modules/intl-tel-input/build/js/utils.js' // for validation and formatting
    });
    
    if(this.phone){
      this.iti.setNumber(this.phone);
     }

    input.addEventListener('input', () => {
      const phoneNumber = this.iti.getNumber();
      this.phoneNumberChanged.emit(phoneNumber);
    });

    
  }, 100);

   
  }
  ngOnChanges(changes: SimpleChanges) {
    // Update the phone number when the input value changes
    if (changes.phone && this.iti) {
      
      this.iti.setNumber(this.phone || '');
    }
  }
}