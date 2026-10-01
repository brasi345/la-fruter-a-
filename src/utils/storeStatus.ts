/**
 * Real-time calculation of La Frutería opening status based on Europe/Madrid timezone.
 * Schedule:
 * - Lunes a Viernes: 09:30–14:30 · 17:30–21:00
 * - Sábado: 09:30–14:30
 * - Domingo: CERRADO
 */

export interface StoreStatus {
  isOpen: boolean;
  badgeLabel: string;
  detailLabel: string;
}

export function getStoreStatus(nowDate: Date = new Date()): StoreStatus {
  try {
    // Get current day, hour, and minute in Europe/Madrid timezone
    const formatter = new Intl.DateTimeFormat('es-ES', {
      timeZone: 'Europe/Madrid',
      weekday: 'short',
      hour: 'numeric',
      minute: 'numeric',
      hour12: false,
    });

    const parts = formatter.formatToParts(nowDate);
    let weekdayStr = '';
    let hour = 0;
    let minute = 0;

    for (const part of parts) {
      if (part.type === 'weekday') weekdayStr = part.value.toLowerCase();
      if (part.type === 'hour') hour = parseInt(part.value, 10);
      if (part.type === 'minute') minute = parseInt(part.value, 10);
    }

    const currentMinutes = hour * 60 + minute;

    // Map weekday
    // lun, mar, mié, jue, vie, sáb, dom
    const isSunday = weekdayStr.startsWith('dom');
    const isSaturday = weekdayStr.startsWith('s');
    const isWeekday = !isSunday && !isSaturday;

    if (isSunday) {
      return {
        isOpen: false,
        badgeLabel: 'CERRADO',
        detailLabel: 'Cerrado hoy domingo · Abre lunes 09:30',
      };
    }

    if (isSaturday) {
      const openMorning = 9 * 60 + 30; // 09:30 = 570
      const closeMorning = 14 * 60 + 30; // 14:30 = 870

      if (currentMinutes >= openMorning && currentMinutes < closeMorning) {
        return {
          isOpen: true,
          badgeLabel: 'ABIERTO',
          detailLabel: 'Abierto hoy hasta las 14:30',
        };
      } else if (currentMinutes < openMorning) {
        return {
          isOpen: false,
          badgeLabel: 'CERRADO',
          detailLabel: 'Cerrado · Abre hoy a las 09:30',
        };
      } else {
        return {
          isOpen: false,
          badgeLabel: 'CERRADO',
          detailLabel: 'Cerrado · Abre el lunes a las 09:30',
        };
      }
    }

    if (isWeekday) {
      const openMorning = 9 * 60 + 30; // 09:30 = 570
      const closeMorning = 14 * 60 + 30; // 14:30 = 870
      const openEvening = 17 * 60 + 30; // 17:30 = 1050
      const closeEvening = 21 * 60; // 21:00 = 1260

      if (currentMinutes >= openMorning && currentMinutes < closeMorning) {
        return {
          isOpen: true,
          badgeLabel: 'ABIERTO',
          detailLabel: 'Abierto hoy hasta las 14:30',
        };
      } else if (currentMinutes >= openEvening && currentMinutes < closeEvening) {
        return {
          isOpen: true,
          badgeLabel: 'ABIERTO',
          detailLabel: 'Abierto hoy hasta las 21:00',
        };
      } else if (currentMinutes < openMorning) {
        return {
          isOpen: false,
          badgeLabel: 'CERRADO',
          detailLabel: 'Cerrado · Abre hoy a las 09:30',
        };
      } else if (currentMinutes >= closeMorning && currentMinutes < openEvening) {
        return {
          isOpen: false,
          badgeLabel: 'CERRADO',
          detailLabel: 'Cerrado al mediodía · Abre hoy a las 17:30',
        };
      } else {
        return {
          isOpen: false,
          badgeLabel: 'CERRADO',
          detailLabel: 'Cerrado · Abre mañana a las 09:30',
        };
      }
    }

    return {
      isOpen: false,
      badgeLabel: 'CERRADO',
      detailLabel: 'Cerrado actualmente',
    };
  } catch (e) {
    // Fallback in case Intl fails
    return {
      isOpen: false,
      badgeLabel: 'CERRADO',
      detailLabel: 'Consultar horario',
    };
  }
}
