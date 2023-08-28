import React, { useEffect, useState } from 'react'

function Products() {

    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);

    function getProductByCategory(){
        fetch(`https://fakestoreapi.com/products/category/${selectedCategory}`)
            .then(res=>res.json())
            .then(products=>{
                setProducts(products);
            })
    }


    function getAllCategories(){
        fetch('https://fakestoreapi.com/products/categories')
            .then(res=>res.json())
            .then(json=>{
                console.log(json)
                setCategories(json);
            })
    }

    useEffect(()=>{
        getAllCategories();
    },[])

    useEffect(()=>{
        if (selectedCategory){
            getProductByCategory()

        }
    },[selectedCategory])

    function handleChange(e){
        setSelectedCategory(e.target.value);

    }

  return (
    <div>
        <select name='categories' id='categories' onChange={handleChange}>
            {categories.map(category => <option key={category} value={category}>{category.toUpperCase()}</option>)}
        </select>
        <h1>{selectedCategory}</h1>
        <section className='product'>
            {products.map(prod => {
                return (<section className='product-item' key={prod.id}>
                <img style={{height: 200, width: 200, objectFit:"contain"}} src={prod.image} alt={prod.title}></img>
                <section>
                    <h2>{prod.title}</h2>
                    <h5 style={{fontWeight: 'lighter'}}>{prod.description}</h5>
                </section>
            </section>)
            })
        }
        </section>
    </div>
  )
}

export default Products
