import Link from 'next/link'

export default function Home() {
    return (
        <main className='h-screen grid place-items-center'>
            <div className='flex space-x-4'>
                <Link href='/room-management' className='px-4 py-2 bg-primary text-white rounded-md hover:opacity-90'>
                    Tạo phòng
                </Link>

                <Link href='/order' className='px-4 py-2 bg-emerald-600 text-white rounded-md hover:opacity-90'>
                    Tạo đơn
                </Link>
            </div>
        </main>
    )
}
