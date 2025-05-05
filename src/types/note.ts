export interface Note {
  id: number;
  title: string;
  content: string;
  isArchived: boolean;
  tag: string | null;
}
