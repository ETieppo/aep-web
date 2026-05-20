export type TicketProps = {
  id: number;
  user_id: number;
  username: string;
  title: string;
  description: string;
  category: CategoryEnum;
  status: StatusEnum;
  tags: string[];
};

enum CategoryEnum {
  Infrastructure,
  Health,
  Education,
  Sanitation,
  Security,
}

enum StatusEnum {
  Open,
  InAnalysis,
  InProgress,
  Resolved,
  Archived,
}
