import type { Variants } from "framer-motion";

export type NavLinkProps = {
  field: string;
  value: string;
  icon: React.JSX.Element;
};

export type FieldErrors = {
  title?: string[];
  company?: string[];
  location?: string[];
  type?: string[];
  description?: string[];
  salary?: string[];
};

export type Job = {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string; // instead of union
  description: string;
  salary?: string | null;
  postedBy: {
    id: string;
    name: string | null;
    image: string | null;
    email: string | null;
    emailVerified: Date | null;
  };
  postedAt: Date;
};

export interface Props {
  jobs: Job[];
}

export type JobProps = {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  description: string;
  salary: string | null;
  postedAt: Date;
  postedById: string;
  postedBy: {
    id: string;
    name: string | null;
    email: string | null;
    emailVerified: Date | null;
    image: string | null;
  };
  _count: {
    application: number;
  };
};

export type UserProfile = {
  id: string;
  userId: string;
  bio: string | null;
  phone: string | null;
  location: string | null;
  website: string | null;
  resumeUrl: string | null;
  linkedinUrl: string | null;
  githubUrl: string | null;
  portfolio: string | null;
  skills: string | null;
  createdAt: Date;
  updatedAt: Date;
} | null;

export type Application = {
  id: string;
  jobId: string;
  userId: string;
  status: string;
  appliedAt: Date;
  job: {
    id: string;
    title: string;
    type: string;
    location: string;
    company: string;
    description: string;
    salary: string | null;
    postedAt: Date;
    postedById: string;
  };
};

export type DirectionVariants = Variants & {
  enter: (direction: number) => {
    x: string;
    opacity: number;
    rotateY: number;
  };
  center: {
    zIndex: number;
    x: number;
    opacity: number;
    rotateY: number;
    transition: {
      duration: number;
      ease: string;
    };
  };
  exit: (direction: number) => {
    zIndex: number;
    x: string;
    opacity: number;
    rotateY: number;
    transition: {
      duration: number;
      ease: string;
    };
  };
};
