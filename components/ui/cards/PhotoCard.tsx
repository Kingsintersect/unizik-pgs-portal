import {cn}from '@/lib/utils'
import Image from 'next/image'
import React from 'react'
import { ArrowRightSvg, Coinbase, MailSvg, PhoneSvg } from '../svg/Svgs';
import Link from 'next/link';

type Lecturer = {
    image_url: string;
    name: string;
    email: string;
    phone: string;
}

interface PhotoCardProps {
    url?: string;
    image_url: string;
    title: string;
    code: string
    user: Lecturer;
}

const PhotoCard: React.FC<PhotoCardProps> = ({ url, image_url, title, user, code, ...props }) => {
    return (
        <Link
            href={url ?? "#"}
            target='_blank'
            className="block group max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 hover:cursor-pointer"
        >
            {/* <div className="group-hover:bg-red-400 "> */}
                <div className={cn("relative w-full group-hover:px-20 h-[200px] scale-100 group-hover:bg-red-400 transition-all duration-700 ease-in-out 0s group-hover:scale-90")}>
                    <Image
                        src={image_url}
                        style={{ objectFit: "contain" }}
                        alt={"PHOTO IMAGE"}
                        fill
                    />
                </div>
            {/* </div> */}
            <div className="p-5">
                <h5 className="mb-2 text-base font-bold tracking-tight text-[#23628d] ">
                    {title}
                    <br />
                    <span className="text-[#d35401]">{code}</span>
                </h5>
                <div className="flex items-center justify-between gap-5">
                    <div className="font-bold text-2xl text-gray-700 size-14 grow flex items-center">
                    {user.name}
                    </div>
                    <div className="relative p-5 size-14 grow-0 border border-gray-200 rounded-sm">
                        <Image
                            src={user.image_url}
                            style={{ objectFit: "contain" }}
                            alt={"PHOTO IMAGE"}
                            fill
                        />
                    </div>
                </div>
            </div>
            <hr className='border-t-red-400 mb-3' />
            <div className="px-5">
                <ul className="my-2 space-y-1">
                    <li>
                        <div className="flex items-center px-3 py-2 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow">
                            <MailSvg/>
                            <span className="flex-1 ms-3 whitespace-nowrap">{user.email}</span>
                        </div>
                    </li>
                    <li>
                        <div className="flex items-center px-3 py-2 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow">
                            <PhoneSvg/>
                            <span className="flex-1 ms-3 whitespace-nowrap"><span className="text-2xl">+</span>{user.phone}</span>
                        </div>
                    </li>
                </ul>
            </div>
            <div className="p-3">
                <div className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-[#23628d] rounded-lg hover:bg-[#155a89] group-hover:bg-[#d35401]">
                    View Course
                    <ArrowRightSvg/>
                </div>
            </div>
        </Link>
    )
}

export default PhotoCard