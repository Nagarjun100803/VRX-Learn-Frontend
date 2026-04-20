export type Course = {
  id: string;
  title: string;
  shortDescription: string | null;
  longDescription: string;
  trainerId: string;
  trainerName: string;
  noOfTrainees: number;
  createdAt: string;
};
