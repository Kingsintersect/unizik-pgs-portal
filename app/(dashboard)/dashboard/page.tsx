import ProductCard from '@/components/ui/cards/ProductCard'
import React, { } from 'react'

const Dashboard = () => (
   <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-7 pb-20 h-auto self-auto'>
      <ProductCard imageUrl={'/course/opreating-systems.png'} title={'COMPUTER PROGRAMMING AND LANGUAGE'} tag={'4.3'} />
      <ProductCard imageUrl={'/course/probability.png'} title={'COMPUTER PROGRAMMING AND LANGUAGE'} tag={'4.3'} />
      <ProductCard imageUrl={'/course/programing-lang1.jpeg'} title={'COMPUTER PROGRAMMING AND LANGUAGE'} tag={'4.3'} />
      <ProductCard imageUrl={'/course/opreating-systems.png'} title={'COMPUTER PROGRAMMING AND LANGUAGE'} tag={'4.3'} />
      <ProductCard imageUrl={'/course/programing-lang1.jpeg'} title={'COMPUTER PROGRAMMING AND LANGUAGE'} tag={'4.3'} />
      <ProductCard imageUrl={'/course/probability.png'} title={'COMPUTER PROGRAMMING AND LANGUAGE'} tag={'4.3'} />
      <ProductCard imageUrl={'/course/programing-lang2.jpeg'} title={'COMPUTER PROGRAMMING AND LANGUAGE'} tag={'4.3'} />
      <ProductCard imageUrl={'/course/programing-lang2.jpeg'} title={'COMPUTER PROGRAMMING AND LANGUAGE'} tag={'4.3'} />
   </div>
)

export default Dashboard