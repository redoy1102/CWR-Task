import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { format, parseISO } from 'date-fns';
import { Plus, Trash2 } from 'lucide-react';

// Add proper type definition for Post
interface Task {
    id: number;
    title: string;
    description: string;
    due_date: string;
    created_at: string;
}

interface Props {
    tasks: Task[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Tasks',
        href: '/tasks',
    },
];

export default function Tasks({ tasks }: Props) {
    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this post?')) {
            router.delete(`/tasks/${id}`, {
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

    const handleDeleteAll = () => {
        if(confirm('Are you sure you want to delete all tasks?')) {
            router.delete('/tasks-delete-all', {
                preserveScroll: true,
                preserveState: false,
                onSuccess: () => {
                    console.log('All tasks deleted successfully');
                },
                onError: (errors) => {
                    console.error('Failed to delete all tasks:', errors);
                },
            })
        }
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="tasks" />
            <div className="container ms-auto p-4">
                <div className="mb-4 flex items-center justify-between">
                    <div className="flex justify-center gap-4">
                        <h1 className="mb-4 text-2xl font-bold">Tasks</h1>
                        {tasks.length > 0 && (
                            <Button
                                onClick={handleDeleteAll}
                                className="flex items-center gap-2 bg-red-500 px-4 py-2 text-white transition-colors duration-200 hover:bg-red-600 cursor-pointer"
                                type="button"
                            >
                                <Trash2 className="h-4 w-4" />
                                Delete All
                            </Button>
                        )}
                    </div>

                    <Link href="/tasks/create" className="cursor-pointer rounded bg-black px-4 py-1 text-white hover:bg-[#2E2E2E]">
                        <div className="flex items-center gap-2">
                            <Plus className="h-5 w-5 text-white" strokeWidth={3} />
                            Create Task
                        </div>
                    </Link>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full table-auto rounded-lg bg-black text-white">
                        <thead>
                            <tr>
                                <th className="px-4 py-2">ID</th>
                                <th className="px-4 py-2">Title</th>
                                <th className="px-4 py-2">Description</th>
                                <th className="px-4 py-2">Create At</th>
                                <th className="px-4 py-2">Due Date</th>
                                <th className="px-4 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tasks.map((task) => (
                                <tr key={task.id}>
                                    <td className="border px-4 py-2">{task.id}</td>
                                    <td className="border px-4 py-2">{task.title}</td>
                                    <td className="border px-4 py-2">{task.description}</td>
                                    <td className="border px-4 py-2">{task.created_at ? format(parseISO(task.created_at), 'dd/MM/yyyy') : 'N/A'}</td>

                                    <td className="border px-4 py-2">{task.created_at ? format(parseISO(task.created_at), 'dd/MM/yyyy') : 'N/A'}</td>

                                    <td className="border px-4 py-2">
                                        <Link href={`/tasks/${task.id}/edit`} className="text-blue-500 hover:underline">
                                            Edit
                                        </Link>
                                        <Button
                                            onClick={() => handleDelete(task.id)}
                                            className="ml-4 cursor-pointer text-red-500 hover:underline"
                                            type="button"
                                        >
                                            Delete
                                        </Button>
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
