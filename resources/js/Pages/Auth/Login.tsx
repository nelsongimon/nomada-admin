import { useEffect, FormEventHandler } from 'react';
import Checkbox from '@/Components/Checkbox';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Input } from '@/shadcn/ui/input';
import { XCircle } from 'lucide-react';
import { Button } from '@/shadcn/ui/button';

export default function Login({ status, canResetPassword }: { status?: string, canResetPassword: boolean }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    email: '',
    password: '',
    remember: false,
  });

  useEffect(() => {
    return () => {
      reset('password');
    };
  }, []);

  const submit: FormEventHandler = (e) => {
    e.preventDefault();

    post(route('login'));
  };

  return (
    <GuestLayout>
      <Head title="Log in" />

      {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}
      <form onSubmit={submit}>
        <div className="flex flex-col gap-y-2">
          <label htmlFor="email" className="text-sm font-semibold">
            Email
          </label>
          <Input
            id="email"
            type="email"
            name="email"
            value={data.email}
            onChange={(e) => setData('email', e.target.value)}
          />
          {errors.email && (
            <div className="flex items-center gap-x-1 text-red-500 text-sm font-normal ml-1">
              <XCircle size={20} className="stroke-[1]" />
              {errors.email}
            </div>
          )}
        </div>
        <div className="mt-4 flex flex-col gap-y-2">
          <label htmlFor="password" className="text-sm font-semibold">
            Password
          </label>
          <Input
            id="password"
            type="password"
            name="password"
            value={data.password}
            onChange={(e) => setData('password', e.target.value)}
          />
          {errors.email && (
            <div className="flex items-center gap-x-1 text-red-500 text-sm font-normal ml-1">
              <XCircle size={20} className="stroke-[1]" />
              {errors.email}
            </div>
          )}
        </div>

        <div className="block mt-4">
          <label className="flex items-center">
            <Checkbox
              name="remember"
              checked={data.remember}
              onChange={(e) => setData('remember', e.target.checked)}
            />
            <span className="ml-2 text-sm text-gray-600">Remember me</span>
          </label>
        </div>

        <div className="flex items-center justify-between mt-4">
          {canResetPassword && (
            <Link
              href={route('password.request')}
              className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Forgot your password?
            </Link>
          )}
          <Button
            variant={'default'}
            disabled={processing}
            type="submit"
          >
            Log in
          </Button>
        </div>
      </form>
    </GuestLayout>
  );
}
