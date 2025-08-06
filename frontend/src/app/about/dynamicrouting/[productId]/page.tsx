import React from 'react'

const  ProductDetail = async({params} : { params: Promise<{productId: string}> }) => {
    const { productId } = await params;
  return (
    <div className='text-yellow-900 text-4xl'>ProductDetail : {productId}</div>
  )
}

export default ProductDetail