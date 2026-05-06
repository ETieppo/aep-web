import { useEffect, useState } from 'react';
import { api } from '../../../core/api';
import toast from 'react-hot-toast';
import { TicketComponent, type TicketProps } from '../../../core/components/Ticket.component';

export function DashAllTicketsComponent() {
  const [tickets, setTickets] = useState<TicketProps[] | null>(null);

  const handleFetchTickets = async () => {
    fetch(api('/tickets/all'), { credentials: 'include' })
      .then(async (res) => {
        const body = await res.json();
        if (!res.ok) throw body;
        else return body;
      })
      .then((res) => setTickets(res))
      .catch((err) => {
        toast.error('Erro ao buscar tickets');
        console.error(err);
      });
  };

  useEffect(() => {
    handleFetchTickets();
  }, []);

  return <div>admin dash {tickets && tickets.map((t) => <TicketComponent {...t} />)}</div>;
}
