import { useState, type ChangeEvent, type SubmitEvent } from 'react';
import toast from 'react-hot-toast';
import { api } from '../../../core/api';
import { type CreateTicketProps, CategoryEnum } from '../../../core/components/ticket/ticket_models';
import { CgChevronDown } from 'react-icons/cg';

type ModalProps = { closeModal: () => void };

export function CreateTicketModalComponent({ closeModal }: ModalProps) {
  const [errors, setErrors] = useState({ title: false, description: false });
  const [formData, setFormData] = useState<CreateTicketProps>({
    category: undefined,
    title: undefined,
    description: undefined,
  });

  const selectCategoryName = (n: string) => {
    switch (n) {
      case CategoryEnum.Education:
        return 'Educação';
      case CategoryEnum.Health:
        return 'Saúde';
      case CategoryEnum.Infrastructure:
        return 'Infraestrutura';
      case CategoryEnum.Sanitation:
        return 'Sanitário';
      case CategoryEnum.Security:
        return 'Segurança';
      default:
        return undefined;
    }
  };

  const handleCreateTicket = async (e: SubmitEvent) => {
    e.preventDefault();
    let hasError: boolean = false;

    if (!formData.title || formData.title == '') {
      setErrors((prev) => ({ ...prev, title: true }));
      hasError = true;
    }
    if (!formData.description || formData.description == '') {
      setErrors((prev) => ({ ...prev, description: true }));
      hasError = true;
    }

    if (!hasError) {
      fetch(api('/tickets'), { method: 'POST', credentials: 'include', body: JSON.stringify(formData) })
        .then(async (res) => {
          const body = await res.json();
          if (!res.ok) throw body;
          else return body;
        })
        .then((_) => {
          toast.success('Ticket registrado com sucesso!');
          closeModal();
        })
        .catch((err) => {
          toast.error('Erro ao criar tickets');
          console.error(err);
        });
    } else toast.error('Preencha os campos corretamente!');
  };

  const cleanErrors = () => setErrors({ description: false, title: false });
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    cleanErrors();
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form
      onSubmit={handleCreateTicket}
      className='self-center absolute'
    >
      <h2>Registrar Ticket</h2>
      <label htmlFor='title'>Titulo</label>
      <input
        name='title'
        type='text'
        onChange={handleChange}
        className={errors.title ? 'input-error' : ''}
      />
      <label htmlFor='category'>Categoria</label>
      <div id='select-container'>
        <select
          name='category'
          onChange={handleChange}
        >
          {Object.values(CategoryEnum).map((c) => (
            <option value={c}>{selectCategoryName(c)}</option>
          ))}
        </select>
        <CgChevronDown id='chevron' />
      </div>
      <label htmlFor='description'>Descrição</label>
      <textarea
        name='description'
        onChange={handleChange}
        className={errors.description ? 'input-error' : ''}
      />
      <input
        type='submit'
        value='Enviar'
      />
    </form>
  );
}
