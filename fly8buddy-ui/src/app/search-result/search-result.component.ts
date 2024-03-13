import { Component, Input } from '@angular/core';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import JsBarcode from 'jsbarcode';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent {

  @Input() flightOption: { Id: number, Airline: any, FromAirport: any, ToAirport: any, DepartureTime: any, ArrivalTime: any, FlightPrice: any } | undefined;

  bookTicket() {
    console.log('Book ticket');

    const pdfContent = document.getElementById('flightDetails') as HTMLElement;

    console.log('CHECKPOINT 2:');
    console.log(pdfContent);

    // Create a new jsPDF instance
    const doc = new jsPDF();

    // Convert the content to an image using html2canvas

    if (pdfContent != null) {

      html2canvas(pdfContent).then((canvas) => {
        const imageData = canvas.toDataURL('image/png');


        // Add a header to each page
        const headerText = 'FLIGHT TICKET BOOKING CONFIRMATION';
        const headerPosition = 10; // Position from the top of the page
        const headerFontSize = 28;
        const headerFontStyle = 'bold';
        doc.setFontSize(headerFontSize);
        doc.text(headerText, headerPosition, headerPosition);

        // Add the image to the PDF
        doc.addImage(imageData, 'PNG', 10, 50, 180, 0);

        // Save the PDF with the name 'output.pdf'
        doc.save('your-flight-ticket.pdf');
      });

    }

  }


  generatePDF() {
    // Create a new jsPDF instance
    const doc = new jsPDF('p', 'pt', 'a4'); // 'p' for portrait orientation, 'pt' for points unit, 'a4' for A4 size

    // Set font size and style for the header
    doc.setFontSize(18);


    // Add the header
    doc.text('Sample Header', 40, 50);

    // Set font size and style for the content
    doc.setFontSize(12);

    // Add content to the PDF
    const contentText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tristique nunc vel orci feugiat, vel feugiat turpis cursus. Maecenas id nibh ac odio scelerisque malesuada sit amet ut tortor. In id nisi risus. Donec fermentum ex quis dolor egestas blandit. Sed facilisis scelerisque nulla, a hendrerit lectus facilisis a. Vestibulum ut ligula sapien. Nam vitae nisi sed quam elementum venenatis nec vel dolor.`;
    doc.text(contentText, 40, 100);

    // Save the PDF with the name 'output.pdf'
    doc.save('output.pdf');
  }


  generateTicket() {

    const generateUniqueFileName = () => {
      const timestamp = Date.now();
      const randomString = Math.random().toString(36).substring(2, 15);
      const uniqueFileName = `Fly8Buddy_Ticket_${timestamp}_${randomString}.pdf`;
      return uniqueFileName;
    }


    // Create a new jsPDF instance
    const doc = new jsPDF('p', 'pt', 'a4');

    // Set font size and style for the header
    doc.setFontSize(26);
    //doc.setFontStyle('bold');

    // Add the header
    doc.text('Flight Ticket', 40, 100);

    // Set font size and style for the content
    doc.setFontSize(20);
    //doc.setFontStyle('normal');

    // Add content to the PDF
    const contentText = `
                          Flight Date: ${this.flightOption?.DepartureTime.split(', ')[0]}
                          Flight Time: ${this.flightOption?.DepartureTime.split(', ')[1]}
                          From: ${this.flightOption?.FromAirport}
                          To: ${this.flightOption?.ToAirport}
                          Flight Number: ABC123
                          Passenger Name: Vijay Narayanan
                          `;
    doc.text(contentText, 40, 200);

    // Add barcode
    const barcodeValue = 'ABC123456789'; // Replace with your actual barcode value
    JsBarcode(doc.canvas, barcodeValue, {
      format: 'CODE128', // Use CODE128 format for the barcode
      displayValue: false, // Hide the value text below the barcode
      height: 40, // Set the height of the barcode
      margin: 10, // Add margin to the barcode
    });

    // Save the PDF with an unique name
    doc.save(generateUniqueFileName());




  }

}
