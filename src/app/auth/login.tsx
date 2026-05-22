import { useState, type ChangeEvent, type SubmitEvent } from 'react';
import toast from 'react-hot-toast';
import { api } from '../../core/api';
import { PiEye, PiEyeClosedThin } from 'react-icons/pi';
import { useNavigate } from 'react-router';
import { SpinnerComponent } from '../../core/components/Spinner.component';

type UserCredentials = { email: string; password: string };

export default function LoginComponent() {
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [credentials, setCredentials] = useState<UserCredentials>({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: SubmitEvent) => {
    e.preventDefault();
    setLoading(true);
    const user_error_message = 'Erro no login, verifique as credenciais!';

    fetch(api('/auth/login'), {
      method: 'POST',
      body: JSON.stringify(credentials),
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
    })
      .then(async (res) => {
        const body = await res.json();
        if (!res.ok) throw await res.json();
        else return body;
      })
      .then((_) => {
        setLoading(false);
        navigate(`/app/dash`);
      })
      .catch((err) => {
        setLoading(false);
        toast.error(user_error_message);
        console.log(user_error_message, err);
      });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className='h-screen w-screen flex flex-row relative justify-end'>
      {loading && <SpinnerComponent />}
      <img
        src='/imgs/chicago3.jpeg'
        alt=''
        className='absolute h-screen object-cover'
      />
      <form
        onSubmit={handleSubmit}
        id="login"
        className='h-screen  text-white ml-auto '
      >
        <h1 className='font-iter text-2xl w-fit'>LOGIN</h1>
        <div className='flex flex-col'>
          <div className='flex flex-col gap-2'>
            <label
              htmlFor='email'
              className=''
            >
              Email
            </label>
            <input
              name='email'
              type='email'
              onChange={handleChange}
              value={credentials.email.toLowerCase()}
            />
          </div>

          <div className='relative flex flex-col gap-2 mt-2'>
            <div className='flex flex-row justify-between text-center items-center'>
              <label htmlFor='password'>Password</label>
              <button
                type='button'
                onClick={() => setShowPass(!showPass)}
              >
                {showPass ?
                  <PiEye />
                : <PiEyeClosedThin />}
              </button>
            </div>
            <input
              name='password'
              type={showPass ? 'text' : 'password'}
              onChange={handleChange}
            />
          </div>
          <input
            type='submit'
            value='Entrar'
          />
        </div>
      </form>
    </div>
  );
}
