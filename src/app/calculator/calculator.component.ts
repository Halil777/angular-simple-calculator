import { Component } from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css'],
})
export class CalculatorComponent {
  displayValue = '0';
  firstOperand: number | null = null;
  operator: string | null = null;
  awaitingSecondOperand = false;

  onDigitClick(digit: string): void {
    if (this.awaitingSecondOperand) {
      this.displayValue = digit;
      this.awaitingSecondOperand = false;
    } else {
      this.displayValue =
        this.displayValue === '0' ? digit : this.displayValue + digit;
    }
  }

  onOperatorClick(operator: string): void {
    if (!this.awaitingSecondOperand) {
      this.calculate();
      this.firstOperand = +this.displayValue;
      this.operator = operator;
      this.awaitingSecondOperand = true;
    }
  }

  onDecimalClick(): void {
    if (!this.displayValue.includes('.')) {
      this.displayValue += '.';
    }
  }

  onClearClick(): void {
    this.displayValue = '0';
    this.firstOperand = null;
    this.operator = null;
    this.awaitingSecondOperand = false;
  }

  onEqualClick(): void {
    this.calculate();
    this.operator = null;
    this.awaitingSecondOperand = false;
  }

  private calculate(): void {
    if (this.firstOperand !== null && this.operator !== null) {
      const secondOperand = +this.displayValue;
      switch (this.operator) {
        case '+':
          this.displayValue = (this.firstOperand + secondOperand).toString();
          break;
        case '-':
          this.displayValue = (this.firstOperand - secondOperand).toString();
          break;
        case '*':
          this.displayValue = (this.firstOperand * secondOperand).toString();
          break;
        case '/':
          this.displayValue = (this.firstOperand / secondOperand).toString();
          break;
      }
    }
  }
}
