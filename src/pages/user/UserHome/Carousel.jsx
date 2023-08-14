import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y,Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';
import { useSelector } from 'react-redux';

const dummyArray=[
    {
      id:1,
      title:"T-Shirt",
      des:"",
      url:"https://static-01.daraz.lk/p/d6bcea55e8bd7703219bdf8a978a4040.jpg"
    },
  
    {
      id:2,
      title:"Shirt",
      des:"",
      url:"https://rukminim2.flixcart.com/image/550/650/xif0q/shirt/b/d/f/3xl-13-lstr-wine-vtexx-original-imagnzbummhkgr7p.jpeg?q=90&crop=false"
    },
    {
      id:3,
      title:"Pants",
      des:"",
      url:"https://images.wrangler.com/is/image/Wrangler/3W060BR-HERO?$KDP-XLARGE$"
    },

    {
      id:4,
      title:"Shoes",
      des:"",
      url:"https://rukminim1.flixcart.com/image/450/500/l51d30w0/shoe/z/w/c/10-mrj1914-10-aadi-white-black-red-original-imagft9k9hydnfjp.jpeg?q=90&crop=false"
    },
  
    {
      id:5,
      title:"Jeans",
      des:"",
      url:"https://www.jeanswest.co.nz/dw/image/v2/BDXX_PRD/on/demandware.static/-/Sites-jeanswest-master-catalog/default/dw4948db38/images/WLC-14041/WLC-14041_01R_IM_01_Skinny-Jeans_Light-Vintage.jpg?sw=488&sh=652"
    },
    // {
    //   id:6,
    //   title:"Leggings",
    //   des:"",
    //   url:"https://www.boody.com.au/cdn/shop/products/Full-Leggings-Black-Side_2c204eb8-7240-40c4-88ff-a4264dc36477.jpg?v=1613769992"
    // },
    {
      id:7,
      title:"Skirt",
      des:"",
      url:"https://d1hj68zhrbkzii.cloudfront.net/wp-content/uploads/2023/02/0304505046MRN-1_Ladies-Skirt_Fashion-Bug-Sri-Lanka.jpg"
    },
  
    {
      id:8,
      title:"Party Dress",
      des:"",
      url:"https://i.pinimg.com/1200x/4b/98/ab/4b98abd123f574aeec89e3e3f510ce92.jpg"
    },
    {
      id:9,
      title:"Frock",
      des:"",
      url:"https://images.meesho.com/images/products/46942364/ma522_512.webp"
    },
    // {
    //   id:10,
    //   title:"Mini Skirt",
    //   des:"",
    //   url:"https://gflock.lk/cdn/shop/products/07A_98e03f92-e0c7-4d74-8db5-6d210d816902.jpg?v=1673802700"
    // },
    // {
    //   id:11,
    //   title:"Mini Frock",
    //   des:"",
    //   url:"https://www.thilakawardhana.com/wp-content/uploads/2022/12/TW118811.jpg"
    // }
  
  
  
  
  ]
  
const Carousel = () => {
  
    const {screen}=useSelector((state)=>state.user);
    let w="340px";

    if(screen<588){
      w="100%"
    }

    else if(screen<622){
      w="260px";
    }

    else if(screen<640){
     w="280px";
    }
    else if(screen<750){
   w="280px";
    }
    else if(screen<925){
      w="340px";
    }else if(screen<1115){
      w="280px"
    }else if(screen<1444){
      w="280px"
    }

    
    
    const items=dummyArray?.map((item)=>{
        return (
          <SwiperSlide key={item?.id}>
          <div style={{width:w,position:"relative"}} key={item?.id}>
          <img style={{width:"100%",borderRadius:"8px"}}
          src={item?.url} alt=""/>
      
      <div style={{display:"flex",flexDirection:"column",alignItems:"center",position:"absolute",width:"fit-content",
      justifyContent:"space-evenly",background:"white",padding:"0.5rem",left:"40%",bottom:"10%",maxWidth:"200px",
      }}>
      <p style={{fontWeight:"bold",fontSize:"1.5rem"}}>{item?.title}</p>
      <p>{item?.des}</p>
      </div>
      
        </div>
        </SwiperSlide>
        )
      })

   
  return (
    <Swiper
    modules={[Navigation, Pagination, Scrollbar, A11y,Autoplay]}
    spaceBetween={10}
    slidesPerView={3}
    navigation
    // pagination={{ clickable: true }}
    onSwiper={(swiper) => console.log(swiper)}
    onSlideChange={() => console.log('slide change')}
    speed={3000}
    autoplay={{ delay:1500 ,disableOnInteraction: false}} 
    breakpoints={{
      // When window width is >= 320px (small devices)

      0:{
        slidesPerView: 1,
      },
      588: {
        slidesPerView: 2,
      },
      // When window width is >= 768px (medium devices)
      925: {
        slidesPerView: 3,
      },
      1300:{
        slidesPerView:4,
      },
     
    }}
    >
    {items}
      
    </Swiper>
  )
}

export default Carousel