import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { QuestionService } from '../service/question.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pregunta',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pregunta.component.html',
  styleUrl: './pregunta.component.css'
})
export class PreguntaComponent implements OnInit {

  public name: string = "";
  public questionList: any = [];
  public currentQuestion: number = 0;
  public pointsA: number = 0;
  public pointsB: number = 0;
  public pointsC: number = 0;
  public winner: string = "";
  public URL: string = "";
  interval$: any;
  progress: string = "0";
  isQuizCompleted : boolean = false;

  constructor(private questionService: QuestionService) { }

  ngOnInit(): void {
    this.name = localStorage.getItem("name")!;
    this.getAllQuestions();
  }

  getAllQuestions() {
    this.questionService.getQuestionJson().subscribe(
      res => {
        console.log('JSON recuperado:', res);
        this.questionList = res.questions;
      },
      error => {
        console.error('Error al cargar el JSON:', error);
      }
    );
  }

  nextQuestion() {
    this.currentQuestion++;

  }
  previousQuestion() {
    this.currentQuestion--;
  }
  answer(currentQno: number, option: any) {

    if(currentQno === this.questionList.length){
      this.isQuizCompleted = true;
    }
    if (option === "Tiranosaurio Rex") {
      this.pointsA += 1;
      console.log('Puntos A:', this.pointsA);
    } else if (option === "Velociraptor") {
      this.pointsB += 1;
      console.log('Puntos B:', this.pointsB);
    } else if (option === "Triceratops") {
      this.pointsC += 1;
      console.log('Puntos C:', this.pointsC);
    }
  }

  getWinner() {
    if (this.pointsA > this.pointsB && this.pointsA > this.pointsC) {
      this.winner = "Tiranosaurio Rex";
      this.URL = "https://i.ytimg.com/vi/bB1uHBEKNN0/hqdefault.jpg";
    } else if (this.pointsB > this.pointsA && this.pointsB > this.pointsC) {
      this.winner = "Velociraptor";
      this.URL = "https://i.pinimg.com/originals/22/d3/dd/22d3dd26a0b90f78c949b1854b448b5e.jpg";
    } else if (this.pointsC > this.pointsA && this.pointsC > this.pointsB) {
      this.winner = "Triceratops";
      this.URL ="https://i.ytimg.com/vi/tYm7xeg27Rw/maxresdefault.jpg";
    } else {
      this.winner = "Oviraptor";
      this.URL ="https://cdnb.artstation.com/p/assets/images/images/065/510/073/large/joel-codina-frame1078-overpaint-v002.jpg?1690537650";
    }

  }

  resetQuiz() {
    this.getAllQuestions();
    this.pointsA = 0;
    this.pointsB = 0;
    this.pointsC = 0;
    this.currentQuestion = 0;
    this.progress = "0";

  }
  getProgressPercent() {
    this.progress = ((this.currentQuestion / this.questionList.length) * 100).toString();
    return this.progress;
  }
}
