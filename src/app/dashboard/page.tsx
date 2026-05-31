import { db } from '@/db';
import { tasks } from '@/db/schema';
import { desc } from 'drizzle-orm';
import { createTaskAction, deleteTaskAction, toggleTaskAction } from '@/actions/todo-actions';
import Link from 'next/link';

// Forces Next.js to run this page strictly via Server-Side Rendering (SSR)
export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  // Fetch tasks directly on the server side on every request
  const allTasks = await db.select().from(tasks).orderBy(desc(tasks.createdAt));

  return (
    <div className="space-y-8">
      
      {/* Header Back Link & Strategy Badge */}
      <div className="flex justify-between items-center">
        <Link href="/" className="text-sm font-medium text-orange-500 hover:text-orange-400 transition-colors">
          ← Back to Home
        </Link>
        <span className="bg-orange-500/10 text-orange-400 border border-orange-500/30 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
          Strategy: SSR (Real-time)
        </span>
      </div>
      
      {/* 1. Form using Server Actions */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 shadow-md space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-zinc-100">Add New Task</h2>
          <p className="text-sm text-zinc-400 mt-1">Create a new task via Server Actions.</p>
        </div>
        <form action={createTaskAction} className="flex gap-3">
          <input
            type="text"
            name="title"
            placeholder="What needs to be done?"
            className="flex-1 border border-zinc-700 bg-zinc-950/50 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-zinc-100 placeholder-zinc-500"
            required
          />
          <button
            type="submit"
            className="bg-orange-600 hover:bg-orange-500 text-white px-6 py-3 rounded-xl font-semibold transition-all hover:-translate-y-0.5 active:translate-y-0 shadow-lg shadow-orange-600/20"
          >
            Add Task
          </button>
        </form>
      </div>

      {/* 2. Task List Display */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 shadow-md space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-zinc-100">Your Tasks ({allTasks.length})</h2>
          <p className="text-sm text-zinc-400 mt-1">Manage your active and completed tasks.</p>
        </div>
        
        {allTasks.length === 0 ? (
          <div className="bg-zinc-800/50 border border-zinc-700/50 rounded-xl p-8 text-center">
            <p className="text-zinc-400 text-sm">No tasks found. Add one above to get started!</p>
          </div>
        ) : (
          <ul className="divide-y divide-zinc-800">
            {allTasks.map((task) => (
              <li key={task.id} className="py-5 flex items-center justify-between gap-4 group">
                <div className="flex items-center gap-4">
                  {/* Inline Server Action bindings */}
                  <form action={toggleTaskAction.bind(null, task.id, task.isCompleted)}>
                    <button 
                      type="submit"
                      className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-colors ${
                        task.isCompleted 
                          ? 'bg-orange-500 border-orange-500 text-zinc-900' 
                          : 'border-zinc-600 hover:border-orange-500/80 bg-zinc-950/50'
                      }`}
                    >
                      {task.isCompleted && (
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </button>
                  </form>
                  <span className={`text-lg transition-colors ${task.isCompleted ? 'line-through text-zinc-600' : 'text-zinc-200'}`}>
                    {task.title}
                  </span>
                </div>

                {/* Delete button via Server Action */}
                <form action={deleteTaskAction.bind(null, task.id)}>
                  <button
                    type="submit"
                    className="text-sm font-medium text-red-500/80 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all px-3 py-1.5 rounded-lg hover:bg-red-500/10"
                  >
                    Delete
                  </button>
                </form>
              </li>
            ))}
          </ul>
        )}
      </div>

    </div>
  );
}