// 'use client'
// import { useState } from 'react'
// import {
//   Dialog,
//   DialogBackdrop,
//   DialogPanel,
//   Disclosure,
//   DisclosureButton,
//   DisclosurePanel,
//   Menu,
//   MenuButton,
//   MenuItem,
//   MenuItems,
// } from '@headlessui/react'
// import Event from './eventList'
// import { FilterIcon } from 'lucide-react'

// const sortOptions = [
//   { value: 'most-popular', name: 'Most Popular', current: false },
//   { value: 'best-rating', name: 'Best Rating', current: false },
//   { value: 'newest', name: 'Newest', current: false },
//   { value: 'price-low-high', name: 'Price: Low to High', current: false },
//   { value: 'price-high-low', name: 'Price: High to Low', current: false },
// ]

// const subCategories = [
//   { value: 'music', name: 'Music' },
//   { value: 'sports', name: 'Sports' },
//   { value: 'conferences', name: 'Conferences' },
//   { value: 'workshops', name: 'Workshops' },
//   { value: 'networking', name: 'Networking' },
// ]

// const filters = [
//   {
//     id: 'location',
//     name: 'Location',
//     options: [
//       { value: 'aceh', label: 'Aceh', checked: false },
//       { value: 'bali', label: 'Bali', checked: false },
//       { value: 'jakarta', label: 'Jakarta', checked: false },
//       { value: 'jawa-barat', label: 'Jawa Barat', checked: false },
//       { value: 'jawa-timur', label: 'Jawa Timur', checked: false },
//       { value: 'sumatera-utara', label: 'Sumatera Utara', checked: false },
//     ],
//   },
//   {
//     id: 'date',
//     name: 'Date',
//     options: [
//       { value: 'this-weekend', label: 'This Weekend', checked: false },
//       { value: 'next-week', label: 'Next Week', checked: false },
//       { value: 'this-month', label: 'This Month', checked: false },
//       { value: 'next-month', label: 'Next Month', checked: false },
//     ],
//   },
//   {
//     id: 'price',
//     name: 'Price',
//     options: [
//       { value: 'free', label: 'Free', checked: false },
//       { value: '<Rp 10.000', label: '0 - Rp 10.000', checked: false },
//       { value: 'Rp 10.000-Rp 20.000', label: 'Rp 10.000-Rp 20.000', checked: false },
//     ],
//   },
// ]

// function classNames(...classes: string[]) {
//   return classes.filter(Boolean).join(' ')
// }

// export default function Example() {

//   const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

//   const handleFilter = (value: any, sectionId: any) => {
//     const searchParams = new URLSearchParams(window.location.search);
//     let filterValues = searchParams.get(sectionId) ? searchParams.get(sectionId).split(',') : [];

//     if (filterValues.includes(value)) {
//       filterValues = filterValues.filter(item => item !== value);
//     } else {
//       if (sectionId === 'price' || sectionId === 'category' || sectionId === 'sort') {
//         filterValues = [value]; // Only one price, category, or sort filter can be selected at a time
//       } else {
//         filterValues.push(value);
//       }
//     }

//     if (filterValues.length > 0) {
//       searchParams.set(sectionId, filterValues.join(','));
//     } else {
//       searchParams.delete(sectionId);
//     }

//     // Update URL with new searchParams
//     window.history.pushState({}, '', `${window.location.pathname}?${searchParams.toString()}`);
//   }

//   return (
//     <div className="bg-white">
//       <div>
//         {/* Mobile filter dialog */}
//         <Dialog className="relative z-40 lg:hidden" open={mobileFiltersOpen} onClose={setMobileFiltersOpen}>
//           <DialogBackdrop
//             transition
//             className="fixed inset-0 bg-black bg-opacity-25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
//           />

//           <div className="fixed inset-0 z-40 flex">
//             <DialogPanel
//               transition
//               className="relative ml-auto flex h-full w-full max-w-xs transform flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl transition duration-300 ease-in-out data-[closed]:translate-x-full"
//             >
//               <div className="flex items-center justify-between px-4">
//                 <h2 className="text-lg text-gray-900">Filters</h2>
//                 <button
//                   type="button"
//                   className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
//                   onClick={() => setMobileFiltersOpen(false)}
//                 >
//                   <span className="sr-only">Close menu</span>
//                   {/* <XMarkIcon className="h-6 w-6" aria-hidden="true" /> */}
//                   <div className="h-6 w-6" aria-hidden="true" >+</div>
//                 </button>
//               </div>

//               {/* Filters */}
//               <form className="border-t border-gray-200">
//                 <h3 className="sr-only">Categories</h3>
//                 <ul role="list" className="px-2  text-gray-900">
//                   {subCategories.map((category) => (
//                     <li key={category.name}>
//                       <button
//                         type="button"
//                         className="block px-2"
//                         onClick={() => handleFilter(category.value, 'category')}
//                       >
//                         {category.name}
//                       </button>
//                     </li>
//                   ))}
//                 </ul>

