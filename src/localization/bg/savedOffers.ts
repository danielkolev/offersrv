
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
  
  // Add all missing fields to match the required interface
  loadOffer: "Зареди оферта",
  deleteOffer: "Изтрий оферта",
  confirmDelete: "Сигурни ли сте, че искате да изтриете тази оферта?",
  offerDeleted: "Офертата е изтрита успешно.",
  offerLoaded: "Офертата е заредена успешно.",
  saveError: "Грешка при запазване на офертата.",
  deleteError: "Грешка при изтриване на офертата.",
  loadError: "Грешка при зареждане на офертата.",
  recentOffers: "Последни оферти",
  offerSaved: "Офертата е запазена",
  offerSavedWithDetails: "Офертата е запазена с детайли",
  noOffersFound: "Няма намерени оферти",
  noOffersFoundSearch: "Няма оферти, отговарящи на критериите за търсене",
  amount: "Сума",
  search: "Търсене",
  searchPlaceholder: "Търсене на оферти...",
  clientName: "Име на клиент",
  createNew: "Създай нова",
  viewOffer: "Преглед на оферта",
  filter: "Филтър"
};
