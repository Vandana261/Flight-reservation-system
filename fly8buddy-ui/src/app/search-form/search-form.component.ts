import { Component, ViewChild, ElementRef } from '@angular/core';
import { routesData } from '../../data/routes-data';
import { airlinesData } from '../../data/airlines-data';
import { airportsData } from '../../data/airports-data';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent {

  @ViewChild('searchResults') searchResultsDiv: ElementRef | undefined;
  finalSearchResults : { Id: number, Airline: any, FromAirport: any, ToAirport: any, DepartureTime: any, ArrivalTime: any, FlightPrice: any }[] = [];

  noResultsFlag = false;

  searchFlights() {

    this.finalSearchResults = [];

    function getDepartureArrivalTimes(input: any) {

      const inputDate = new Date(input);

      if (!(inputDate instanceof Date)) {
        throw new Error('Invalid input. Please provide a valid Date object.');
      }

      const randomHours = Math.floor(Math.random() * 24); // 0 to 23
      const randomMinutes = Math.floor(Math.random() * 60); // 0 to 59
      const randomSeconds = Math.floor(Math.random() * 60); // 0 to 59

      const randomTime = new Date(inputDate);
      randomTime.setHours(randomHours, randomMinutes, randomSeconds);

      const randomHoursToAdd = Math.floor(Math.random() * 3) + 1; // Generate random number between 1 and 3
      const newDate = new Date(randomTime); // Create a new Date object to avoid modifying the original date

      // Add the random hours to the new date
      newDate.setHours(newDate.getHours() + randomHoursToAdd);

      console.log("CHECKPOINT 1: ");
      console.log([ randomTime.toLocaleString('en-US'),newDate.toLocaleString('en-US') ]);

      return [ randomTime.toLocaleString('en-US'),newDate.toLocaleString('en-US') ];
    }



    const fromLocation = (<HTMLInputElement>document.getElementById("from-location")).value;
    const toLocation = (<HTMLInputElement>document.getElementById("to-location")).value;
    const departureDate = (<HTMLInputElement>document.getElementById("departure-date")).value;




    const initialSearchResults = routesData.filter((route) => { return route.SourceAirport === fromLocation && route.DestinationAirport === toLocation; });


    let index = 0;

    initialSearchResults.forEach((route) => {
      console.log("route: " + route);
      console.log("route.SourceAirport: " + route.SourceAirport);
      console.log("route.DestinationAirport: " + route.DestinationAirport);
      console.log("route.Stops: " + route.Stops);
      console.log("route.TotalFare: " + route.Airline);

      index += 1;

      const airline = airlinesData.find((airline) => { return airline.IATA === route.Airline; })?.Name;
      const fromAirportCity = airportsData.find((airport) => { return airport.IATA === route.SourceAirport; })?.City;
      const toAirportCity = airportsData.find((airport) => { return airport.IATA === route.DestinationAirport; })?.City;

      const [ departureTime, arrivalTime ] = getDepartureArrivalTimes(departureDate);

      const flightPrice = () => {
        return 2000 + Math.floor(Math.random() * (5000 - 2000));
      };

      this.finalSearchResults.push({ Id: index, Airline: airline, FromAirport: `${fromAirportCity} (${route.SourceAirport})`, ToAirport: `${toAirportCity} (${route.DestinationAirport})`, DepartureTime: departureTime, ArrivalTime: arrivalTime, FlightPrice: flightPrice() });

    });



/*     if (this.searchResultsDiv !== undefined) {
      this.searchResultsDiv.nativeElement.innerHTML = `
      The inputs are:<br>
      <ul>
        <li>From: ${(<HTMLInputElement>document.getElementById("from-location")).value}</li>
        <li>To: ${(<HTMLInputElement>document.getElementById("to-location")).value}</li>
        <li>Departure: ${(<HTMLInputElement>document.getElementById("departure-date")).value}</li>
        <li>Return: ${(<HTMLInputElement>document.getElementById("return-date")).value}</li>
      </ul>
      <br><br>
      We have ${initialSearchResults.length} results!!!</br>
      `;
    } */

    this.noResultsFlag = (this.finalSearchResults.length === 0);
  }

  constructor() {

  }




}