//                 {filters.map((section) => (
//                   <Disclosure as="div" key={section.id} className="border-t border-gray-200 px-4 py-6">
//                     {({ open }) => (
//                       <>
//                         <h3 className="-mx-2 -my-3 flow-root">
//                           <DisclosureButton className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
//                             <span className=" text-gray-900">{section.name}</span>
//                             <span className="ml-6 flex items-center">
//                               {open ? (
//                                 <p className="h-5 w-5" aria-hidden="true" >-</p>
//                                 // <MinusIcon className="h-5 w-5" aria-hidden="true" />
//                               ) : (
//                                 <p className="h-5 w-5" aria-hidden="true" >+</p>
//                                 // <PlusIcon className="h-5 w-5" aria-hidden="true" />
//                               )}
//                             </span>
//                           </DisclosureButton>
//                         </h3>
//                         <DisclosurePanel className="pt-6">
//                           <div className="space-y-6">
//                             {section.options.map((option, optionIdx) => (
//                               <div key={option.value} className="flex items-center">
//                                 <input
//                                   id={`filter-mobile-${section.id}-${optionIdx}`}
//                                   name={section.id === 'price' ? section.id : `${section.id}[]`}
//                                   defaultValue={option.value}
//                                   type={section.id === 'price' ? 'radio' : 'checkbox'}
//                                   defaultChecked={option.checked}
//                                   className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
//                                   onChange={() => handleFilter(option.value, section.id)}
//                                 />
//                                 <label
//                                   htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
//                                   className="ml-3 min-w-0 flex-1 text-gray-500"
//                                 >
//                                   {option.label}
//                                 </label>
//                               </div>
//                             ))}
//                           </div>
//                         </DisclosurePanel>
//                       </>
//                     )}
//                   </Disclosure>
//                 ))}
//               </form>
//             </DialogPanel>
//           </div>
//         </Dialog>

//         <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//           <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-6">
//             <h1 className="text-4xl font-bold tracking-tight text-gray-900">ilevent</h1>

//             <div className="flex items-center">
//               <Menu as="div" className="relative inline-block text-left">
//                 <div>
//                   <MenuButton className="group inline-flex justify-center text-sm  text-gray-700 hover:text-gray-900">
//                     Sort
//                     {/* <ChevronDownIcon
//                       className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
//                       aria-hidden="true"
//                     /> */}
//                     <p
//                       className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
//                       aria-hidden="true"
//                     >+</p>
//                   </MenuButton>
//                 </div>

//                 <MenuItems className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
//                   <div className="py-1">
//                     {sortOptions.map((option) => (
//                       <MenuItem key={option.name}>
//                         {({ active }) => (
//                           <button
//                             type="button"
//                             className={classNames(
//                               option.current ? ' text-gray-900' : 'text-gray-500',
//                               active ? 'bg-gray-100' : '',
//                               'block px-4 py-2 text-sm'
//                             )}
//                             onClick={() => handleFilter(option.value, 'sort')}
//                           >
//                             {option.name}
//                           </button>
//                         )}
//                       </MenuItem>
//                     ))}
//                   </div>
//                 </MenuItems>
//               </Menu>

//               <button
//                 type="button"
//                 className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
//                 onClick={() => setMobileFiltersOpen(true)}
//               >
//                 <span className="sr-only">Filters</span>
//                 {/* <FunnelIcon className="h-5 w-5" aria-hidden="true" /> */}
//                 <div className="h-5 w-5" aria-hidden="true" ><FilterIcon /></div>
//               </button>
//             </div>
//           </div>

//           <section aria-labelledby="products-heading" className="pb-24 pt-6">
//             <h2 id="products-heading" className="sr-only">
//               Products
//             </h2>

//             <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
//               {/* Filters */}
//               <form className="hidden lg:block rounded-lg p-4 border border-gray-200 ">
//                 <p className="text-lg bg-gray-200 w-full text-gray-700 p-2 rounded-md font-bold">Filter</p>
//                 <h3 className="sr-only">Categories</h3>
//                 <ul role="list" className=" border-b border-gray-200 pb-6 text-sm  text-gray-900">
//                   {subCategories.map((category) => (
//                     <li key={category.name}>
//                       <button
//                         type="button"
//                         className="block px-2 py-3"
//                         onClick={() => handleFilter(category.value, 'category')}
//                       >
//                         {category.name}
//                       </button>
//                     </li>
//                   ))}
//                 </ul>

//                 {filters.map((section) => (
//                   <Disclosure as="div" key={section.id} className="border-b border-gray-200 py-6">
//                     {({ open }) => (
//                       <>
//                         <h3 className="-my-3 flow-root">
//                           <DisclosureButton className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
//                             <span className=" text-gray-900">{section.name}</span>
//                             <span className="ml-6 flex items-center">
//                               {open ? (
//                                 <p className="h-5 w-5" aria-hidden="true" >-</p>
//                                 // <MinusIcon className="h-5 w-5" aria-hidden="true" />
//                               ) : (
//                                 <p className="h-5 w-5" aria-hidden="true" >+</p>
//                                 // <PlusIcon className="h-5 w-5" aria-hidden="true" />
//                               )}
//                             </span>
//                           </DisclosureButton>
//                         </h3>
//                         <DisclosurePanel className="pt-6">
//                           <div className="space-y-4">
//                             {section.options.map((option, optionIdx) => (
//                               <div key={option.value} className="flex items-center">
//                                 <input
//                                   id={`filter-${section.id}-${optionIdx}`}
//                                   name={section.id === 'price' ? section.id : `${section.id}[]`}
//                                   defaultValue={option.value}
//                                   type={section.id === 'price' ? 'radio' : 'checkbox'}
//                                   defaultChecked={option.checked}
//                                   className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
//                                   onChange={() => handleFilter(option.value, section.id)}
//                                 />
//                                 <label
//                                   htmlFor={`filter-${section.id}-${optionIdx}`}
//                                   className="ml-3 text-sm text-gray-600"
//                                 >
//                                   {option.label}
//                                 </label>
//                               </div>
//                             ))}
//                           </div>
//                         </DisclosurePanel>
//                       </>
//                     )}
//                   </Disclosure>
//                 ))}
//               </form>

//               {/* Product grid */}
//               <div className="lg:col-span-3">
//                 <div className="bg-white">
//                   <Event />
//                 </div>
//               </div>
//             </div>
//           </section>
//         </main>
//       </div>
//     </div>
//   )
// }


