import { Component, OnInit } from '@angular/core';
import { Analyse } from './analyse';
import {AnalyseService} from "./analyse-service.service";

@Component({
  selector: 'app-analyse',
  templateUrl: './analyse.component.html',
  styleUrls: ['./analyse.component.css']
})
export class AnalyseComponent implements OnInit {
  analyses: Analyse[] = [];
  selectedAnalyse: Analyse | null = null;
  showAllAnalyses: boolean = true;
  showUpdateForm: boolean = false;

  showAddForm: boolean = false;  // Add this line
  newAnalyse: any = {
    sousAnalyses: [
      {
        valeur: null,
        sousAnalyseMesuresId: null
      }
    ]
  };
  constructor(private analyseService: AnalyseService) { }

  ngOnInit(): void {
    this.getAnalyses();
  }

  getAnalyses(): void {
    this.analyseService.getAnalyses().subscribe(analyses => this.analyses = analyses);
  }

  addAnalyse(): void {
    this.newAnalyse.reactifsIds = this.newAnalyse.reactifsIds.split(',').map(Number);

    this.analyseService.addAnalyse(this.newAnalyse).subscribe(addedAnalyse => {
      alert('Analyse added successfully');
      this.getAnalyses();
      this.showAddForm = false;
      this.newAnalyse = {};
    });
  }

  modifyAnalyse(analyse: Analyse): void {
    this.selectedAnalyse = analyse;
    this.showUpdateForm = true;
    this.showAllAnalyses = false;
  }

  updateAnalyse(): void {
    if (this.selectedAnalyse) {
      this.analyseService.updateAnalyse(this.selectedAnalyse).subscribe(updatedAnalyse => {
        alert('Analyse updated successfully');
        this.getAnalyses();
        this.showUpdateForm = false;
        this.selectedAnalyse = null;
      });
    }
  }

  getAnalyseDetails(id: number): void {
    this.analyseService.getAnalyse(id).subscribe(analyse => {
      this.selectedAnalyse = analyse;
      this.showAllAnalyses = false;
    });
  }

  showAll(): void {
    this.showAllAnalyses = true;
    this.selectedAnalyse = null;
  }

}
