import { useEffect, useState, type ChangeEvent } from 'react';
import toast from 'react-hot-toast';
import { api } from '../../../core/api';
import type { TicketProps } from '../../../core/components/ticket/ticket_models';
import { TicketComponent } from '../../../core/components/ticket/Ticket.component';

export function DashComponent() {
  const [tickets, setTickets] = useState<TicketProps[] | null>(null);
  const [openAddTicketModal, setOpenAddTicketModal] = useState(true);
  const [formData, setFormData] = useState<CreateTicketProps>({});

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

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    handleFetchTickets();
  }, []);

  return (
    <div className='relative flex flex-col h-dvh justify-center'>
      {openAddTicketModal && (
        <div className='flex flex-col absolute p-6 self-center backdrop-blur-xl'>
          <form
            action=''
            className='flex flex-col gap-2'
          >
            <input
              name='title'
              type='text'
              onChange={handleChange}
            />
            <input
              name='description'
              type='text'
              onChange={handleChange}
            />
            <input
              name='category'
              type='text'
              onChange={handleChange}
            />
          </form>
        </div>
      )}
      <div className='flex flex-row justify-between w-full justify-between mb-2 items-end'>
        <h1 className='text-3xl'>Tickets</h1>
        <button
          className='rounded bg-neutral-800 w-10 h-10'
          onClick={() => setOpenAddTicketModal(true)}
        >
          +
        </button>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-[var(--gap)] w-full flex-1 min-h-0 overflow-y-auto pb-20'>
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
