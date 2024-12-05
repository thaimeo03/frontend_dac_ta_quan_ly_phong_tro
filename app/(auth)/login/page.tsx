'use client'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useRouter } from 'next/navigation'

export default function Login() {
    // Hooks
    const router = useRouter()

    // Handlers
    const handleLoginForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        router.push('/')
    }

    return (
        <div className='flex h-screen w-full items-center justify-center px-4'>
            <Card className='mx-auto w-96'>
                <CardHeader>
                    <CardTitle className='text-2xl'>Đăng nhập</CardTitle>
                    <CardDescription>Nhập thông tin tài khoản của bạn</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleLoginForm} className='grid gap-4'>
                        <div className='grid gap-2'>
                            <Label htmlFor='phoneNumber'>Số điện thoại</Label>
                            <Input id='phoneNumber' type='phoneNumber' placeholder='01234566789' required />
                        </div>
                        <div className='grid gap-2'>
                            <Label htmlFor='email'>Email</Label>
                            <Input id='email' type='email' placeholder='m@example.com' required />
                        </div>
                        <div className='grid gap-2'>
                            <div className='flex items-center'>
                                <Label htmlFor='password'>Mật khẩu</Label>
                            </div>
                            <Input id='password' type='password' required />
                        </div>
                        <Button type='submit' className='w-full'>
                            Login
                        </Button>
                    </form>
                    <div className='mt-4 text-center text-sm'>
                        Don&apos;t have an account?{' '}
                        <Link href='#' className='underline'>
                            Sign up
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
