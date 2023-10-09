import { Link, Head } from '@inertiajs/react';
import { PageProps } from '@/types';

export default function Welcome({ auth, laravelVersion, phpVersion }: PageProps<{ laravelVersion: string, phpVersion: string }>) {
    return (
        <div className="h-screen flex items-center justify-center text-red-200">
            <h1>Hello!</h1>
        </div>
    );
}
