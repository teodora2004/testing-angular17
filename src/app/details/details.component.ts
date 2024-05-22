import {
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HousingService } from '../housing.service';
import { HousingLocation } from '../housinglocation';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [ReactiveFormsModule, TitleCasePipe],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export class DetailsComponent implements OnInit {
  private route: ActivatedRoute = inject(ActivatedRoute);
  private housingService: HousingService = inject(HousingService);

  public formControlsConfig = [
    { name: 'firstName', validators: [Validators.required] },
    { name: 'lastName', validators: [Validators.required] },
    { name: 'email', validators: [Validators.required, Validators.email] },
  ];

  public housingLocationId = -1;
  public housingLocation: HousingLocation | undefined;
  public applyForm!: FormGroup;

  constructor() {
    this.housingLocationId = Number(this.route.snapshot.params['id']);

    this.housingService
      .getHousingLocationById(this.housingLocationId)
      .then((housingLocation) => {
        this.housingLocation = housingLocation;
    console.log(this.housingLocationId, this.housingLocation)

      });
  }

  ngOnInit(): void {
    const formGroupConfig = this.formControlsConfig.reduce((acc, control) => {
      acc[control.name] = new FormControl('', control.validators);
      return acc;
    }, {} as { [key: string]: FormControl });

    this.applyForm = new FormGroup(formGroupConfig);
  }

  public submitApplication(): void {
    this.housingService.submitApplication(
      this.applyForm.value.firstName ?? '',
      this.applyForm.value.lastName ?? '',
      this.applyForm.value.email ?? ''
    );
  }
}
