// Ajuste aqui o expediente da profissional.
// Os horários OCUPADOS vêm do Google Calendar; os LIVRES são calculados
// a partir do expediente abaixo menos o que estiver ocupado na agenda.

export const config = {
  // ID da agenda da Fernanda (Google Agenda > Configurações da agenda >
  // "Integrar agenda" > "ID da agenda"). Não é segredo: só identifica a agenda.
  // Quem consegue LER é apenas a conta de serviço com quem ela foi compartilhada.
  calendarId: "fernandafeff3@gmail.com",
  timeZone: "America/Manaus",
  utcOffset: "-04:00", // Manaus não tem horário de verão
  // A agenda é semanal: mostra hoje + 6 dias (ex.: qui 12 até qua 18).
  diasAFrente: 6,
  duracaoMin: 60,
  // 0 = domingo, 1 = segunda ... 6 = sábado. Faixas no formato [início, fim].
  // Dia sem faixa (domingo) aparece como "folga".
  expediente: {
    1: [["15:00", "22:00"]],
    2: [["15:00", "22:00"]],
    3: [["15:00", "22:00"]],
    4: [["15:00", "22:00"]],
    5: [["15:00", "22:00"]],
    6: [["15:00", "22:00"]],
  } as Record<number, [string, string][]>,
};
