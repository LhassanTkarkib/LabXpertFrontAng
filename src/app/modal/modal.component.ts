import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  @Output() closeModalEvent = new EventEmitter();
  @Output() submitFormEvent = new EventEmitter();

  newPatient: any = {};

  closeModal() {
    this.closeModalEvent.emit();
  }

  stopPropagation(event: Event) {
    event.stopPropagation();
  }

  addPatient() {
    this.submitFormEvent.emit();
  }
}
