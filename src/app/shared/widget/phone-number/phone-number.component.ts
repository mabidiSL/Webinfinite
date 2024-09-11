import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import intlTelInput from 'intl-tel-input';

@Component({
  selector: 'app-phone-number',
  templateUrl: './phone-number.component.html',
  styleUrl: './phone-number.component.css'
})
export class PhoneNumberComponent implements OnInit {
  @ViewChild('phoneInput', { static: true }) phoneInput!: ElementRef;

  ngOnInit() {

    const input = this.phoneInput.nativeElement;
    
    intlTelInput(input, {
      initialCountry: 'us', // you can change the initial country
      //preferredCountries: ['us', 'gb', 'fr'] as any, // add preferred countries
      utilsScript: 'node_modules/intl-tel-input/build/js/utils.js' // for validation and formatting
    });
  }
}