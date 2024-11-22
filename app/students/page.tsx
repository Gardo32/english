import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Link from 'next/link'

export default async function StudentsPage() {
  const supabase = createServerComponentClient({ cookies })
  const { data: students } = await supabase
    .from('students')
    .select('*')
    .order('name')

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold">Our Students</h1>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {students?.map((student) => (
          <div key={student.id} className="border p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-2">
              <Link href={`/students/${student.slug}`} className="hover:text-blue-500">
                {student.name}
              </Link>
            </h2>
            <p className="text-gray-600">{student.bio}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
