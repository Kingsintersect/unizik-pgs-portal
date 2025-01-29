import Image from 'next/image'
import React, { FC, HTMLAttributes, ReactNode } from 'react'
import Star, { Label } from '../app/Star'
import cn from '@/lib/cn'

// interface IProductImageProps extends HTMLAttributes<HTMLDivElement> {}
// interface IProductImageProps extends HTMLAttributes<HTMLImageElement> {}

interface IProductImageProps extends HTMLAttributes<HTMLDivElement> {
    imageUrl: string,
    title: string,
    tag: string,
    classList?: string,
    children?: ReactNode
}

const ProductCard: FC<IProductImageProps> = ({ imageUrl, title, tag, classList, children }) => {
    return (
        <div className={cn(`w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 "min-h-0 h-auto`, classList)}>
            <a href="#">
                <div className="relative w-40 h-40 rounded-full">
                    <Image fill style={{ objectFit: "cover" }} className="p-5 rounded-t-lg overflow-hidden" src={`${imageUrl}`} alt="product image" />
                </div>
            </a>
            <div className="px-5 pb-5">
                <a href="#">
                    <h5 className="text-md font-semibold tracking-tight text-gray-900 dark:text-white">{title}</h5>
                </a>
                <div className="flex items-center mt-2.5 mb-3">
                    {children ? (
                        children
                    ) : (
                        <div className="flex items-center space-x-1 rtl:space-x-reverse">
                            <Star />
                            <Star />
                            <Star />
                            <Star />
                            <Star classList="text-gray-200 dark:text-gray-600" />
                        </div>
                    )}

                    <Label>{tag}</Label>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-gray-900 dark:text-white">$599</span>
                    {/* <a href="#" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add to cart</a> */}
                </div>
            </div>
        </div>

    )
}

export default ProductCard