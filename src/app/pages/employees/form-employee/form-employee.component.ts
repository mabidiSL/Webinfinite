import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { selectEmployeeById } from 'src/app/store/employee/employee-selector';
import { addEmployeelist, getEmployeeById, updateEmployeelist } from 'src/app/store/employee/employee.action';

@Component({
  selector: 'app-form-employee',
  templateUrl: './form-employee.component.html',
  styleUrl: './form-employee.component.css'
})
export class FormEmployeeComponent implements OnInit{
  
  @Input() type: string;
  employeeForm: UntypedFormGroup;
  isEditing: boolean = false;
  isCollapsed: boolean;
  private destroy$ = new Subject<void>();
  public firstColleaps:boolean = false;
  public secondColleaps:boolean = false;
  public bothColleaps:boolean = false;
  isFirstOpen:boolean = true;
  banks : any[] = [{id: '1', name:'BIAT'},{id: '2', name:'BT'}];
  roles: any[] = [{id:'1', name: 'ADMIN'}, {id:'2', name: 'MERCHANT'}, {id:'3', name: 'EMPLOYEE'}]
  constructor(
    private formBuilder: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store){
      
      this.employeeForm = this.formBuilder.group({
        id: [''],
        username: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
        phone:['',Validators.required], //Validators.pattern(/^\d{3}-\d{3}-\d{4}$/)*/],
        country:[''],
        city:[''],
        area:[''], 
        bankAccountNumber: [''],
        bankName:[''],
        role:['']
  
      });
    }
  
  
  ngOnInit() {
    
    const employeeId = this.route.snapshot.params['id'];
    console.log('employee ID from snapshot:', employeeId);
    if (employeeId) {
      // Dispatch action to retrieve the employee by ID
      this.store.dispatch(getEmployeeById({ employeeId }));
      
      // Subscribe to the selected employee from the store
      this.store
        .pipe(select(selectEmployeeById(employeeId)), takeUntil(this.destroy$))
        .subscribe(employee => {
          if (employee) {
            console.log('Retrieved employee:', employee);
            // Patch the form with employee data
          
            this.employeeForm.patchValue(employee);
          
            this.isEditing = true;

          }
        });
    }
   
    
  }
  onSubmit() {
    console.log('Form status:', this.employeeForm.status);
    console.log('Form errors:', this.employeeForm.errors);
    if (this.employeeForm.valid) {
      console.log('i am on onSubmit');
      console.log(this.employeeForm.value);
      console.log('Form status:', this.employeeForm.status);
      console.log('Form errors:', this.employeeForm.errors);
      
      
      const newData = this.employeeForm.value;
      console.log(newData);
      if(!this.isEditing)
        {
            delete newData.id;
            this.store.dispatch(addEmployeelist({ newData }));
        }
        else{
          this.store.dispatch(updateEmployeelist({ updatedData: newData }));
  
        }
      //Dispatch Action
      
    } else {
      // Form is invalid, display error messages
      console.log('Form is invalid');
      this.employeeForm.markAllAsTouched();
    }
  }
  onPhoneNumberChanged(phoneNumber: string) {
    this.employeeForm.get('phone').setValue(phoneNumber);
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  onCancel(){
    this.employeeForm.reset();
    this.router.navigateByUrl('/private/employees');
  }

}
