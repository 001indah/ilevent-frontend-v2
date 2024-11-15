import React from 'react'
import CategoryCard from './CategoryCard'

const Category: React.FC = () => {
    const categories = [
        { id: 1, title: 'Exhibition', eventCount: 12, imageUrl: 'https://images.pexels.com/photos/69903/pexels-photo-69903.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
        { id: 2, title: 'Workshop', eventCount: 8, imageUrl: 'https://images.pexels.com/photos/1709003/pexels-photo-1709003.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
        { id: 3, title: 'Seminar', eventCount: 5, imageUrl: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?fm=jpg&w=3000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
        { id: 1, title: 'Exhibition', eventCount: 12, imageUrl: 'https://images.pexels.com/photos/69903/pexels-photo-69903.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
        { id: 2, title: 'Workshop', eventCount: 8, imageUrl: 'https://images.pexels.com/photos/1709003/pexels-photo-1709003.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
        { id: 3, title: 'Seminar', eventCount: 5, imageUrl: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?fm=jpg&w=3000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
        { id: 1, title: 'Exhibition', eventCount: 12, imageUrl: 'https://images.pexels.com/photos/69903/pexels-photo-69903.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
        { id: 2, title: 'Workshop', eventCount: 8, imageUrl: 'https://images.pexels.com/photos/1709003/pexels-photo-1709003.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
        { id: 3, title: 'Seminar', eventCount: 5, imageUrl: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?fm=jpg&w=3000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
        { id: 1, title: 'Exhibition', eventCount: 12, imageUrl: 'https://images.pexels.com/photos/69903/pexels-photo-69903.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
        { id: 2, title: 'Workshop', eventCount: 8, imageUrl: 'https://images.pexels.com/photos/1709003/pexels-photo-1709003.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
        { id: 3, title: 'Seminar', eventCount: 5, imageUrl: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?fm=jpg&w=3000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    ];

    return (
        <div className='b-20 overflow-x-auto'>
            <div className='flex justify-between items-center '>
                <p className='text-lg font-bold'>Categories</p>
                <div className='inline-flex items-center font-bold text-sm flex-wrap text-baseBlue group-hover:text-baseBlue'>
                    <p>See all</p>
                </div>
            </div>
            <div className='flex gap-4 overflow-x-auto'>
                {categories.map(category => (
                    <CategoryCard
                        key={category.id}
                        title={category.title}
                        eventCount={category.eventCount}
                        imageUrl={category.imageUrl}
                    />
                ))}
            </div>
        </div>
    )
}

export default Category
