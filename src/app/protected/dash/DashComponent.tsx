import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { api } from '../../../core/api';
import { type TicketProps } from '../../../core/components/ticket/ticket_models';
import { TicketComponent } from '../../../core/components/ticket/Ticket.component';
import { CreateTicketModalComponent } from './CreateTicketModalComponent';

export function DashComponent() {
  const [tickets, setTickets] = useState<TicketProps[] | null>(null);
  const [openAddTicketModal, setOpenAddTicketModal] = useState(false);

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

  return (
    <div className='relative flex flex-col h-dvh justify-center items-center'>
      {openAddTicketModal && <CreateTicketModalComponent closeModal={() => setOpenAddTicketModal(false)} />}
      <div className='flex flex-row justify-between w-full justify-between mb-2 items-end'>
        <h1>Tickets</h1>
        <button
          className='rounded bg-neutral-800 w-10 h-10'
          onClick={() => setOpenAddTicketModal(true)}
        >
          +
        </button>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 default-gap w-full flex-1 min-h-0 overflow-y-auto pb-20'>
        {tickets
          && tickets.map((t, i) => (
            <TicketComponent
              {...t}
              key={i}
            />
          ))}
      </div>
    </div>
  );
}
