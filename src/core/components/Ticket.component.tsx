export type TicketProps = { tags: string[]; title: string; desc: string };

export function TicketComponent({ tags, title, desc }: TicketProps) {
  return (
    <div className='ticket'>
      <h4>{title}</h4>
      <p>{desc}</p>
      <div className='tags'>
        {tags.map((tag, i) => (
          <div
            className='tag'
            key={i}
          >
            {tag}
          </div>
        ))}
      </div>
    </div>
  );
}
