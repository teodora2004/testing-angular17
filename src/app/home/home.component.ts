import { Component, inject } from '@angular/core';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { HousingLocation } from '../housinglocation';
import { CommonModule } from '@angular/common';
import { HousingService } from '../housing.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HousingLocationComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  public filteredLocationList: HousingLocation[] = [];
  public housingLocationList!: HousingLocation[];
  private housingService: HousingService = inject(HousingService);
  constructor() {
    this.housingService
      .getAllHousingLocations()
      .then((housingLocationList: HousingLocation[]) => {
        this.housingLocationList = housingLocationList;
        this.filteredLocationList = housingLocationList;


        console.log('here', this.filteredLocationList)

      })
      .catch(error => console.error('Error fetching housing locations:', error))
  }

  private filterResults(text: string): void {
    if (!text) {
      this.filteredLocationList = this.housingLocationList;
      return;
    }

    this.filteredLocationList = this.housingLocationList.filter((l) =>
      l.city.toLowerCase().includes(text.toLowerCase())
    );
  }

  public onFilter(e: Event, text: string): void {
    this.filterResults(text);
    e?.preventDefault();
  }
}
