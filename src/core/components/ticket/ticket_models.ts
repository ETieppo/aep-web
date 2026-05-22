export interface TicketProps {
  id: number;
  user_id: number;
  username: string;
  title: string | undefined;
  description: string | undefined;
  category: CategoryEnum | undefined;
  status: StatusEnum | undefined;
  tags: string[];
}

export interface CreateTicketProps extends Omit<
  TicketProps,
  'id' | 'user_id' | 'status' | 'tags' | 'username'
> {}

export enum CategoryEnum {
  Infrastructure = 'Infrastructure',
  Health = 'Health',
  Education = 'Education',
  Sanitation = 'Sanitation',
  Security = 'Security',
}

export enum StatusEnum {
  Open = 'Open',
  InAnalysis = 'InAnalysis',
  InProgress = 'InProgress',
  Resolved = 'Resolved',
  Archived = 'Archived',
}
