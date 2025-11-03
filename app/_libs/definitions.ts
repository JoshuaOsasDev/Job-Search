import { z } from "zod";

// Zod schema for Job post
export const JobPostSchema = z.object({
  title: z.string().min(2, "Job title must be at least 2 characters long"),
  company: z.string().min(2, "Company name must be at least 2 characters long"),
  location: z.string().min(2, "Location is required"),
  type: z
    .enum(["Full-time", "Part-time", "Contract", "Internship"])
    .refine((val) => !!val, { message: "Please select a valid job type" }),

  description: z
    .string()
    .min(10, "Description must be at least 10 characters long"),
  salary: z
    .string()
    .optional()
    .refine(
      (val) => !val || /^[\d,$\-–\s]+$/.test(val),
      "Salary must contain only numbers, commas, or ranges (e.g., $80,000 - $100,000)",
    ),
});

export type JobPostInput = z.infer<typeof JobPostSchema>;

export type FormState = {
  errors?: Record<string, string[]>;
  success?: boolean;
};
