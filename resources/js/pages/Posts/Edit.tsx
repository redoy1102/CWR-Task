import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { TextArea } from '@/components/ui/textArea';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Update Post',
        href: '/posts/update',
    },
];

export default function Posts() {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        content: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/posts', {
            onSuccess: () => {
                console.log('Success - redirecting to index');
            },
            onError: (errors) => {
                console.error('Submission errors:', errors);
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Post" />
            <div className="container ms-auto p-4">
                <div className="mb-4 flex items-center justify-between">
                    <h1 className="mb-4 text-2xl font-bold">Update Post</h1>
                    <Link href="/posts" className="rounded bg-gray-500 px-4 py-1 text-white hover:bg-gray-600">
                        Posts
                    </Link>
                </div>

                <form onSubmit={submit} className="space-y-6">
                    <div className="grid gap-2">
                        <Label htmlFor="title">Title</Label>
                        <Input
                            id="title"
                            type="text"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            className="mt-1 block w-full"
                            required
                            placeholder='Enter post title'
                        />
                        {errors.title && <InputError message={errors.title} />}
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="content">Content</Label>
                        <TextArea
                            id="content"
                            value={data.content}
                            onChange={(e) => setData('content', e.target.value)}
                            className="mt-1 block w-full"
                            required
                        />
                        {errors.content && <InputError message={errors.content} />}
                    </div>

                    <Button type="submit" disabled={processing}>
                        Update Post
                    </Button>
                </form>
            </div>
        </AppLayout>
    );
}
