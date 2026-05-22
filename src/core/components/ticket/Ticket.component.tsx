import type { TicketProps } from './ticket_models';

export function TicketComponent({ username, category, status, tags, title, description }: TicketProps) {
  return (
    <div className='ticket'>
      <p id='category'>{category?.toString().toUpperCase()}</p>

      <div id='ticket-container'>
        <h1 className=''>{title}</h1>
        <p id='description'>{description}</p>
        <div id='status-bar'>
          <p id='status'>{status}</p>
          <p id='by'>By: {username ? username : 'anônimo'}</p>
        </div>

        <div className='tags'>
          {tags.map((tag, i) => (
            <div
              className='tag'
              key={i}
            >
              #{tag}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
