import z from "zod";

export const contactZodSchema = z.object({
  name: z
    .string("Name is required.")
    .min(2, "Name must be at least 2 characters long"),
  email: z.email("Invalid email address."),
  message: z
    .string("Message is required.")
    .min(10, "Message must be at least 10 characters long")
    .max(2000, "Message must be at most 2000 characters."),
});

export type IContactProps = z.infer<typeof contactZodSchema>;