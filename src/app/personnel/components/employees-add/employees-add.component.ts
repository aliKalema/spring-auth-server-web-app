import {Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Link, NavigationService} from "../../../shared/services/navigation.service";
import {Router} from "@angular/router";
import {
  FormArray,
  FormBuilder, FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from "@angular/forms";
import {FileHandle} from "../../../shared/interfaces/file-handle";
import {DomSanitizer} from "@angular/platform-browser";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {map, Observable, startWith} from "rxjs";
import {MatChipInputEvent} from "@angular/material/chips";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {MaterialModule} from "../../../material/material.module";

export interface StateGroup {
  letter: string;
  names: string[];
}

export const _filter = (opt: string[], value: string): string[] => {
  const filterValue = value.toLowerCase();
  return opt.filter(item => item.toLowerCase().includes(filterValue));
};

@Component({
  selector: 'app-employees-add',
  standalone: true,
  imports: [CommonModule, MaterialModule, ReactiveFormsModule, MatDatepickerModule, MatNativeDateModule, FormsModule],
  templateUrl: './employees-add.component.html',
  styleUrl: './employees-add.component.css'
})
export class EmployeesAddComponent implements OnInit{
  currentLocation: Link = {
    path: ["Employee", "Add"],
    title: "Add Employee",
    url: "",
    expanded: false
  }

  protected personOfDisability : boolean = true;

  keywords = ['angular', 'how-to', 'tutorial', 'accessibility'];

  private fb: FormBuilder = inject(FormBuilder);

  announcer = inject(LiveAnnouncer);

  image: FileHandle | undefined;
  private sanitizer = inject(DomSanitizer);

  stateGroups: StateGroup[] = [
    {
      letter: 'A',
      names: ['Alabama', 'Alaska', 'Arizona', 'Arkansas'],
    },
    {
      letter: 'C',
      names: ['California', 'Colorado', 'Connecticut'],
    },
    {
      letter: 'D',
      names: ['Delaware'],
    },
    {
      letter: 'F',
      names: ['Florida'],
    },
    {
      letter: 'G',
      names: ['Georgia'],
    },
    {
      letter: 'H',
      names: ['Hawaii'],
    },
    {
      letter: 'I',
      names: ['Idaho', 'Illinois', 'Indiana', 'Iowa'],
    },
    {
      letter: 'K',
      names: ['Kansas', 'Kentucky'],
    },
    {
      letter: 'L',
      names: ['Louisiana'],
    },
    {
      letter: 'M',
      names: [
        'Maine',
        'Maryland',
        'Massachusetts',
        'Michigan',
        'Minnesota',
        'Mississippi',
        'Missouri',
        'Montana',
      ],
    },
    {
      letter: 'N',
      names: [
        'Nebraska',
        'Nevada',
        'New Hampshire',
        'New Jersey',
        'New Mexico',
        'New York',
        'North Carolina',
        'North Dakota',
      ],
    },
    {
      letter: 'O',
      names: ['Ohio', 'Oklahoma', 'Oregon'],
    },
    {
      letter: 'P',
      names: ['Pennsylvania'],
    },
    {
      letter: 'R',
      names: ['Rhode Island'],
    },
    {
      letter: 'S',
      names: ['South Carolina', 'South Dakota'],
    },
    {
      letter: 'T',
      names: ['Tennessee', 'Texas'],
    },
    {
      letter: 'U',
      names: ['Utah'],
    },
    {
      letter: 'V',
      names: ['Vermont', 'Virginia'],
    },
    {
      letter: 'W',
      names: ['Washington', 'West Virginia', 'Wisconsin', 'Wyoming'],
    },
  ];

  stateGroupOptions!: Observable<StateGroup[]>;

  firstFormGroup: FormGroup = this._formBuilder.group({firstCtrl: ['']});
  secondFormGroup: FormGroup = this._formBuilder.group({secondCtrl: ['']});
  thirdFormGroup: FormGroup = this._formBuilder.group({thirdCtrl: ['']});
  forthFormGroup: FormGroup = this._formBuilder.group({secondCtrl: ['']});
  fifthFormGroup: FormGroup = this._formBuilder.group({thirdCtrl: ['']});
  constructor(private router: Router, private navigationService: NavigationService,  private _formBuilder: FormBuilder){}

  ngOnInit() {
    this.navigationService.setCurrentLocation(this.currentLocation);

    this.firstFormGroup = this.fb.group({
      selectedDate: new FormControl(),
      stateGroup: '',
      nextOfKinList: this.fb.array([]),
      workHistoryList: this.fb.array([]),
      certificationList: this.fb.array([]),
    });

    this.secondFormGroup = this.fb.group({
      stateGroup: '',
      workHistoryList: this.fb.array([]),
      certificationList: this.fb.array([]),
    });

    this.thirdFormGroup = this.fb.group({
      stateGroup: '',
      responsibilities: this.fb.array([]),
    });

    this.forthFormGroup = this.fb.group({
      stateGroup: '',
    });

    this.fifthFormGroup = this.fb.group({});

    this.stateGroupOptions = this.firstFormGroup.get('stateGroup')!.valueChanges.pipe(
      startWith(''),
      map((value: any) => this._filterGroup(value || '')),
    );

    this.addNextOfKin();
    this.addWorkHistory();
  }

  onFileSelected(event:any){
    if(event.target.files){
      const selectedFile = event.target.files[0];
      this.image = {
        file: selectedFile,
        url: this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(selectedFile))
      };
    }
  }

  private _filterGroup(value: string): StateGroup[] {
    if (value) {
      return this.stateGroups
        .map(group => ({letter: group.letter, names: _filter(group.names, value)}))
        .filter(group => group.names.length > 0);
    }

    return this.stateGroups;
  }

  protected get nextOfKinList() {
    return this.firstFormGroup.get('nextOfKinList') as FormArray;
  }

  protected addNextOfKin() {
    this.nextOfKinList.push(this.createNextOfKinFormGroup());
  }

  protected removeNextOfKin(index: number) {
    this.nextOfKinList.removeAt(index);
    if(this.nextOfKinList.length === 0){
      this.addNextOfKin();
    }
  }

  private createNextOfKinFormGroup(): FormGroup {
    return this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', Validators.required],
      relationship: ['', Validators.required]
    });
  }

  protected get certificationList(){
    return this.secondFormGroup.get('certificationList') as FormArray;
  }

  protected addCertification() {
    this.certificationList.push(this.createCertificationListFormGroup());
  }

  protected removeCertification(index: number) {
    this.certificationList.removeAt(index);
    if(this.certificationList.length === 0){
      this.addCertification();
    }
  }

  private createCertificationListFormGroup(): FormGroup {
    return this.fb.group({
      qualification: ['', Validators.required],
      institution: ['', Validators.required],
      startDate: ['', Validators.required],
      graduationDate: ['', Validators.required],
      fieldOfStudy: ['', Validators.required],
      grade: ['', Validators.required],
    });
  }

  protected get workHistoryList(){
    return this.secondFormGroup.get('workHistoryList') as FormArray;
  }

  protected addWorkHistory() {
    this.workHistoryList.push(this.createWorkHistoryListFormGroup());
  }

  protected removeWorkHistory(index: number) {
    this.workHistoryList.removeAt(index);
    if(this.workHistoryList.length === 0){
      this.addWorkHistory();
    }
  }

  private createWorkHistoryListFormGroup(): FormGroup {
    return this.fb.group({
      employer: ['', Validators.required],
      designation: ['', Validators.required],
      from: ['', Validators.required],
      to: ['', Validators.required],
      responsibilities: this.fb.array([]),
    });
  }

  getJobResponsibilities(){
    return this.thirdFormGroup.get('responsibilities') as FormArray;
  }

  removeJobResponsibility( index: number) {
    this.getJobResponsibilities().removeAt(index);
  }

  addJobResponsibility(event: MatChipInputEvent): void {
    const inputValue = (event.value || '').trim();
    if (inputValue) {this.getJobResponsibilities().push(this.fb.control(inputValue, Validators.required));
    }
    event.chipInput!.clear();
  }

  getResponsibilities(index: number) {
    const workHistory = this.workHistoryList.at(index) as FormGroup;
    return workHistory.get('responsibilities') as FormArray;
  }

  removeResponsibility(workHistoryIndex: number, responsibilityIndex: number) {
    this.getResponsibilities(workHistoryIndex).removeAt(responsibilityIndex);
  }

  addResponsibility(event: MatChipInputEvent, index: number): void {
    const inputValue = (event.value || '').trim();
    if (inputValue) {this.getResponsibilities(index).push(this.fb.control(inputValue, Validators.required));
    }
    event.chipInput!.clear();
  }
}
