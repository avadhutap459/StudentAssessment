import { FormGroup, AbstractControl } from "@angular/forms";


export function RequirevalidatorGender(GenderControlName: string,GenderTxtControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[GenderControlName];
        const matchingControl = formGroup.controls[GenderTxtControlName];

        if (control.value === 3 && (matchingControl.value ! === ""|| matchingControl.value === null)) {
            matchingControl.setErrors({ validGendertxt: true });
        } else {
            matchingControl.setErrors(null);
        }
        return null;
    };
}


export function RequirevalidatorQualification(QualificationControlName: string,QualificationTxtControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[QualificationControlName];
        const matchingControl = formGroup.controls[QualificationTxtControlName];

        if (control.value === 8 && (matchingControl.value ! === ""|| matchingControl.value === null)) {
            matchingControl.setErrors({ validQualificationtxt: true });
        } else {
            matchingControl.setErrors(null);
        }
        return null;
    };
}


export function RequirevalidatorForState(CountryControlName: string,stateControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[CountryControlName];
        const matchingControl = formGroup.controls[stateControlName];
        if (control.value === 1 && (matchingControl.value === undefined || matchingControl.value === null || matchingControl.value === "" || matchingControl.value ===0)) {
            matchingControl.setErrors({ validstate: true });
        } else {
            matchingControl.setErrors(null);
        }
        return null;
    };
}
