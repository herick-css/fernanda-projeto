// Ajuste aqui o expediente da profissional.
// Os horários OCUPADOS vêm do Google Calendar; os LIVRES são calculados
// a partir do expediente abaixo menos o que estiver ocupado na agenda.

export const config = {
  // ID da agenda da Fernanda (Google Agenda > Configurações da agenda >
  // "Integrar agenda" > "ID da agenda"). Não é segredo: só identifica a agenda.
  // Quem consegue LER é apenas a conta de serviço com quem ela foi compartilhada.
  calendarId: "COLE_AQUI_O_ID_DA_AGENDA@group.calendar.google.com",
  timeZone: "America/Manaus",
  utcOffset: "-04:00", // Manaus não tem horário de verão
  diasAFrente: 14,
  duracaoMin: 60,
  // 0 = domingo, 1 = segunda ... 6 = sábado. Faixas no formato [início, fim].
  expediente: {
    1: [["06:00", "11:00"], ["16:00", "20:00"]],
    2: [["06:00", "11:00"], ["16:00", "20:00"]],
    3: [["06:00", "11:00"], ["16:00", "20:00"]],
    4: [["06:00", "11:00"], ["16:00", "20:00"]],
    5: [["06:00", "11:00"], ["16:00", "20:00"]],
    6: [["07:00", "10:00"]],
  } as Record<number, [string, string][]>,
};
