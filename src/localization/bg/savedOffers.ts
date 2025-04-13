import { formatDistanceToNow } from 'date-fns';
import { bg } from 'date-fns/locale';

export const savedOffers = {
  title: "Запазени оферти",
  noOffers: "Няма запазени оферти",
  loading: "Зареждане на офертите...",
  offerName: "Име на офертата",
  offerNumber: "Номер на офертата",
  client: "Клиент",
  date: "Дата",
  status: "Статус",
  actions: "Действия",
  view: "Преглед",
  edit: "Редактиране",
  delete: "Изтриване",
  deleteConfirmation: "Сигурни ли сте, че искате да изтриете тази оферта?",
  deleted: "Офертата е изтрита",
  saveOffer: "Запази оферта",
  saving: "Запазване...",
  saved: "Офертата е запазена",
  saveFailed: "Неуспешно запазване",
  namePlaceholder: "Въведете име на офертата",
  nameRequired: "Името на офертата е задължително",
  statusTypes: {
    draft: "Чернова",
    saved: "Запазена",
    sent: "Изпратена",
    accepted: "Приета",
    rejected: "Отхвърлена",
  },
  lastUpdated: (date: Date) => {
    return `Последно обновена преди ${formatDistanceToNow(date, { addSuffix: true, locale: bg })}`;
  },
  createTemplate: "Създай шаблон",
  saveBeforeAction: "Моля, запазете офертата преди това действие",
};
