import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import { fromEvent, Observable, Subscription } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { RequirevalidatorForState, RequirevalidatorGender } from 'src/app/Global/Require-Validator.directive';
import { AgeBM, CountryBM, GenderBM, ProfessionBM, QualificationBM, StateBM } from '../../StudentModel/MasterModel';
import { StudentRegisterModel } from '../../StudentModel/StudentRegisterModel';
import { StudentDialogService } from '../../StudentService/Student-dialog.service';
import { StudentMasterService } from '../../StudentService/student-master.service';
import { StudentService } from '../../StudentService/student-user.service';

@Component({
  selector: 'app-student-register',
  templateUrl: './student-register.component.html',
  styleUrls: ['./student-register.component.css']
})
export class StudentRegisterComponent implements OnInit {

  
  countries: CountryBM[];
  states: StateBM[];
  Qualification: QualificationBM[];
  Profession: ProfessionBM[];
  Gender: GenderBM[];
  Industry: string[];
  Age: AgeBM[];
  StudentModel: StudentRegisterModel = new StudentRegisterModel();
  IsDisableAllControl: boolean;
  TestId: Number;
  StudentRegisterForm: FormGroup;
  submitted = false;
  loading = false;
  
  MessageLog: string;

  onlineEvent: Observable<Event>;
  offlineEvent: Observable<Event>;
  subscriptions: Subscription[] = [];

  connectionStatusMessage: string;
  connectionStatus: string;

  constructor(private _MasterSvc: StudentMasterService,
    private _userSvc: StudentService,
    private _router: Router,
    private formBuilder: FormBuilder,
    private _route: ActivatedRoute,
    private dialogService: StudentDialogService,
    private deviceService: DeviceDetectorService) { }

  ngOnInit() {
    this._route.paramMap.subscribe((params: ParamMap) => {
      let Id =params.get('Testid');
      this.TestId = parseInt(params.get('Testid'));
      localStorage.setItem('TestId', Id);
    });

   

    this.DeclareFormBuilder();

    this.GetAllMasterFieldData();

    this.GetCandidateData();



    this.onlineEvent = fromEvent(window, "online");
    this.offlineEvent = fromEvent(window, "offline");

    this.subscriptions.push(
      this.onlineEvent.subscribe(e => {
        this.connectionStatusMessage = "Back to online";
        this.connectionStatus = "online";
        alert(this.connectionStatusMessage);
       // console.log("Online...");
      })
    );

    this.subscriptions.push(
      this.offlineEvent.subscribe(e => {
        this.connectionStatusMessage =
          "Connection lost! You are not connected to internet";
        this.connectionStatus = "offline";
        alert(this.connectionStatusMessage);
        //console.log("Offline...");
      })
    );

  }

  ngOnDestroy(): void {
    /**
     * Unsubscribe all subscriptions to avoid memory leak
     */
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  DeclareFormBuilder() {

    this.StudentRegisterForm = this.formBuilder.group(
      {
        Gender: ["", [Validators.required, Validators.min(1)]],
        GenderTxt: [""],
        Age: ["", [Validators.required, Validators.min(1)]],
        Country: ["", [Validators.required, Validators.min(1)]],
        State: [""]
      },
      {
        // Used custom form validator name
        validator: [RequirevalidatorGender("Gender", "GenderTxt"),
        RequirevalidatorForState("Country", "State")]
      }
    );
  }

  GetAllMasterFieldData() {
    this._MasterSvc.GetStudentMasterData().subscribe(
      data => {
        this.countries = data.Countries;
        this.Profession = data.Professions;
        this.Age = data.Ages;
        this.Gender = data.Genders;
        this.Industry = data.Industries;

      }
    );
  }

  GetCandidateData() {
    this._userSvc.GetStudentCandiateData(this.TestId).subscribe(data => {

      if(data.IsSuccess){
        this.StudentModel = data.CandidateData;
        // let deviceInfo = this.deviceService.getDeviceInfo();
         this.StudentModel.BrowserName = this.deviceService.browser;
         this.StudentModel.IsMobileDevice = this.deviceService.isMobile();
         this.StudentModel.IsTabDevice = this.deviceService.isTablet();
         this.StudentModel.IsDesktopDevice = this.deviceService.isDesktop();
         if (this.StudentModel.Country !== 0) {
           this.onChangeCountry(this.StudentModel.Country);
         }
         this.IsDisableAllControl = data.IsDisableAllControl;
   
         if (this.IsDisableAllControl) {
           this.StudentRegisterForm.disable();
         }
      } else {
        this._router.navigate(['/PageNotFound']);
      }
    })
  }

  onChangeCountry(countryId: number) {
    if (countryId) {
      this._MasterSvc.GetStudentStateData(countryId).subscribe(
        data => {
          this.states = data.State
        });
    } else {
      this.states = null;
    }
  }

  onSubmitStudentDetail() {
    this.submitted = true;
    this.loading = true;
    // Returns false if form is invalid
    if (this.StudentRegisterForm.invalid) {
      return;
    }
    this.SaveCandidateData(this.StudentModel);

  }

  SaveCandidateData(CandidateM: StudentRegisterModel) {
    this.StudentModel.BrowserName = this.deviceService.browser;
    this.StudentModel.IsMobileDevice = this.deviceService.isMobile();
    this.StudentModel.IsTabDevice = this.deviceService.isTablet();
    this.StudentModel.IsDesktopDevice = this.deviceService.isDesktop();
    
    this._userSvc.StudentAuthencation(CandidateM.TestId, '')
      .subscribe((data: any) => {
        localStorage.setItem('userToken', data.access_token);
        this.SaveCandidateDetail(CandidateM);
      });
  }

  SaveCandidateDetail(CandidateM: StudentRegisterModel) {
    this._userSvc.SaveStudentDetails(CandidateM).
      subscribe((res: any) => {
        if (res.isSuccess) {
          
          const options = {
            title: 'Hi,',
            message: '',
            cancelText: '',
            confirmText: 'OK',
            IsInstrucation : true
          };
          this.dialogService.open(options);
          this.dialogService.confirmed().subscribe(confirmed => {
            if (confirmed) {
              this._router.navigate(['/Student/QuestionSeries', res.ExamId]);
            }
          });
        } else {
          localStorage.removeItem('userToken');
          this.MessageLog = res.Error;
        }
      })
  }

  get f() {
    return this.StudentRegisterForm.controls;
  }

  onChangeGender(GenderId: number) {
    if (GenderId !== 3) {
      this.StudentRegisterForm.controls['GenderTxt'].reset();
    }
  }






 

}
