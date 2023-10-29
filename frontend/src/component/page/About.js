import React, { useState, useEffect } from 'react';

const About = () => {
  const slides = [
    'Fruits are nature\'s gift to us. They offer not only exquisite flavors but also a treasure trove of essential nutrients and health benefits. From the succulent sweetness of berries to the refreshing citrus zing of oranges, fruits delight our senses and nourish our bodies.',
    'A diet rich in fruits is like a shield for your health. Fruits are brimming with vitamins, minerals, and antioxidants that boost your immune system, helping you stay vibrant and resilient. Say goodbye to sniffles and welcome a life filled with vitality and well-being.',
    'At Fruity Delights, we invite you to embark on a flavorful journey. Explore a diverse range of fruit-based dishes that celebrate the goodness of nature. From vibrant smoothie bowls to exquisite fruit salads, we have curated a menu that showcases the finest nature has to offer. Indulge in the artistry of fruit cuisine and savor the beauty of a healthy lifestyle.'
  ];

  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setActiveSlide((prevSlide) => (prevSlide === slides.length - 1 ? 0 : prevSlide + 1));
    }, 10000); // Change slide every 10 seconds

    return () => clearInterval(slideInterval);
  }, []);

  return (
    <div className="bg-blue-200 h-screen flex items-center justify-center">
      <div className="p-4 max-w-xl w-full bg-yellow-200 rounded-lg shadow-lg text-center">
        <p className="text-2xl text-gray-800 font-serif p-4">{slides[activeSlide]}</p>
      </div>
    </div>
  );
}

export default About;
