import {Component, OnInit} from '@angular/core';
import {DriverService} from "../services/driver.service";
import {TokenDecoderService} from "../../auth/token/token-decoder.service";
import {Document} from "../../../models/Document";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit{
  documents : Document[];
  avatarBase64 = "";
  state : boolean = false;
  hasError : boolean = false;
  newDocumentForm = new FormGroup({
    nameOfDocument : new FormControl('', [Validators.required, Validators.maxLength(30)])
  });


  constructor(private driverService:DriverService, private tokenDecoder: TokenDecoderService){
  }
  ngOnInit(): void {
    this.setDocuments();
  }

  private setDocuments() {
    const tokenInfo = this.tokenDecoder.getDecodedAccesToken();
    this.driverService.getDocuments(tokenInfo.id).subscribe(
      (res) => {this.documents = res;}
    )
  }


  handleUpload(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.avatarBase64 = reader.result.toString();

    };
  }

  removeDocument(doc: Document) {
    const index = this.documents.indexOf(doc, 0);
    if (index > -1) {
      this.documents.splice(index, 1);
    }
    this.driverService.deleteDocument(doc.id).subscribe((res) => {
    })
  }

  changeState(b: boolean) {
    this.state = b;
    this.hasError = false;
  }

  newDocument() {

    this.hasError = this.newDocumentForm.value.nameOfDocument.toString() === "";

    if (this.avatarBase64 != ""){
      let doc : Document = {
        name : this.newDocumentForm.value.nameOfDocument,
        documentImage : this.avatarBase64

      }
      const tokenInfo = this.tokenDecoder.getDecodedAccesToken();
      this.driverService.saveDocument(tokenInfo.id, doc).subscribe((res) => {
        this.documents.push(res);
      });
    }
  }
}
