// moment-business-day.js

// Importe a biblioteca Moment.js
import moment from 'moment';

// Função para verificar se um dia é um dia útil (segunda a sexta-feira)
export function isBusinessDay(date) {
  const dayOfWeek = moment(date).day();
  return dayOfWeek >= 1 && dayOfWeek <= 5; // 1 a 5 representam segunda a sexta-feira
}

// Função para calcular a próxima data útil a partir de uma data dada
export function nextBusinessDay(date) {
  let nextDay = moment(date).add(1, 'days');
  while (!isBusinessDay(nextDay)) {
    nextDay.add(1, 'days');
  }
  return nextDay;
}
