import "swiper/css";
import "swiper/css/pagination";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { BsStarHalf, BsStarFill } from "react-icons/bs";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import ReactRating from "react-rating";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch("review.json")
      .then((res) => res.json())
      .then((data) => setReviews(data));
  }, []);

  return (
    <div className="container mx-auto my-24">
      
        <h3 className="text-6xl text-center font-bold">
          What People Say
          <br /> About Our Services
        </h3>

      <div>
        <div className="my-12 mx-auto">
          <Swiper
            navigation={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            pagination={false}
            modules={[Navigation, Autoplay, Pagination]}
            className="mySwiper"
          >
            {reviews?.map((review) => (
              <SwiperSlide key={review._id}>
                <div className="grid grid-cols-2 items-center justify-between border-2">
                  <div className="pl-3 md:pl-12 md:py-24">
                    <p className="text-gray-500 text-2xl font-bold">
                      "{review.details}"
                    </p>
                    <p className="flex my-2 text-pink-600">
                      <ReactRating
                        initialRating={review.rating}
                        emptySymbol={
                          <div className="text-gray-300">
                            <BsStarFill />
                          </div>
                        }
                        fullSymbol={
                          <div className="text-pink-600">
                            <BsStarFill />
                          </div>
                        }
                        fractions={2}
                        readonly
                        placeholderSymbol={
                          <div className="text-pink-600">
                            <BsStarHalf />
                          </div>
                        }
                      />
                    </p>
                    <h5 className="font-semibold text-2xl">{review.name}</h5>
                  </div>
                  <div className="clip-path-reviews flex flex-col justify-center pl-3 md:pl-12 py-[150px] md:py-[136px] lg:py-[152px]">
                    <div className="flex flex-col lg:flex-row justify-center items-center gap-1 sm:gap-3 text-white md:ml-16 xl:ml-24">
                      <div className="rounded-full my-2 mt-4 h-20 w-20 overflow-hidden">
                        <img
                          className="w-full h-full object-cover"
                          src={review.img}
                          alt="client image"
                        />
                      </div>

                      <div>
                        <h2 className="text-xl font-semibold">
                          Junishi Tsuneoka
                        </h2>
                        <p>Marketing Manager</p>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
