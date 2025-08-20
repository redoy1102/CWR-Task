import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { TextArea } from '@/components/ui/textArea';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { ChevronDownIcon } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { format, parseISO } from "date-fns";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Create Task',
        href: '/tasks/create',
    },
];

export default function Tasks() {
    const [open, setOpen] = useState(false);
    const { data, setData, post, processing, errors, reset } = useForm({
        title: '',
        description: '',
        due_date: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/tasks', {
            // preserveScroll: true,
            onSuccess: () => {
                console.log('Task created successfully');
                toast.success('Task created successfully', {
                    duration: 3000,
                    description: `${data.title} has been created.`,
                });
                reset();
            },
            onError: () => {
                toast.error('Failed to create task', {
                    duration: 5000,
                    description: 'Please check the form for errors.'
                });
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Post" />
            <div className="container ms-auto p-4">
                <div className="mb-4 flex items-center justify-between">
                    <h1 className="mb-4 text-2xl font-bold">Create Task</h1>
                    <Link href="/tasks" className="rounded bg-black px-4 py-1 text-white hover:bg-[#2E2E2E] cursor-pointer">
                        Tasks
                    </Link>
                </div>

                <form onSubmit={submit} className="space-y-6">
                    {/* Title */}
                    <div className="grid gap-2">
                        <Label htmlFor="title">Title</Label>
                        <Input
                            id="title"
                            type="text"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            className="mt-1 block w-full"
                            required
                            placeholder="Enter post title"
                        />
                        {errors.title && <InputError message={errors.title} />}
                    </div>
                    {/* Description */}
                    <div className="grid gap-2">
                        <Label htmlFor="description">Description</Label>
                        <TextArea
                            id="description"
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            placeholder="Enter post description"
                            className="mt-1 block w-full"
                        />
                        {errors.description && <InputError message={errors.description} />}
                    </div>

                    {/* Due date */}
                    <div className="grid gap-2">
                        <Popover open={open} onOpenChange={setOpen}>
                            <PopoverTrigger asChild>
                                <Button variant="outline" id="due_date" className="w-full justify-between font-normal">
                                    {data.due_date ? format(parseISO(data.due_date), 'PP') : 'Select due date'}
                                    <ChevronDownIcon className="h-4 w-4" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                    mode="single"
                                    selected={data.due_date ? new Date(data.due_date) : undefined}
                                    onSelect={(date) => {
                                        // Format date as YYYY-MM-DD for MySQL
                                        const formattedDate = date ? format(date, 'yyyy-MM-dd') : '';
                                        setData('due_date', formattedDate);
                                        setOpen(false);
                                    }}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                        {errors.due_date && <InputError message={errors.due_date} />}
                    </div>

                    <Button type="submit" disabled={processing} className='cursor-pointer'>
                        Create Task
                    </Button>
                </form>
            </div>
        </AppLayout>
    );
}
