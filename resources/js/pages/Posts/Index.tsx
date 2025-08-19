import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';

// Add proper type definition for Post
interface Post {
    id: number;
    title: string;
    content: string;
    created_at: string;
}

interface Props {
    posts: Post[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Posts',
        href: '/posts',
    },
];

export default function Posts({ posts }: Props) {
    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this post?')) {
            router.delete(`/posts/${id}`, {
                preserveScroll: true,
                preserveState: false,
                onSuccess: () => {
                    console.log('Post deleted successfully');
                },
                onError: (errors) => {
                    console.error('Failed to delete post:', errors);
                },
            });
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Posts" />
            <div className="container ms-auto p-4">
                <div className="mb-4 flex items-center justify-between">
                    <h1 className="mb-4 text-2xl font-bold">Blog Posts</h1>
                    <Link href="/posts/create" className="rounded bg-gray-500 px-4 py-1 text-white hover:bg-gray-600">
                        Create Post
                    </Link>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full table-auto rounded-lg bg-black text-white">
                        <thead>
                            <tr>
                                <th className="px-4 py-2">ID</th>
                                <th className="px-4 py-2">Title</th>
                                <th className="px-4 py-2">Content</th>
                                <th className="px-4 py-2">Create At</th>
                                <th className="px-4 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {posts.map((post) => (
                                <tr key={post.id}>
                                    <td className="border px-4 py-2">{post.id}</td>
                                    <td className="border px-4 py-2">{post.title}</td>
                                    <td className="border px-4 py-2">{post.content}</td>
                                    <td className="border px-4 py-2">{new Date(post.created_at).toLocaleDateString()}</td>
                                    <td className="border px-4 py-2">
                                        <Link href={`/posts/${post.id}/edit`} className="text-blue-500 hover:underline">
                                            Edit
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(post.id)}
                                            className="ml-4 cursor-pointer text-red-500 hover:underline"
                                            type="button"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AppLayout>
    );
}
