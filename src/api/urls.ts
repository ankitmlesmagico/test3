//update the ip
export const loginUrl = `${process.env.REACT_APP_nl_login_url}/api/login`;

export const searchBot = `${process.env.REACT_APP_UCI_BASE_URL}/admin/bot/search`;

export const getStartConversationUrl = (bot: string) =>
  `${process.env.REACT_APP_UCI_BASE_URL}/admin/bot/start/${bot}`;

export const getEpicMainUrl = () => `https://kong.epic.dev.esmagico.in`;
