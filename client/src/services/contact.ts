import { api } from "./api";

export const sendContactMessage = async (body: {
  name: string;
  email: string;
  message: string;
  subject?: string;
  website?: string; // honeypot
}): Promise<{ sent: boolean }> => {
  return api.post("/contact", body);
};
