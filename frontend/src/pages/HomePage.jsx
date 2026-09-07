import React, { useEffect } from 'react'
import { useProductStore } from '../store/useProductStore'

function homePage() {
  
  const {products, loading, error, fetchProducts} = useProductStore()
  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  console.log("Products: ", products )
  return (
    <div>homePage</div>
  ) 
}

export default homePage