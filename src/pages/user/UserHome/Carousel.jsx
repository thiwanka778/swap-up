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
      title:"New In",
      des:"What's new this week",
      url:"https://s3-alpha-sig.figma.com/img/c29d/a37c/b4d0af86202fc07ccc14ba2549683225?Expires=1690761600&Signature=UIzgFXla2be1lLrg92VBfhmA6Dt-6juwYMEBOblSkWGbSLRODJ9CQSFTM-8GFBwZBtGZDR9-ea4aBJ7qBCyrNjuVlybkV9oI44~cce6IslUvFutp4hW5hkNoH6~bTDFdD23s9iU7x3A4JhKlDCTrYy1wy6rEKnrWIcbQgSeVC1eEFVnUTQtn0lB3XuDqEfiuieqgC308tade3Q0mIGZSQ76JHd0ILht23VoUwuIq-dPHylrrU7n4La360EbI0JUPtjx1O0TVVPyTz0LMeECNc3ctkqo2y-67m5ltqHjV6T-B-lgeYt3OIevX03XechPgxVRgaDfPpoMt8pdcPQ5i2A__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
    },
  
    {
      id:2,
      title:"Dresses",
      des:"Transitional dressing made easy",
      url:"https://s3-alpha-sig.figma.com/img/d093/f767/c3355308c262f3ffe9e789795320154d?Expires=1690761600&Signature=LabHC1A2YhuIg~Ri52e4TSlu4JBqfdYLGms0wsEIA7Jtd2xtlXfpug~nDbfQ5kgdIK2-FGWC9PgbPLzAh~tctXqE91IGB-pvYITlav4k08hupQ9yYNOe1FA~nfjaXZ71x~iVPS27tYsSnWXTKkQunAIMni25NA8L2xmFfKE9cqJ5z3qMREL9QI0084ZULQxr~UWB7~LtqnTUEgSl7kWx8zuwdkT8BwMbHBOW6ywmtKlR1~ZDDrYu9ocDAZw1qkBzC035FqbplodExSM6M41NElDZpALduNDmtUZhgprvcOXtz6PeB6uNAO1iVMQvXV8kNqEkWjyNDt08I~iR5pSTrA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
    },
    {
      id:3,
      title:"Shoes",
      des:"Shoes to make any look better",
      url:"https://s3-alpha-sig.figma.com/img/dd76/ba9b/fe2635071f3534f41a3182b329d555ce?Expires=1690761600&Signature=ReHIWGuvekdinP98wtvJgLUUw-MQIlSFXUiRr5bJ-v6yl3TZM3m1C39oq8vZNDddKIOZneG7UlPaxiK7C~NC5n7n-iSMIdI0ofIPTPGAuA6cGIE0dY4i2QIU3BAa-rVUp4wYlZsTP85jAQ5hHoc1ligLhLNsP1bUKrlUIWcf9coGU2MvTM-sSBMqBIowLWjhl3l3JrppaXmanMjOoGkZuw3cC61~dvU0w0QcIkWYzUrOlWxJSZmw8cKEdf9~hOq-bO7mhYB8wy7U6vHAvV6P3sly7uGpQOgYZLR5YwI3zQnUm0NnPbipNHPmdLyg1ZLnUdNglqIgN3zVcuSi0N~IKQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
    },

    {
      id:4,
      title:"New In",
      des:"What's new this week",
      url:"https://s3-alpha-sig.figma.com/img/c29d/a37c/b4d0af86202fc07ccc14ba2549683225?Expires=1690761600&Signature=UIzgFXla2be1lLrg92VBfhmA6Dt-6juwYMEBOblSkWGbSLRODJ9CQSFTM-8GFBwZBtGZDR9-ea4aBJ7qBCyrNjuVlybkV9oI44~cce6IslUvFutp4hW5hkNoH6~bTDFdD23s9iU7x3A4JhKlDCTrYy1wy6rEKnrWIcbQgSeVC1eEFVnUTQtn0lB3XuDqEfiuieqgC308tade3Q0mIGZSQ76JHd0ILht23VoUwuIq-dPHylrrU7n4La360EbI0JUPtjx1O0TVVPyTz0LMeECNc3ctkqo2y-67m5ltqHjV6T-B-lgeYt3OIevX03XechPgxVRgaDfPpoMt8pdcPQ5i2A__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
    },
  
    {
      id:5,
      title:"Dresses",
      des:"Transitional dressing made easy",
      url:"https://s3-alpha-sig.figma.com/img/d093/f767/c3355308c262f3ffe9e789795320154d?Expires=1690761600&Signature=LabHC1A2YhuIg~Ri52e4TSlu4JBqfdYLGms0wsEIA7Jtd2xtlXfpug~nDbfQ5kgdIK2-FGWC9PgbPLzAh~tctXqE91IGB-pvYITlav4k08hupQ9yYNOe1FA~nfjaXZ71x~iVPS27tYsSnWXTKkQunAIMni25NA8L2xmFfKE9cqJ5z3qMREL9QI0084ZULQxr~UWB7~LtqnTUEgSl7kWx8zuwdkT8BwMbHBOW6ywmtKlR1~ZDDrYu9ocDAZw1qkBzC035FqbplodExSM6M41NElDZpALduNDmtUZhgprvcOXtz6PeB6uNAO1iVMQvXV8kNqEkWjyNDt08I~iR5pSTrA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
    },
    {
      id:6,
      title:"Shoes",
      des:"Shoes to make any look better",
      url:"https://s3-alpha-sig.figma.com/img/dd76/ba9b/fe2635071f3534f41a3182b329d555ce?Expires=1690761600&Signature=ReHIWGuvekdinP98wtvJgLUUw-MQIlSFXUiRr5bJ-v6yl3TZM3m1C39oq8vZNDddKIOZneG7UlPaxiK7C~NC5n7n-iSMIdI0ofIPTPGAuA6cGIE0dY4i2QIU3BAa-rVUp4wYlZsTP85jAQ5hHoc1ligLhLNsP1bUKrlUIWcf9coGU2MvTM-sSBMqBIowLWjhl3l3JrppaXmanMjOoGkZuw3cC61~dvU0w0QcIkWYzUrOlWxJSZmw8cKEdf9~hOq-bO7mhYB8wy7U6vHAvV6P3sly7uGpQOgYZLR5YwI3zQnUm0NnPbipNHPmdLyg1ZLnUdNglqIgN3zVcuSi0N~IKQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
    },
    {
      id:7,
      title:"New In",
      des:"What's new this week",
      url:"https://s3-alpha-sig.figma.com/img/c29d/a37c/b4d0af86202fc07ccc14ba2549683225?Expires=1690761600&Signature=UIzgFXla2be1lLrg92VBfhmA6Dt-6juwYMEBOblSkWGbSLRODJ9CQSFTM-8GFBwZBtGZDR9-ea4aBJ7qBCyrNjuVlybkV9oI44~cce6IslUvFutp4hW5hkNoH6~bTDFdD23s9iU7x3A4JhKlDCTrYy1wy6rEKnrWIcbQgSeVC1eEFVnUTQtn0lB3XuDqEfiuieqgC308tade3Q0mIGZSQ76JHd0ILht23VoUwuIq-dPHylrrU7n4La360EbI0JUPtjx1O0TVVPyTz0LMeECNc3ctkqo2y-67m5ltqHjV6T-B-lgeYt3OIevX03XechPgxVRgaDfPpoMt8pdcPQ5i2A__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
    },
  
    {
      id:8,
      title:"Dresses",
      des:"Transitional dressing made easy",
      url:"https://s3-alpha-sig.figma.com/img/d093/f767/c3355308c262f3ffe9e789795320154d?Expires=1690761600&Signature=LabHC1A2YhuIg~Ri52e4TSlu4JBqfdYLGms0wsEIA7Jtd2xtlXfpug~nDbfQ5kgdIK2-FGWC9PgbPLzAh~tctXqE91IGB-pvYITlav4k08hupQ9yYNOe1FA~nfjaXZ71x~iVPS27tYsSnWXTKkQunAIMni25NA8L2xmFfKE9cqJ5z3qMREL9QI0084ZULQxr~UWB7~LtqnTUEgSl7kWx8zuwdkT8BwMbHBOW6ywmtKlR1~ZDDrYu9ocDAZw1qkBzC035FqbplodExSM6M41NElDZpALduNDmtUZhgprvcOXtz6PeB6uNAO1iVMQvXV8kNqEkWjyNDt08I~iR5pSTrA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
    },
    {
      id:9,
      title:"Shoes",
      des:"Shoes to make any look better",
      url:"https://s3-alpha-sig.figma.com/img/dd76/ba9b/fe2635071f3534f41a3182b329d555ce?Expires=1690761600&Signature=ReHIWGuvekdinP98wtvJgLUUw-MQIlSFXUiRr5bJ-v6yl3TZM3m1C39oq8vZNDddKIOZneG7UlPaxiK7C~NC5n7n-iSMIdI0ofIPTPGAuA6cGIE0dY4i2QIU3BAa-rVUp4wYlZsTP85jAQ5hHoc1ligLhLNsP1bUKrlUIWcf9coGU2MvTM-sSBMqBIowLWjhl3l3JrppaXmanMjOoGkZuw3cC61~dvU0w0QcIkWYzUrOlWxJSZmw8cKEdf9~hOq-bO7mhYB8wy7U6vHAvV6P3sly7uGpQOgYZLR5YwI3zQnUm0NnPbipNHPmdLyg1ZLnUdNglqIgN3zVcuSi0N~IKQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
    },
  
  
  
  
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
    }

    console.log(w)
    
    const items=dummyArray?.map((item)=>{
        return (
          <SwiperSlide key={item?.id}>
          <div style={{width:w,position:"relative"}} key={item?.id}>
          <img style={{width:"100%",borderRadius:"8px"}}
          src={item?.url} alt=""/>
      
      <div style={{display:"flex",flexDirection:"column",alignItems:"center",position:"absolute",width:"fit-content",
      justifyContent:"space-evenly",background:"white",padding:"0.5rem",left:"26%",bottom:"10%",maxWidth:"200px",
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
     
    }}
    >
    {items}
      
    </Swiper>
  )
}

export default Carousel