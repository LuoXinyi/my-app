import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {

  file:any;

  excelData = [];

  constructor() { }

  ngOnInit(): void {
  }

  onFileChange(event: any){
    this.file = event.target.files[0];
    const reader: FileReader = new FileReader();

    reader.onload = (e:any) =>{
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary'});
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];
      this.excelData = (XLSX.utils.sheet_to_json(ws,{header:1}));
      console.log(this.excelData);
    };
    reader.readAsBinaryString(this.file);
  }
}
