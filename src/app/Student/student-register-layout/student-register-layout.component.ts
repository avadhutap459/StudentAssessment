import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-student-register-layout',
  templateUrl: './student-register-layout.component.html',
  styleUrls: ['./student-register-layout.component.css']
})
export class StudentRegisterLayoutComponent implements OnInit {

  constructor(private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer) {
    this.matIconRegistry.addSvgIcon(
      "logoicon",
      this.domSanitizer.bypassSecurityTrustResourceUrl("./assets/signature-revised-1.svg")
    );
  }

  ngOnInit(): void {

  }

}
