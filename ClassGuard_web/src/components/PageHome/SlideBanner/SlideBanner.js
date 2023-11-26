// import React from 'react';
// import './SlideBanner.scss';
// import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
// function SlideBanner(props) {

//   //handle slide bannner
//   const handlePrev = () => {
//     let listItem = document.querySelectorAll('.item')
//     document.querySelector('.side').appendChild(listItem[0])
//   }
//   const handleNext = () => {
//     let listItem = document.querySelectorAll('.item')
//     document.querySelector('.side').prepend(listItem[listItem.length - 1])
//   }

//   return (
//     <div className='Container'>
//       <div className='side'>
//         <div className='item'>
//           <img src='https://res.cloudinary.com/dwcdztgxn/image/upload/v1565972873/lion-safari-afika-landscape-40756_y7oxsg.jpg' />
//           <div className='Title'>
//           </div>
//         </div>
//         <div className='item'>
//           <img src='https://tse1.mm.bing.net/th?id=OIP.5nYctGK1YJfzNRcAmLWXCgHaEo&pid=Api&rs=1&c=1&qlt=95&w=188&h=117' />
//           <div className='Title'>
//           </div>
//         </div><div className='item'>
//           <img src='https://anhdepfree.com/wp-content/uploads/2020/11/anh-dep-cho-desktop.jpg' />
//           <div className='Title'>
//           </div>
//         </div><div className='item'>
//           <img src='https://res.cloudinary.com/dwcdztgxn/image/upload/v1565972873/lion-safari-afika-landscape-40756_y7oxsg.jpg' />
//           <div className='Title'>
//           </div>
//         </div><div className='item'>
//           <img src='https://tse1.mm.bing.net/th?id=OIP.14SvL_2rzywyJhMYgIJQBgHaEK&pid=Api&rs=1&c=1&qlt=95&w=209&h=117' />
//           <div className='Title'>
//           </div>
//         </div><div className='item'>
//           <img src='https://res.cloudinary.com/dwcdztgxn/image/upload/v1565972873/lion-safari-afika-landscape-40756_y7oxsg.jpg' />
//           <div className='Title'>
//           </div>
//         </div><div className='item'>
//           <img src='https://res.cloudinary.com/dwcdztgxn/image/upload/v1565972873/lion-safari-afika-landscape-40756_y7oxsg.jpg' />
//           <div className='Title'>
//           </div>
//         </div>
//       </div>
//       <div className='Next_prev'>
//         <ArrowLeftOutlined className='prev_icon' onClick={handlePrev} />
//         <ArrowRightOutlined className='next_icon' onClick={handleNext} />
//       </div>
//     </div>
//   );
// }

// export default SlideBanner;